import { Download, Instagram, Calendar, Copy, Check, Clock, Sparkles, Camera, Users, TrendingUp, Megaphone, Heart, RefreshCw, Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Hero Image
import downloadHero from '@/assets/download-hero.jpg';

interface ContentItem {
  id: string;
  title: string;
  type: 'post' | 'story' | 'reel';
  image: string;
  caption: string;
  hashtags: string;
  scheduledFor?: string;
}

interface UploaderMedia {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  event_name: string | null;
  description: string | null;
  tags: string[] | null;
  created_at: string;
  user_id: string | null;
  url?: string;
}

const ContentHubPage = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploaderMedia, setUploaderMedia] = useState<UploaderMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [sendingToInstagram, setSendingToInstagram] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch auth session and media on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUploaderMedia();
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUploaderMedia();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUploaderMedia = async () => {
    setLoading(true);
    try {
      // Fetch all event media (uploaded content)
      const { data, error } = await supabase
        .from('event_media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Generate signed URLs for each media item
      const mediaWithUrls = await Promise.all(
        (data || []).map(async (item) => {
          const { data: signedUrl } = await supabase.storage
            .from('event-media')
            .createSignedUrl(item.file_path, 3600);
          
          return {
            ...item,
            url: signedUrl?.signedUrl || ''
          };
        })
      );

      setUploaderMedia(mediaWithUrls.filter(item => item.url));
    } catch (error) {
      console.error('Error fetching uploader media:', error);
      toast({
        title: "Error loading content",
        description: "Could not load media from uploader",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Sync uploader media to Instagram-ready bucket
  const syncToInstagram = async () => {
    if (!session) {
      toast({
        title: "Login required",
        description: "Please login to sync content",
        variant: "destructive"
      });
      return;
    }

    setSyncing(true);
    let syncedCount = 0;

    try {
      for (const item of uploaderMedia) {
        if (!item.url) continue;

        try {
          // Download from event-media bucket
          const response = await fetch(item.url);
          const blob = await response.blob();
          
          // Upload to instagram-images bucket with library prefix
          const fileName = `library-${Date.now()}-${item.file_name}`;
          const { error: uploadError } = await supabase.storage
            .from('instagram-images')
            .upload(fileName, blob, {
              contentType: item.file_type || 'image/jpeg',
              upsert: true
            });

          if (!uploadError) syncedCount++;
        } catch (err) {
          console.error(`Error syncing ${item.file_name}:`, err);
        }
      }

      toast({
        title: "Sync complete",
        description: `${syncedCount} images synced to Instagram library`,
      });
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Sync failed",
        description: "Could not sync content to Instagram",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  // Send individual image to Instagram scheduler
  const sendToInstagramScheduler = async (item: UploaderMedia) => {
    if (!session || !item.url) return;
    
    setSendingToInstagram(item.id);
    
    try {
      // Download from event-media bucket
      const response = await fetch(item.url);
      const blob = await response.blob();
      
      // Upload to instagram-images bucket
      const fileName = `library-${Date.now()}-${item.file_name}`;
      const { error: uploadError } = await supabase.storage
        .from('instagram-images')
        .upload(fileName, blob, {
          contentType: item.file_type || 'image/jpeg',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrl } = supabase.storage
        .from('instagram-images')
        .getPublicUrl(fileName);

      // Create scheduled post with pre-filled data
      const defaultCaption = item.description || `✨ ${item.event_name || 'Event highlights'} from PixelAI Pro\n\nExperience the magic of AI-powered photo transformations!`;
      const defaultHashtags = '#PixelAIPro #AIPhotoBooth #EventPhotography #NYCEvents #AITransformation #PhotoBooth #EventTech #CorporateEvents #BrandActivation';

      const scheduledFor = new Date();
      scheduledFor.setHours(scheduledFor.getHours() + 24); // Schedule for 24 hours from now

      const { error: insertError } = await supabase
        .from('scheduled_posts')
        .insert({
          image_url: publicUrl.publicUrl,
          caption: defaultCaption,
          hashtags: defaultHashtags,
          scheduled_for: scheduledFor.toISOString(),
          status: 'pending',
          user_id: session.user.id
        });

      if (insertError) throw insertError;

      toast({
        title: "Sent to Instagram Scheduler",
        description: `${item.file_name} scheduled for posting. Edit it in the Instagram Scheduler.`,
      });

    } catch (error) {
      console.error('Error sending to Instagram:', error);
      toast({
        title: "Failed to send",
        description: "Could not send to Instagram scheduler",
        variant: "destructive"
      });
    } finally {
      setSendingToInstagram(null);
    }
  };

  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pixelai-pro-${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download failed",
        description: "Could not download the image",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto mb-6 shadow-xl">
              <img src={downloadHero} alt="Download Content" className="w-full h-full object-cover" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm mb-4">
              <Instagram size={16} />
              <span>Private Content Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Instagram <span className="text-gradient">Content Library</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              View and schedule content from the upload portal. Each image can be sent directly to the Instagram scheduler.
            </p>
          </div>

          {/* Login Check */}
          {!session ? (
            <div className="glass rounded-2xl p-12 text-center max-w-md mx-auto">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Login Required</h2>
              <p className="text-muted-foreground mb-6">
                Please login to access the content hub and Instagram scheduling features.
              </p>
              <Button onClick={() => window.location.href = '/instagram-scheduler'}>
                Go to Login
              </Button>
            </div>
          ) : (
            <>
              {/* Stats & Actions Bar */}
              <div className="glass rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{uploaderMedia.length}</p>
                    <p className="text-sm text-muted-foreground">Total Images</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">From Upload Portal</p>
                    <p className="text-xs text-primary">Ready for Instagram</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={fetchUploaderMedia} disabled={loading}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <Button onClick={syncToInstagram} disabled={syncing || uploaderMedia.length === 0}>
                    <Send className={`w-4 h-4 mr-2 ${syncing ? 'animate-pulse' : ''}`} />
                    {syncing ? 'Syncing...' : 'Sync All to Instagram'}
                  </Button>
                </div>
              </div>

              {/* Content Grid */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading content...</span>
                </div>
              ) : uploaderMedia.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">No Content Yet</h2>
                  <p className="text-muted-foreground mb-6">
                    Upload images through the upload portal to see them here.
                  </p>
                  <Button onClick={() => window.location.href = '/upload-m3d1a-p0rtal'}>
                    Go to Upload Portal
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {uploaderMedia.map((item) => (
                    <div key={item.id} className="glass rounded-2xl overflow-hidden group">
                      {/* Image Preview */}
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={item.url} 
                          alt={item.file_name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        
                        {/* Event Badge */}
                        {item.event_name && (
                          <div className="absolute top-3 left-3">
                            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                              {item.event_name}
                            </Badge>
                          </div>
                        )}
                        
                        {/* Quick Actions Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                          <Button
                            size="sm"
                            onClick={() => sendToInstagramScheduler(item)}
                            disabled={sendingToInstagram === item.id}
                            className="w-40"
                          >
                            {sendingToInstagram === item.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Instagram className="w-4 h-4 mr-2" />
                            )}
                            Send to Instagram
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(item.url!, item.file_name)}
                            className="w-40 bg-white/10"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-1 truncate">{item.file_name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {formatDate(item.created_at)}
                        </p>
                        
                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{item.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                        
                        {/* Description Preview */}
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

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

              {/* Quick Links */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button variant="outline" onClick={() => window.location.href = '/instagram-scheduler'}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Instagram Scheduler
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/upload-m3d1a-p0rtal'}>
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Portal
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/pixelai-social'}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  PixelAI Social
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContentHubPage;
