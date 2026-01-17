import { Linkedin, Twitter, Facebook, Link2 } from 'lucide-react';
import { useState } from 'react';

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
}

const SocialShareButtons = ({ title, url, description }: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  
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