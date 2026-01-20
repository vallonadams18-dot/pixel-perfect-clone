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
  Download, Grid, List, LayoutGrid, Wand2, Wifi, WifiOff,
  Settings, Save, Key, Zap, Users, UserCheck, Filter, CheckCircle2, Mail
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import StylePreviewThumbnails, { styleOptions } from '@/components/StylePreviewThumbnails';
import PromptHistory, { addPromptToHistory } from '@/components/PromptHistory';
import ImageConverter from '@/components/ImageConverter';
import { useAdminRole } from '@/hooks/useAdminRole';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

interface Lead {
  id: string;
  email: string;
  source: string;
  experience_type: string | null;
  first_seen_at: string;
  last_interaction_at: string;
  total_demos_used: number;
  converted: boolean;
  notes: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
}

const EXPERIENCE_OPTIONS = [
  { value: 'all', label: 'All Sources' },
  { value: 'pixelwear', label: 'PixelWear' },
  { value: 'trading-cards', label: 'Trading Cards' },
  { value: 'headshots', label: 'Headshots' },
  { value: 'persona-pop', label: 'Persona Pop' },
  { value: 'co-star', label: 'Co-Star' },
  { value: 'video-booths', label: 'Video Booths' },
  { value: 'axon-ai', label: 'Axon AI' },
  { value: 'identity', label: 'Identity' },
];

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
  retry_count: number;
  next_retry_at: string | null;
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
  const { isAdmin } = useAdminRole();
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
  
  // AI image transformation state
  const [transformingImage, setTransformingImage] = useState(false);
  const [selectedTransformStyle, setSelectedTransformStyle] = useState<string>('');
  const [customStylePrompt, setCustomStylePrompt] = useState<string>('');
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [transformedPreview, setTransformedPreview] = useState<string>('');
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [savingToLibrary, setSavingToLibrary] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini' | 'chatgpt'>('gemini');
  const [batchSelectedModel, setBatchSelectedModel] = useState<'gemini' | 'chatgpt'>('gemini');
  
  // Model comparison state
  const [compareMode, setCompareMode] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<{
    gemini: { url: string; success: boolean; error?: string } | null;
    chatgpt: { url: string; success: boolean; error?: string } | null;
  }>({ gemini: null, chatgpt: null });
  const [savingComparisonResult, setSavingComparisonResult] = useState<'gemini' | 'chatgpt' | null>(null);
  
  // Fallback info state
  const [fallbackInfo, setFallbackInfo] = useState<{
    usedFallback: boolean;
    originalModel: string;
    actualModel: string;
    reason?: string;
  } | null>(null);
  
  // Batch transformation state
  const [batchMode, setBatchMode] = useState(false);
  const [selectedBatchItems, setSelectedBatchItems] = useState<Set<string>>(new Set());
  const [batchTransformStyle, setBatchTransformStyle] = useState<string>('');
  const [batchCustomPrompt, setBatchCustomPrompt] = useState<string>('');
  const [batchTransforming, setBatchTransforming] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [batchResults, setBatchResults] = useState<Array<{ id: string; original: string; transformed: string; success: boolean }>>([]);
  
  // Main panel tab
  const [mainTab, setMainTab] = useState<'library' | 'scheduler' | 'posts' | 'settings' | 'optimize' | 'leads'>('library');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Auto-scheduling state
  const [autoScheduling, setAutoScheduling] = useState(false);
  const [autoScheduleProgress, setAutoScheduleProgress] = useState({ current: 0, total: 0 });
  
  // Instagram credentials state
  const [instagramToken, setInstagramToken] = useState('');
  const [instagramAccountId, setInstagramAccountId] = useState('');
  const [savingCredentials, setSavingCredentials] = useState(false);
  const [credentialsLoaded, setCredentialsLoaded] = useState(false);
  const [showToken, setShowToken] = useState(false);
  
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
  
  // Leads management state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsSearchQuery, setLeadsSearchQuery] = useState('');
  const [leadsSourceFilter, setLeadsSourceFilter] = useState('all');
  const [leadsConvertedFilter, setLeadsConvertedFilter] = useState<'all' | 'converted' | 'not-converted'>('all');
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();

  // Helper: convert blob/file URL to data URL (base64) so the edge function can read it
  const toDataUrl = async (blobOrUrl: string | File): Promise<string> => {
    if (blobOrUrl instanceof File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blobOrUrl);
      });
    }
    if (typeof blobOrUrl === 'string') {
      if (blobOrUrl.startsWith('data:')) return blobOrUrl;
      if (blobOrUrl.startsWith('blob:')) {
        const resp = await fetch(blobOrUrl);
        const blob = await resp.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
    }
    return blobOrUrl as string; // already https URL – return as-is
  };

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

  // Leads stats
  const leadsStats = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter(l => l.converted).length;
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0';
    const uniqueSources = new Set(leads.map(l => l.source)).size;
    const totalDemos = leads.reduce((acc, l) => acc + (l.total_demos_used || 0), 0);
    return { total, converted, conversionRate, uniqueSources, totalDemos };
  }, [leads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.email.toLowerCase().includes(leadsSearchQuery.toLowerCase()) ||
        lead.source?.toLowerCase().includes(leadsSearchQuery.toLowerCase()) ||
        lead.referrer?.toLowerCase().includes(leadsSearchQuery.toLowerCase());
      const matchesSource = leadsSourceFilter === 'all' || lead.source === leadsSourceFilter;
      const matchesConverted = 
        leadsConvertedFilter === 'all' ||
        (leadsConvertedFilter === 'converted' && lead.converted) ||
        (leadsConvertedFilter === 'not-converted' && !lead.converted);
      return matchesSearch && matchesSource && matchesConverted;
    });
  }, [leads, leadsSearchQuery, leadsSourceFilter, leadsConvertedFilter]);

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
        fetchInstagramCredentials();
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
        fetchInstagramCredentials();
        setDefaultSchedule();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch leads when admin
  useEffect(() => {
    if (session && isAdmin) {
      fetchLeads();
    }
  }, [session, isAdmin]);
  
  const fetchInstagramCredentials = async () => {
    try {
      const { data, error } = await supabase
        .from('instagram_credentials')
        .select('access_token, business_account_id')
        .limit(1)
        .single();
      
      if (data && !error) {
        // Mask the token for display (show first 10 and last 4 chars)
        const maskedToken = data.access_token.length > 20 
          ? `${data.access_token.substring(0, 10)}...${data.access_token.substring(data.access_token.length - 4)}`
          : '••••••••';
        setInstagramToken(maskedToken);
        setInstagramAccountId(data.business_account_id);
        setCredentialsLoaded(true);
      }
    } catch (error) {
      console.log('No credentials found or not admin');
    }
  };

  const handleSaveCredentials = async () => {
    if (!instagramToken || !instagramAccountId) {
      toast({ title: 'Missing fields', description: 'Please enter both token and account ID', variant: 'destructive' });
      return;
    }
    
    // Don't save masked tokens
    if (instagramToken.includes('...') || instagramToken.includes('••')) {
      toast({ title: 'Enter new token', description: 'Please enter a new access token', variant: 'destructive' });
      return;
    }
    
    setSavingCredentials(true);
    
    try {
      // Check if credentials exist
      const { data: existing } = await supabase
        .from('instagram_credentials')
        .select('id')
        .limit(1)
        .single();
      
      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('instagram_credentials')
          .update({
            access_token: instagramToken.trim(),
            business_account_id: instagramAccountId.trim(),
            updated_by: session?.user?.id,
          })
          .eq('id', existing.id);
        
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('instagram_credentials')
          .insert({
            access_token: instagramToken.trim(),
            business_account_id: instagramAccountId.trim(),
            updated_by: session?.user?.id,
          });
        
        if (error) throw error;
      }
      
      toast({ title: 'Credentials saved!', description: 'Testing connection...' });
      
      // Mask the saved token
      const maskedToken = `${instagramToken.substring(0, 10)}...${instagramToken.substring(instagramToken.length - 4)}`;
      setInstagramToken(maskedToken);
      setCredentialsLoaded(true);
      
      // Test connection
      handleTestConnection();
    } catch (error: any) {
      toast({ title: 'Failed to save', description: error.message, variant: 'destructive' });
    } finally {
      setSavingCredentials(false);
    }
  };

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

  const fetchLeads = async () => {
    if (!isAdmin) return;
    setLeadsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleToggleLeadConverted = async (lead: Lead) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ converted: !lead.converted })
        .eq('id', lead.id);

      if (error) throw error;
      
      setLeads(prev => prev.map(l => 
        l.id === lead.id ? { ...l, converted: !l.converted } : l
      ));
      
      toast({ 
        title: lead.converted ? 'Marked as not converted' : 'Marked as converted'
      });
    } catch (error: any) {
      toast({ title: 'Failed to update lead', variant: 'destructive' });
    }
  };

  const handleSelectAllLeads = () => {
    if (selectedLeadIds.size === filteredLeads.length) {
      setSelectedLeadIds(new Set());
    } else {
      setSelectedLeadIds(new Set(filteredLeads.map(l => l.id)));
    }
  };

  const handleSelectLead = (id: string) => {
    setSelectedLeadIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const exportLeadsToCSV = (leadsToExport: Lead[]) => {
    if (leadsToExport.length === 0) {
      toast({ title: 'No leads to export', variant: 'destructive' });
      return;
    }

    const headers = [
      'Email', 'Source', 'First Seen', 'Last Interaction', 
      'Demos Used', 'Converted', 'Referrer', 'Notes'
    ];

    const rows = leadsToExport.map(lead => [
      lead.email,
      lead.source,
      format(new Date(lead.first_seen_at), 'yyyy-MM-dd HH:mm'),
      format(new Date(lead.last_interaction_at), 'yyyy-MM-dd HH:mm'),
      lead.total_demos_used.toString(),
      lead.converted ? 'Yes' : 'No',
      lead.referrer || '',
      lead.notes || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-export-${format(new Date(), 'yyyy-MM-dd-HHmm')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({ title: `Exported ${leadsToExport.length} leads to CSV` });
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

  // AI Image Transformation
  const handleTransformImage = async () => {
    // Use file if available, else fallback to stored URL
    const rawSource = imageFile || imageUrl;

    if (!rawSource) {
      toast({ title: 'No image selected', description: 'Select an image first to transform', variant: 'destructive' });
      return;
    }
    
    if (!selectedTransformStyle) {
      toast({ title: 'Select a style', description: 'Choose a transformation style', variant: 'destructive' });
      return;
    }

    // Validate custom prompt required for custom style
    if (selectedTransformStyle === 'custom' && !customStylePrompt.trim()) {
      toast({ title: 'Custom prompt required', description: 'Describe the style you want', variant: 'destructive' });
      return;
    }

    // Validate custom prompt length
    if (customStylePrompt && customStylePrompt.length > 1000) {
      toast({ title: 'Prompt too long', description: 'Max 1000 characters', variant: 'destructive' });
      return;
    }
    
    if (!session?.access_token) {
      toast({ title: 'Please log in', variant: 'destructive' });
      return;
    }

    // Convert blob/file to data URL so edge function can read it
    let imageUrlToSend: string;
    try {
      imageUrlToSend = await toDataUrl(rawSource);
    } catch (e) {
      console.error('Failed to convert image:', e);
      toast({ title: 'Could not read image', variant: 'destructive' });
      return;
    }
    
    // Store original if not already stored
    if (!originalImageUrl) {
      setOriginalImageUrl(typeof rawSource === 'string' ? rawSource : URL.createObjectURL(rawSource));
    }
    
    setTransformingImage(true);
    setLastApiCall({ function: 'transform-image-style', status: 'pending', message: 'Transforming...', timestamp: new Date() });
    
    try {
      const { data, error } = await supabase.functions.invoke('transform-image-style', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: {
          imageUrl: imageUrlToSend,
          style: selectedTransformStyle,
          customPrompt: customStylePrompt.trim() || undefined,
          model: selectedModel,
        },
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setTransformedPreview(data.imageUrl);
        setImageUrl(data.imageUrl);
        setImageFile(null);
        
        // Track fallback info if applicable
        if (data?.usedFallback) {
          setFallbackInfo({
            usedFallback: true,
            originalModel: data.originalModel,
            actualModel: data.actualModel,
            reason: data.fallbackReason,
          });
        } else {
          setFallbackInfo(null);
        }
        
        // Also set the service for caption generation
        setSelectedService(selectedTransformStyle.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
      }

      // Save prompt to history if custom
      if (customStylePrompt.trim()) {
        addPromptToHistory(customStylePrompt.trim(), selectedTransformStyle === 'custom' ? 'custom' : selectedTransformStyle);
      }

      const modelLabel = data?.usedFallback ? 'Nano Banana (fallback)' : (selectedModel === 'gemini' ? 'Nano Banana' : 'ChatGPT');
      setLastApiCall({ function: 'transform-image-style', status: 'success', message: `Transformed to ${selectedTransformStyle} via ${modelLabel}`, timestamp: new Date() });
      toast({ 
        title: data?.usedFallback ? 'Image transformed (fallback used)' : 'Image transformed!', 
        description: data?.usedFallback 
          ? `ChatGPT failed, used Nano Banana instead`
          : `Applied ${selectedTransformStyle} style` 
      });
    } catch (error: any) {
      console.error('Transform error:', error);
      setLastApiCall({ function: 'transform-image-style', status: 'error', message: error.message || 'Transform failed', timestamp: new Date() });
      toast({ 
        title: 'Transform failed', 
        description: error.message || 'Could not transform image', 
        variant: 'destructive' 
      });
    } finally {
      setTransformingImage(false);
    }
  };

  const handleRevertTransform = () => {
    if (originalImageUrl) {
      setImageUrl(originalImageUrl);
      setTransformedPreview('');
      setShowBeforeAfter(false);
      setComparisonResults({ gemini: null, chatgpt: null });
      setFallbackInfo(null);
      toast({ title: 'Reverted to original' });
    }
  };

  // Compare both models side-by-side
  const handleCompareModels = async () => {
    const rawSource = imageFile || imageUrl;
    
    if (!rawSource) {
      toast({ title: 'No image selected', description: 'Select an image first to compare', variant: 'destructive' });
      return;
    }
    
    if (!selectedTransformStyle) {
      toast({ title: 'Select a style', description: 'Choose a transformation style', variant: 'destructive' });
      return;
    }

    if (selectedTransformStyle === 'custom' && !customStylePrompt.trim()) {
      toast({ title: 'Custom prompt required', description: 'Describe the style you want', variant: 'destructive' });
      return;
    }
    
    if (!session?.access_token) {
      toast({ title: 'Please log in', variant: 'destructive' });
      return;
    }

    // Convert blob/file to data URL
    let imageUrlToSend: string;
    try {
      imageUrlToSend = await toDataUrl(rawSource);
    } catch (e) {
      console.error('Failed to convert image:', e);
      toast({ title: 'Could not read image', variant: 'destructive' });
      return;
    }
    
    // Store original if not already stored
    if (!originalImageUrl) {
      setOriginalImageUrl(typeof rawSource === 'string' ? rawSource : URL.createObjectURL(rawSource));
    }
    
    setComparing(true);
    setComparisonResults({ gemini: null, chatgpt: null });
    setLastApiCall({ function: 'compare-models', status: 'pending', message: 'Comparing both models...', timestamp: new Date() });
    
    // Run both models in parallel
    const [geminiResult, chatgptResult] = await Promise.allSettled([
      supabase.functions.invoke('transform-image-style', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: {
          imageUrl: imageUrlToSend,
          style: selectedTransformStyle,
          customPrompt: customStylePrompt.trim() || undefined,
          model: 'gemini',
        },
      }),
      supabase.functions.invoke('transform-image-style', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: {
          imageUrl: imageUrlToSend,
          style: selectedTransformStyle,
          customPrompt: customStylePrompt.trim() || undefined,
          model: 'chatgpt',
        },
      }),
    ]);
    
    const results = {
      gemini: geminiResult.status === 'fulfilled' && geminiResult.value.data?.imageUrl 
        ? { url: geminiResult.value.data.imageUrl, success: true }
        : { url: '', success: false, error: geminiResult.status === 'rejected' ? geminiResult.reason?.message : 'Generation failed' },
      chatgpt: chatgptResult.status === 'fulfilled' && chatgptResult.value.data?.imageUrl
        ? { url: chatgptResult.value.data.imageUrl, success: true }
        : { url: '', success: false, error: chatgptResult.status === 'rejected' ? chatgptResult.reason?.message : 'Generation failed' },
    };
    
    setComparisonResults(results);
    
    // Save prompt to history if custom
    if (customStylePrompt.trim()) {
      addPromptToHistory(customStylePrompt.trim(), selectedTransformStyle === 'custom' ? 'custom' : selectedTransformStyle);
    }
    
    const successCount = [results.gemini.success, results.chatgpt.success].filter(Boolean).length;
    setLastApiCall({ 
      function: 'compare-models', 
      status: successCount >= 1 ? 'success' : 'error', 
      message: `${successCount}/2 models succeeded`, 
      timestamp: new Date() 
    });
    
    toast({ 
      title: 'Comparison complete!', 
      description: `${successCount}/2 models generated results` 
    });
    
    setComparing(false);
  };

  // Select a result from comparison to use
  const handleSelectComparisonResult = (model: 'gemini' | 'chatgpt') => {
    const result = comparisonResults[model];
    if (result?.success && result.url) {
      setTransformedPreview(result.url);
      setImageUrl(result.url);
      setImageFile(null);
      setSelectedModel(model);
      setComparisonResults({ gemini: null, chatgpt: null });
      toast({ title: `Selected ${model === 'gemini' ? 'Nano Banana' : 'ChatGPT'} result` });
    }
  };

  // Save a specific comparison result to library
  const handleSaveComparisonToLibrary = async (model: 'gemini' | 'chatgpt', e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the select action
    
    const result = comparisonResults[model];
    if (!result?.success || !result.url || !session?.user?.id) {
      toast({ title: 'Cannot save', description: 'No valid result to save', variant: 'destructive' });
      return;
    }
    
    setSavingComparisonResult(model);
    
    try {
      const response = await fetch(result.url);
      const blob = await response.blob();
      
      const timestamp = Date.now();
      const modelName = model === 'gemini' ? 'nanobanana' : 'chatgpt';
      const fileName = `ai-${modelName}-${selectedTransformStyle}-${timestamp}.jpg`;
      const filePath = `${session.user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('event-media')
        .upload(filePath, blob, { contentType: 'image/jpeg' });
      
      if (uploadError) throw uploadError;
      
      const { error: insertError } = await supabase
        .from('event_media')
        .insert({
          file_name: fileName,
          file_path: filePath,
          file_type: 'image/jpeg',
          event_name: `AI ${model === 'gemini' ? 'Nano Banana' : 'ChatGPT'} - ${selectedTransformStyle}`,
          description: `AI transformed image with ${selectedTransformStyle} style using ${model === 'gemini' ? 'Nano Banana' : 'ChatGPT'}`,
          tags: ['ai-transformed', selectedTransformStyle, modelName, 'comparison-result'],
          user_id: session.user.id,
        });
      
      if (insertError) throw insertError;
      
      toast({ title: 'Saved!', description: `${model === 'gemini' ? 'Nano Banana' : 'ChatGPT'} result saved to library` });
      fetchMediaLibrary();
    } catch (error: any) {
      console.error('Save comparison to library error:', error);
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } finally {
      setSavingComparisonResult(null);
    }
  };

  // Save transformed image to Content Library
  const handleSaveToLibrary = async () => {
    if (!transformedPreview || !session?.user?.id) {
      toast({ title: 'No transformed image', description: 'Transform an image first', variant: 'destructive' });
      return;
    }
    
    setSavingToLibrary(true);
    
    try {
      const response = await fetch(transformedPreview);
      const blob = await response.blob();
      
      const timestamp = Date.now();
      const fileName = `ai-transformed-${selectedTransformStyle}-${timestamp}.jpg`;
      const filePath = `${session.user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('event-media')
        .upload(filePath, blob, { contentType: 'image/jpeg' });
      
      if (uploadError) throw uploadError;
      
      const { error: insertError } = await supabase
        .from('event_media')
        .insert({
          file_name: fileName,
          file_path: filePath,
          file_type: 'image/jpeg',
          event_name: `AI Transform - ${selectedTransformStyle}`,
          description: `AI transformed image with ${selectedTransformStyle} style`,
          tags: ['ai-transformed', selectedTransformStyle, 'pixelai-pro'],
          user_id: session.user.id,
        });
      
      if (insertError) throw insertError;
      
      toast({ title: 'Saved to library!', description: 'Image added to your Content Library' });
      fetchMediaLibrary();
    } catch (error: any) {
      console.error('Save to library error:', error);
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } finally {
      setSavingToLibrary(false);
    }
  };

  const toggleBatchItem = (itemId: string) => {
    setSelectedBatchItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedBatchItems.size === filteredMediaItems.length) {
      setSelectedBatchItems(new Set());
    } else {
      setSelectedBatchItems(new Set(filteredMediaItems.map(item => item.id)));
    }
  };

  const handleBatchTransform = async () => {
    if (selectedBatchItems.size === 0) {
      toast({ title: 'No images selected', description: 'Select images to transform', variant: 'destructive' });
      return;
    }
    if (!batchTransformStyle) {
      toast({ title: 'Select a style', description: 'Choose a transformation style', variant: 'destructive' });
      return;
    }
    if (!session?.access_token) {
      toast({ title: 'Please log in', variant: 'destructive' });
      return;
    }
    
    const selectedItems = filteredMediaItems.filter(item => selectedBatchItems.has(item.id));
    setBatchTransforming(true);
    setBatchProgress({ current: 0, total: selectedItems.length });
    setBatchResults([]);
    
    const results: Array<{ id: string; original: string; transformed: string; success: boolean }> = [];
    
    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      setBatchProgress({ current: i + 1, total: selectedItems.length });
      
      try {
        const { data, error } = await supabase.functions.invoke('transform-image-style', {
          headers: { Authorization: `Bearer ${session.access_token}` },
          body: { 
            imageUrl: item.url, 
            style: batchTransformStyle,
            customPrompt: batchTransformStyle === 'custom' ? batchCustomPrompt.trim() : undefined,
            model: batchSelectedModel,
          },
        });

        if (error) throw error;

        if (data?.imageUrl) {
          results.push({ id: item.id, original: item.url || '', transformed: data.imageUrl, success: true });
          
          const timestamp = Date.now();
          const fileName = `batch-${batchTransformStyle}-${timestamp}-${i}.jpg`;
          const filePath = `${session.user.id}/${fileName}`;
          
          const response = await fetch(data.imageUrl);
          const blob = await response.blob();
          
          await supabase.storage.from('event-media').upload(filePath, blob, { contentType: 'image/jpeg' });
          await supabase.from('event_media').insert({
            file_name: fileName,
            file_path: filePath,
            file_type: 'image/jpeg',
            event_name: `Batch Transform - ${batchTransformStyle}`,
            description: `Batch AI transformed from ${item.file_name}`,
            tags: ['ai-transformed', 'batch', batchTransformStyle],
            user_id: session.user.id,
          });
        } else {
          results.push({ id: item.id, original: item.url || '', transformed: '', success: false });
        }
      } catch (error) {
        console.error(`Batch transform error for ${item.id}:`, error);
        results.push({ id: item.id, original: item.url || '', transformed: '', success: false });
      }
    }
    
    setBatchResults(results);
    setBatchTransforming(false);
    
    const successCount = results.filter(r => r.success).length;
    toast({ title: 'Batch complete!', description: `${successCount}/${results.length} images transformed and saved` });
    fetchMediaLibrary();
    setSelectedBatchItems(new Set());
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
      case 'retrying':
        return <Badge variant="outline" className="text-orange-600 border-orange-300"><RefreshCw size={12} className="mr-1 animate-spin" /> Retrying</Badge>;
      case 'cancelled':
        return <Badge variant="secondary"><AlertCircle size={12} className="mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatTimeUntil = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    
    if (diffMs < 0) return 'now';
    if (diffMs < 60000) return 'less than a minute';
    
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  // Content calendar schedule configuration
  const contentCalendar = [
    { day: 1, name: 'Monday', time: '11:00', type: 'Transformation Post', tag: 'transformation' },
    { day: 2, name: 'Tuesday', time: '12:00', type: 'Behind the Scenes', tag: 'bts' },
    { day: 3, name: 'Wednesday', time: '19:00', type: 'Client Spotlight', tag: 'spotlight' },
    { day: 4, name: 'Thursday', time: '13:00', type: 'Industry Tips', tag: 'tips' },
    { day: 5, name: 'Friday', time: '20:00', type: 'Fun / Trending', tag: 'trending' },
    { day: 0, name: 'Sunday', time: '18:00', type: 'Week Ahead Preview', tag: 'preview' },
  ];

  // Get next occurrence of a specific day of week
  const getNextDayOfWeek = (dayOfWeek: number, time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const result = new Date(now);
    result.setHours(hours, minutes, 0, 0);
    
    const daysUntil = (dayOfWeek - now.getDay() + 7) % 7 || 7;
    result.setDate(now.getDate() + daysUntil);
    
    return result;
  };

  // Auto-schedule posts for the week based on content calendar
  const handleAutoScheduleWeek = async () => {
    if (!session?.user?.id || !session?.access_token) {
      toast({ title: 'Please log in first', variant: 'destructive' });
      return;
    }

    // Get unused images from the library
    const unusedImages = filteredMediaItems.filter(item => !item.isUsed && item.url);
    
    if (unusedImages.length < contentCalendar.length) {
      toast({ 
        title: 'Not enough images', 
        description: `Need at least ${contentCalendar.length} unused images in library`, 
        variant: 'destructive' 
      });
      return;
    }

    setAutoScheduling(true);
    setAutoScheduleProgress({ current: 0, total: contentCalendar.length });
    
    let scheduled = 0;
    
    try {
      for (let i = 0; i < contentCalendar.length; i++) {
        const calendarItem = contentCalendar[i];
        const image = unusedImages[i];
        
        setAutoScheduleProgress({ current: i + 1, total: contentCalendar.length });
        
        // Copy image to instagram-images bucket
        const response = await fetch(image.url!);
        const blob = await response.blob();
        
        const timestamp = Date.now();
        const ext = image.file_name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `auto-${calendarItem.tag}-${timestamp}.${ext}`;
        const filePath = `${session.user.id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('instagram-images')
          .upload(filePath, blob, { contentType: image.file_type || 'image/jpeg' });
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }
        
        const { data: publicUrlData } = supabase.storage
          .from('instagram-images')
          .getPublicUrl(filePath);
        
        // Generate AI caption for this content type
        let caption = '';
        let hashtags = '';
        
        try {
          const { data: captionData } = await supabase.functions.invoke('generate-instagram-caption', {
            headers: { Authorization: `Bearer ${session.access_token}` },
            body: {
              imageDescription: image.description || image.event_name || 'AI photo booth transformation',
              eventName: image.event_name || '',
              service: 'AI Photo Booths',
              tone: calendarItem.tag === 'trending' ? 'playful' : calendarItem.tag === 'spotlight' ? 'professional' : 'engaging',
              includeHashtags: true,
              contentType: calendarItem.type,
            },
          });
          
          if (captionData?.caption) {
            caption = captionData.caption;
            hashtags = captionData.hashtags || '';
          }
        } catch (error) {
          console.error('Caption generation failed:', error);
          caption = `✨ ${calendarItem.type}\n\n📸 Check out this amazing moment!\n\n#PixelAIPro #AIPhotoBooth #NYC`;
        }
        
        const scheduledFor = getNextDayOfWeek(calendarItem.day, calendarItem.time);
        const fullCaption = hashtags ? `${caption}\n\n${hashtags}` : caption;
        
        const { error: insertError } = await supabase.from('scheduled_posts').insert({
          user_id: session.user.id,
          image_url: publicUrlData.publicUrl,
          caption: fullCaption,
          hashtags: hashtags || null,
          scheduled_for: scheduledFor.toISOString(),
          status: 'pending',
        });
        
        if (!insertError) {
          scheduled++;
        }
      }
      
      toast({ 
        title: '📅 Week Scheduled!', 
        description: `${scheduled} posts auto-scheduled based on your content calendar` 
      });
      
      fetchScheduledPosts();
      fetchMediaLibrary();
      setMainTab('posts');
    } catch (error: any) {
      toast({ title: 'Auto-schedule failed', description: error.message, variant: 'destructive' });
    } finally {
      setAutoScheduling(false);
      setAutoScheduleProgress({ current: 0, total: 0 });
    }
  };

  const handleRetryPost = async (post: ScheduledPost) => {
    // Reset the post to pending state
    const { error } = await supabase
      .from('scheduled_posts')
      .update({
        status: 'pending',
        error_message: null,
        retry_count: 0,
        next_retry_at: null,
      })
      .eq('id', post.id);
    
    if (error) {
      toast({ title: 'Failed to reset post', description: error.message, variant: 'destructive' });
      return;
    }
    
    toast({ title: 'Post reset', description: 'Attempting to publish...' });
    await fetchScheduledPosts();
    
    // Immediately attempt to publish
    handlePublishNow({ ...post, status: 'pending', error_message: null, retry_count: 0, next_retry_at: null });
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

          {/* Auto-Schedule Banner */}
          <div className="mb-6 bg-gradient-to-r from-primary/10 via-background to-secondary/10 rounded-2xl border-2 border-primary/20 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">📅 Auto-Schedule Week</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically schedule posts based on your content calendar (Mon-Sun)
                  </p>
                </div>
              </div>
              <Button
                onClick={handleAutoScheduleWeek}
                disabled={autoScheduling || filteredMediaItems.filter(i => !i.isUsed).length < 6}
                className="bg-primary hover:bg-primary/90 min-w-[180px]"
              >
                {autoScheduling ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scheduling {autoScheduleProgress.current}/{autoScheduleProgress.total}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Auto-Schedule Week
                  </>
                )}
              </Button>
            </div>
            {filteredMediaItems.filter(i => !i.isUsed).length < 6 && (
              <p className="text-xs text-destructive mt-3">
                ⚠️ Need at least 6 unused images in library. You have {filteredMediaItems.filter(i => !i.isUsed).length}.
              </p>
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
              <p className="text-2xl font-bold text-amber-500">{scheduledPosts.filter(p => p.status === 'pending').length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border">
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-2xl font-bold text-emerald-500">{scheduledPosts.filter(p => p.status === 'published').length}</p>
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
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="library" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Library</span>
                <Badge variant="secondary" className="ml-1 hidden md:inline-flex">{mediaItems.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="scheduler" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Schedule</span>
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Posts</span>
                <Badge variant="secondary" className="ml-1 hidden md:inline-flex">{scheduledPosts.filter(p => p.status === 'pending').length}</Badge>
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="leads" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Leads</span>
                  <Badge variant="secondary" className="ml-1 hidden md:inline-flex">{leads.length}</Badge>
                </TabsTrigger>
              )}
              <TabsTrigger value="optimize" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Optimize</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
                {connectionStatus === 'error' && (
                  <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                )}
              </TabsTrigger>
            </TabsList>

            {/* Content Library Tab */}
            <TabsContent value="library">
              <div className="bg-card rounded-2xl border p-6">
                {/* Search & Controls */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
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
                        variant={batchMode ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setBatchMode(!batchMode);
                          setSelectedBatchItems(new Set());
                          setBatchResults([]);
                        }}
                      >
                        <Wand2 className="w-4 h-4 mr-2" />
                        Batch Transform
                      </Button>
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

                  {/* Batch Mode Controls */}
                  {batchMode && (
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={toggleSelectAll}
                            >
                              {selectedBatchItems.size === filteredMediaItems.length ? 'Deselect All' : 'Select All'}
                            </Button>
                            <Badge variant="secondary">{selectedBatchItems.size} selected</Badge>
                          </div>
                          
                          <Button
                            onClick={handleBatchTransform}
                            disabled={batchTransforming || selectedBatchItems.size === 0 || !batchTransformStyle || (batchTransformStyle === 'custom' && !batchCustomPrompt.trim())}
                          >
                            {batchTransforming ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {batchProgress.current}/{batchProgress.total}
                              </>
                            ) : (
                              <>
                                <Wand2 className="w-4 h-4 mr-2" />
                                Transform {selectedBatchItems.size > 0 ? `(${selectedBatchItems.size})` : ''}
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Compact Style Thumbnails for Batch */}
                        <div>
                          <Label className="text-xs mb-2 block">Select Style for Batch</Label>
                          <StylePreviewThumbnails
                            selectedStyle={batchTransformStyle}
                            onSelectStyle={setBatchTransformStyle}
                            compact={true}
                          />
                        </div>

                        {/* Model Selector for Batch */}
                        <div>
                          <Label className="text-xs mb-2 block">AI Model</Label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setBatchSelectedModel('gemini')}
                              className={`flex-1 px-2 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                                batchSelectedModel === 'gemini'
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-muted/50 text-muted-foreground hover:bg-muted border-border'
                              }`}
                            >
                              🍌 Nano Banana
                            </button>
                            <button
                              onClick={() => setBatchSelectedModel('chatgpt')}
                              className={`flex-1 px-2 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                                batchSelectedModel === 'chatgpt'
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-muted/50 text-muted-foreground hover:bg-muted border-border'
                              }`}
                            >
                              🤖 ChatGPT
                            </button>
                          </div>
                        </div>

                        {/* Custom Prompt for Batch */}
                        {batchTransformStyle === 'custom' && (
                          <div className="space-y-2">
                            <Label className="text-xs block">Describe Your Custom Style *</Label>
                            <Textarea
                              value={batchCustomPrompt}
                              onChange={(e) => setBatchCustomPrompt(e.target.value)}
                              placeholder="Describe the style to apply to all selected images..."
                              rows={2}
                              maxLength={1000}
                              className="text-sm"
                            />
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">{batchCustomPrompt.length}/1000</p>
                            </div>
                            <PromptHistory
                              onSelectPrompt={setBatchCustomPrompt}
                              currentPrompt={batchCustomPrompt}
                              storageKey="batch_custom_style"
                            />
                          </div>
                        )}
                      </div>
                      
                      {batchTransforming && (
                        <div className="mt-3">
                          <Progress value={(batchProgress.current / batchProgress.total) * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground text-center mt-1">
                            Transforming image {batchProgress.current} of {batchProgress.total}...
                          </p>
                        </div>
                      )}

                      {batchResults.length > 0 && !batchTransforming && (
                        <div className="mt-3 p-2 bg-background rounded-lg border">
                          <p className="text-xs font-medium mb-2">
                            ✓ {batchResults.filter(r => r.success).length} transformed, saved to Content Library
                          </p>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {batchResults.filter(r => r.success).slice(0, 5).map((result, i) => (
                              <div key={i} className="shrink-0 w-16 h-16 rounded border overflow-hidden">
                                <img src={result.transformed} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                            {batchResults.filter(r => r.success).length > 5 && (
                              <div className="shrink-0 w-16 h-16 rounded border flex items-center justify-center bg-muted text-xs">
                                +{batchResults.filter(r => r.success).length - 5}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
                      <div 
                        key={item.id} 
                        className={`group relative rounded-xl overflow-hidden border bg-background aspect-square ${
                          batchMode && selectedBatchItems.has(item.id) ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={batchMode ? () => toggleBatchItem(item.id) : undefined}
                      >
                        <img
                          src={item.url}
                          alt={item.file_name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        
                        {/* Batch Selection Checkbox */}
                        {batchMode && (
                          <div className="absolute top-2 right-2 z-10">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              selectedBatchItems.has(item.id) 
                                ? 'bg-primary border-primary' 
                                : 'bg-background/80 border-muted-foreground'
                            }`}>
                              {selectedBatchItems.has(item.id) && (
                                <CheckCircle className="w-4 h-4 text-primary-foreground" />
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          {item.event_name && (
                            <Badge className="text-[10px] bg-primary/90">{item.event_name}</Badge>
                          )}
                          {item.isUsed && (
                            <Badge variant="secondary" className="text-[10px]">Used</Badge>
                          )}
                        </div>
                        
                        {/* Hover Actions (only show when not in batch mode) */}
                        {!batchMode && (
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
                        )}
                        
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

                  {/* Preview - Before/After Comparison */}
                  {(imageUrl || imageFile) && (
                    <div className="space-y-3">
                      {/* Before/After Toggle */}
                      {transformedPreview && originalImageUrl && (
                        <div className="flex justify-center">
                          <Button
                            variant={showBeforeAfter ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {showBeforeAfter ? 'Hide Comparison' : 'Show Before/After'}
                          </Button>
                        </div>
                      )}
                      
                      {/* Before/After Side by Side */}
                      {showBeforeAfter && transformedPreview && originalImageUrl ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative rounded-lg overflow-hidden border">
                              <img 
                                src={originalImageUrl} 
                                alt="Original" 
                                className="w-full aspect-square object-cover"
                              />
                              <div className="absolute bottom-0 inset-x-0 bg-black/80 p-2">
                                <p className="text-white text-xs text-center font-medium">BEFORE</p>
                              </div>
                            </div>
                            <div className="relative rounded-lg overflow-hidden border border-primary">
                              <img 
                                src={transformedPreview} 
                                alt="Transformed" 
                                className="w-full aspect-square object-cover"
                              />
                              <div className="absolute bottom-0 inset-x-0 bg-primary p-2">
                                <p className="text-primary-foreground text-xs text-center font-medium">AFTER</p>
                              </div>
                              {fallbackInfo?.usedFallback && (
                                <div className="absolute top-2 left-2">
                                  <Badge className="bg-amber-500/90 text-white text-xs flex items-center gap-1 shadow-lg">
                                    <RefreshCw className="w-3 h-3" />
                                    Fallback Used
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Fallback info alert */}
                          {fallbackInfo?.usedFallback && (
                            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                              <div className="text-sm">
                                <p className="font-medium text-amber-600">Fallback Model Used</p>
                                <p className="text-muted-foreground text-xs">
                                  ChatGPT failed to generate an image, so we used Nano Banana instead.
                                  {fallbackInfo.reason && (
                                    <span className="block mt-1 italic">Reason: {fallbackInfo.reason}</span>
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
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
                            onClick={() => { setImageUrl(''); setImageFile(null); setOriginalImageUrl(''); setTransformedPreview(''); setFallbackInfo(null); }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Image Transformer */}
                  {(imageUrl || imageFile) && (
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Wand2 className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">AI Style Transformer</h3>
                        <Badge className="text-xs bg-primary/20 text-primary border-0">NEW</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        Transform your image into one of our signature event service styles before posting
                      </p>
                      
                      {/* Style Preview Thumbnails */}
                      <div className="mb-4">
                        <Label className="text-xs mb-2 block">Select Style</Label>
                        <StylePreviewThumbnails
                          selectedStyle={selectedTransformStyle}
                          onSelectStyle={setSelectedTransformStyle}
                        />
                      </div>

                      {/* Custom Style Prompt */}
                      {selectedTransformStyle === 'custom' && (
                        <div className="mb-3 space-y-2">
                          <Label className="text-xs block">Describe Your Custom Style *</Label>
                          <Textarea
                            value={customStylePrompt}
                            onChange={(e) => setCustomStylePrompt(e.target.value)}
                            placeholder="E.g., Transform into a steampunk inventor with brass goggles, Victorian clothing, and cogs/gears in the background..."
                            rows={3}
                            maxLength={1000}
                            className="text-sm"
                          />
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">{customStylePrompt.length}/1000</p>
                          </div>
                          {/* Prompt History */}
                          <PromptHistory
                            onSelectPrompt={setCustomStylePrompt}
                            currentPrompt={customStylePrompt}
                            storageKey="custom_style"
                          />
                        </div>
                      )}

                      {/* Optional enhancement for preset styles */}
                      {selectedTransformStyle && selectedTransformStyle !== 'custom' && (
                        <div className="mb-3 space-y-2">
                          <Label className="text-xs block text-muted-foreground">Optional: Add Custom Details</Label>
                          <Textarea
                            value={customStylePrompt}
                            onChange={(e) => setCustomStylePrompt(e.target.value)}
                            placeholder="Add specific details like 'wearing a red cape' or 'in a forest setting'..."
                            rows={2}
                            maxLength={500}
                            className="text-sm"
                          />
                          {/* Prompt History for preset enhancements */}
                          <PromptHistory
                            onSelectPrompt={setCustomStylePrompt}
                            currentPrompt={customStylePrompt}
                            storageKey="preset_enhancements"
                          />
                        </div>
                      )}
                      
                      {/* Model Selector */}
                      <div className="mb-4">
                        <Label className="text-xs mb-2 block">AI Model</Label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedModel('gemini')}
                            className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                              selectedModel === 'gemini'
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted border-border'
                            }`}
                          >
                            🍌 Nano Banana
                          </button>
                          <button
                            onClick={() => setSelectedModel('chatgpt')}
                            className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                              selectedModel === 'chatgpt'
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted border-border'
                            }`}
                          >
                            🤖 ChatGPT
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedModel === 'gemini' ? 'Fast image generation (Gemini)' : 'Advanced reasoning (GPT-5)'}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap">
                        <Button 
                          onClick={handleTransformImage} 
                          disabled={transformingImage || comparing || !selectedTransformStyle || (selectedTransformStyle === 'custom' && !customStylePrompt.trim())}
                          className="flex-1"
                        >
                          {transformingImage ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Transforming...</>
                          ) : (
                            <><Wand2 className="w-4 h-4 mr-2" /> Transform</>
                          )}
                        </Button>
                        
                        <Button 
                          variant="outline"
                          onClick={handleCompareModels} 
                          disabled={transformingImage || comparing || !selectedTransformStyle || (selectedTransformStyle === 'custom' && !customStylePrompt.trim())}
                        >
                          {comparing ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Comparing...</>
                          ) : (
                            <>⚔️ Compare</>
                          )}
                        </Button>
                        
                        {(transformedPreview || comparisonResults.gemini || comparisonResults.chatgpt) && originalImageUrl && (
                          <Button 
                            variant="outline" 
                            onClick={handleRevertTransform}
                            disabled={transformingImage || comparing}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        )}
                        
                        {transformedPreview && originalImageUrl && (
                          <Button 
                            variant="secondary" 
                            onClick={handleSaveToLibrary}
                            disabled={savingToLibrary}
                          >
                            {savingToLibrary ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <FolderOpen className="w-4 h-4 mr-2" />
                                Save
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                      
                      {/* Comparison Results Side-by-Side - BOOSTED VIEW */}
                      {(comparisonResults.gemini || comparisonResults.chatgpt) && (
                        <div className="mt-6 space-y-4 p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-2xl border-2 border-primary/20 shadow-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">⚔️</span>
                              <Label className="text-base font-bold">Model Comparison</Label>
                            </div>
                            <p className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Click to use • Save to keep both</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            {/* Gemini Result */}
                            <div className="space-y-2">
                              <button
                                onClick={() => handleSelectComparisonResult('gemini')}
                                disabled={!comparisonResults.gemini?.success}
                                className={`relative w-full rounded-xl overflow-hidden border-2 transition-all group ${
                                  comparisonResults.gemini?.success 
                                    ? 'border-yellow-400/50 hover:border-yellow-400 cursor-pointer hover:shadow-xl hover:scale-[1.02]'
                                    : 'border-destructive/30 opacity-60 cursor-not-allowed'
                                }`}
                              >
                                <div className="aspect-[4/5] bg-muted">
                                  {comparisonResults.gemini?.success ? (
                                    <img 
                                      src={comparisonResults.gemini.url} 
                                      alt="Nano Banana result" 
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                      <XCircle className="w-12 h-12" />
                                    </div>
                                  )}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl">🍌</span>
                                    <span className="text-white text-sm font-bold">Nano Banana</span>
                                  </div>
                                  {!comparisonResults.gemini?.success && (
                                    <p className="text-destructive text-xs mt-1 text-center truncate">{comparisonResults.gemini?.error || 'Failed'}</p>
                                  )}
                                </div>
                                {comparisonResults.gemini?.success && (
                                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to Use
                                  </div>
                                )}
                              </button>
                              
                              {comparisonResults.gemini?.success && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-yellow-400/50 hover:border-yellow-400 hover:bg-yellow-400/10"
                                  onClick={(e) => handleSaveComparisonToLibrary('gemini', e)}
                                  disabled={savingComparisonResult === 'gemini'}
                                >
                                  {savingComparisonResult === 'gemini' ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                                  ) : (
                                    <><FolderOpen className="w-4 h-4 mr-2" /> Save to Library</>
                                  )}
                                </Button>
                              )}
                            </div>
                            
                            {/* ChatGPT Result */}
                            <div className="space-y-2">
                              <button
                                onClick={() => handleSelectComparisonResult('chatgpt')}
                                disabled={!comparisonResults.chatgpt?.success}
                                className={`relative w-full rounded-xl overflow-hidden border-2 transition-all group ${
                                  comparisonResults.chatgpt?.success 
                                    ? 'border-green-400/50 hover:border-green-400 cursor-pointer hover:shadow-xl hover:scale-[1.02]'
                                    : 'border-destructive/30 opacity-60 cursor-not-allowed'
                                }`}
                              >
                                <div className="aspect-[4/5] bg-muted">
                                  {comparisonResults.chatgpt?.success ? (
                                    <img 
                                      src={comparisonResults.chatgpt.url} 
                                      alt="ChatGPT result" 
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                      <XCircle className="w-12 h-12" />
                                    </div>
                                  )}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl">🤖</span>
                                    <span className="text-white text-sm font-bold">ChatGPT</span>
                                  </div>
                                  {!comparisonResults.chatgpt?.success && (
                                    <p className="text-destructive text-xs mt-1 text-center truncate">{comparisonResults.chatgpt?.error || 'Failed'}</p>
                                  )}
                                </div>
                                {comparisonResults.chatgpt?.success && (
                                  <div className="absolute top-2 right-2 bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to Use
                                  </div>
                                )}
                              </button>
                              
                              {comparisonResults.chatgpt?.success && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-green-400/50 hover:border-green-400 hover:bg-green-400/10"
                                  onClick={(e) => handleSaveComparisonToLibrary('chatgpt', e)}
                                  disabled={savingComparisonResult === 'chatgpt'}
                                >
                                  {savingComparisonResult === 'chatgpt' ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                                  ) : (
                                    <><FolderOpen className="w-4 h-4 mr-2" /> Save to Library</>
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {/* Save Both Button */}
                          {comparisonResults.gemini?.success && comparisonResults.chatgpt?.success && (
                            <Button
                              variant="secondary"
                              className="w-full mt-2"
                              onClick={async (e) => {
                                await handleSaveComparisonToLibrary('gemini', e);
                                await handleSaveComparisonToLibrary('chatgpt', e);
                              }}
                              disabled={savingComparisonResult !== null}
                            >
                              {savingComparisonResult ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Both...</>
                              ) : (
                                <><FolderOpen className="w-4 h-4 mr-2" /> Save Both Results to Library</>
                              )}
                            </Button>
                          )}
                        </div>
                      )}
                      
                      {transformedPreview && !comparisonResults.gemini && !comparisonResults.chatgpt && (
                        <div className="mt-3 p-2 bg-background rounded-lg border flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-xs text-muted-foreground flex-1">
                            Transformed to <strong>{selectedTransformStyle === 'custom' ? 'custom style' : styleOptions.find(s => s.id === selectedTransformStyle)?.name || selectedTransformStyle}</strong> - ready to post!
                          </span>
                        </div>
                      )}
                      
                      {!selectedTransformStyle && (
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          Click a style thumbnail above or choose custom to describe your own
                        </p>
                      )}
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
                          
                          {/* Retry info for retrying posts */}
                          {post.status === 'retrying' && (
                            <div className="text-xs text-orange-600 mb-3 space-y-1 bg-orange-50 dark:bg-orange-950/30 p-2 rounded-lg">
                              <p className="font-medium">Attempt {post.retry_count}/5</p>
                              {post.next_retry_at && (
                                <p className="text-muted-foreground">Next retry in {formatTimeUntil(post.next_retry_at)}</p>
                              )}
                            </div>
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
                          
                          {/* Actions for retrying posts */}
                          {post.status === 'retrying' && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handlePublishNow(post)}
                                disabled={publishing === post.id}
                              >
                                {publishing === post.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3 mr-1" />}
                                Force Publish
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleCancelPost(post.id)}>
                                Cancel
                              </Button>
                            </div>
                          )}
                          
                          {/* Actions for failed posts - with Retry button */}
                          {post.status === 'failed' && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleRetryPost(post)}
                                disabled={publishing === post.id}
                              >
                                {publishing === post.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3 mr-1" />}
                                Retry
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}>
                                <Trash2 className="w-3 h-3 mr-1" /> Delete
                              </Button>
                            </div>
                          )}
                          
                          {post.status === 'cancelled' && (
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
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="bg-card rounded-2xl border p-6 max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Instagram API Settings</h2>
                    <p className="text-sm text-muted-foreground">Connect your Instagram Business account</p>
                  </div>
                </div>
                
                {/* Quick Setup Guide */}
                <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <h3 className="font-bold mb-4 text-lg">🚀 Quick Setup (3 Steps)</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">1</div>
                      <div>
                        <p className="font-medium">Open Meta Token Generator</p>
                        <p className="text-sm text-muted-foreground mb-2">Click the button below to open Meta's Graph API Explorer</p>
                        <a 
                          href="https://developers.facebook.com/tools/explorer/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          <Key className="w-4 h-4" />
                          Open Graph API Explorer →
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">2</div>
                      <div>
                        <p className="font-medium">Generate Your Token</p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                          <li>Select your Meta App (or create one)</li>
                          <li>Click "Generate Access Token"</li>
                          <li>Check permissions: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">instagram_basic</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-xs">instagram_content_publish</code></li>
                          <li>Copy the long access token</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">3</div>
                      <div>
                        <p className="font-medium">Get Your Account ID</p>
                        <p className="text-sm text-muted-foreground">In Graph API Explorer, query: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">me?fields=id</code> and copy the ID</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Connection Status */}
                <div className="mb-6 p-4 rounded-xl border bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        connectionStatus === 'connected' ? 'bg-green-500' : 
                        connectionStatus === 'error' ? 'bg-destructive' : 
                        connectionStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 'bg-muted-foreground'
                      }`} />
                      <div>
                        <p className="font-medium">
                          {connectionStatus === 'connected' ? 'Connected to Instagram' : 
                           connectionStatus === 'error' ? 'Connection Error' : 
                           connectionStatus === 'checking' ? 'Checking...' : 'Not Connected'}
                        </p>
                        {connectionMessage && (
                          <p className="text-sm text-muted-foreground">{connectionMessage}</p>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleTestConnection}
                      disabled={connectionStatus === 'checking'}
                    >
                      {connectionStatus === 'checking' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                      )}
                      Test
                    </Button>
                  </div>
                </div>
                
                {/* Credential Inputs */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ig-token" className="flex items-center gap-2 font-medium">
                      <Key className="w-4 h-4" />
                      Access Token
                    </Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Paste the token from Step 2 above
                    </p>
                    <div className="relative">
                      <Input
                        id="ig-token"
                        type={showToken ? 'text' : 'password'}
                        value={instagramToken}
                        onChange={(e) => {
                          setInstagramToken(e.target.value);
                          setCredentialsLoaded(false);
                        }}
                        placeholder="EAAxxxxxxxxx..."
                        className="pr-10 font-mono text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowToken(!showToken)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {credentialsLoaded && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Token saved
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="ig-account-id" className="flex items-center gap-2 font-medium">
                      <Instagram className="w-4 h-4" />
                      Business Account ID
                    </Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Paste the ID from Step 3 above
                    </p>
                    <Input
                      id="ig-account-id"
                      type="text"
                      value={instagramAccountId}
                      onChange={(e) => setInstagramAccountId(e.target.value)}
                      placeholder="17841400000000000"
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleSaveCredentials} 
                      disabled={savingCredentials || !instagramToken || !instagramAccountId}
                      className="w-full"
                      size="lg"
                    >
                      {savingCredentials ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save & Connect
                    </Button>
                  </div>
                </div>
                
                {/* Extend Token Link */}
                <div className="mt-6 pt-4 border-t text-center">
                  <p className="text-sm text-muted-foreground mb-2">Token expires in 60 days</p>
                  <a 
                    href="https://developers.facebook.com/tools/debug/accesstoken/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Check token expiry & extend →
                  </a>
                </div>
              </div>
            </TabsContent>

            {/* Image Optimizer Tab */}
            <TabsContent value="optimize">
              <div className="bg-card rounded-2xl border p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Image Optimizer</h2>
                  <p className="text-muted-foreground">
                    Convert and compress images for faster loading. WebP format provides up to 30% better compression than JPEG.
                  </p>
                </div>
                
                <ImageConverter 
                  initialImageUrl={selectedLibraryItem?.url || imageUrl}
                  onConverted={(optimizedUrl) => {
                    setImageUrl(optimizedUrl);
                    toast({
                      title: "Image Optimized",
                      description: "The optimized image URL has been set for scheduling.",
                    });
                  }}
                />

                {/* Tips Section */}
                <div className="mt-6 p-4 rounded-xl bg-muted/30 border">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Optimization Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>WebP format</strong> offers the best compression for web images</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Quality 70-85%</strong> balances file size and visual quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Max width 1200px</strong> is ideal for Instagram feed posts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Optimized images load <strong>2-3x faster</strong> on mobile devices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Leads Tab (Admin Only) */}
            {isAdmin && (
              <TabsContent value="leads">
                <div className="bg-card rounded-2xl border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Marketing Leads</h2>
                        <p className="text-sm text-muted-foreground">{leads.length} total leads from demo users</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={fetchLeads} variant="outline" size="sm" disabled={leadsLoading}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${leadsLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                    </div>
                  </div>

                  {/* Leads Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-muted/30 rounded-xl p-4 border">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">{leadsStats.total}</p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 border">
                      <p className="text-sm text-muted-foreground">Converted</p>
                      <p className="text-2xl font-bold text-primary">{leadsStats.converted}</p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 border">
                      <p className="text-sm text-muted-foreground">Rate</p>
                      <p className="text-2xl font-bold">{leadsStats.conversionRate}%</p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 border">
                      <p className="text-sm text-muted-foreground">Sources</p>
                      <p className="text-2xl font-bold">{leadsStats.uniqueSources}</p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 border">
                      <p className="text-sm text-muted-foreground">Demos</p>
                      <p className="text-2xl font-bold">{leadsStats.totalDemos}</p>
                    </div>
                  </div>

                  {/* Filters & Export */}
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                    <div className="flex flex-col md:flex-row gap-3 flex-1">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search email, source, referrer..."
                          value={leadsSearchQuery}
                          onChange={(e) => setLeadsSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <select 
                        value={leadsSourceFilter} 
                        onChange={(e) => setLeadsSourceFilter(e.target.value)}
                        className="h-10 px-3 rounded-md border bg-background text-sm"
                      >
                        {EXPERIENCE_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <select 
                        value={leadsConvertedFilter} 
                        onChange={(e) => setLeadsConvertedFilter(e.target.value as any)}
                        className="h-10 px-3 rounded-md border bg-background text-sm"
                      >
                        <option value="all">All Leads</option>
                        <option value="converted">Converted</option>
                        <option value="not-converted">Not Converted</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      {selectedLeadIds.size > 0 && (
                        <Button 
                          onClick={() => exportLeadsToCSV(filteredLeads.filter(l => selectedLeadIds.has(l.id)))} 
                          variant="outline" 
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export ({selectedLeadIds.size})
                        </Button>
                      )}
                      <Button onClick={() => exportLeadsToCSV(filteredLeads)} size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export All ({filteredLeads.length})
                      </Button>
                    </div>
                  </div>

                  {/* Leads Table */}
                  {leadsLoading && leads.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                      Loading leads...
                    </div>
                  ) : filteredLeads.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">
                      {leadsSearchQuery || leadsSourceFilter !== 'all' || leadsConvertedFilter !== 'all' 
                        ? 'No leads match your filters' 
                        : 'No leads captured yet'}
                    </div>
                  ) : (
                    <div className="border rounded-xl overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">
                              <Checkbox
                                checked={selectedLeadIds.size === filteredLeads.length && filteredLeads.length > 0}
                                onCheckedChange={handleSelectAllLeads}
                              />
                            </TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Demos</TableHead>
                            <TableHead>First Seen</TableHead>
                            <TableHead>Last Activity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[80px]">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLeads.slice(0, 50).map((lead) => (
                            <TableRow key={lead.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedLeadIds.has(lead.id)}
                                  onCheckedChange={() => handleSelectLead(lead.id)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{lead.email}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">{lead.source}</Badge>
                              </TableCell>
                              <TableCell>{lead.total_demos_used}</TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {format(new Date(lead.first_seen_at), 'MMM d, yyyy')}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {format(new Date(lead.last_interaction_at), 'MMM d, yyyy')}
                              </TableCell>
                              <TableCell>
                                {lead.converted ? (
                                  <Badge className="bg-primary/10 text-primary border-primary/20">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Converted
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-muted-foreground">
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleToggleLeadConverted(lead)}
                                >
                                  {lead.converted ? (
                                    <XCircle className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <UserCheck className="w-4 h-4 text-primary" />
                                  )}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {filteredLeads.length > 50 && (
                        <div className="p-4 text-center text-sm text-muted-foreground border-t">
                          Showing 50 of {filteredLeads.length} leads. Export for full list.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InstagramSchedulerPage;
