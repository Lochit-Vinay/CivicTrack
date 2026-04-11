'use client';

import { useState } from 'react';
import { useIssues, Issue } from '@/hooks/use-issues';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { IssuesList } from './issues-list';
import { IssueForm } from './issue-form';
import { DeleteDialog } from './delete-dialog';
import { toast } from 'sonner';
import { Plus, AlertCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export function DashboardContainer() {
  const {
    issues,
    isLoading,
    error,
    createIssue,
    updateIssue,
    deleteIssue,
  } = useIssues();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [issueToDelete, setIssueToDelete] = useState<number | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleSubmitIssue = async (data: any) => {
    setIsFormLoading(true);
    try {
      if (isEditing && selectedIssue) {
        await updateIssue(selectedIssue.id, data);
        toast.success('Issue updated successfully');
      } else {
        await createIssue(data);
        toast.success('Issue created successfully');
      }
      setIsFormOpen(false);
      setSelectedIssue(null);
      setIsEditing(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save issue');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteClick = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;
    
    setIsDeleteLoading(true);
    try {
      await deleteIssue(id);
      toast.success('Issue deleted successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete issue');
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleEditIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedIssue(null);
    setIsEditing(false);
  };

 const safeIssues = Array.isArray(issues) ? issues : [];

const filteredIssues = safeIssues.filter((issue) => {
  const matchesSearch =
  issue.title?.toLowerCase().includes(search.toLowerCase()) ?? false;
  const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
  return matchesSearch && matchesStatus;
});

  return (
    <div className="relative space-y-8 p-1">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-sm tracking-tight mb-2">
            CivicTrack
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Manage, track, and resolve civic issues in your community in real-time.
          </p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 gap-2 font-medium border border-blue-400/20 rounded-xl px-5 py-6">
              <Plus className="w-5 h-5" />
              Report Issue
            </Button>
          </DialogTrigger>
          <IssueForm
            issue={selectedIssue || undefined}
            isLoading={isFormLoading}
            onSubmit={handleSubmitIssue}
            onClose={handleFormClose}
          />
        </Dialog>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-6 flex gap-4 items-start">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-400 mb-2">Unable to connect to CivicTrack API</p>
            <p className="text-red-400/80 mb-4">{error}</p>
            <div className="bg-red-900/30 rounded p-4 border border-red-700/20 text-sm">
              <p className="font-medium text-red-300 mb-2">To get started:</p>
              <ol className="list-decimal list-inside space-y-1 text-red-400/80">
                <li>Ensure the backend API is running on <code className="bg-black/20 px-2 py-1 rounded">http://localhost:8080</code></li>
                <li>Check the API health by visiting <code className="bg-black/20 px-2 py-1 rounded">/api/health</code></li>
                <li>Refer to the README.md for detailed setup instructions</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Loading & Empty UI */}
      {isLoading && <p className="text-slate-400 text-center py-8">Loading issues...</p>}
      {!isLoading && filteredIssues.length === 0 && <p className="text-slate-500 text-center py-8">No issues found</p>}

      {/* Search Input & Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <input
            type="text"
            placeholder="Search issues by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3.5 pl-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 backdrop-blur-md transition-all duration-300 text-white placeholder:text-slate-400 shadow-inner group-hover:bg-white/[0.07]"
          />
        </div>
        <div className="relative group min-w-[160px]">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-white cursor-pointer shadow-inner appearance-none group-hover:bg-slate-800"
          >
            <option value="all">🚀 All Issues</option>
            <option value="pending">🔵 Pending</option>
            <option value="in_progress">🟡 In Progress</option>
            <option value="resolved">🟢 Resolved</option>
            <option value="closed">🔴 Closed</option>
          </select>
          {/* Custom Select Chevron */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Issues List */}
      {!isLoading && filteredIssues.length > 0 && (
        <IssuesList
          issues={filteredIssues}
          onEdit={handleEditIssue}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Delete Dialog has been replaced with window.confirm above */}
    </div>
  );
}
