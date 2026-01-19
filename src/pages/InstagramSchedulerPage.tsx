import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, Clock, Instagram, Send, Trash2, 
  LogIn, LogOut, Eye, EyeOff, Loader2, CheckCircle, 
  XCircle, AlertCircle, Image as ImageIcon, Upload,
  FolderOpen, Search, X, Sparkles, TrendingUp, RefreshCw,
  Download, Grid, List, LayoutGrid, Wand2, Wifi, WifiOff
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ScheduledPost {
  id: string;
  image_url: string;
  caption: string;
  hashtags: string | null;
  scheduled_for: string;
  status: string;
  instagram_post_id: string | null;
  published_at: string | null;
  error_message: string | null;
  created_at: string;
}

interface MediaItem {
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
  isUsed?: boolean;
}

const InstagramSchedulerPage = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  
  // Scheduler state
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduling, setScheduling] = useState(false);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState<'library' | 'upload' | 'url'>('library');
  
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Media library state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<MediaItem | null>(null);
  const [copyingToInstagram, setCopyingToInstagram] = useState(false);
  
  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // AI generation state
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [captionTone, setCaptionTone] = useState<'professional' | 'playful' | 'engaging' | 'luxurious'>('engaging');
  
  // Main panel tab
  const [mainTab, setMainTab] = useState<'library' | 'scheduler' | 'posts'>('library');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Instagram connection state
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'checking' | 'connected' | 'error'>('unknown');
  const [connectionMessage, setConnectionMessage] = useState('');
  
  // Diagnostics state
  const [lastApiCall, setLastApiCall] = useState<{
    function: string;
    status: 'success' | 'error' | 'pending';
    message: string;
    timestamp: Date | null;
  }>({ function: '', status: 'pending', message: '', timestamp: null });
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  
  const { toast } = useToast();
  
  // Content stats
  const contentStats = useMemo(() => {
    const totalPosts = scheduledPosts.length;
    const libraryPosts = scheduledPosts.filter(p => 
      p.image_url?.includes('instagram-images') && p.image_url?.includes('library-')
    ).length;
    const percentage = totalPosts > 0 ? Math.round((libraryPosts / totalPosts) * 100) : 0;
    const targetMet = percentage >= 70;
    return { libraryPosts, totalPosts, percentage, targetMet };
  }, [scheduledPosts]);

  // Auto-fill default schedule time (15 minutes from now)
  const setDefaultSchedule = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0, 5);
    setScheduledDate(dateStr);
    setScheduledTime(timeStr);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchScheduledPosts();
        fetchMediaLibrary();
        setDefaultSchedule();
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchScheduledPosts();
        fetchMediaLibrary();
        setDefaultSchedule();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchScheduledPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .order('scheduled_for', { ascending: true });

    if (error) {
      toast({ title: 'Error fetching posts', description: error.message, variant: 'destructive' });
    } else {
      setScheduledPosts(data || []);
    }
    setLoading(false);
  };

  const fetchMediaLibrary = async () => {
    setMediaLoading(true);
    const { data, error } = await supabase
      .from('event_media')
      .select('*')
      .like('file_type', 'image%')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching media library:', error);
    } else {
      const scheduledImageUrls = scheduledPosts.map(p => p.image_url);
      
      const mediaWithUrls = await Promise.all(
        (data || []).map(async (item) => {
          const { data: urlData } = await supabase.storage
            .from('event-media')
            .createSignedUrl(item.file_path, 3600);
          
          const isUsed = scheduledImageUrls.some(url => 
            url?.includes(item.file_name.split('.')[0])
          );
          
          return { ...item, url: urlData?.signedUrl, isUsed };
        })
      );
      setMediaItems(mediaWithUrls.filter(item => item.url));
    }
    setMediaLoading(false);
  };

  const syncMediaToInstagram = async () => {
    if (!session?.user?.id) return;
    setSyncing(true);
    let syncedCount = 0;
    
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      
      const { data: recentMedia, error } = await supabase
        .from('event_media')
        .select('*')
        .like('file_type', 'image%')
        .gte('created_at', oneDayAgo)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      for (const item of recentMedia || []) {
        const { data: urlData } = await supabase.storage
          .from('event-media')
          .createSignedUrl(item.file_path, 3600);
        
        if (!urlData?.signedUrl) continue;
        
        const syncFileName = `sync-${item.id}.jpg`;
        const syncPath = `${session.user.id}/${syncFileName}`;
        
        const { data: exists } = await supabase.storage
          .from('instagram-images')
          .list(session.user.id, { search: `sync-${item.id}` });
        
        if (exists && exists.length > 0) continue;
        
        const response = await fetch(urlData.signedUrl);
        const blob = await response.blob();
        
        await supabase.storage
          .from('instagram-images')
          .upload(syncPath, blob, { contentType: item.file_type || 'image/jpeg' });
        
        syncedCount++;
      }
      
      if (syncedCount > 0) {
        toast({ title: `Synced ${syncedCount} new images` });
        fetchMediaLibrary();
      } else {
        toast({ title: 'All synced', description: 'No new images to sync' });
      }
    } catch (error: any) {
      toast({ title: 'Sync failed', description: error.message, variant: 'destructive' });
    } finally {
      setSyncing(false);
    }
  };

  const handleSelectFromLibrary = async (item: MediaItem) => {
    if (!item.url || !session?.user?.id) return;
    
    setSelectedLibraryItem(item);
    setCopyingToInstagram(true);
    
    try {
      const response = await fetch(item.url);
      const blob = await response.blob();
      
      const timestamp = Date.now();
      const ext = item.file_name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `library-${timestamp}.${ext}`;
      const filePath = `${session.user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('instagram-images')
        .upload(filePath, blob, { contentType: item.file_type || 'image/jpeg' });
      
      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase.storage
        .from('instagram-images')
        .getPublicUrl(filePath);
      
      setImageUrl(publicUrlData.publicUrl);
      
      if (item.description && !caption) {
        setCaption(item.description);
      }
      
      if (item.tags && item.tags.length > 0 && !hashtags) {
        setHashtags(item.tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' '));
      }
      
      // Switch to scheduler tab
      setMainTab('scheduler');
      
      toast({ title: 'Image ready', description: 'Now fill in caption and schedule' });
    } catch (error: any) {
      toast({ title: 'Failed to prepare image', description: error.message, variant: 'destructive' });
    } finally {
      setCopyingToInstagram(false);
      setSelectedLibraryItem(null);
    }
  };

  const handleDownload = async (item: MediaItem) => {
    if (!item.url) return;
    try {
      const response = await fetch(item.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pixelai-pro-${item.file_name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({ title: 'Download failed', variant: 'destructive' });
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        toast({ title: 'File too large', description: 'Max 8MB', variant: 'destructive' });
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast({ title: 'Invalid format', description: 'Use JPEG or PNG', variant: 'destructive' });
        return;
      }
      setImageFile(file);
    }
  };

  const handleUploadImage = async (): Promise<string | null> => {
    if (!imageFile || !session?.user?.id) return null;
    
    setUploadingImage(true);
    
    try {
      const timestamp = Date.now();
      const ext = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `instagram-${timestamp}.${ext}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('instagram-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('instagram-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const filteredMediaItems = mediaItems.filter(item => {
    if (!mediaSearch) return true;
    const search = mediaSearch.toLowerCase();
    return (
      item.file_name.toLowerCase().includes(search) ||
      item.event_name?.toLowerCase().includes(search) ||
      item.tags?.some(tag => tag.toLowerCase().includes(search))
    );
  });

  // AI Caption Generation
  const handleGenerateCaption = async () => {
    if (!session?.access_token) {
      toast({ 
        title: 'Please log in', 
        description: 'You must be logged in to generate captions', 
        variant: 'destructive' 
      });
      return;
    }
    
    setGeneratingCaption(true);
    setLastApiCall({ function: 'generate-instagram-caption', status: 'pending', message: 'Generating...', timestamp: new Date() });
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-instagram-caption', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: {
          imageDescription: selectedLibraryItem?.description || selectedLibraryItem?.event_name || 'AI photo booth transformation',
          eventName: selectedLibraryItem?.event_name || '',
          service: selectedService || 'AI Photo Booths',
          tone: captionTone,
          includeHashtags: true,
        },
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.caption) {
        setCaption(data.caption);
      }
      if (data?.hashtags) {
        setHashtags(data.hashtags);
      }

      setLastApiCall({ function: 'generate-instagram-caption', status: 'success', message: 'Caption generated successfully', timestamp: new Date() });
      toast({ 
        title: 'Caption generated!', 
        description: 'AI has created a caption based on your content' 
      });
    } catch (error: any) {
      console.error('Caption generation error:', error);
      setLastApiCall({ function: 'generate-instagram-caption', status: 'error', message: error.message || 'Generation failed', timestamp: new Date() });
      toast({ 
        title: 'Generation failed', 
        description: error.message || 'Could not generate caption', 
        variant: 'destructive' 
      });
    } finally {
      setGeneratingCaption(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    }
    setAuthLoading(false);
  };

  const handleSignUp = async () => {
    setAuthLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast({ title: 'Sign up failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Account created!' });
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setScheduledPosts([]);
    setConnectionStatus('unknown');
    setConnectionMessage('');
  };

  // Test Instagram connection
  const handleTestConnection = async () => {
    if (!session?.access_token) {
      toast({ title: 'Please log in first', variant: 'destructive' });
      return;
    }
    
    setConnectionStatus('checking');
    setConnectionMessage('');
    setLastApiCall({ function: 'instagram-connection-status', status: 'pending', message: 'Checking connection...', timestamp: new Date() });
    
    try {
      const { data, error } = await supabase.functions.invoke('instagram-connection-status', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.connected) {
        setConnectionStatus('connected');
        setConnectionMessage(`Connected: @${data.accountName || data.accountId}`);
        setLastApiCall({ function: 'instagram-connection-status', status: 'success', message: `Connected to @${data.accountName || data.accountId}`, timestamp: new Date() });
        toast({ 
          title: 'Instagram Connected!', 
          description: `Account: @${data.accountName || data.accountId}` 
        });
      } else {
        setConnectionStatus('error');
        setConnectionMessage(data?.message || 'Connection failed');
        setLastApiCall({ function: 'instagram-connection-status', status: 'error', message: data?.message || 'Connection failed', timestamp: new Date() });
        toast({ 
          title: 'Connection Issue', 
          description: data?.message || 'Could not connect to Instagram', 
          variant: 'destructive' 
        });
      }
    } catch (error: any) {
      setConnectionStatus('error');
      setConnectionMessage(error.message || 'Connection check failed');
      setLastApiCall({ function: 'instagram-connection-status', status: 'error', message: error.message || 'Connection check failed', timestamp: new Date() });
      toast({ 
        title: 'Connection Error', 
        description: error.message, 
        variant: 'destructive' 
      });
    }
  };

  const handleSchedulePost = async () => {
    let finalImageUrl = imageUrl;
    
    if (imageFile) {
      const uploadedUrl = await handleUploadImage();
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        return;
      }
    }
    
    const missingFields = [];
    if (!finalImageUrl) missingFields.push('image');
    if (!caption) missingFields.push('caption');
    if (!scheduledDate) missingFields.push('date');
    if (!scheduledTime) missingFields.push('time');
    
    if (missingFields.length > 0) {
      toast({ 
        title: 'Missing fields', 
        description: `Please fill in: ${missingFields.join(', ')}`, 
        variant: 'destructive' 
      });
      return;
    }

    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`);
    if (scheduledFor <= new Date()) {
      toast({ title: 'Invalid date', description: 'Must be in the future', variant: 'destructive' });
      return;
    }

    setScheduling(true);
    
    const fullCaption = hashtags ? `${caption}\n\n${hashtags}` : caption;

    const { error } = await supabase.from('scheduled_posts').insert({
      user_id: session.user.id,
      image_url: finalImageUrl,
      caption: fullCaption,
      hashtags: hashtags || null,
      scheduled_for: scheduledFor.toISOString(),
      status: 'pending',
    });

    if (error) {
      toast({ title: 'Failed to schedule', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Post scheduled!' });
      setImageUrl('');
      setImageFile(null);
      setCaption('');
      setHashtags('');
      setScheduledDate('');
      setScheduledTime('');
      fetchScheduledPosts();
      setMainTab('posts');
    }
    setScheduling(false);
  };

  const handlePublishNow = async (post: ScheduledPost) => {
    if (!session?.access_token) {
      toast({ 
        title: 'Please log in', 
        description: 'You must be logged in to publish', 
        variant: 'destructive' 
      });
      return;
    }
    
    setPublishing(post.id);
    
    try {
      const { data, error } = await supabase.functions.invoke('instagram-publish', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: {
          imageUrl: post.image_url,
          caption: post.caption,
          scheduledId: post.id,
        },
      });

      if (error) throw error;

      if (data?.error) {
        await supabase
          .from('scheduled_posts')
          .update({ status: 'failed', error_message: data.error })
          .eq('id', post.id);
        
        toast({ title: 'Publish failed', description: data.error, variant: 'destructive' });
      } else {
        toast({ title: 'Published!', description: `Post ID: ${data.postId}` });
      }
      
      fetchScheduledPosts();
    } catch (error: any) {
      toast({ title: 'Publish failed', description: error.message, variant: 'destructive' });
    }
    
    setPublishing(null);
  };

  const handleDeletePost = async (postId: string) => {
    const { error } = await supabase.from('scheduled_posts').delete().eq('id', postId);
    if (!error) {
      toast({ title: 'Deleted' });
      fetchScheduledPosts();
    }
  };

  const handleCancelPost = async (postId: string) => {
    const { error } = await supabase.from('scheduled_posts').update({ status: 'cancelled' }).eq('id', postId);
    if (!error) {
      toast({ title: 'Cancelled' });
      fetchScheduledPosts();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300"><Clock size={12} className="mr-1" /> Pending</Badge>;
      case 'published':
        return <Badge className="bg-green-500"><CheckCircle size={12} className="mr-1" /> Published</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle size={12} className="mr-1" /> Failed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary"><AlertCircle size={12} className="mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Login screen
  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-20 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card rounded-2xl p-8 shadow-xl border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Instagram Content Hub</h1>
              <p className="text-muted-foreground mt-2">Sign in to manage content & schedule posts</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={authLoading}>
                <LogIn className="w-4 h-4 mr-2" />
                {authLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={handleSignUp} disabled={authLoading}>
                Create Account
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Instagram Content Hub</h1>
                  <p className="text-sm text-muted-foreground">Content Library + Scheduler</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Instagram Connection Status */}
              <Button 
                variant={connectionStatus === 'connected' ? 'outline' : connectionStatus === 'error' ? 'destructive' : 'outline'} 
                size="sm" 
                onClick={handleTestConnection}
                disabled={connectionStatus === 'checking'}
                className={connectionStatus === 'connected' ? 'border-green-500 text-green-600' : ''}
              >
                {connectionStatus === 'checking' ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : connectionStatus === 'connected' ? (
                  <Wifi className="w-4 h-4 mr-2" />
                ) : connectionStatus === 'error' ? (
                  <WifiOff className="w-4 h-4 mr-2" />
                ) : (
                  <Instagram className="w-4 h-4 mr-2" />
                )}
                {connectionStatus === 'checking' ? 'Checking...' : 
                 connectionStatus === 'connected' ? 'Connected' :
                 connectionStatus === 'error' ? 'Not Connected' : 'Test Connection'}
              </Button>
              
              <Button variant="outline" size="sm" onClick={syncMediaToInstagram} disabled={syncing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                Sync
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Connection Error Banner */}
          {connectionStatus === 'error' && connectionMessage && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-destructive">Instagram Connection Issue</p>
                <p className="text-sm text-muted-foreground">{connectionMessage}</p>
              </div>
              <Button size="sm" variant="outline" onClick={handleTestConnection}>
                Retry
              </Button>
            </div>
          )}

          {/* Diagnostics Panel */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDiagnostics(!showDiagnostics)}
              className="text-muted-foreground text-xs"
            >
              {showDiagnostics ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
              {showDiagnostics ? 'Hide Diagnostics' : 'Show Diagnostics'}
            </Button>
            
            {showDiagnostics && (
              <div className="mt-3 p-4 bg-muted/50 rounded-xl border text-sm space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Login Status */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${session ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-muted-foreground">Login:</span>
                    <span className="font-medium">
                      {session ? `Logged in (${session.user?.email?.slice(0, 15)}...)` : 'Not logged in'}
                    </span>
                  </div>
                  
                  {/* Instagram Connection */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-green-500' : 
                      connectionStatus === 'error' ? 'bg-red-500' : 
                      connectionStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 'bg-muted-foreground'
                    }`} />
                    <span className="text-muted-foreground">Instagram:</span>
                    <span className="font-medium">
                      {connectionStatus === 'connected' ? 'Connected' : 
                       connectionStatus === 'error' ? 'Error' : 
                       connectionStatus === 'checking' ? 'Checking...' : 'Unknown'}
                    </span>
                  </div>
                  
                  {/* Access Token Status */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${session?.access_token ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-muted-foreground">Auth Token:</span>
                    <span className="font-medium">{session?.access_token ? 'Present' : 'Missing'}</span>
                  </div>
                </div>
                
                {/* Last API Call */}
                {lastApiCall.timestamp && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Last API Call:</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={lastApiCall.status === 'success' ? 'default' : lastApiCall.status === 'error' ? 'destructive' : 'secondary'} className="text-xs">
                        {lastApiCall.status === 'success' ? <CheckCircle className="w-3 h-3 mr-1" /> : 
                         lastApiCall.status === 'error' ? <XCircle className="w-3 h-3 mr-1" /> : 
                         <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                        {lastApiCall.status}
                      </Badge>
                      <code className="text-xs bg-background px-2 py-1 rounded">{lastApiCall.function}</code>
                      <span className="text-xs text-muted-foreground">{lastApiCall.message}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {lastApiCall.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-xl p-4 border">
              <p className="text-sm text-muted-foreground">Total Images</p>
              <p className="text-2xl font-bold text-primary">{mediaItems.length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border">
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-bold text-yellow-500">{scheduledPosts.filter(p => p.status === 'pending').length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border">
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-2xl font-bold text-green-500">{scheduledPosts.filter(p => p.status === 'published').length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Library %</p>
                <Badge variant={contentStats.targetMet ? 'default' : 'secondary'} className="text-xs">
                  {contentStats.targetMet ? '✓' : '↑'} 70%
                </Badge>
              </div>
              <Progress value={contentStats.percentage} className="h-2" />
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="library" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Content Library
                <Badge variant="secondary" className="ml-1">{mediaItems.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="scheduler" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Post
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Scheduled
                <Badge variant="secondary" className="ml-1">{scheduledPosts.filter(p => p.status === 'pending').length}</Badge>
              </TabsTrigger>
            </TabsList>

            {/* Content Library Tab */}
            <TabsContent value="library">
              <div className="bg-card rounded-2xl border p-6">
                {/* Search & Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by filename, event, or tag..."
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" onClick={fetchMediaLibrary} disabled={mediaLoading}>
                      <RefreshCw className={`w-4 h-4 ${mediaLoading ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </div>

                {/* Media Grid */}
                {mediaLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : filteredMediaItems.length === 0 ? (
                  <div className="text-center py-20">
                    <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No images found</p>
                    <Button variant="link" onClick={() => window.location.href = '/upload-m3d1a-p0rtal'}>
                      Go to Upload Portal →
                    </Button>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredMediaItems.map((item) => (
                      <div key={item.id} className="group relative rounded-xl overflow-hidden border bg-background aspect-square">
                        <img
                          src={item.url}
                          alt={item.file_name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          {item.event_name && (
                            <Badge className="text-[10px] bg-primary/90">{item.event_name}</Badge>
                          )}
                          {item.isUsed && (
                            <Badge variant="secondary" className="text-[10px]">Used</Badge>
                          )}
                        </div>
                        
                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleSelectFromLibrary(item)}
                            disabled={copyingToInstagram && selectedLibraryItem?.id === item.id}
                          >
                            {copyingToInstagram && selectedLibraryItem?.id === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <Instagram className="w-4 h-4 mr-1" />
                                Schedule
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-full"
                            onClick={() => handleDownload(item)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                        
                        {/* Filename */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="text-white text-xs truncate">{item.file_name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredMediaItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <img
                          src={item.url}
                          alt={item.file_name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.file_name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {item.event_name && <Badge variant="outline" className="text-xs">{item.event_name}</Badge>}
                            {item.isUsed && <Badge variant="secondary" className="text-xs">Used</Badge>}
                            <span className="text-xs text-muted-foreground">{formatDate(item.created_at)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSelectFromLibrary(item)}
                            disabled={copyingToInstagram}
                          >
                            <Instagram className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDownload(item)}>
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Schedule Post Tab */}
            <TabsContent value="scheduler">
              <div className="bg-card rounded-2xl border p-6 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Schedule New Post
                </h2>
                
                <div className="space-y-6">
                  {/* Image Source */}
                  <div>
                    <Label className="mb-2 block">Image Source</Label>
                    <Tabs defaultValue="library" onValueChange={(v) => setImageSource(v as any)}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="library"><FolderOpen className="w-3 h-3 mr-1" />Library</TabsTrigger>
                        <TabsTrigger value="upload"><Upload className="w-3 h-3 mr-1" />Upload</TabsTrigger>
                        <TabsTrigger value="url"><ImageIcon className="w-3 h-3 mr-1" />URL</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="library" className="mt-3">
                        <ScrollArea className="h-[180px] border rounded-lg p-3">
                          <div className="grid grid-cols-4 gap-2">
                            {mediaItems.slice(0, 20).map((item) => (
                              <button
                                key={item.id}
                                onClick={() => handleSelectFromLibrary(item)}
                                disabled={copyingToInstagram}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-primary ${
                                  imageUrl.includes(item.file_name.split('.')[0])
                                    ? 'border-primary ring-2 ring-primary/20' 
                                    : 'border-transparent'
                                }`}
                              >
                                <img src={item.url} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                      
                      <TabsContent value="upload" className="mt-3">
                        <Input type="file" accept="image/jpeg,image/png" onChange={handleImageFileChange} />
                        {imageFile && (
                          <div className="mt-2 flex items-center gap-2 p-2 bg-muted rounded-lg">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-sm flex-1 truncate">{imageFile.name}</span>
                            <Button size="sm" variant="ghost" onClick={() => setImageFile(null)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="url" className="mt-3">
                        <Input
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Preview */}
                  {(imageUrl || imageFile) && (
                    <div className="relative w-40 h-40 rounded-lg overflow-hidden border mx-auto">
                      <img 
                        src={imageFile ? URL.createObjectURL(imageFile) : imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2"
                        onClick={() => { setImageUrl(''); setImageFile(null); }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* AI Caption Generator */}
                  <div className="bg-muted/50 rounded-xl p-4 border border-dashed">
                    <div className="flex items-center gap-2 mb-3">
                      <Wand2 className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">AI Caption Generator</h3>
                      <Badge variant="secondary" className="text-xs">Powered by AI</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <Label className="text-xs mb-1 block">Service</Label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="">Auto-detect</option>
                          <option value="AI Photo Booths">AI Photo Booths</option>
                          <option value="PixelWear">PixelWear</option>
                          <option value="AI Headshots">AI Headshots</option>
                          <option value="Persona Pop">Persona Pop</option>
                          <option value="Co-Star">Co-Star</option>
                          <option value="AI Trading Cards">AI Trading Cards</option>
                          <option value="AI Video Booths">AI Video Booths</option>
                          <option value="Axon AI">Axon AI</option>
                          <option value="Sketch">Sketch</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs mb-1 block">Tone</Label>
                        <select
                          value={captionTone}
                          onChange={(e) => setCaptionTone(e.target.value as any)}
                          className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="engaging">Engaging</option>
                          <option value="professional">Professional</option>
                          <option value="playful">Playful</option>
                          <option value="luxurious">Luxurious</option>
                        </select>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleGenerateCaption} 
                      disabled={generatingCaption || (!imageUrl && !imageFile)}
                      variant="secondary"
                      className="w-full"
                    >
                      {generatingCaption ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                      ) : (
                        <><Sparkles className="w-4 h-4 mr-2" /> Generate Caption with AI</>
                      )}
                    </Button>
                    
                    {(!imageUrl && !imageFile) && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Select an image first to generate a caption
                      </p>
                    )}
                  </div>
                  
                  {/* Caption */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="caption">Caption *</Label>
                      {caption && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs"
                          onClick={() => setCaption('')}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <Textarea
                      id="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write your caption or use AI to generate one..."
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{caption.length}/2,200</p>
                  </div>
                  
                  {/* Hashtags */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="hashtags">Hashtags</Label>
                      {hashtags && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs"
                          onClick={() => setHashtags('')}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <Textarea
                      id="hashtags"
                      value={hashtags}
                      onChange={(e) => setHashtags(e.target.value)}
                      placeholder="#AIPhotoBooth #EventTech (AI will generate these)"
                      rows={2}
                    />
                  </div>
                  
                  {/* Date/Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSchedulePost} 
                    disabled={scheduling || uploadingImage || (!imageUrl && !imageFile)}
                    className="w-full"
                    size="lg"
                  >
                    {scheduling || uploadingImage ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scheduling...</>
                    ) : (
                      <><Calendar className="w-4 h-4 mr-2" /> Schedule Post</>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Scheduled Posts Tab */}
            <TabsContent value="posts">
              <div className="bg-card rounded-2xl border p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Scheduled Posts
                </h2>
                
                {loading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                  </div>
                ) : scheduledPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50 text-muted-foreground" />
                    <p className="text-muted-foreground">No scheduled posts</p>
                    <Button variant="link" onClick={() => setMainTab('library')}>
                      Select an image to schedule →
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scheduledPosts.map((post) => (
                      <div key={post.id} className="border rounded-xl overflow-hidden bg-background">
                        <div className="aspect-video relative">
                          <img 
                            src={post.image_url} 
                            alt="" 
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                          />
                          <div className="absolute top-2 right-2">
                            {getStatusBadge(post.status)}
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {post.caption.substring(0, 100)}...
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                            <Calendar size={12} />
                            {formatDate(post.scheduled_for)}
                          </p>
                          
                          {post.error_message && (
                            <p className="text-xs text-destructive mb-3">{post.error_message}</p>
                          )}
                          
                          {post.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handlePublishNow(post)}
                                disabled={publishing === post.id}
                              >
                                {publishing === post.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3 mr-1" />}
                                Publish
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleCancelPost(post.id)}>
                                Cancel
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                          
                          {(post.status === 'cancelled' || post.status === 'failed') && (
                            <Button size="sm" variant="destructive" className="w-full" onClick={() => handleDeletePost(post.id)}>
                              <Trash2 className="w-3 h-3 mr-1" /> Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InstagramSchedulerPage;
