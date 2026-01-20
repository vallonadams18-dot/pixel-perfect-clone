import { useState, useEffect } from 'react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { jsPDF } from 'jspdf';
import { supabase } from '@/integrations/supabase/client';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointerClick, 
  FileImage, 
  Calendar,
  CalendarIcon,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Eye,
  Send,
  LogOut,
  Eye as EyeIcon,
  EyeOff,
  ChevronDown,
  Download,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { toast } from 'sonner';

type DateRange = {
  from: Date;
  to: Date;
};

type PresetKey = '7d' | '30d' | '90d' | 'custom';

const datePresets: { key: PresetKey; label: string; getDates: () => DateRange }[] = [
  { key: '7d', label: 'Last 7 days', getDates: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
  { key: '30d', label: 'Last 30 days', getDates: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
  { key: '90d', label: 'Last 90 days', getDates: () => ({ from: subDays(new Date(), 90), to: new Date() }) },
];

// Mock data for demonstration - in production, this would come from GA4 API
const weeklyPageViews = [
  { day: 'Mon', views: 245, visitors: 189 },
  { day: 'Tue', views: 312, visitors: 234 },
  { day: 'Wed', views: 287, visitors: 201 },
  { day: 'Thu', views: 356, visitors: 278 },
  { day: 'Fri', views: 421, visitors: 312 },
  { day: 'Sat', views: 198, visitors: 145 },
  { day: 'Sun', views: 167, visitors: 123 },
];

const topPages = [
  { page: 'Homepage', views: 1245, change: 12.5 },
  { page: 'AI Trading Cards', views: 856, change: 8.3 },
  { page: 'Headshots', views: 723, change: -2.1 },
  { page: 'Persona Pop', views: 654, change: 15.7 },
  { page: 'Contact', views: 432, change: 5.2 },
];

const trafficSources = [
  { name: 'Direct', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Organic Search', value: 28, color: 'hsl(var(--accent))' },
  { name: 'Social Media', value: 22, color: 'hsl(262 83% 58%)' },
  { name: 'Referral', value: 15, color: 'hsl(var(--muted-foreground))' },
];

const AnalyticsDashboardPage = () => {
  const { isAdmin, loading: adminLoading } = useAdminRole();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  
  // Date range state
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>('30d');
  const [dateRange, setDateRange] = useState<DateRange>(() => datePresets[1].getDates());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // Database metrics
  const [mediaCount, setMediaCount] = useState(0);
  const [scheduledPostsCount, setScheduledPostsCount] = useState(0);
  const [publishedPostsCount, setPublishedPostsCount] = useState(0);
  const [pendingPostsCount, setPendingPostsCount] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && isAdmin) {
      fetchMetrics();
    }
  }, [session, isAdmin]);

  const fetchMetrics = async () => {
    try {
      // Fetch media count
      const { count: mediaTotal } = await supabase
        .from('event_media')
        .select('*', { count: 'exact', head: true });
      
      setMediaCount(mediaTotal || 0);

      // Fetch scheduled posts metrics
      const { data: posts } = await supabase
        .from('scheduled_posts')
        .select('status');
      
      if (posts) {
        setScheduledPostsCount(posts.length);
        setPublishedPostsCount(posts.filter(p => p.status === 'published').length);
        setPendingPostsCount(posts.filter(p => p.status === 'pending').length);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading || adminLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary" />
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Sign in to view analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary outline-none"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary outline-none pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
              <Button type="submit" className="w-full" disabled={authLoading}>
                {authLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need admin privileges to view analytics.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePresetSelect = (preset: typeof datePresets[0]) => {
    setSelectedPreset(preset.key);
    setDateRange(preset.getDates());
  };

  const handleCustomDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      setDateRange({ from: range.from, to: range.to });
      setSelectedPreset('custom');
    } else if (range?.from) {
      setDateRange({ from: range.from, to: range.from });
    }
  };

  const getDateRangeLabel = () => {
    if (selectedPreset !== 'custom') {
      return datePresets.find(p => p.key === selectedPreset)?.label || 'Select range';
    }
    return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
  };

  // Export to CSV
  const exportToCSV = () => {
    const dateRangeStr = `${format(dateRange.from, 'yyyy-MM-dd')}_to_${format(dateRange.to, 'yyyy-MM-dd')}`;
    
    // Build CSV content
    let csvContent = 'PixelAI Pro Analytics Report\n';
    csvContent += `Date Range: ${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}\n`;
    csvContent += `Generated: ${format(new Date(), 'MMM d, yyyy HH:mm')}\n\n`;
    
    // Key Metrics
    csvContent += 'KEY METRICS\n';
    csvContent += 'Metric,Value,Change\n';
    csvContent += 'Total Page Views,12456,+12.5%\n';
    csvContent += 'Unique Visitors,3892,+8.2%\n';
    csvContent += 'CTA Click Rate,4.7%,-1.3%\n';
    csvContent += 'Form Submissions,156,+23.4%\n\n';
    
    // Database Metrics
    csvContent += 'DATABASE METRICS\n';
    csvContent += 'Metric,Value\n';
    csvContent += `Media Files,${mediaCount}\n`;
    csvContent += `Scheduled Posts,${scheduledPostsCount}\n`;
    csvContent += `Published Posts,${publishedPostsCount}\n`;
    csvContent += `Pending Posts,${pendingPostsCount}\n\n`;
    
    // Weekly Traffic
    csvContent += 'WEEKLY TRAFFIC\n';
    csvContent += 'Day,Page Views,Visitors\n';
    weeklyPageViews.forEach(item => {
      csvContent += `${item.day},${item.views},${item.visitors}\n`;
    });
    csvContent += '\n';
    
    // Traffic Sources
    csvContent += 'TRAFFIC SOURCES\n';
    csvContent += 'Source,Percentage\n';
    trafficSources.forEach(source => {
      csvContent += `${source.name},${source.value}%\n`;
    });
    csvContent += '\n';
    
    // Top Pages
    csvContent += 'TOP PAGES\n';
    csvContent += 'Page,Views,Change\n';
    topPages.forEach(page => {
      csvContent += `${page.page},${page.views},${page.change >= 0 ? '+' : ''}${page.change}%\n`;
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pixelai-analytics-${dateRangeStr}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    
    toast.success('CSV report downloaded successfully');
  };

  // Export to PDF
  const exportToPDF = () => {
    const dateRangeStr = `${format(dateRange.from, 'yyyy-MM-dd')}_to_${format(dateRange.to, 'yyyy-MM-dd')}`;
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('PixelAI Pro Analytics Report', 20, 20);
    
    // Date range
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date Range: ${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`, 20, 30);
    doc.text(`Generated: ${format(new Date(), 'MMM d, yyyy HH:mm')}`, 20, 37);
    
    // Key Metrics Section
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Key Metrics', 20, 52);
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const keyMetrics = [
      ['Total Page Views', '12,456', '+12.5%'],
      ['Unique Visitors', '3,892', '+8.2%'],
      ['CTA Click Rate', '4.7%', '-1.3%'],
      ['Form Submissions', '156', '+23.4%'],
    ];
    
    let yPos = 60;
    keyMetrics.forEach(([metric, value, change]) => {
      doc.text(`${metric}: ${value} (${change})`, 25, yPos);
      yPos += 7;
    });
    
    // Database Metrics Section
    yPos += 5;
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Database Metrics', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Media Files: ${mediaCount}`, 25, yPos);
    yPos += 7;
    doc.text(`Scheduled Posts: ${scheduledPostsCount}`, 25, yPos);
    yPos += 7;
    doc.text(`Published Posts: ${publishedPostsCount}`, 25, yPos);
    yPos += 7;
    doc.text(`Pending Posts: ${pendingPostsCount}`, 25, yPos);
    
    // Weekly Traffic Section
    yPos += 12;
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Weekly Traffic', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    weeklyPageViews.forEach(item => {
      doc.text(`${item.day}: ${item.views} views, ${item.visitors} visitors`, 25, yPos);
      yPos += 6;
    });
    
    // Traffic Sources Section
    yPos += 8;
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Traffic Sources', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    trafficSources.forEach(source => {
      doc.text(`${source.name}: ${source.value}%`, 25, yPos);
      yPos += 6;
    });
    
    // Top Pages Section
    yPos += 8;
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Top Pages', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    topPages.forEach(page => {
      const changeStr = page.change >= 0 ? `+${page.change}%` : `${page.change}%`;
      doc.text(`${page.page}: ${page.views.toLocaleString()} views (${changeStr})`, 25, yPos);
      yPos += 6;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by PixelAI Pro Analytics Dashboard', 20, 285);
    
    // Save PDF
    doc.save(`pixelai-analytics-${dateRangeStr}.pdf`);
    
    toast.success('PDF report downloaded successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground">PixelAI Pro Performance Metrics</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Date Range Filter */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              {/* Preset Buttons */}
              <div className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-1">
                {datePresets.map((preset) => (
                  <Button
                    key={preset.key}
                    variant={selectedPreset === preset.key ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handlePresetSelect(preset)}
                    className="text-xs px-3"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
              
              {/* Custom Date Picker */}
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "justify-start text-left font-normal min-w-[200px]",
                      selectedPreset === 'custom' && "border-primary"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="truncate">{getDateRangeLabel()}</span>
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="p-3 border-b md:hidden">
                    <div className="flex flex-wrap gap-1">
                      {datePresets.map((preset) => (
                        <Button
                          key={preset.key}
                          variant={selectedPreset === preset.key ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            handlePresetSelect(preset);
                            setIsDatePickerOpen(false);
                          }}
                          className="text-xs"
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <CalendarComponent
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={handleCustomDateSelect}
                    numberOfMonths={2}
                    disabled={(date) => date > new Date()}
                    className="p-3 pointer-events-auto"
                  />
                  <div className="p-3 border-t flex justify-end">
                    <Button
                      size="sm"
                      onClick={() => setIsDatePickerOpen(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Export Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                  <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Date Range Display */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            Showing data from <strong className="text-foreground">{format(dateRange.from, 'MMM d, yyyy')}</strong> to <strong className="text-foreground">{format(dateRange.to, 'MMM d, yyyy')}</strong>
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Page Views"
            value="12,456"
            change={12.5}
            icon={Eye}
            description={getDateRangeLabel()}
          />
          <MetricCard
            title="Unique Visitors"
            value="3,892"
            change={8.2}
            icon={Users}
            description={getDateRangeLabel()}
          />
          <MetricCard
            title="CTA Click Rate"
            value="4.7%"
            change={-1.3}
            icon={MousePointerClick}
            description="Avg. conversion"
          />
          <MetricCard
            title="Form Submissions"
            value="156"
            change={23.4}
            icon={Send}
            description={getDateRangeLabel()}
          />
        </div>

        {/* Database Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Media Files</p>
                  <p className="text-3xl font-bold">{mediaCount}</p>
                </div>
                <FileImage className="w-10 h-10 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled Posts</p>
                  <p className="text-3xl font-bold">{scheduledPostsCount}</p>
                </div>
                <Calendar className="w-10 h-10 text-accent/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-3xl font-bold">{publishedPostsCount}</p>
                </div>
                <Activity className="w-10 h-10 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold">{pendingPostsCount}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-yellow-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Traffic</CardTitle>
              <CardDescription>Page views and unique visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyPageViews}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorViews)"
                      name="Page Views"
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="hsl(var(--accent))"
                      fillOpacity={1}
                      fill="url(#colorVisitors)"
                      name="Visitors"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Traffic Sources</CardTitle>
              <CardDescription>Where visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`${value}%`, 'Share']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {trafficSources.map((source) => (
                  <div key={source.name} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="text-muted-foreground">{source.name}</span>
                    <span className="font-medium ml-auto">{source.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={page.page} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{page.page}</p>
                    <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${page.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {page.change >= 0 ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {Math.abs(page.change)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Note about GA4 */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              📊 This dashboard shows demo data. To display real analytics, connect the Google Analytics 4 Data API 
              with your GA4 property ID (G-FS6S61Q91H). Real-time database metrics are shown above.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`flex items-center text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(change)}%
            </span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default AnalyticsDashboardPage;
