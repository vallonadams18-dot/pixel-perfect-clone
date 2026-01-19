import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAdminRole } from '@/hooks/useAdminRole';
import { 
  Upload, 
  Trash2, 
  Image, 
  LogIn, 
  LogOut, 
  Eye, 
  EyeOff, 
  Shield, 
  Search,
  Filter,
  Download,
  Users,
  FileImage,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const PixelAISocialPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useAdminRole();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchMedia();
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchMedia();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Refetch when admin status changes
  useEffect(() => {
    if (session && !adminLoading) {
      fetchMedia();
    }
  }, [isAdmin, adminLoading]);

  const fetchMedia = async () => {
    setLoading(true);
    // Admin sees all media, regular users see only their own
    const { data, error } = await supabase
      .from('event_media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error fetching media', description: error.message, variant: 'destructive' });
      setMediaItems([]);
    } else {
      const mediaWithUrls = await Promise.all(
        (data || []).map(async (item) => {
          const { data: urlData } = await supabase.storage
            .from('event-media')
            .createSignedUrl(item.file_path, 3600);
          return { ...item, url: urlData?.signedUrl };
        })
      );
      setMediaItems(mediaWithUrls);
    }
    setLoading(false);
  };

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
    setMediaItems([]);
    toast({ title: 'Logged out' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // No limit on file selection - unlimited uploads
      setFiles(Array.from(e.target.files));
    }
  };

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime'];

  const generateSEOFilename = (originalName: string, eventName: string, index: number): string => {
    const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg';
    const sanitizedEvent = eventName
      ? eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').trim()
      : 'pixelai-event';
    const timestamp = Date.now();
    // SEO optimized filename format
    return `pixelai-pro-${sanitizedEvent}-${index + 1}-${timestamp}.${ext}`;
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({ title: 'No files selected', variant: 'destructive' });
      return;
    }

    if (!session?.user?.id) {
      toast({ title: 'You must be logged in to upload', variant: 'destructive' });
      return;
    }

    setUploading(true);
    // SEO optimized tags
    const baseTagArray = tags.split(',').map(t => t.trim()).filter(t => t);
    const seoTags = [
      ...baseTagArray,
      'AI photo booth',
      'corporate event',
      'brand activation',
      'NYC events',
      'PixelAI Pro'
    ].filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates

    const userId = session.user.id;
    let uploadedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Client-side validation
      if (file.size > MAX_FILE_SIZE) {
        toast({ title: `${file.name} is too large`, description: 'Maximum file size is 50MB', variant: 'destructive' });
        continue;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({ title: `${file.name} has invalid type`, description: 'Allowed: JPEG, PNG, GIF, WEBP, MP4', variant: 'destructive' });
        continue;
      }

      // SEO optimized filename
      const seoFileName = generateSEOFilename(file.name, eventName, i);
      const filePath = `${userId}/${seoFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('event-media')
        .upload(filePath, file);

      if (uploadError) {
        toast({ title: `Failed to upload ${file.name}`, description: uploadError.message, variant: 'destructive' });
        continue;
      }

      // SEO optimized description
      const seoDescription = description 
        ? `${description} | AI Photo Booth Experience by PixelAI Pro NYC`
        : `Professional AI photo booth experience at ${eventName || 'corporate event'} by PixelAI Pro - Premium AI-powered photography for brand activations and corporate events in NYC.`;

      const { error: dbError } = await supabase.from('event_media').insert({
        file_name: seoFileName,
        file_path: filePath,
        file_type: file.type,
        event_name: eventName || 'PixelAI Pro Event',
        description: seoDescription,
        tags: seoTags,
        user_id: userId,
      });

      if (dbError) {
        toast({ title: `Failed to save ${file.name} metadata`, description: dbError.message, variant: 'destructive' });
      } else {
        uploadedCount++;
      }
    }

    if (uploadedCount > 0) {
      toast({ title: `${uploadedCount} file(s) uploaded with SEO optimization!` });
    }
    setFiles([]);
    setEventName('');
    setDescription('');
    setTags('');
    fetchMedia();
    setUploading(false);
  };

  const handleDelete = async (item: MediaItem) => {
    const { error: storageError } = await supabase.storage
      .from('event-media')
      .remove([item.file_path]);

    if (storageError) {
      toast({ title: 'Failed to delete file', description: storageError.message, variant: 'destructive' });
      return;
    }

    const { error: dbError } = await supabase
      .from('event_media')
      .delete()
      .eq('id', item.id);

    if (dbError) {
      toast({ title: 'Failed to delete record', description: dbError.message, variant: 'destructive' });
      return;
    }

    toast({ title: 'File deleted' });
    fetchMedia();
  };

  const handleDownload = async (item: MediaItem) => {
    if (!item.url) return;
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter media based on search and type
  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.event_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || 
      (filterType === 'image' && item.file_type?.startsWith('image')) ||
      (filterType === 'video' && item.file_type?.startsWith('video'));

    return matchesSearch && matchesType;
  });

  // Stats for admin
  const stats = {
    total: mediaItems.length,
    images: mediaItems.filter(m => m.file_type?.startsWith('image')).length,
    videos: mediaItems.filter(m => m.file_type?.startsWith('video')).length,
    uniqueUsers: new Set(mediaItems.map(m => m.user_id)).size,
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-2xl p-8 shadow-xl border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">PixelAI Social</h1>
            <p className="text-muted-foreground mt-2">SEO-Optimized Content Management</p>
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
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
              <FileImage className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                PixelAI Social
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground">
                {isAdmin ? 'Admin Dashboard - Manage all media' : 'Upload SEO-optimized event content'}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Admin Stats */}
        {isAdmin && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <FileImage className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Files</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.images}</p>
                  <p className="text-sm text-muted-foreground">Images</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.videos}</p>
                  <p className="text-sm text-muted-foreground">Videos</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.uniqueUsers}</p>
                  <p className="text-sm text-muted-foreground">Contributors</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload SEO-Optimized Media
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Unlimited</span>
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="files">Select Images/Videos (No Limit)</Label>
              <Input
                id="files"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {files.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {files.length} file(s) selected - will be renamed with SEO-optimized filenames
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="eventName">Event Name (for SEO filename)</Label>
              <Input
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., Google Corporate Summit 2025"
              />
            </div>
            
            <div>
              <Label htmlFor="tags">Additional Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., headshots, team building, tech industry"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Auto-added: AI photo booth, corporate event, brand activation, NYC events, PixelAI Pro
              </p>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="description">Description (SEO optimized automatically)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description - will be enhanced with SEO keywords..."
                rows={2}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleUpload} 
            disabled={uploading || files.length === 0}
            className="mt-4"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : `Upload ${files.length} File(s) with SEO`}
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by filename, event, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Media Gallery */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Image className="w-5 h-5" />
            {isAdmin ? 'All Media' : 'Your Media'} ({filteredMedia.length})
          </h2>
          
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery || filterType !== 'all' 
                ? 'No media matches your filters' 
                : 'No media uploaded yet. Start by uploading some photos!'}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div key={item.id} className="relative group rounded-lg overflow-hidden border bg-muted">
                  {item.url && item.file_type?.startsWith('image') ? (
                    <img
                      src={item.url}
                      alt={item.file_name}
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                  ) : item.url && item.file_type?.startsWith('video') ? (
                    <video
                      src={item.url}
                      className="w-full aspect-square object-cover"
                      controls
                    />
                  ) : (
                    <div className="w-full aspect-square flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => handleDownload(item)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-white text-xs space-y-1">
                      {item.event_name && <p className="font-semibold">{item.event_name}</p>}
                      <p className="truncate opacity-80">{item.file_name}</p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PixelAISocialPage;
