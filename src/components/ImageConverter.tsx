import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download, Image as ImageIcon, Zap, CheckCircle2 } from 'lucide-react';
import { useImageConverter } from '@/hooks/useImageConverter';
import { toast } from 'sonner';

interface ImageConverterProps {
  initialImageUrl?: string;
  onConverted?: (optimizedUrl: string) => void;
}

const ImageConverter = ({ initialImageUrl = '', onConverted }: ImageConverterProps) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1200);
  const [format, setFormat] = useState<'webp' | 'jpeg' | 'png'>('webp');
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [optimizedPreview, setOptimizedPreview] = useState<string | null>(null);
  
  const { convertImage, isConverting, error } = useImageConverter();

  const handleConvert = async () => {
    if (!imageUrl.trim()) {
      toast.error('Please enter an image URL');
      return;
    }

    setOriginalPreview(imageUrl);
    setOptimizedPreview(null);

    const result = await convertImage(imageUrl, { quality, maxWidth, format });
    
    if (result) {
      setOptimizedPreview(result);
      onConverted?.(result);
      toast.success('Image converted successfully!');
    } else {
      toast.error(error || 'Failed to convert image');
    }
  };

  const handleDownload = () => {
    if (!optimizedPreview) return;
    
    const link = document.createElement('a');
    link.href = optimizedPreview;
    link.download = `optimized-image.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Image Converter
        </CardTitle>
        <CardDescription>
          Convert and optimize images for faster loading. Supports WebP, JPEG, and PNG formats.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image URL Input */}
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Format */}
          <div className="space-y-2">
            <Label>Output Format</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as typeof format)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="webp">WebP (Best compression)</SelectItem>
                <SelectItem value="jpeg">JPEG (Universal)</SelectItem>
                <SelectItem value="png">PNG (Lossless)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quality */}
          <div className="space-y-2">
            <Label>Quality: {quality}%</Label>
            <Slider
              value={[quality]}
              onValueChange={([v]) => setQuality(v)}
              min={10}
              max={100}
              step={5}
              className="mt-2"
            />
          </div>

          {/* Max Width */}
          <div className="space-y-2">
            <Label>Max Width: {maxWidth}px</Label>
            <Slider
              value={[maxWidth]}
              onValueChange={([v]) => setMaxWidth(v)}
              min={200}
              max={2000}
              step={100}
              className="mt-2"
            />
          </div>
        </div>

        {/* Convert Button */}
        <Button 
          onClick={handleConvert} 
          disabled={isConverting || !imageUrl.trim()}
          className="w-full"
        >
          {isConverting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Convert Image
            </>
          )}
        </Button>

        {/* Preview Comparison */}
        {(originalPreview || optimizedPreview) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Conversion Complete
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original */}
              {originalPreview && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Original</Label>
                  <div className="border rounded-lg overflow-hidden bg-muted/50 aspect-video flex items-center justify-center">
                    <img 
                      src={originalPreview} 
                      alt="Original" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Optimized */}
              {optimizedPreview && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Optimized ({format.toUpperCase()})</Label>
                  <div className="border rounded-lg overflow-hidden bg-muted/50 aspect-video flex items-center justify-center">
                    <img 
                      src={optimizedPreview} 
                      alt="Optimized" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Download Button */}
            {optimizedPreview && (
              <Button onClick={handleDownload} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Optimized Image
              </Button>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="text-sm text-destructive bg-destructive/5 p-3 rounded-lg border border-destructive/20">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageConverter;
