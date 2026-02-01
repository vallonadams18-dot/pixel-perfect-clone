import { useState } from 'react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Loader2, CheckCircle, Package, SplitSquareHorizontal } from 'lucide-react';

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

// Max size per ZIP in bytes (8MB to be safe for most WordPress hosts)
const MAX_ZIP_SIZE_MB = 8;
const MAX_ZIP_SIZE_BYTES = MAX_ZIP_SIZE_MB * 1024 * 1024;

interface FileData {
  path: string;
  blob: Blob;
  folder: 'public' | 'src-assets';
}

const AssetExportPage = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [completed, setCompleted] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<{ name: string; url: string; size: string }[]>([]);

  const createBatchedZips = async (files: FileData[]): Promise<{ name: string; blob: Blob }[]> => {
    const zips: { name: string; blob: Blob }[] = [];
    let currentZip = new JSZip();
    let currentZipPublic = currentZip.folder('public');
    let currentZipAssets = currentZip.folder('src-assets');
    let currentSize = 0;
    let batchNumber = 1;

    for (const file of files) {
      // If adding this file would exceed limit, finalize current ZIP
      if (currentSize + file.blob.size > MAX_ZIP_SIZE_BYTES && currentSize > 0) {
        setStatus(`Creating batch ${batchNumber}...`);
        const content = await currentZip.generateAsync({ 
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 }
        });
        zips.push({ name: `pixelaipro-assets-part${batchNumber}.zip`, blob: content });
        
        // Start new ZIP
        batchNumber++;
        currentZip = new JSZip();
        currentZipPublic = currentZip.folder('public');
        currentZipAssets = currentZip.folder('src-assets');
        currentSize = 0;
      }

      // Add file to current ZIP
      if (file.folder === 'public') {
        currentZipPublic?.file(file.path, file.blob);
      } else {
        currentZipAssets?.file(file.path, file.blob);
      }
      currentSize += file.blob.size;
    }

    // Finalize last ZIP if it has content
    if (currentSize > 0) {
      setStatus(`Creating batch ${batchNumber}...`);
      const content = await currentZip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      zips.push({ name: `pixelaipro-assets-part${batchNumber}.zip`, blob: content });
    }

    return zips;
  };

  const handleExport = async (batched: boolean = false) => {
    setIsExporting(true);
    setProgress(0);
    setCompleted(false);
    setDownloadLinks([]);
    
    const allFiles: FileData[] = [];
    
    // Get all src asset URLs
    const srcAssets = Object.entries(srcAssetModules).map(([path, url]) => ({
      path: path.replace('/src/assets/', ''),
      url: url as string,
    }));
    
    const totalFiles = publicAssets.length + srcAssets.length;
    let processedFiles = 0;
    
    // Fetch public assets
    setStatus('Downloading public assets...');
    for (const asset of publicAssets) {
      try {
        const response = await fetch(asset);
        if (response.ok) {
          const blob = await response.blob();
          const fileName = asset.startsWith('/images/') 
            ? asset.replace('/images/', '') 
            : asset.replace('/', '');
          allFiles.push({ path: fileName, blob, folder: 'public' });
        }
      } catch (error) {
        console.warn(`Failed to fetch ${asset}:`, error);
      }
      processedFiles++;
      setProgress(Math.round((processedFiles / totalFiles) * 50));
    }
    
    // Fetch src assets
    setStatus('Downloading src assets...');
    for (const { path, url } of srcAssets) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const blob = await response.blob();
          allFiles.push({ path, blob, folder: 'src-assets' });
        }
      } catch (error) {
        console.warn(`Failed to fetch ${path}:`, error);
      }
      processedFiles++;
      setProgress(Math.round((processedFiles / totalFiles) * 50));
    }

    if (batched) {
      // Create batched ZIPs under 8MB each
      setStatus('Creating batched ZIP files...');
      const zips = await createBatchedZips(allFiles);
      
      const links: { name: string; url: string; size: string }[] = [];
      for (const { name, blob } of zips) {
        const url = URL.createObjectURL(blob);
        const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
        links.push({ name, url, size: `${sizeMB} MB` });
      }
      
      setDownloadLinks(links);
      setStatus(`Created ${zips.length} ZIP files (each under ${MAX_ZIP_SIZE_MB}MB)`);
    } else {
      // Single ZIP
      const zip = new JSZip();
      const publicFolder = zip.folder('public');
      const assetsFolder = zip.folder('src-assets');
      
      for (const file of allFiles) {
        if (file.folder === 'public') {
          publicFolder?.file(file.path, file.blob);
        } else {
          assetsFolder?.file(file.path, file.blob);
        }
      }
      
      setStatus('Generating ZIP file...');
      const content = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      }, (metadata) => {
        setProgress(50 + Math.round(metadata.percent / 2));
      });
      
      const sizeMB = (content.size / (1024 * 1024)).toFixed(2);
      setStatus(`ZIP created: ${sizeMB} MB`);
      
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pixelaipro-assets.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    
    setProgress(100);
    setIsExporting(false);
    setCompleted(true);
  };

  const downloadFile = (url: string, name: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <Package className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-2xl font-bold">Asset Export</h1>
          <p className="text-muted-foreground">
            Download all website images and assets for WordPress migration.
          </p>
        </div>
        
        {isExporting && (
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{status}</p>
          </div>
        )}
        
        {completed && downloadLinks.length === 0 && (
          <div className="flex items-center justify-center gap-2 text-primary">
            <CheckCircle className="w-5 h-5" />
            <span>Download complete!</span>
          </div>
        )}

        {downloadLinks.length > 0 && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium text-foreground">
              Download each file and upload to WordPress one at a time:
            </p>
            {downloadLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-between"
                onClick={() => downloadFile(link.url, link.name)}
              >
                <span>{link.name}</span>
                <span className="text-muted-foreground">{link.size}</span>
              </Button>
            ))}
          </div>
        )}
        
        <div className="space-y-3">
          <Button
            onClick={() => handleExport(true)}
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
                <SplitSquareHorizontal className="w-4 h-4 mr-2" />
                Download as Split ZIPs (under 8MB each)
              </>
            )}
          </Button>
          
          <Button
            onClick={() => handleExport(false)}
            disabled={isExporting}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download as Single ZIP
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-2">
          <p><strong>Recommended:</strong> Use "Split ZIPs" for WordPress upload.</p>
          <p>Each file stays under 8MB to work with most WordPress hosts.</p>
        </div>
      </div>
    </div>
  );
};

export default AssetExportPage;
