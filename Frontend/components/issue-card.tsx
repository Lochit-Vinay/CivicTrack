'use client';

import { Issue } from '@/hooks/use-issues';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit2 } from 'lucide-react';



const priorityColors = {
  low: 'bg-blue-900/20 text-blue-400 border-blue-700/30',
  medium: 'bg-yellow-900/20 text-yellow-400 border-yellow-700/30',
  high: 'bg-orange-900/20 text-orange-400 border-orange-700/30',
  critical: 'bg-red-900/20 text-red-400 border-red-700/30',
};

const baseStatusColors: Record<string, string> = {
  open: 'bg-slate-900/20 text-slate-400 border-slate-700/30',
  pending: 'bg-slate-900/20 text-slate-400 border-slate-700/30',
  'Issue in progress': 'bg-blue-900/20 text-blue-400 border-blue-700/30',
  in_progress: 'bg-blue-900/20 text-blue-400 border-blue-700/30',
  'Solved and Fixed': 'bg-green-900/20 text-green-400 border-green-700/30',
  resolved: 'bg-green-900/20 text-green-400 border-green-700/30',
  closed: 'bg-gray-900/20 text-gray-400 border-gray-700/30',
};

const getStatusColor = (status: string) => {
  if (status.startsWith('Token ')) {
    return 'bg-purple-900/20 text-purple-400 border-purple-700/30';
  }
  return baseStatusColors[status] || 'bg-slate-900/20 text-slate-400 border-slate-700/30';
};

interface IssueCardProps {
  issue: Issue;
  userRole?: string | null;
  onUpdateStatus?: (issue: Issue, status: string) => Promise<void>;
  onEdit: (issue: Issue) => void;
  onDelete: (id: number) => void;
  onFocusMap?: (lat: number, lng: number) => void;
  onViewIssue?: (issue: Issue) => void;
}

export function IssueCard({ issue, userRole, onUpdateStatus, onEdit, onDelete, onFocusMap, onViewIssue }: IssueCardProps) {
  const formattedDate = issue.created_at
    ? new Date(issue.created_at.replace('Z', '')).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Recently';

  const handleFocus = () => {
    if (!onFocusMap || !issue.location) return;
    try {
      const parsed = JSON.parse(issue.location);
      if (parsed && typeof parsed === 'object' && parsed.lat && parsed.lng) {
        onFocusMap(parsed.lat, parsed.lng);
      }
    } catch {}
    
    if (onViewIssue) {
      onViewIssue(issue);
    }
  };

  return (
    <Card 
      onClick={handleFocus}
      onMouseEnter={() => {
        if (!onFocusMap || !issue.location) return;
        try {
          const parsed = JSON.parse(issue.location);
          if (parsed && typeof parsed === 'object' && parsed.lat && parsed.lng) {
            onFocusMap(parsed.lat, parsed.lng);
          }
        } catch {}
      }}
      className="group cursor-pointer relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.25)] rounded-2xl"
    >
      {/* Subtle top highlight gradient on hover */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors duration-300">
              {issue.title}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
              {issue.description}
            </p>
            {issue.image && (
              <div className="mt-3 w-full h-32 rounded-xl overflow-hidden shadow-sm border border-white/5 bg-black/20">
                <img src={issue.image} alt={issue.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
          </div>
          {userRole === 'authority' ? (
            <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <select
                value={issue.status?.startsWith('Token ') ? issue.status : issue.status}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'custom_token') {
                    const num = prompt("Enter Token Number:");
                    if (num && num.trim() !== '') {
                      onUpdateStatus?.(issue, `Token ${num.trim()}`);
                    }
                    // If they cancel, we don't trigger update, select will visually revert on next render/state
                  } else {
                    onUpdateStatus?.(issue, val);
                  }
                }}
                className="bg-slate-900 border border-white/10 rounded-xl text-xs text-white px-2.5 py-1.5 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="Issue in progress">Issue in progress</option>
                {issue.status?.startsWith('Token ') && (
                  <option value={issue.status}>{issue.status}</option>
                )}
                <option value="custom_token">Assign Token...</option>
                <option value="Solved and Fixed">Solved and Fixed</option>
              </select>
            </div>
          ) : (
            <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(issue);
                }}
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-200 border border-white/5"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(issue.id);
                }}
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 border border-white/5"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap pt-2 border-t border-white/5">
          <Badge variant="outline" className={`text-xs font-medium px-3 py-1 rounded-full border shadow-sm ${priorityColors[(issue.priority as keyof typeof priorityColors) || 'medium']}`}>
            {issue.priority?.replace('-', ' ') || 'N/A'}
          </Badge>
          <Badge variant="outline" className={`text-xs font-medium px-3 py-1 rounded-full border shadow-sm ${getStatusColor(issue.status || 'pending')}`}>
            {issue.status?.replace('-', ' ') || 'pending'}
          </Badge>
          <Badge variant="outline" className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800/50 text-slate-300 border-white/10 shadow-sm">
            {issue.category}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-1">
          <span className="flex items-center gap-1.5"><span className="text-base leading-none">📍</span> {(() => {
            if (!issue.location) return 'N/A';
            try {
              const parsed = JSON.parse(issue.location);
              return parsed.address || 'Unknown Location';
            } catch {
              return issue.location; // fallback if it's already a regular string
            }
          })()}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600 block"></span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Card>
  );
}
