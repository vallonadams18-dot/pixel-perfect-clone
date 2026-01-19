import { Download, Instagram, Calendar, Copy, Check, Clock, Sparkles, Camera, Users, TrendingUp, Megaphone, Heart } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Instagram Posts
import igPostTransformation from '@/assets/instagram/ig-post-transformation.jpg';
import igPostBrandActivation from '@/assets/instagram/ig-post-brand-activation.jpg';
import igPostTradingCards from '@/assets/instagram/ig-post-trading-cards.jpg';
// New Corporate Posts
import igPostCorporateAiBooth from '@/assets/instagram/ig-post-corporate-ai-booth.jpg';
import igPostTradingCardsCorporate from '@/assets/instagram/ig-post-trading-cards-corporate.jpg';
import igPostPixelwearLuxury from '@/assets/instagram/ig-post-pixelwear-luxury.jpg';
import igPostHeadshotsConference from '@/assets/instagram/ig-post-headshots-conference.jpg';
import igPostPersonaPopTeam from '@/assets/instagram/ig-post-persona-pop-team.jpg';

// Instagram Story
import igStoryBooking from '@/assets/instagram/ig-story-booking.jpg';

// Story Templates
import storyTemplatePixelwear from '@/assets/instagram/story-template-pixelwear.jpg';
import storyTemplateTradingCards from '@/assets/instagram/story-template-trading-cards.jpg';
import storyTemplateHeadshots from '@/assets/instagram/story-template-headshots.jpg';
import storyTemplatePersonaPop from '@/assets/instagram/story-template-persona-pop.jpg';
import storyTemplateCoStar from '@/assets/instagram/story-template-co-star.jpg';

// Reel Covers
import reelCoverPixelwear from '@/assets/instagram/reel-cover-pixelwear.jpg';
import reelCoverTradingCards from '@/assets/instagram/reel-cover-trading-cards.jpg';
import reelCoverHeadshots from '@/assets/instagram/reel-cover-headshots.jpg';
import reelCoverPersonaPop from '@/assets/instagram/reel-cover-persona-pop.jpg';
import reelCoverCoStar from '@/assets/instagram/reel-cover-co-star.jpg';

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
  // Story Templates
  {
    id: '5',
    title: 'PixelWear Story Template',
    type: 'story',
    image: storyTemplatePixelwear,
    caption: '👗 Try on ANY brand instantly!\n\nOur PixelWear AI lets guests virtually wear Nike, Gucci, Supreme & more in seconds.\n\nSwipe up to book your branded experience! 🔗',
    hashtags: '#PixelWear #VirtualTryOn #FashionTech #AIFashion #BrandActivation #EventTech',
  },
  {
    id: '6',
    title: 'Trading Cards Story Template',
    type: 'story',
    image: storyTemplateTradingCards,
    caption: '🏆 Become a LEGEND!\n\nCreate your own premium AI trading card in under 30 seconds.\n\nPerfect for sports events, gaming cons & corporate team building! ⚡',
    hashtags: '#TradingCards #AICards #SportsCards #Collectibles #EventActivation #CustomCards',
  },
  {
    id: '7',
    title: 'Headshots Story Template',
    type: 'story',
    image: storyTemplateHeadshots,
    caption: '💼 Professional headshots in SECONDS!\n\nNo studio needed. No appointments. Just AI magic.\n\nPerfect for conferences & corporate events! ✨',
    hashtags: '#AIHeadshots #ProfessionalHeadshots #CorporateEvents #LinkedInReady #EventTech',
  },
  // Reel Covers
  {
    id: '8',
    title: 'PixelWear Reel Cover',
    type: 'reel',
    image: reelCoverPixelwear,
    caption: '🔥 Watch the PixelWear transformation!\n\nFrom casual to couture in seconds. Our AI virtual try-on experience is the ultimate crowd-pleaser.\n\nTag someone who needs this at their next event! 👇',
    hashtags: '#PixelWear #AITransformation #FashionTech #EventContent #ReelsCover #BrandActivation',
  },
  {
    id: '9',
    title: 'Trading Cards Reel Cover',
    type: 'reel',
    image: reelCoverTradingCards,
    caption: '⚡ From fan to LEGEND in 30 seconds!\n\nWatch guests light up when they see themselves on a premium trading card.\n\nSave this for your next sports event! 🏈',
    hashtags: '#TradingCardReel #AIExperience #SportsActivation #EventMarketing #FanEngagement',
  },
  {
    id: '10',
    title: 'Headshots Reel Cover',
    type: 'reel',
    image: reelCoverHeadshots,
    caption: '✨ Before vs After: AI Headshot Magic!\n\nWatch guests go from selfie to professional portrait in seconds.\n\nThe perfect addition to any corporate event! 💼',
    hashtags: '#HeadshotsReel #AIPortrait #CorporateEvents #BeforeAfter #EventTech #LinkedInReady',
  },
  // New Corporate Brand Posts
  {
    id: '11',
    title: 'Corporate AI Booth Experience',
    type: 'post',
    image: igPostCorporateAiBooth,
    caption: '🏢 Transform your next corporate event into an unforgettable experience!\n\nOur AI Photo Booth delivered 500+ headshots at this Fortune 500 tech conference — all in one day.\n\nWhat sets us apart:\n✅ Instant professional results\n✅ Custom branded experiences\n✅ Enterprise-grade quality\n✅ White-glove service\n\nReady to elevate your corporate event? Link in bio 🔗',
    hashtags: '#CorporateEvents #AIPhotoBooth #TechConference #Fortune500 #BrandActivation #CorporateHeadshots #EventTech #NYCEvents #ProfessionalHeadshots #EnterpriseEvents',
  },
  {
    id: '12',
    title: 'AI Trading Cards for Teams',
    type: 'post',
    image: igPostTradingCardsCorporate,
    caption: '🎯 Team building just got a legendary upgrade!\n\nWatch as employees become collectible trading cards at this corporate celebration.\n\nPerfect for:\n🏆 Sales kickoffs\n🎉 Company anniversaries\n👥 Team building events\n🎁 Employee recognition\n\nEvery card tells a story. Every team member becomes a legend.\n\nBook your activation! Link in bio 👆',
    hashtags: '#TeamBuilding #CorporateCulture #EmployeeEngagement #TradingCards #HREvents #CompanyEvents #AIExperience #EventActivation #WorkplaceFun #EmployeeAppreciation',
  },
  {
    id: '13',
    title: 'Luxury PixelWear Experience',
    type: 'post',
    image: igPostPixelwearLuxury,
    caption: '✨ Where AI meets haute couture!\n\nOur PixelWear experience transformed guests at this luxury brand gala — virtually trying on designer collections in seconds.\n\nFeaturing:\n👗 Real-time AI fashion try-on\n🎨 Custom brand integration\n📸 Instant social-ready content\n🌟 VIP guest experience\n\nPerfect for fashion events, luxury brand activations, and high-end galas.\n\nDM us for your exclusive experience! 💌',
    hashtags: '#LuxuryEvents #FashionTech #PixelWear #AIFashion #BrandActivation #HighEndEvents #VirtualTryOn #DesignerFashion #LuxuryBrands #ExperientialLuxury',
  },
  {
    id: '14',
    title: 'Conference Headshots',
    type: 'post',
    image: igPostHeadshotsConference,
    caption: '💼 Professional headshots. Zero scheduling. Instant delivery.\n\nAt this industry conference, attendees walked away with LinkedIn-ready portraits in under 60 seconds.\n\nWhy event planners love it:\n📸 No photographer bottleneck\n⚡ AI-powered perfection\n🎯 Consistent quality every time\n📲 Instant digital delivery\n\nUpgrade your next conference! Link in bio 🔗',
    hashtags: '#ConferencePhotography #AIHeadshots #ProfessionalPortrait #LinkedInReady #EventPlanning #CorporateConference #NetworkingEvents #BusinessEvents #InstantHeadshots #EventTech',
  },
  {
    id: '15',
    title: 'Persona Pop Team Event',
    type: 'post',
    image: igPostPersonaPopTeam,
    caption: '🦸 Unleash your team\'s inner superheroes!\n\nOur Persona Pop experience turned this corporate team into legendary characters — talk about a memorable team building moment!\n\nTransformations include:\n🦸‍♂️ Superheroes\n🎬 Movie characters\n🎮 Gaming legends\n🎨 Anime styles\n\nWhich transformation would YOUR team choose?\n\nBook your superhero experience today! 🔗',
    hashtags: '#TeamBuilding #PersonaPop #CorporateFun #AITransformation #SuperheroTeam #EmployeeEngagement #WorkplaceEvents #TeamSpirit #CreativeEvents #MemorableMoments',
  },
  // Persona Pop Templates
  {
    id: '16',
    title: 'Persona Pop Story Template',
    type: 'story',
    image: storyTemplatePersonaPop,
    caption: '🦸 BECOME A LEGEND!\n\nTransform into your favorite superhero, anime character, or fantasy warrior in seconds.\n\nPerfect for corporate events, parties & brand activations! ⚡',
    hashtags: '#PersonaPop #AITransformation #Superhero #AnimeStyle #EventTech #BrandActivation #CorporateEvents',
  },
  {
    id: '17',
    title: 'Persona Pop Reel Cover',
    type: 'reel',
    image: reelCoverPersonaPop,
    caption: '⚡ Watch the TRANSFORMATION!\n\nFrom ordinary to extraordinary in seconds. Our Persona Pop AI creates mind-blowing character transformations.\n\nTag someone who needs this at their next event! 👇',
    hashtags: '#PersonaPopReel #AITransformation #SuperheroMakeover #EventContent #ViralReels #CorporateFun',
  },
  // Co-Star Templates
  {
    id: '18',
    title: 'Co-Star Story Template',
    type: 'story',
    image: storyTemplateCoStar,
    caption: '⭐ MEET YOUR IDOL!\n\nOur Co-Star AI creates magical moments where guests pose with their favorite celebrities.\n\nThe ultimate VIP experience for events! 🌟',
    hashtags: '#CoStar #CelebrityMoment #AIPhoto #VIPExperience #RedCarpet #EventTech #LuxuryEvents',
  },
  {
    id: '19',
    title: 'Co-Star Reel Cover',
    type: 'reel',
    image: reelCoverCoStar,
    caption: '🎬 Red carpet moments, made real!\n\nWatch guests light up when they "meet" their favorite celebrities with our Co-Star AI experience.\n\nSave for your next VIP event! ⭐',
    hashtags: '#CoStarReel #CelebrityAI #RedCarpetMoments #VIPEvents #EventMarketing #LuxuryActivation',
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

          {/* Weekly Content Calendar */}
          <div className="mt-16 glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Calendar className="text-primary" />
              Weekly Content Calendar
            </h2>
            <p className="text-muted-foreground mb-8">Suggested posting schedule with optimal times for maximum engagement</p>
            
            <div className="grid gap-4">
              {/* Monday */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-background/50 rounded-xl border-l-4 border-blue-500">
                <div className="md:w-32 flex-shrink-0">
                  <h3 className="font-bold text-lg">Monday</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>11:00 AM EST</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={16} className="text-blue-500" />
                    <span className="font-medium">Transformation Post</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">Carousel</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Before/after transformation showcasing AI Photo Booth magic. Start the week with visual impact!</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-green-400">High Engagement</span>
                </div>
              </div>

              {/* Tuesday */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-background/50 rounded-xl border-l-4 border-purple-500">
                <div className="md:w-32 flex-shrink-0">
                  <h3 className="font-bold text-lg">Tuesday</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>12:00 PM EST</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Camera size={16} className="text-purple-500" />
                    <span className="font-medium">Behind the Scenes</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">Reel</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Show setup at events, team at work, or equipment in action. Build authenticity and trust.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-yellow-400">Medium Engagement</span>
                </div>
              </div>

              {/* Wednesday */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-background/50 rounded-xl border-l-4 border-green-500">
                <div className="md:w-32 flex-shrink-0">
                  <h3 className="font-bold text-lg">Wednesday</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>7:00 PM EST</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={16} className="text-green-500" />
                    <span className="font-medium">Client Spotlight</span>
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">Post</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Feature a recent event success story. Tag the client, share results and testimonials.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-green-400">High Engagement</span>
                </div>
              </div>

              {/* Thursday */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-background/50 rounded-xl border-l-4 border-orange-500">
                <div className="md:w-32 flex-shrink-0">
                  <h3 className="font-bold text-lg">Thursday</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>1:00 PM EST</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={16} className="text-orange-500" />
                    <span className="font-medium">Industry Tips</span>
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">Carousel</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Share event planning tips, AI trends, or experiential marketing insights. Position as thought leader.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-yellow-400">Medium Engagement</span>
                </div>
              </div>

              {/* Friday */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-background/50 rounded-xl border-l-4 border-pink-500">
                <div className="md:w-32 flex-shrink-0">
                  <h3 className="font-bold text-lg">Friday</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>8:00 PM EST</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart size={16} className="text-pink-500" />
                    <span className="font-medium">Fun / Trending</span>
                    <span className="text-xs px-2 py-0.5 bg-pink-500/20 text-pink-400 rounded-full">Reel</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Jump on trending audio, show personality, or share fun event moments. End the week on a high note!</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-green-400">High Engagement</span>
                </div>
              </div>

              {/* Saturday */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-background/50 rounded-xl border-l-4 border-cyan-500">
                <div className="md:w-32 flex-shrink-0">
                  <h3 className="font-bold text-lg">Saturday</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>Stories Only</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Megaphone size={16} className="text-cyan-500" />
                    <span className="font-medium">Story Day</span>
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full">3-5 Stories</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Repost client tags, share weekend vibes, use polls/questions to boost engagement. Keep feed rested.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Light Day</span>
                </div>
              </div>

              {/* Sunday */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-background/50 rounded-xl border-l-4 border-amber-500">
                <div className="md:w-32 flex-shrink-0">
                  <h3 className="font-bold text-lg">Sunday</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>10:00 AM EST</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={16} className="text-amber-500" />
                    <span className="font-medium">Week Preview / CTA</span>
                    <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">Post</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Tease upcoming events, share booking availability, or post a powerful CTA. Prime the audience for Monday!</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-yellow-400">Medium Engagement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              💡 Pro Tips
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
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
                <h3 className="font-semibold mb-2">📍 Location Strategy</h3>
                <p className="text-sm text-muted-foreground">
                  Always tag NYC location<br />
                  Use venue-specific tags<br />
                  Add "New York Events" hashtag
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-xl">
                <h3 className="font-semibold mb-2">⚡ Engagement Boost</h3>
                <p className="text-sm text-muted-foreground">
                  Engage 15 mins before/after<br />
                  Reply to all comments<br />
                  Post Stories 3-5x daily
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
