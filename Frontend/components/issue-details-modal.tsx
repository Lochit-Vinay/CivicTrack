'use client';

import { Issue } from '@/hooks/use-issues';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Tag, AlertCircle } from 'lucide-react';

interface IssueDetailsModalProps {
  issue?: Issue;
}

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

export function IssueDetailsModal({ issue }: IssueDetailsModalProps) {
  if (!issue) return null;

  const formattedDate = issue.created_at
    ? new Date(issue.created_at.replace('Z', '')).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Unknown Date';

  let locationText = 'Unknown Location';
  if (issue.location) {
    try {
      const parsed = JSON.parse(issue.location);
      locationText = parsed.address || 'Unknown Location';
    } catch {
      locationText = issue.location;
    }
  }

  return (
    <DialogContent className="sm:max-w-[600px] bg-slate-950/95 border-white/10 text-white backdrop-blur-xl shadow-2xl overflow-y-auto max-h-[90vh]">
      <DialogHeader>
        <div className="flex items-start justify-between gap-4">
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            {issue.title}
          </DialogTitle>
        </div>
      </DialogHeader>

      <div className="space-y-6 mt-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={`px-3 py-1 rounded-full border ${getStatusColor(issue.status || 'pending')}`}>
            {issue.status?.replace('-', ' ') || 'pending'}
          </Badge>
          <Badge variant="outline" className={`px-3 py-1 flex items-center rounded-full border ${priorityColors[(issue.priority as keyof typeof priorityColors) || 'medium']}`}>
            <AlertCircle className="w-3 h-3 mr-1" />
            {issue.priority?.replace('-', ' ') || 'N/A'}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 flex items-center rounded-full bg-slate-800/50 text-slate-300 border-white/10">
            <Tag className="w-3 h-3 mr-1" />
            {issue.category}
          </Badge>
        </div>

        {/* Image */}
        {issue.image && (
          <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <img src={issue.image} alt={issue.title} className="w-full h-auto object-cover max-h-[300px]" />
          </div>
        )}

        {/* Description */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">Description</h4>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{issue.description}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
            <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</h4>
              <p className="text-sm text-slate-200 mt-1">{locationText}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
            <Calendar className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reported On</h4>
              <p className="text-sm text-slate-200 mt-1">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
