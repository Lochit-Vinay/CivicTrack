'use client';

import { Issue } from '@/hooks/use-issues';
import { IssueCard } from './issue-card';
import { Empty } from '@/components/ui/empty';

interface IssuesListProps {
  issues: Issue[];
  onEdit: (issue: Issue) => void;
  onDelete: (id: number) => void;
}

export function IssuesList({ issues, onEdit, onDelete }: IssuesListProps) {
  if (!issues || issues.length === 0) {
    return (
      <Empty
        heading="No issues yet"
        description="Start by creating a new civic issue to track"
        icon="inbox"
      />
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
