import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Users,
  Download,
  RefreshCw,
  Search,
  LogOut,
  Eye,
  EyeOff,
  Mail,
  TrendingUp,
  UserCheck,
  UserX,
  Filter,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';

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

const LeadsDashboardPage = () => {
  const { isAdmin, loading: adminLoading } = useAdminRole();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [convertedFilter, setConvertedFilter] = useState<'all' | 'converted' | 'not-converted'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  
  // Auth form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

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
      fetchLeads();
    }
  }, [session, isAdmin]);

  const fetchLeads = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to fetch leads');
    } finally {
      setRefreshing(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Search filter
      const matchesSearch = 
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.source?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.referrer?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Source filter
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      
      // Converted filter
      const matchesConverted = 
        convertedFilter === 'all' ||
        (convertedFilter === 'converted' && lead.converted) ||
        (convertedFilter === 'not-converted' && !lead.converted);
      
      return matchesSearch && matchesSource && matchesConverted;
    });
  }, [leads, searchQuery, sourceFilter, convertedFilter]);

  const stats = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter(l => l.converted).length;
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0';
    const uniqueSources = new Set(leads.map(l => l.source)).size;
    const totalDemos = leads.reduce((acc, l) => acc + (l.total_demos_used || 0), 0);
    
    return { total, converted, conversionRate, uniqueSources, totalDemos };
  }, [leads]);

  const handleToggleConverted = async (lead: Lead) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ converted: !lead.converted })
        .eq('id', lead.id);

      if (error) throw error;
      
      setLeads(prev => prev.map(l => 
        l.id === lead.id ? { ...l, converted: !l.converted } : l
      ));
      
      toast.success(lead.converted ? 'Marked as not converted' : 'Marked as converted');
    } catch (error: any) {
      toast.error('Failed to update lead');
    }
  };

  const handleSelectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
    }
  };

  const handleSelectLead = (id: string) => {
    setSelectedLeads(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const exportToCSV = (leadsToExport: Lead[]) => {
    if (leadsToExport.length === 0) {
      toast.error('No leads to export');
      return;
    }

    const headers = [
      'Email',
      'Source',
      'First Seen',
      'Last Interaction',
      'Demos Used',
      'Converted',
      'Referrer',
      'Notes',
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

    toast.success(`Exported ${leadsToExport.length} leads to CSV`);
  };

  const handleExportAll = () => exportToCSV(filteredLeads);
  
  const handleExportSelected = () => {
    const selected = filteredLeads.filter(l => selectedLeads.has(l.id));
    exportToCSV(selected);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
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
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <CardTitle>Leads Dashboard</CardTitle>
            <CardDescription>Sign in to view marketing leads</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
            <CardDescription>You need admin privileges to view leads.</CardDescription>
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Leads Dashboard</h1>
              <p className="text-sm text-muted-foreground">{leads.length} total leads</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={fetchLeads} variant="outline" size="sm" disabled={refreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Users className="w-10 h-10 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Converted</p>
                  <p className="text-3xl font-bold">{stats.converted}</p>
                </div>
                <UserCheck className="w-10 h-10 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-3xl font-bold">{stats.conversionRate}%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sources</p>
                  <p className="text-3xl font-bold">{stats.uniqueSources}</p>
                </div>
                <Filter className="w-10 h-10 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Demos</p>
                  <p className="text-3xl font-bold">{stats.totalDemos}</p>
                </div>
                <UserX className="w-10 h-10 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Export */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by email, source, or referrer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={convertedFilter} onValueChange={(v: any) => setConvertedFilter(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Conversion status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="not-converted">Not Converted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            {selectedLeads.size > 0 && (
              <Button onClick={handleExportSelected} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Selected ({selectedLeads.size})
              </Button>
            )}
            <Button onClick={handleExportAll} size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export All ({filteredLeads.length})
            </Button>
          </div>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Marketing Leads</CardTitle>
            <CardDescription>
              Demo users tracked for marketing follow-up
            </CardDescription>
          </CardHeader>
          <CardContent>
            {refreshing && leads.length === 0 ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery || sourceFilter !== 'all' || convertedFilter !== 'all' 
                  ? 'No leads match your filters' 
                  : 'No leads captured yet'}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedLeads.size === filteredLeads.length && filteredLeads.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Demos</TableHead>
                    <TableHead>First Seen</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Referrer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedLeads.has(lead.id)}
                          onCheckedChange={() => handleSelectLead(lead.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{lead.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {lead.source}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.total_demos_used}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(lead.first_seen_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(lead.last_interaction_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[150px] truncate">
                        {lead.referrer || '-'}
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
                          onClick={() => handleToggleConverted(lead)}
                        >
                          {lead.converted ? (
                            <XCircle className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LeadsDashboardPage;
