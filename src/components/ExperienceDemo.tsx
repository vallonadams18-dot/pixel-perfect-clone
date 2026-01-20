import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Download, Save, Loader2, RefreshCw, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ExperienceDemoProps {
  experience: string;
  experienceTitle: string;
  experienceDescription: string;
  accentColor?: string;
}

const ExperienceDemo = ({ 
  experience, 
  experienceTitle, 
  experienceDescription,
  accentColor = 'primary'
}: ExperienceDemoProps) => {
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

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Please upload an image file', variant: 'destructive' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({ title: 'Image too large. Please use an image under 10MB.', variant: 'destructive' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setTransformedImage(null);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Camera error:', error);
      toast({ 
        title: 'Camera access denied', 
        description: 'Please allow camera access to take a photo.',
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

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setOriginalImage(imageData);
      setTransformedImage(null);
      stopCamera();
    }
  }, [stopCamera]);

  const transformImage = useCallback(async () => {
    if (!originalImage) return;

    setIsTransforming(true);
    try {
      const response = await supabase.functions.invoke('demo-transform', {
        body: {
          imageBase64: originalImage,
          experience: experience
        }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Transformation failed');
      }

      if (response.data?.success && response.data?.imageUrl) {
        setTransformedImage(response.data.imageUrl);
        toast({ title: '✨ Transformation complete!' });
      } else {
        throw new Error(response.data?.error || 'No image returned');
      }
    } catch (error) {
      console.error('Transform error:', error);
      toast({ 
        title: 'Transformation failed', 
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive' 
      });
    } finally {
      setIsTransforming(false);
    }
  }, [originalImage, experience, toast]);

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
      {!isCameraOpen && !originalImage && (
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
            {!transformedImage && !isTransforming && (
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
                <Button onClick={transformImage} variant="outline" disabled={isTransforming}>
                  <RefreshCw size={18} className="mr-2" /> Try Again
                </Button>
              </>
            )}
            
            <Button variant="ghost" onClick={reset}>
              <X size={18} className="mr-2" /> Start Over
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExperienceDemo;