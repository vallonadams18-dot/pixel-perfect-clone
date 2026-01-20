import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Download, Save, Loader2, RefreshCw, X, Sparkles, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

interface ExperienceDemoProps {
  experience: string;
  experienceTitle: string;
  experienceDescription: string;
  accentColor?: string;
}

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" });

const ExperienceDemo = ({ 
  experience, 
  experienceTitle, 
  experienceDescription,
  accentColor = 'primary'
}: ExperienceDemoProps) => {
  // Email gate state
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [remainingTries, setRemainingTries] = useState<number | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const { toast } = useToast();

  const handleEmailSubmit = useCallback(async () => {
    setEmailError('');
    
    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
      return;
    }
    
    setCheckingEmail(true);
    
    try {
      // Check remaining tries via edge function
      const { data, error } = await supabase.functions.invoke('demo-transform', {
        body: {
          checkUsage: true,
          email: email.trim().toLowerCase(),
          experience: experience,
        },
      });
      
      if (error) throw error;
      
      if (data?.remainingTries !== undefined) {
        if (data.remainingTries <= 0) {
          setEmailError('You have used all your free tries for this experience. Contact us for more!');
          setRemainingTries(0);
        } else {
          setRemainingTries(data.remainingTries);
          setEmailSubmitted(true);
        }
      } else {
        // Fallback if no usage check response
        setRemainingTries(2);
        setEmailSubmitted(true);
      }
    } catch (error) {
      console.error('Email check error:', error);
      // Allow through on error, we'll check again on transform
      setRemainingTries(2);
      setEmailSubmitted(true);
    } finally {
      setCheckingEmail(false);
    }
  }, [email, experience]);

  const normalizeToJpeg = useCallback(async (dataUrl: string) => {
    // Downscale + convert to JPEG to avoid unsupported formats (e.g., HEIC) and huge images.
    const maxDim = 1280;

    return await new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;

          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas not supported'));

          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        } catch (e) {
          reject(e instanceof Error ? e : new Error('Failed to process image'));
        }
      };
      img.onerror = () => reject(new Error('Could not read this image. Try a different file.'));
      img.src = dataUrl;
    });
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      toast({
        title: 'Unsupported image type',
        description: 'Please upload a JPG, PNG, or WebP image.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({ title: 'Image too large. Please use an image under 10MB.', variant: 'destructive' });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const raw = e.target?.result as string;
        const normalized = await normalizeToJpeg(raw);
        setOriginalImage(normalized);
        setTransformedImage(null);
      } catch (err) {
        console.error('Image normalize error:', err);
        toast({
          title: 'Could not process image',
          description: err instanceof Error ? err.message : 'Please try a different photo.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsDataURL(file);
  }, [toast, normalizeToJpeg]);

  const startCamera = useCallback(async () => {
    try {
      // Check if mediaDevices is available (HTTPS required on most browsers)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({ 
          title: 'Camera not available', 
          description: 'Your browser does not support camera access. Try uploading a photo instead.',
          variant: 'destructive' 
        });
        return;
      }

      // Cross-platform camera constraints
      // iOS Safari requires specific constraints; Android/Windows more flexible
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Ensure video plays on iOS Safari (requires user interaction + playsinline)
        await videoRef.current.play().catch(() => {
          // Fallback: play will be triggered by user action
        });
      }
      setIsCameraOpen(true);
    } catch (error: any) {
      console.error('Camera error:', error);
      
      // Provide specific error messages based on error type
      let errorMessage = 'Please allow camera access to take a photo.';
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = 'Camera permission was denied. Please allow camera access in your browser settings.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera found. Please connect a camera or use the upload option.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage = 'Camera is in use by another app. Please close other camera apps and try again.';
      } else if (error.name === 'OverconstrainedError') {
        // Try again with simpler constraints
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: false 
          });
          streamRef.current = fallbackStream;
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            await videoRef.current.play().catch(() => {});
          }
          setIsCameraOpen(true);
          return;
        } catch {
          errorMessage = 'Camera settings not supported. Try uploading a photo instead.';
        }
      }
      
      toast({ 
        title: 'Camera access failed', 
        description: errorMessage,
        variant: 'destructive' 
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const maxDim = 1280;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const vw = video.videoWidth || 1280;
    const vh = video.videoHeight || 720;
    const scale = Math.min(1, maxDim / Math.max(vw, vh));

    canvas.width = Math.max(1, Math.round(vw * scale));
    canvas.height = Math.max(1, Math.round(vh * scale));

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setOriginalImage(imageData);
      setTransformedImage(null);
      stopCamera();
    }
  }, [stopCamera]);

  const transformImage = useCallback(async () => {
    if (!originalImage || !email) return;

    // Check if any tries remaining
    if (remainingTries !== null && remainingTries <= 0) {
      toast({
        title: 'No tries remaining',
        description: 'You have used all your free tries for this experience.',
        variant: 'destructive',
      });
      return;
    }

    setIsTransforming(true);
    try {
      const { data, error } = await supabase.functions.invoke('demo-transform', {
        body: {
          imageBase64: originalImage,
          experience: experience,
          email: email.trim().toLowerCase(),
        },
      });

      if (error) {
        // Try to surface the edge function's JSON error message (Supabase wraps non-2xx responses)
        let message = error.message || 'Transformation failed';
        const anyErr = error as any;
        try {
          const ctx = anyErr?.context;
          if (ctx && typeof ctx.json === 'function') {
            const body = await ctx.json();
            if (body?.error) message = body.error;
          }
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      if (data?.limitReached) {
        setRemainingTries(0);
        toast({
          title: 'Limit reached',
          description: 'You have used all your free tries. Contact us for more!',
          variant: 'destructive',
        });
        return;
      }

      if (data?.success && data?.imageUrl) {
        setTransformedImage(data.imageUrl);
        // Update remaining tries
        if (data.remainingTries !== undefined) {
          setRemainingTries(data.remainingTries);
        } else if (remainingTries !== null) {
          setRemainingTries(Math.max(0, remainingTries - 1));
        }
        toast({ title: '✨ Transformation complete!' });
      } else {
        throw new Error(data?.error || 'No image returned');
      }
    } catch (error) {
      console.error('Transform error:', error);
      toast({
        title: 'Transformation failed',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsTransforming(false);
    }
  }, [originalImage, experience, email, remainingTries, toast]);

  const downloadImage = useCallback(() => {
    if (!transformedImage) return;
    
    const link = document.createElement('a');
    link.href = transformedImage;
    link.download = `${experience}-transformation-${Date.now()}.jpg`;
    link.click();
    toast({ title: 'Image downloaded!' });
  }, [transformedImage, experience, toast]);

  const saveToGallery = useCallback(async () => {
    if (!originalImage || !transformedImage) return;

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({ 
        title: 'Sign in to save', 
        description: 'Create an account to save transformations to your gallery.',
        variant: 'destructive' 
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from('user_gallery').insert({
        user_id: user.id,
        experience_type: experience,
        original_image_url: originalImage,
        transformed_image_url: transformedImage,
        style_used: experience
      });

      if (error) throw error;
      toast({ title: 'Saved to your gallery! 🎉' });
    } catch (error) {
      console.error('Save error:', error);
      toast({ 
        title: 'Failed to save', 
        description: 'Please try again',
        variant: 'destructive' 
      });
    } finally {
      setIsSaving(false);
    }
  }, [originalImage, transformedImage, experience, toast]);

  const reset = useCallback(() => {
    setOriginalImage(null);
    setTransformedImage(null);
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [stopCamera]);

  return (
    <Card className="p-6 md:p-8 glass">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
          <Sparkles className="text-primary" size={24} />
          Try {experienceTitle} Free
        </h3>
        <p className="text-muted-foreground">{experienceDescription}</p>
      </div>

      {/* Email Gate */}
      {!emailSubmitted && (
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your email to unlock <strong>2 free transformations</strong>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="demo-email">Email Address</Label>
            <Input
              id="demo-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
              className={emailError ? 'border-destructive' : ''}
            />
            {emailError && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                {emailError}
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleEmailSubmit} 
            className="w-full btn-primary"
            disabled={!email.trim() || checkingEmail}
          >
            {checkingEmail ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Unlock Free Demo
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to receive occasional updates about our services.
          </p>
        </div>
      )}

      {/* Demo Content (after email submitted) */}
      {emailSubmitted && (
        <>
          {/* Remaining Tries Badge */}
          {remainingTries !== null && (
            <div className="flex justify-center mb-4">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                remainingTries > 0 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                <Sparkles className="w-4 h-4" />
                {remainingTries > 0 
                  ? `${remainingTries} free ${remainingTries === 1 ? 'try' : 'tries'} remaining`
                  : 'No tries remaining'
                }
              </div>
            </div>
          )}

          {/* Camera View */}
          {isCameraOpen && (
            <div className="relative mb-6">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full max-w-md mx-auto rounded-xl aspect-[3/4] object-cover bg-black"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="flex justify-center gap-4 mt-4">
                <Button onClick={capturePhoto} className="btn-primary">
                  <Camera size={20} className="mr-2" /> Capture Photo
                </Button>
                <Button variant="outline" onClick={stopCamera}>
                  <X size={20} className="mr-2" /> Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Upload/Camera Options */}
          {!isCameraOpen && !originalImage && remainingTries !== null && remainingTries > 0 && (
            <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                className="h-32 flex-col gap-2 border-dashed border-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={32} className="text-primary" />
                <span>Upload Photo</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-32 flex-col gap-2 border-dashed border-2"
                onClick={startCamera}
              >
                <Camera size={32} className="text-primary" />
                <span>Take Photo</span>
              </Button>
            </div>
          )}

          {/* No tries remaining message */}
          {remainingTries !== null && remainingTries <= 0 && !originalImage && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                You've used all your free tries for this experience.
              </p>
              <Button variant="outline" asChild>
                <a href="/contact">Contact Us for More</a>
              </Button>
            </div>
          )}

          {/* Image Display */}
          {originalImage && !isCameraOpen && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Original */}
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Original</p>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
                    <img 
                      src={originalImage} 
                      alt="Original photo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Transformed */}
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {isTransforming ? 'Transforming...' : transformedImage ? experienceTitle : 'Result'}
                  </p>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted relative">
                    {isTransforming ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                        <p className="text-foreground font-medium">AI is working its magic...</p>
                        <p className="text-sm text-muted-foreground">This usually takes 10-20 seconds</p>
                      </div>
                    ) : transformedImage ? (
                      <img 
                        src={transformedImage} 
                        alt={`${experienceTitle} transformation`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">Click Transform to see the magic!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                {!transformedImage && !isTransforming && remainingTries !== null && remainingTries > 0 && (
                  <Button onClick={transformImage} className="btn-primary">
                    <Sparkles size={18} className="mr-2" /> Transform Now
                  </Button>
                )}
                
                {transformedImage && (
                  <>
                    <Button onClick={downloadImage} variant="outline">
                      <Download size={18} className="mr-2" /> Download
                    </Button>
                    <Button onClick={saveToGallery} disabled={isSaving} className="btn-primary">
                      {isSaving ? (
                        <Loader2 size={18} className="mr-2 animate-spin" />
                      ) : (
                        <Save size={18} className="mr-2" />
                      )}
                      Save to Gallery
                    </Button>
                    {remainingTries !== null && remainingTries > 0 && (
                      <Button onClick={transformImage} variant="outline" disabled={isTransforming}>
                        <RefreshCw size={18} className="mr-2" /> Try Again
                      </Button>
                    )}
                  </>
                )}
                
                <Button variant="ghost" onClick={reset}>
                  <X size={18} className="mr-2" /> Start Over
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default ExperienceDemo;