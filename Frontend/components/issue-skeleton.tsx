'use client';

import { Card } from '@/components/ui/card';

export function IssueSkeleton() {
  return (
    <Card className="border border-border bg-card/50">
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-slate-800 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-slate-800 rounded w-full animate-pulse" />
          <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse" />
        </div>

        {/* Badges skeleton */}
        <div className="flex gap-2 flex-wrap">
          <div className="h-6 bg-slate-800 rounded w-16 animate-pulse" />
          <div className="h-6 bg-slate-800 rounded w-20 animate-pulse" />
          <div className="h-6 bg-slate-800 rounded w-24 animate-pulse" />
        </div>

        {/* Footer skeleton */}
        <div className="flex gap-4">
          <div className="h-4 bg-slate-800 rounded w-24 animate-pulse" />
          <div className="h-4 bg-slate-800 rounded w-20 animate-pulse" />
        </div>
      </div>
    </Card>
  );
}

export function IssueListSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <IssueSkeleton key={i} />
      ))}
    </div>
  );
}
