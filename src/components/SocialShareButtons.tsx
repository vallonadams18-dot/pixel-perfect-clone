import { Linkedin, Twitter, Facebook, Link2, Instagram } from 'lucide-react';
import { useState } from 'react';

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
  imageUrl?: string;
}

const SocialShareButtons = ({ title, url, description, imageUrl }: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [instagramTooltip, setInstagramTooltip] = useState(false);
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400,noopener,noreferrer');
  };

  const handleInstagramShare = async () => {
    // Check if we're on mobile and Web Share API is available
    if (navigator.share && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      try {
        const shareData: ShareData = {
          title: title,
          text: `${title}\n${description || ''}\n`,
          url: shareUrl,
        };
        
        // If we have an image URL, try to share with files (for Stories)
        if (imageUrl) {
          try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'share-image.jpg', { type: 'image/jpeg' });
            
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              shareData.files = [file];
            }
          } catch (e) {
            console.log('Could not attach image, sharing without it');
          }
        }
        
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      // On desktop, show tooltip with instructions
      setInstagramTooltip(true);
      setTimeout(() => setInstagramTooltip(false), 3000);
    }
  };

  return (
    <div className="border-t border-border/30 pt-8 mt-12">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-muted-foreground">Share this article:</span>
        
        <button
          onClick={() => handleShare('linkedin')}
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors group"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
        
        <button
          onClick={() => handleShare('twitter')}
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors group"
          aria-label="Share on X (Twitter)"
        >
          <Twitter size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
        
        <button
          onClick={() => handleShare('facebook')}
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors group"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
        
        <button
          onClick={handleInstagramShare}
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors group relative"
          aria-label="Share to Instagram Stories"
        >
          <Instagram size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
          {instagramTooltip && (
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-xs text-primary bg-background/90 px-3 py-2 rounded whitespace-nowrap shadow-lg border border-border/30">
              Open on mobile to share to Stories
            </span>
          )}
        </button>

        <button
          onClick={handleCopyLink}
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors group relative"
          aria-label="Copy link"
        >
          <Link2 size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-primary bg-background/90 px-2 py-1 rounded whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialShareButtons;