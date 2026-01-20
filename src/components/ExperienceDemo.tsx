import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, Download, Save, Loader2, RefreshCw, X, Sparkles, Mail, AlertCircle, Check, VideoOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { cn } from '@/lib/utils';

// Import actual gallery images for thumbnails
import headshot1 from '@/assets/headshot-1.jpg';
import headshot2 from '@/assets/headshot-2.jpg';
import headshot3 from '@/assets/headshot-3.jpg';
import pixarStyle from '@/assets/persona-pop-3d-pixar-style-character.jpg';
import animeStyle from '@/assets/persona-pop-anime-style-transformation.jpg';
import superheroMale from '@/assets/persona-pop-superhero-transformation-male.jpg';
import vintage1920s from '@/assets/persona-pop-vintage-1920s-portrait.jpg';
import cyberpunkNeon from '@/assets/persona-pop-cyberpunk-neon-portrait.jpg';
import fantasyElf from '@/assets/persona-pop-fantasy-elf-warrior.jpg';
import renaissancePainting from '@/assets/persona-pop-renaissance-painting-portrait.jpg';
import popArtComic from '@/assets/persona-pop-pop-art-comic-style.jpg';
import golferTransformation from '@/assets/persona-pop-golfer-transformation.jpg';
import pixelwearNike from '@/assets/pixelwear-nike.jpg';
import pixelwearGucci from '@/assets/pixelwear-gucci.jpg';
import pixelwearCowboys from '@/assets/pixelwear-cowboys.jpg';
import pixelwearGiants from '@/assets/pixelwear-giants.jpg';
import pixelwearLV from '@/assets/pixelwear-lv.jpg';
import pixelwearSupreme from '@/assets/pixelwear-supreme.jpg';
import tradingCardMultiSport from '@/assets/ai-trading-cards-multi-sport-collection.jpg';
import tradingCardBaseball from '@/assets/ai-trading-cards-baseball-custom-portrait.jpg';
import tradingCardAthlete from '@/assets/ai-trading-cards-athlete-personalized-cards.jpg';
import tradingCardSportsDisplay from '@/assets/ai-trading-cards-sports-collectibles-display.jpg';
import coStarGuest1 from '@/assets/co-star-guest-1.jpg';
import coStarGuest2 from '@/assets/co-star-guest-2.jpg';
import coStarGuest4 from '@/assets/co-star-guest-4.jpg';
import coStarGuest5 from '@/assets/co-star-guest-5.jpg';
import coStarGuest6 from '@/assets/co-star-guest-6.jpg';
import neoCyberpunk from '@/assets/ai-photo-booth-neo-cyberpunk-style.jpg';
import cowboyWestern from '@/assets/ai-photo-booth-cowboy-western-portrait.jpg';
import graffitiArt from '@/assets/ai-photo-booth-graffiti-street-art-portrait.jpg';
import axonRobot from '@/assets/axon-ai-robot.png';
import neoFuturistic from '@/assets/ai-photo-booth-neo-futuristic-portrait.jpg';
import sketchPencil from '@/assets/sketch-guest-after-1.jpg';
import sketchCharcoal from '@/assets/sketch-guest-charcoal-1.jpg';
import sketchWatercolor from '@/assets/sketch-guest-watercolor-3.jpg';

// Filter/style options by experience type
export interface FilterOption {
  id: string;
  label: string;
  thumbnail: string;
  prompt: string;
}

interface ExperienceDemoProps {
  experience: string;
  experienceTitle: string;
  experienceDescription: string;
  accentColor?: string;
  filters?: FilterOption[];
}

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" });

// Default filters for each experience type with real gallery thumbnails
const DEFAULT_FILTERS: Record<string, FilterOption[]> = {
  headshots: [
    { id: 'professional', label: 'Corporate Pro', thumbnail: headshot1, prompt: 'Transform this into a professional corporate headshot with clean studio lighting, neutral gradient background, professional color grading, subtle skin retouching, and executive portrait style.' },
    { id: 'linkedin', label: 'LinkedIn Ready', thumbnail: headshot2, prompt: 'Create a LinkedIn-optimized professional headshot with perfect dimensions, warm professional lighting, clean background, and approachable confident expression.' },
    { id: 'creative', label: 'Creative Director', thumbnail: headshot3, prompt: 'Transform into a creative professional headshot with artistic lighting, slight color grading, modern aesthetic, and creative industry vibe.' },
  ],
  'persona-pop': [
    { id: 'pixar', label: '3D Pixar', thumbnail: pixarStyle, prompt: 'Transform this person into a fun Pixar/Disney 3D animated character style. Exaggerated features, colorful cartoon aesthetic, soft lighting, playful expression while maintaining likeness.' },
    { id: 'anime', label: 'Anime Style', thumbnail: animeStyle, prompt: 'Transform this person into anime/manga art style with expressive eyes, stylized features, dynamic pose, vibrant colors while maintaining their likeness.' },
    { id: 'superhero', label: 'Superhero', thumbnail: superheroMale, prompt: 'Transform this person into a superhero character with costume, cape, dramatic lighting, heroic pose, and comic book aesthetic while maintaining their likeness.' },
    { id: 'vintage', label: '1920s Vintage', thumbnail: vintage1920s, prompt: 'Transform this into a vintage 1920s portrait with art deco styling, gatsby era glamour, sepia tones, classic portrait lighting while maintaining likeness.' },
    { id: 'cyberpunk', label: 'Cyberpunk', thumbnail: cyberpunkNeon, prompt: 'Transform into cyberpunk style with neon lights, futuristic visor, tech implants, dystopian city backdrop while maintaining likeness.' },
    { id: 'fantasy', label: 'Fantasy Elf', thumbnail: fantasyElf, prompt: 'Transform into a fantasy elf warrior with pointed ears, Celtic armor, magical glowing eyes, ethereal forest backdrop while maintaining likeness.' },
    { id: 'renaissance', label: 'Renaissance', thumbnail: renaissancePainting, prompt: 'Transform this into a Renaissance oil painting portrait with baroque dress, dramatic chiaroscuro lighting, classical composition, and museum-quality fine art aesthetic while maintaining likeness.' },
    { id: 'popart', label: 'Pop Art', thumbnail: popArtComic, prompt: 'Transform into bold pop art comic book style with halftone dots, bright primary colors, speech bubbles, Ben-Day dots pattern, and Andy Warhol inspired aesthetic while maintaining likeness.' },
    { id: 'golfer', label: 'Pro Golfer', thumbnail: golferTransformation, prompt: 'Transform this person into a professional golfer on a pristine golf course with country club attire, golf clubs, scenic fairway backdrop, and sports photography style while maintaining likeness.' },
  ],
  pixelwear: [
    { id: 'nike', label: 'Nike Athletics', thumbnail: pixelwearNike, prompt: 'Transform this person wearing premium Nike athletic apparel including a sleek Nike jacket/jersey. Keep the face and background intact but make it look like they are wearing high-end Nike sportswear.' },
    { id: 'gucci', label: 'Gucci Luxury', thumbnail: pixelwearGucci, prompt: 'Transform this person wearing luxury Gucci fashion items including a designer jacket or shirt with Gucci patterns. Keep face intact and make it look like authentic high-fashion photography.' },
    { id: 'cowboys', label: 'Dallas Cowboys', thumbnail: pixelwearCowboys, prompt: 'Transform this person wearing an official Dallas Cowboys NFL jersey with team colors and logo. Stadium backdrop, sports photography style while keeping face intact.' },
    { id: 'giants', label: 'NY Giants', thumbnail: pixelwearGiants, prompt: 'Transform this person wearing an official New York Giants NFL jersey with team colors. Professional sports photography style while keeping face and likeness intact.' },
    { id: 'lv', label: 'Louis Vuitton', thumbnail: pixelwearLV, prompt: 'Transform this person wearing luxury Louis Vuitton fashion with the iconic LV monogram pattern. High-fashion editorial style while keeping face intact.' },
    { id: 'supreme', label: 'Supreme Street', thumbnail: pixelwearSupreme, prompt: 'Transform this person wearing Supreme streetwear with the iconic box logo. Urban street style photography while keeping face and likeness intact.' },
  ],
  'trading-cards': [
    { id: 'baseball', label: 'Baseball Star', thumbnail: tradingCardBaseball, prompt: 'Transform this image into a professional baseball trading card style with player in uniform, stadium backdrop, stats overlay frame, glossy card finish, and bold typography.' },
    { id: 'basketball', label: 'Basketball MVP', thumbnail: tradingCardMultiSport, prompt: 'Transform this image into a basketball trading card with player in jersey, arena lighting, dynamic pose, stats overlay, holographic card effects.' },
    { id: 'football', label: 'Football Legend', thumbnail: tradingCardAthlete, prompt: 'Transform this image into an NFL football trading card with player in full gear, stadium atmosphere, dramatic lighting, collectible card frame and finish.' },
    { id: 'soccer', label: 'Soccer Champion', thumbnail: tradingCardSportsDisplay, prompt: 'Transform this image into a professional soccer/football trading card with player in kit, pitch backdrop, international style card design with stats.' },
  ],
  'co-star': [
    { id: 'redcarpet', label: 'Red Carpet', thumbnail: coStarGuest1, prompt: 'Transform this image to place the person on a Hollywood red carpet premiere with paparazzi flashes, velvet ropes, glamorous lighting, movie poster backdrop.' },
    { id: 'talkshow', label: 'Talk Show Guest', thumbnail: coStarGuest5, prompt: 'Transform this image to place the person on a late-night talk show set with interview chair, desk, city skyline backdrop, studio lighting.' },
    { id: 'musicawards', label: 'Music Awards', thumbnail: coStarGuest4, prompt: 'Transform this image to place the person at a glamorous music awards show with stage lighting, trophy backdrop, celebrity event atmosphere.' },
    { id: 'sportslegend', label: 'Sports Arena', thumbnail: coStarGuest6, prompt: 'Transform this image to place the person in a professional sports arena with stadium lights, crowd atmosphere, championship celebration vibe.' },
  ],
  'video-booths': [
    { id: 'neon', label: 'Neon Lights', thumbnail: neoCyberpunk, prompt: 'Transform this into a dynamic shot with colorful neon lights, cyberpunk aesthetic, futuristic overlays, and dramatic visual effects that suggest energy and movement.' },
    { id: 'action', label: 'Action Hero', thumbnail: cowboyWestern, prompt: 'Transform this into a dynamic action shot with motion blur effects, dramatic lighting, explosion effects, and cinematic movie poster style.' },
    { id: 'graffiti', label: 'Street Art', thumbnail: graffitiArt, prompt: 'Transform this into a vibrant street art scene with graffiti walls, urban backdrop, spray paint effects, and hip-hop culture aesthetic.' },
  ],
  'axon-ai': [
    { id: 'robot', label: 'AI Companion', thumbnail: axonRobot, prompt: 'Transform this to include an AI robot companion standing beside the person with holographic displays, sleek robotic elements, and sci-fi technology aesthetic.' },
    { id: 'neural', label: 'Neural Network', thumbnail: neoFuturistic, prompt: 'Transform this to show neural network visualizations overlaid on the portrait, with glowing synaptic connections, data streams, and brain-computer interface aesthetic.' },
    { id: 'hologram', label: 'Holographic', thumbnail: neoCyberpunk, prompt: 'Transform this into a holographic projection style with blue translucent effect, scan lines, futuristic interface elements, and sci-fi hologram aesthetic.' },
  ],
  identity: [
    { id: 'pencil', label: 'Pencil Sketch', thumbnail: sketchPencil, prompt: 'Transform this into a classic pencil sketch portrait with delicate line work, shading, artistic hand-drawn quality while maintaining likeness.' },
    { id: 'charcoal', label: 'Charcoal Art', thumbnail: sketchCharcoal, prompt: 'Transform this into a dramatic charcoal portrait with deep shadows, bold strokes, artistic texture, and fine art gallery quality.' },
    { id: 'watercolor', label: 'Watercolor', thumbnail: sketchWatercolor, prompt: 'Transform this into a vibrant watercolor portrait with soft color washes, artistic bleeding effects, and elegant painterly style.' },
  ],
};

const ExperienceDemo = ({ 
  experience, 
  experienceTitle, 
  experienceDescription,
  accentColor = 'primary',
  filters: customFilters
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
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  
  // Filter selection state
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(null);
  const availableFilters = customFilters || DEFAULT_FILTERS[experience.toLowerCase()] || [];
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mountedRef = useRef(true);
  
  const { toast } = useToast();

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Set default filter on mount
  useEffect(() => {
    if (availableFilters.length > 0 && !selectedFilter) {
      setSelectedFilter(availableFilters[0]);
    }
  }, [availableFilters, selectedFilter]);

  const handleEmailSubmit = useCallback(async () => {
    setEmailError('');
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
      return;
    }
    
    setCheckingEmail(true);
    
    try {
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
        setRemainingTries(2);
        setEmailSubmitted(true);
      }
    } catch (error) {
      console.error('Email check error:', error);
      setRemainingTries(2);
      setEmailSubmitted(true);
    } finally {
      setCheckingEmail(false);
    }
  }, [email, experience]);

  const normalizeToJpeg = useCallback(async (dataUrl: string) => {
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

  const checkCameraSupport = useCallback((): { supported: boolean; error?: string } => {
    // Check if we're in a secure context (HTTPS or localhost)
    if (!window.isSecureContext) {
      return { 
        supported: false, 
        error: 'Camera requires a secure connection (HTTPS). Please access this page via HTTPS.' 
      };
    }

    // Check if mediaDevices API is available
    if (!navigator.mediaDevices) {
      return { 
        supported: false, 
        error: 'Your browser does not support camera access. Please try Chrome, Safari, or Firefox.' 
      };
    }

    if (!navigator.mediaDevices.getUserMedia) {
      return { 
        supported: false, 
        error: 'Camera API not available in this browser. Please try a different browser.' 
      };
    }

    return { supported: true };
  }, []);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setCameraLoading(true);

    // First check if camera is supported
    const support = checkCameraSupport();
    if (!support.supported) {
      setCameraError(support.error || 'Camera not supported');
      setCameraLoading(false);
      toast({ 
        title: 'Camera not available', 
        description: support.error,
        variant: 'destructive' 
      });
      return;
    }

    // Try with ideal constraints first, then fallback to simpler ones
    const constraintSets: MediaStreamConstraints[] = [
      // Attempt 1: Ideal constraints
      {
        video: {
          facingMode: 'user',
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
        audio: false,
      },
      // Attempt 2: Simplified constraints with environment fallback
      {
        video: {
          facingMode: { ideal: 'user' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      },
      // Attempt 3: Minimal constraints
      {
        video: {
          facingMode: 'user',
        },
        audio: false,
      },
      // Attempt 4: Any video
      {
        video: true,
        audio: false,
      },
    ];

    let lastError: Error | null = null;

    for (const constraints of constraintSets) {
      try {
        console.log('Attempting camera with constraints:', JSON.stringify(constraints));
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (!mountedRef.current) {
          // Component unmounted during async operation
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          // Wait for video to be ready
          await new Promise<void>((resolve, reject) => {
            const video = videoRef.current!;
            const timeout = setTimeout(() => reject(new Error('Video load timeout')), 5000);
            
            video.onloadedmetadata = () => {
              clearTimeout(timeout);
              video.play()
                .then(() => resolve())
                .catch(() => resolve()); // Ignore play errors, will be triggered by user
            };
            
            video.onerror = () => {
              clearTimeout(timeout);
              reject(new Error('Video element error'));
            };
          });
        }
        
        setCameraLoading(false);
        setIsCameraOpen(true);
        console.log('Camera started successfully');
        return; // Success!
        
      } catch (error: any) {
        console.warn('Camera attempt failed:', error.name, error.message);
        lastError = error;
        
        // If permission denied, don't try other constraints
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          break;
        }
      }
    }

    // All attempts failed
    setCameraLoading(false);
    
    let errorMessage = 'Could not access camera. Please try uploading a photo instead.';
    
    if (lastError) {
      if (lastError.name === 'NotAllowedError' || lastError.name === 'PermissionDeniedError') {
        errorMessage = 'Camera permission denied. Please allow camera access in your browser settings and refresh the page.';
      } else if (lastError.name === 'NotFoundError' || lastError.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera found on this device. Please connect a camera or use the upload option.';
      } else if (lastError.name === 'NotReadableError' || lastError.name === 'TrackStartError') {
        errorMessage = 'Camera is being used by another application. Please close other apps using the camera and try again.';
      } else if (lastError.name === 'AbortError') {
        errorMessage = 'Camera access was interrupted. Please try again.';
      }
    }
    
    setCameraError(errorMessage);
    toast({ 
      title: 'Camera Error', 
      description: errorMessage,
      variant: 'destructive' 
    });
  }, [toast, checkCameraSupport]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped track:', track.kind);
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
    setCameraError(null);
    setCameraLoading(false);
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) {
      toast({ title: 'Camera not ready', description: 'Please wait for camera to initialize.', variant: 'destructive' });
      return;
    }

    const video = videoRef.current;
    
    // Check if video has valid dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      toast({ title: 'Camera not ready', description: 'Video stream not loaded. Please try again.', variant: 'destructive' });
      return;
    }

    const maxDim = 1280;
    const canvas = canvasRef.current;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const scale = Math.min(1, maxDim / Math.max(vw, vh));

    canvas.width = Math.max(1, Math.round(vw * scale));
    canvas.height = Math.max(1, Math.round(vh * scale));

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Mirror the image for selfie camera
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();
      
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setOriginalImage(imageData);
      setTransformedImage(null);
      stopCamera();
      
      toast({ title: '📸 Photo captured!' });
    }
  }, [stopCamera, toast]);

  const transformImage = useCallback(async () => {
    if (!originalImage || !email) return;

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
      // Use selected filter's prompt if available, otherwise use default experience prompt
      const customPrompt = selectedFilter?.prompt || undefined;

      const { data, error } = await supabase.functions.invoke('demo-transform', {
        body: {
          imageBase64: originalImage,
          experience: experience,
          email: email.trim().toLowerCase(),
          customPrompt: customPrompt,
        },
      });

      if (error) {
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
  }, [originalImage, experience, email, remainingTries, selectedFilter, toast]);

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
        style_used: selectedFilter?.label || experience,
        custom_prompt: selectedFilter?.prompt || null,
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
  }, [originalImage, transformedImage, experience, selectedFilter, toast]);

  const reset = useCallback(() => {
    setOriginalImage(null);
    setTransformedImage(null);
    stopCamera();
    setCameraError(null);
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

          {/* Filter Selection */}
          {availableFilters.length > 0 && !originalImage && remainingTries !== null && remainingTries > 0 && (
            <div className="mb-6">
              <Label className="block mb-3 text-center">Choose Your Style</Label>
              <div className="flex flex-wrap justify-center gap-3">
                {availableFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter)}
                    className={cn(
                      "relative flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-200",
                      "hover:border-primary/50 hover:bg-primary/5",
                      selectedFilter?.id === filter.id 
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20" 
                        : "border-border"
                    )}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={filter.thumbnail} 
                        alt={filter.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs mt-2 font-medium text-center max-w-[5rem] truncate">
                      {filter.label}
                    </span>
                    {selectedFilter?.id === filter.id && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
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
                className="w-full max-w-md mx-auto rounded-xl aspect-[3/4] object-cover bg-black transform scale-x-[-1]"
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

          {/* Camera Loading */}
          {cameraLoading && !isCameraOpen && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Starting camera...</p>
              <p className="text-xs text-muted-foreground mt-2">Please allow camera access when prompted</p>
            </div>
          )}

          {/* Camera Error State */}
          {cameraError && !isCameraOpen && !cameraLoading && !originalImage && (
            <div className="text-center py-6 mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                <VideoOff className="w-8 h-8 text-destructive" />
              </div>
              <p className="text-destructive text-sm mb-4 max-w-md mx-auto">{cameraError}</p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => { setCameraError(null); startCamera(); }}>
                  <RefreshCw size={18} className="mr-2" /> Retry Camera
                </Button>
                <Button onClick={() => { setCameraError(null); fileInputRef.current?.click(); }}>
                  <Upload size={18} className="mr-2" /> Upload Instead
                </Button>
              </div>
            </div>
          )}

          {/* Upload/Camera Options */}
          {!isCameraOpen && !originalImage && !cameraError && !cameraLoading && remainingTries !== null && remainingTries > 0 && (
            <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="user"
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
              {/* Selected filter indicator */}
              {selectedFilter && (
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    <Sparkles className="w-4 h-4" />
                    Style: {selectedFilter.label}
                  </span>
                </div>
              )}
              
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
                    {isTransforming ? 'Transforming...' : transformedImage ? selectedFilter?.label || experienceTitle : 'Result'}
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
