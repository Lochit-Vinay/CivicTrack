'use client';

import { Issue } from '@/hooks/use-issues';
import { IssueCard } from './issue-card';
import { Empty, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty';
import { Inbox } from 'lucide-react';

interface IssuesListProps {
  issues: Issue[];
  userRole?: string | null;
  onUpdateStatus?: (issue: Issue, status: string) => Promise<void>;
  onEdit: (issue: Issue) => void;
  onDelete: (id: number) => void;
  onFocusMap: (lat: number, lng: number) => void;
  onViewIssue: (issue: Issue) => void;
}

export function IssuesList({ issues, userRole, onUpdateStatus, onEdit, onDelete, onFocusMap, onViewIssue }: IssuesListProps) {
  if (!issues || issues.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>No issues yet</EmptyTitle>
        <EmptyDescription>Start by creating a new civic issue to track</EmptyDescription>
      </Empty>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          userRole={userRole}
          onUpdateStatus={onUpdateStatus}
          onEdit={onEdit}
          onDelete={onDelete}
          onFocusMap={onFocusMap}
          onViewIssue={onViewIssue}
        />
      ))}
    </div>
  );
}
