import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Image, LogIn, LogOut, Eye, EyeOff, Zap, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import uploadHero from '@/assets/upload-hero.jpg';

interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  event_name: string | null;
  description: string | null;
  tags: string[] | null;
  created_at: string;
  url?: string;
}

const MediaUploadPage = () => {
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
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [optimizingFile, setOptimizingFile] = useState<string | null>(null);
  const { toast } = useToast();

  // Helper to convert base64 data URL to Blob
  const dataUrlToBlob = (dataUrl: string): Blob => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/webp';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Optimize image using the convert-image edge function
  const optimizeImage = async (file: File): Promise<{ blob: Blob; fileName: string } | null> => {
    try {
      // First upload original temporarily to get a URL
      const tempFileName = `temp-${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
      const tempPath = `temp/${tempFileName}`;
      
      const { error: tempUploadError } = await supabase.storage
        .from('event-media')
        .upload(tempPath, file);
      
      if (tempUploadError) {
        console.error('Temp upload failed:', tempUploadError);
        return null;
      }

      // Get signed URL for the temp file
      const { data: urlData } = await supabase.storage
        .from('event-media')
        .createSignedUrl(tempPath, 300); // 5 min expiry

      if (!urlData?.signedUrl) {
        console.error('Failed to get signed URL');
        return null;
      }

      // Call the convert-image function
      const { data, error } = await supabase.functions.invoke('convert-image', {
        body: { 
          imageUrl: urlData.signedUrl, 
          quality: 85, 
          maxWidth: 1920, 
          format: 'webp' 
        }
      });

      // Delete temp file
      await supabase.storage.from('event-media').remove([tempPath]);

      if (error || !data?.success || !data?.optimizedImageUrl) {
        console.error('Optimization failed:', error || data?.error);
        return null;
      }

      // Convert base64 to blob
      const blob = dataUrlToBlob(data.optimizedImageUrl);
      const originalName = file.name.replace(/\.[^/.]+$/, '');
      const newFileName = `${originalName}.webp`;
      
      return { blob, fileName: newFileName };
    } catch (err) {
      console.error('Optimization error:', err);
      return null;
    }
  };

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

  const fetchMedia = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('event_media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error fetching media', description: error.message, variant: 'destructive' });
    } else {
      // Get signed URLs for each file
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
      setFiles(Array.from(e.target.files));
    }
  };

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime'];

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
    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
    const userId = session.user.id;
    let uploadedCount = 0;
    let optimizedCount = 0;

    for (const file of files) {
      // Client-side validation for better UX
      if (file.size > MAX_FILE_SIZE) {
        toast({ title: `${file.name} is too large`, description: 'Maximum file size is 50MB', variant: 'destructive' });
        continue;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({ title: `${file.name} has invalid type`, description: 'Allowed: JPEG, PNG, GIF, WEBP, MP4', variant: 'destructive' });
        continue;
      }

      const isImage = file.type.startsWith('image/') && file.type !== 'image/gif';
      let fileToUpload: Blob | File = file;
      let finalFileName = file.name;
      let finalFileType = file.type;

      // Auto-optimize images (skip GIFs and videos)
      if (autoOptimize && isImage) {
        setOptimizingFile(file.name);
        const optimized = await optimizeImage(file);
        if (optimized) {
          fileToUpload = optimized.blob;
          finalFileName = optimized.fileName;
          finalFileType = 'image/webp';
          optimizedCount++;
        }
        setOptimizingFile(null);
      }

      const fileExt = finalFileName.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      // Store in user-specific folder for RLS security
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('event-media')
        .upload(filePath, fileToUpload, { contentType: finalFileType });

      if (uploadError) {
        toast({ title: `Failed to upload ${file.name}`, description: uploadError.message, variant: 'destructive' });
        continue;
      }

      const { error: dbError } = await supabase.from('event_media').insert({
        file_name: finalFileName,
        file_path: filePath,
        file_type: finalFileType,
        event_name: eventName || null,
        description: description || null,
        tags: tagArray.length > 0 ? tagArray : null,
        user_id: userId,
      });

      if (dbError) {
        toast({ title: `Failed to save ${file.name} metadata`, description: dbError.message, variant: 'destructive' });
      } else {
        uploadedCount++;
      }
    }

    if (uploadedCount > 0) {
      const optimizeMsg = optimizedCount > 0 ? ` (${optimizedCount} optimized to WebP)` : '';
      toast({ title: `${uploadedCount} file(s) uploaded successfully!${optimizeMsg}` });
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

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-2xl p-8 shadow-xl border">
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 shadow-lg">
              <img src={uploadHero} alt="Upload Media" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-bold">Media Upload Portal</h1>
            <p className="text-muted-foreground mt-2">Sign in to upload event photos</p>
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
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Media Upload Portal</h1>
            <p className="text-muted-foreground">Upload event photos from any device</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Upload Form */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload New Media
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="files">Select Images/Videos</Label>
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
                  {files.length} file(s) selected
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="eventName">Event Name (optional)</Label>
              <Input
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., Google Corporate Event 2024"
              />
            </div>
            
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., corporate, photo booth, headshots"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details about this event..."
                rows={3}
              />
            </div>
          </div>
          
          {/* Auto-optimize toggle */}
          <div className="mt-4 flex items-center justify-between p-4 rounded-xl bg-muted/30 border">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Auto-optimize to WebP</p>
                <p className="text-xs text-muted-foreground">
                  Compress images for faster loading (up to 30% smaller)
                </p>
              </div>
            </div>
            <Switch
              checked={autoOptimize}
              onCheckedChange={setAutoOptimize}
            />
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <Button 
              onClick={handleUpload} 
              disabled={uploading || files.length === 0}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {optimizingFile ? `Optimizing ${optimizingFile}...` : 'Uploading...'}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {files.length} File(s)
                </>
              )}
            </Button>
            {autoOptimize && files.length > 0 && files.some(f => f.type.startsWith('image/') && f.type !== 'image/gif') && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-primary" />
                Images will be optimized to WebP
              </p>
            )}
          </div>
        </div>

        {/* Media Gallery */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Image className="w-5 h-5" />
            Uploaded Media ({mediaItems.length})
          </h2>
          
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : mediaItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No media uploaded yet. Start by uploading some photos!
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaItems.map((item) => (
                <div key={item.id} className="relative group rounded-lg overflow-hidden border bg-muted">
                  {item.url && item.file_type?.startsWith('image') ? (
                    <img
                      src={item.url}
                      alt={item.file_name}
                      className="w-full aspect-square object-cover"
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
                    <Button
                      size="icon"
                      variant="destructive"
                      className="self-end"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="text-white text-xs">
                      {item.event_name && <p className="font-semibold">{item.event_name}</p>}
                      <p className="truncate opacity-80">{item.file_name}</p>
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

export default MediaUploadPage;
