import { useState } from 'react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Loader2, CheckCircle, Package } from 'lucide-react';

// All public assets to export
const publicAssets = [
  '/favicon.ico',
  '/favicon.png',
  '/og-image.jpg',
  '/og-ai-trading-cards.jpg',
  '/og-ai-video-booths.jpg',
  '/og-axon-ai.jpg',
  '/og-co-star.jpg',
  '/og-headshots.jpg',
  '/og-identity.jpg',
  '/og-persona-pop.jpg',
  '/og-pixelwear.jpg',
  '/placeholder.svg',
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap-blog.xml',
  '/sitemap-images.xml',
  '/sitemap-pages.xml',
  // PixelWear images
  '/images/pixelwear/pixelwear-before.jpg',
  '/images/pixelwear/pixelwear-cowboys-before.jpg',
  '/images/pixelwear/pixelwear-cowboys.jpg',
  '/images/pixelwear/pixelwear-giants-before.jpg',
  '/images/pixelwear/pixelwear-giants.jpg',
  '/images/pixelwear/pixelwear-gucci-before.jpg',
  '/images/pixelwear/pixelwear-gucci.jpg',
  '/images/pixelwear/pixelwear-lv-before.jpg',
  '/images/pixelwear/pixelwear-lv.jpg',
  '/images/pixelwear/pixelwear-nike-before.jpg',
  '/images/pixelwear/pixelwear-nike.jpg',
  '/images/pixelwear/pixelwear-puma-before.jpg',
  '/images/pixelwear/pixelwear-puma.jpg',
  '/images/pixelwear/pixelwear-sports-jersey.jpg',
  '/images/pixelwear/pixelwear-supreme-before.jpg',
  '/images/pixelwear/pixelwear-supreme.jpg',
  '/images/pixelwear/pixelwear-versace-before.jpg',
  '/images/pixelwear/pixelwear-versace.jpg',
];

// Import all src/assets images
const srcAssetModules = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png,svg,webp}', { eager: true, as: 'url' });

const AssetExportPage = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    setProgress(0);
    setCompleted(false);
    
    const zip = new JSZip();
    const publicFolder = zip.folder('public');
    const assetsFolder = zip.folder('src-assets');
    
    // Get all src asset URLs
    const srcAssets = Object.entries(srcAssetModules).map(([path, url]) => ({
      path: path.replace('/src/assets/', ''),
      url: url as string,
    }));
    
    const totalFiles = publicAssets.length + srcAssets.length;
    let processedFiles = 0;
    
    // Fetch and add public assets
    setStatus('Downloading public assets...');
    for (const asset of publicAssets) {
      try {
        const response = await fetch(asset);
        if (response.ok) {
          const blob = await response.blob();
          const fileName = asset.startsWith('/images/') 
            ? asset.replace('/images/', '') 
            : asset.replace('/', '');
          publicFolder?.file(fileName, blob);
        }
      } catch (error) {
        console.warn(`Failed to fetch ${asset}:`, error);
      }
      processedFiles++;
      setProgress(Math.round((processedFiles / totalFiles) * 100));
    }
    
    // Add src assets
    setStatus('Downloading src assets...');
    for (const { path, url } of srcAssets) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const blob = await response.blob();
          assetsFolder?.file(path, blob);
        }
      } catch (error) {
        console.warn(`Failed to fetch ${path}:`, error);
      }
      processedFiles++;
      setProgress(Math.round((processedFiles / totalFiles) * 100));
    }
    
    // Generate ZIP
    setStatus('Generating ZIP file...');
    const content = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    }, (metadata) => {
      setProgress(Math.round(metadata.percent));
    });
    
    // Check size
    const sizeMB = (content.size / (1024 * 1024)).toFixed(2);
    setStatus(`ZIP created: ${sizeMB} MB`);
    
    // Download
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pixelaipro-assets.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <Package className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-2xl font-bold">Asset Export</h1>
          <p className="text-muted-foreground">
            Download all website images and assets as a ZIP file for WordPress migration.
          </p>
        </div>
        
        {isExporting && (
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{status}</p>
          </div>
        )}
        
        {completed && (
          <div className="flex items-center justify-center gap-2 text-primary">
            <CheckCircle className="w-5 h-5" />
            <span>Download complete!</span>
          </div>
        )}
        
        <Button
          onClick={handleExport}
          disabled={isExporting}
          size="lg"
          className="w-full"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting... {progress}%
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download All Assets (ZIP)
            </>
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Includes: OG images, logos, portfolio images, experience photos, and all media assets.
        </p>
      </div>
    </div>
  );
};

export default AssetExportPage;
