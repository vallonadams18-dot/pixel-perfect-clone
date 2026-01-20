import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Clock, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptHistoryItem {
  id: string;
  prompt: string;
  timestamp: number;
  style?: string;
}

interface PromptHistoryProps {
  onSelectPrompt: (prompt: string) => void;
  currentPrompt: string;
  storageKey?: string;
}

const STORAGE_KEY_PREFIX = 'prompt_history_';
const MAX_HISTORY_ITEMS = 10;

const PromptHistory = ({ 
  onSelectPrompt, 
  currentPrompt,
  storageKey = 'custom_style' 
}: PromptHistoryProps) => {
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const fullStorageKey = STORAGE_KEY_PREFIX + storageKey;

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(fullStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(Array.isArray(parsed) ? parsed : []);
      }
    } catch (e) {
      console.error('Failed to load prompt history:', e);
    }
  }, [fullStorageKey]);

  // Save to localStorage whenever history changes
  const saveHistory = (newHistory: PromptHistoryItem[]) => {
    try {
      localStorage.setItem(fullStorageKey, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (e) {
      console.error('Failed to save prompt history:', e);
    }
  };

  // Add current prompt to history
  const addToHistory = (prompt: string, style?: string) => {
    if (!prompt.trim()) return;
    
    // Check if prompt already exists
    const exists = history.some(h => h.prompt.toLowerCase() === prompt.toLowerCase());
    if (exists) return;

    const newItem: PromptHistoryItem = {
      id: Date.now().toString(),
      prompt: prompt.trim(),
      timestamp: Date.now(),
      style,
    };

    const newHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    saveHistory(newHistory);
  };

  // Remove a prompt from history
  const removeFromHistory = (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    saveHistory(newHistory);
  };

  // Clear all history
  const clearHistory = () => {
    saveHistory([]);
  };

  // Format relative time
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Expose addToHistory function via ref or callback
  useEffect(() => {
    // Store the add function on window for access from parent
    (window as any).__addPromptToHistory = addToHistory;
    return () => {
      delete (window as any).__addPromptToHistory;
    };
  }, [history]);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg bg-muted/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2 hover:bg-muted/50 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            Recent Prompts ({history.length})
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t">
          <ScrollArea className="max-h-40">
            <div className="p-2 space-y-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "group flex items-start gap-2 p-2 rounded-md transition-colors cursor-pointer",
                    currentPrompt === item.prompt 
                      ? "bg-primary/10 border border-primary/20" 
                      : "hover:bg-muted"
                  )}
                  onClick={() => onSelectPrompt(item.prompt)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs line-clamp-2">{item.prompt}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground">
                        {formatTime(item.timestamp)}
                      </span>
                      {item.style && (
                        <Badge variant="secondary" className="text-[10px] py-0 px-1">
                          {item.style}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(item.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {history.length > 0 && (
            <div className="border-t p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs h-7 text-muted-foreground"
                onClick={clearHistory}
              >
                Clear History
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptHistory;

// Helper function to add prompt to history from outside the component
export const addPromptToHistory = (prompt: string, style?: string) => {
  if ((window as any).__addPromptToHistory) {
    (window as any).__addPromptToHistory(prompt, style);
  }
};
