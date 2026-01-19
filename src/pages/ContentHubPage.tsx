import { Download, Instagram, Calendar, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Instagram Posts
import igPostTransformation from '@/assets/instagram/ig-post-transformation.jpg';
import igPostBrandActivation from '@/assets/instagram/ig-post-brand-activation.jpg';
import igPostTradingCards from '@/assets/instagram/ig-post-trading-cards.jpg';

// Instagram Story
import igStoryBooking from '@/assets/instagram/ig-story-booking.jpg';

interface ContentItem {
  id: string;
  title: string;
  type: 'post' | 'story' | 'reel';
  image: string;
  caption: string;
  hashtags: string;
  scheduledFor?: string;
}

const contentItems: ContentItem[] = [
  {
    id: '1',
    title: 'AI Photo Booth Transformation',
    type: 'post',
    image: igPostTransformation,
    caption: '✨ Before & After: Watch the magic happen in seconds!\n\nOur AI Photo Booth transforms your guests into their wildest dreams — superheroes, anime characters, or even Renaissance royalty.\n\nPerfect for:\n🎯 Brand activations\n🎪 Trade shows\n🎉 Corporate events\n\nBook your 2025 event now! Link in bio 👆',
    hashtags: '#AIPhotoBooth #EventTech #BrandActivation #CorporateEvents #TradeShow #EventPlanning #NYC #EventProfs #ExperientialMarketing #PhotoBooth',
  },
  {
    id: '2',
    title: 'Elevate Your Event',
    type: 'post',
    image: igPostBrandActivation,
    caption: '🏆 Elevate Your Event with AI-Powered Experiences\n\nFrom Fortune 500 companies to luxury brands, we\'ve delivered unforgettable moments at 500+ events.\n\nWhy brands choose us:\n✅ Custom AI filters with your branding\n✅ Instant social sharing\n✅ Real-time engagement analytics\n✅ White-glove service\n\nDM us to learn more! 📩',
    hashtags: '#LuxuryEvents #BrandExperience #CorporateActivation #EventMarketing #AIExperience #NewYorkEvents #EventProduction #BrandActivation #ExperientialAgency',
  },
  {
    id: '3',
    title: 'Custom AI Trading Cards',
    type: 'post',
    image: igPostTradingCards,
    caption: '🃏 Turn your guests into collectible legends!\n\nOur AI Trading Card experience creates personalized, professional-grade cards in under 30 seconds.\n\nPerfect for:\n⚾ Sports events\n🎮 Gaming conventions\n🏢 Corporate team building\n🎁 VIP gifting\n\nEvery card is unique. Every guest leaves with a keepsake.\n\nLink in bio to book! 🔗',
    hashtags: '#TradingCards #AIArt #SportsMarketing #EventTech #CustomMerch #FanExperience #Collectibles #EventActivation #TeamBuilding #CorporateGifts',
  },
  {
    id: '4',
    title: 'Now Booking 2025',
    type: 'story',
    image: igStoryBooking,
    caption: 'Behind the scenes at our latest corporate activation! 🎬\n\nNow booking Q1 & Q2 2025 — DM to reserve your date!',
    hashtags: '#BTS #EventSetup #NowBooking #2025Events',
  },
];

const ContentHubPage = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDownload = async (image: string, title: string) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleCopyCaption = (item: ContentItem) => {
    const fullCaption = `${item.caption}\n\n${item.hashtags}`;
    navigator.clipboard.writeText(fullCaption);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm mb-4">
              <Instagram size={16} />
              <span>Private Content Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Instagram <span className="text-gradient">Content Library</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download ready-to-post content for @pixelaipronyc. Each post includes optimized captions and hashtags.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentItems.map((item) => (
              <div key={item.id} className="glass rounded-2xl overflow-hidden group">
                {/* Image Preview */}
                <div className={`relative ${item.type === 'story' ? 'aspect-[9/16]' : 'aspect-square'} overflow-hidden`}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === 'post' ? 'bg-primary text-primary-foreground' : 
                      item.type === 'story' ? 'bg-purple-500 text-white' : 
                      'bg-blue-500 text-white'
                    }`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  
                  {/* Download Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleDownload(item.image, item.title)}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                      <Download size={18} />
                      Download Image
                    </button>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                  
                  {/* Caption Preview */}
                  <div className="bg-background/50 rounded-lg p-3 mb-4 max-h-32 overflow-y-auto">
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {item.caption}
                    </p>
                    <p className="text-xs text-primary mt-2">
                      {item.hashtags}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDownload(item.image, item.title)}
                      className="flex-1 py-2 px-4 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Download
                    </button>
                    <button
                      onClick={() => handleCopyCaption(item)}
                      className="flex-1 py-2 px-4 bg-muted text-muted-foreground rounded-lg font-medium text-sm hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check size={16} className="text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy Caption
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-16 glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="text-primary" />
              Posting Schedule Tips
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-background/50 rounded-xl">
                <h3 className="font-semibold mb-2">📅 Best Times to Post</h3>
                <p className="text-sm text-muted-foreground">
                  Tues-Thurs: 11am-1pm EST<br />
                  Wed & Fri: 7-9pm EST<br />
                  Sunday: 10am-12pm EST
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-xl">
                <h3 className="font-semibold mb-2">🎯 Content Mix</h3>
                <p className="text-sm text-muted-foreground">
                  40% Transformations<br />
                  30% Behind the scenes<br />
                  20% Client results<br />
                  10% Industry tips
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-xl">
                <h3 className="font-semibold mb-2">💡 Pro Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Post Stories 3-5x daily<br />
                  Use location tags (NYC)<br />
                  Engage 15 mins before/after posting
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContentHubPage;
