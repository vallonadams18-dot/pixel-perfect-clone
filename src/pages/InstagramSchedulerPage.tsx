import { useState, useEffect } from 'react';
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
  FolderOpen, Search, X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

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
}

const InstagramSchedulerPage = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduling, setScheduling] = useState(false);
  const [publishing, setPublishing] = useState<string | null>(null);
  
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Content library state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);
  
  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchScheduledPosts();
        fetchMediaLibrary();
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchScheduledPosts();
        fetchMediaLibrary();
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
    // Fetch images from event_media table (PixelAI Social content)
    const { data, error } = await supabase
      .from('event_media')
      .select('*')
      .like('file_type', 'image%')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching media library:', error);
    } else {
      // Get public URLs for each image
      const mediaWithUrls = await Promise.all(
        (data || []).map(async (item) => {
          const { data: urlData } = await supabase.storage
            .from('event-media')
            .createSignedUrl(item.file_path, 3600);
          return { ...item, url: urlData?.signedUrl };
        })
      );
      setMediaItems(mediaWithUrls.filter(item => item.url));
    }
    setMediaLoading(false);
  };

  const [selectedLibraryItem, setSelectedLibraryItem] = useState<MediaItem | null>(null);
  const [copyingToInstagram, setCopyingToInstagram] = useState(false);

  const handleSelectFromLibrary = async (item: MediaItem) => {
    if (!item.url || !session?.user?.id) return;
    
    setSelectedLibraryItem(item);
    setCopyingToInstagram(true);
    
    try {
      // Download the image from the signed URL
      const response = await fetch(item.url);
      const blob = await response.blob();
      
      // Upload to the public instagram-images bucket
      const timestamp = Date.now();
      const ext = item.file_name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `library-${timestamp}.${ext}`;
      const filePath = `${session.user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('instagram-images')
        .upload(filePath, blob, { contentType: item.file_type || 'image/jpeg' });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('instagram-images')
        .getPublicUrl(filePath);
      
      setImageUrl(publicUrlData.publicUrl);
      
      // Pre-fill caption from description if available
      if (item.description && !caption) {
        setCaption(item.description);
      }
      
      // Pre-fill hashtags from tags if available
      if (item.tags && item.tags.length > 0 && !hashtags) {
        setHashtags(item.tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' '));
      }
      
      toast({ title: 'Image ready for Instagram', description: 'Copied to public storage for posting' });
    } catch (error: any) {
      console.error('Failed to copy image:', error);
      toast({ title: 'Failed to prepare image', description: error.message, variant: 'destructive' });
    } finally {
      setCopyingToInstagram(false);
      setSelectedLibraryItem(null);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      if (file.size > 8 * 1024 * 1024) {
        toast({ title: 'File too large', description: 'Max 8MB for Instagram', variant: 'destructive' });
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

      // Upload to instagram-images bucket (public)
      const { error: uploadError } = await supabase.storage
        .from('instagram-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Logged in successfully' });
    }
    setAuthLoading(false);
  };

  const handleSignUp = async () => {
    setAuthLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast({ title: 'Sign up failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Account created! You can now log in.' });
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setScheduledPosts([]);
    toast({ title: 'Logged out' });
  };

  const handleSchedulePost = async () => {
    // Check if we have an image (either URL or file to upload)
    let finalImageUrl = imageUrl;
    
    if (imageFile) {
      const uploadedUrl = await handleUploadImage();
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        return; // Upload failed
      }
    }
    
    if (!finalImageUrl || !caption || !scheduledDate || !scheduledTime) {
      toast({ title: 'Missing fields', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`);
    if (scheduledFor <= new Date()) {
      toast({ title: 'Invalid date', description: 'Scheduled time must be in the future', variant: 'destructive' });
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
      toast({ title: 'Failed to schedule post', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Post scheduled successfully!' });
      setImageUrl('');
      setImageFile(null);
      setCaption('');
      setHashtags('');
      setScheduledDate('');
      setScheduledTime('');
      fetchScheduledPosts();
    }
    setScheduling(false);
  };

  const handlePublishNow = async (post: ScheduledPost) => {
    setPublishing(post.id);
    
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      if (!accessToken) {
        toast({ title: 'Authentication error', variant: 'destructive' });
        setPublishing(null);
        return;
      }

      const { data, error } = await supabase.functions.invoke('instagram-publish', {
        body: {
          imageUrl: post.image_url,
          caption: post.caption,
          scheduledId: post.id,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        // Update status to failed
        await supabase
          .from('scheduled_posts')
          .update({ status: 'failed', error_message: data.error })
          .eq('id', post.id);
        
        toast({ title: 'Publish failed', description: data.error, variant: 'destructive' });
      } else {
        toast({ title: 'Published successfully!', description: `Post ID: ${data.postId}` });
      }
      
      fetchScheduledPosts();
    } catch (error: any) {
      console.error('Publish error:', error);
      toast({ title: 'Publish failed', description: error.message, variant: 'destructive' });
    }
    
    setPublishing(null);
  };

  const handleDeletePost = async (postId: string) => {
    const { error } = await supabase
      .from('scheduled_posts')
      .delete()
      .eq('id', postId);

    if (error) {
      toast({ title: 'Failed to delete', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Post deleted' });
      fetchScheduledPosts();
    }
  };

  const handleCancelPost = async (postId: string) => {
    const { error } = await supabase
      .from('scheduled_posts')
      .update({ status: 'cancelled' })
      .eq('id', postId);

    if (error) {
      toast({ title: 'Failed to cancel', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Post cancelled' });
      fetchScheduledPosts();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs"><Clock size={12} /> Pending</span>;
      case 'published':
        return <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs"><CheckCircle size={12} /> Published</span>;
      case 'failed':
        return <span className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs"><XCircle size={12} /> Failed</span>;
      case 'cancelled':
        return <span className="flex items-center gap-1 text-muted-foreground bg-muted px-2 py-1 rounded-full text-xs"><AlertCircle size={12} /> Cancelled</span>;
      default:
        return <span className="text-xs">{status}</span>;
    }
  };

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
              <h1 className="text-2xl font-bold">Instagram Scheduler</h1>
              <p className="text-muted-foreground mt-2">Sign in to schedule posts</p>
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
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold">Instagram Scheduler</h1>
              </div>
              <p className="text-muted-foreground">Schedule and publish posts directly to Instagram</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Schedule Form */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Schedule New Post
              </h2>
              
              <div className="space-y-4">
                {/* Image Source Tabs */}
                <div>
                  <Label className="mb-2 block">Image Source *</Label>
                  <Tabs defaultValue="library" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="library" className="flex items-center gap-1">
                        <FolderOpen className="w-3 h-3" />
                        Library
                      </TabsTrigger>
                      <TabsTrigger value="upload" className="flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        Upload
                      </TabsTrigger>
                      <TabsTrigger value="url" className="flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        URL
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="library" className="mt-3">
                      <div className="border rounded-lg p-3 bg-background/50">
                        <div className="relative mb-3">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Search library..."
                            value={mediaSearch}
                            onChange={(e) => setMediaSearch(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                        
                        {mediaLoading ? (
                          <div className="text-center py-6">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                          </div>
                        ) : filteredMediaItems.length === 0 ? (
                          <div className="text-center py-6 text-muted-foreground text-sm">
                            <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>No images in PixelAI Social library</p>
                            <p className="text-xs mt-1">Upload content at /pixelai-social</p>
                          </div>
                        ) : (
                          <ScrollArea className="h-[200px]">
                            <div className="grid grid-cols-4 gap-2">
                              {filteredMediaItems.map((item) => {
                                const isSelected = selectedLibraryItem?.id === item.id;
                                const isCopying = isSelected && copyingToInstagram;
                                
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => handleSelectFromLibrary(item)}
                                    disabled={copyingToInstagram}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-primary disabled:opacity-50 ${
                                      imageUrl.includes(item.file_name.split('.')[0]) || isCopying
                                        ? 'border-primary ring-2 ring-primary/20' 
                                        : 'border-transparent'
                                    }`}
                                  >
                                    <img
                                      src={item.url}
                                      alt={item.file_name}
                                      className="w-full h-full object-cover"
                                    />
                                    {isCopying && (
                                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </ScrollArea>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="upload" className="mt-3">
                      <div className="border rounded-lg p-4 bg-background/50">
                        <Input
                          type="file"
                          accept="image/jpeg,image/png"
                          onChange={handleImageFileChange}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground mt-2">JPEG or PNG, max 8MB</p>
                        
                        {imageFile && (
                          <div className="mt-3 flex items-center gap-2 p-2 bg-muted rounded-lg">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm flex-1 truncate">{imageFile.name}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setImageFile(null)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="url" className="mt-3">
                      <Input
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Must be a publicly accessible URL (HTTPS)</p>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Image Preview */}
                {(imageUrl || imageFile) && (
                  <div className="relative aspect-square max-w-[200px] rounded-lg overflow-hidden border">
                    <img 
                      src={imageFile ? URL.createObjectURL(imageFile) : imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImageUrl('');
                        setImageFile(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="caption">Caption *</Label>
                  <Textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write your Instagram caption..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{caption.length}/2,200 characters</p>
                </div>
                
                <div>
                  <Label htmlFor="hashtags">Hashtags</Label>
                  <Textarea
                    id="hashtags"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    placeholder="#AIPhotoBooth #EventTech #NYC"
                    rows={2}
                  />
                </div>
                
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
                >
                  {scheduling || uploadingImage ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {uploadingImage ? 'Uploading...' : 'Scheduling...'}</>
                  ) : (
                    <><Calendar className="w-4 h-4 mr-2" /> Schedule Post</>
                  )}
                </Button>
              </div>
            </div>

            {/* Scheduled Posts */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Scheduled Posts ({scheduledPosts.length})
              </h2>
              
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  Loading...
                </div>
              ) : scheduledPosts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No scheduled posts yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {scheduledPosts.map((post) => (
                    <div key={post.id} className="border rounded-xl p-4 bg-background/50">
                      <div className="flex gap-3">
                        {post.image_url && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                            <img 
                              src={post.image_url} 
                              alt="" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusBadge(post.status)}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {post.caption.substring(0, 50)}...
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(post.scheduled_for).toLocaleString()}
                          </p>
                          {post.error_message && (
                            <p className="text-xs text-red-500 mt-1">{post.error_message}</p>
                          )}
                        </div>
                      </div>
                      
                      {post.status === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            onClick={() => handlePublishNow(post)}
                            disabled={publishing === post.id}
                            className="flex-1"
                          >
                            {publishing === post.id ? (
                              <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Publishing...</>
                            ) : (
                              <><Send className="w-3 h-3 mr-1" /> Publish Now</>
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCancelPost(post.id)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      
                      {(post.status === 'cancelled' || post.status === 'failed') && (
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeletePost(post.id)}
                            className="w-full"
                          >
                            <Trash2 className="w-3 h-3 mr-1" /> Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-muted/50 rounded-xl p-6 border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Instagram API Requirements
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Instagram Business or Creator account linked to a Facebook Page</li>
              <li>• Facebook Developer App with Instagram Graph API access</li>
              <li>• Valid long-lived access token with instagram_content_publish permission</li>
              <li>• Images must be publicly accessible via HTTPS URL</li>
              <li>• Supported formats: JPEG (recommended), PNG. Max 8MB.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InstagramSchedulerPage;