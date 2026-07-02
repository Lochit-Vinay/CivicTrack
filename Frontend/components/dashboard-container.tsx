'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIssues, Issue } from '@/hooks/use-issues';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { IssuesList } from './issues-list';
import { IssueForm } from './issue-form';
import { DeleteDialog } from './delete-dialog';
import { IssueDetailsModal } from './issue-details-modal';
import { toast } from 'sonner';
import { Plus, AlertCircle, ArrowLeft, LogOut } from 'lucide-react';
import dynamic from 'next/dynamic';

const IssuesMap = dynamic(() => import('@/components/IssuesMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full rounded-xl bg-slate-800 animate-pulse flex items-center justify-center text-slate-400">Loading Map...</div>
});
import { Spinner } from '@/components/ui/spinner';

export function DashboardContainer() {
  const router = useRouter();
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
  const [viewedIssue, setViewedIssue] = useState<Issue | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [issueToDelete, setIssueToDelete] = useState<number | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [focusedLocation, setFocusedLocation] = useState<[number, number] | null>(null);

  const [isClient, setIsClient] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setUserRole(role);
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    router.push("/login");
  };

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

  const handleViewIssue = (issue: Issue) => {
    setViewedIssue(issue);
    setIsViewOpen(true);
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-sm tracking-tight">
              CivicTrack
            </h1>
            {isClient && userRole && (
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                userRole === 'admin' 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                  : userRole === 'authority' 
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {userRole}
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Manage, track, and resolve civic issues in your community in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 gap-2 font-medium rounded-xl px-5 py-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          {isClient && localStorage.getItem("token") && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border border-red-500/20 bg-red-500/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 hover:scale-105 active:scale-95 gap-2 font-medium rounded-xl px-5 py-6"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          )}

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
                <li>Ensure the backend API is running on <code className="bg-black/20 px-2 py-1 rounded">https://civictrack-backend-5ji4.onrender.com</code></li>
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

      {/* Metrics Status Bar */}
      {!isLoading && safeIssues.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-md transition-transform hover:scale-105">
            <h3 className="text-sm font-medium text-slate-400 mb-1">Total Issues</h3>
            <p className="text-3xl font-bold text-white">{safeIssues.length}</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-md transition-transform hover:scale-105">
            <h3 className="text-sm font-medium text-blue-400 mb-1">Issues Pending</h3>
            <p className="text-3xl font-bold text-blue-50">{safeIssues.filter(i => i.status === 'pending' || i.status === 'open').length}</p>
          </div>
          <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-md transition-transform hover:scale-105">
            <h3 className="text-sm font-medium text-green-400 mb-1">Solved and Fixed</h3>
            <p className="text-3xl font-bold text-green-50">{safeIssues.filter(i => i.status === 'Solved and Fixed' || i.status === 'resolved' || i.status === 'Fixed' || i.status === 'closed').length}</p>
          </div>
        </div>
      )}

      {/* Map view of issues */}
      {!isLoading && filteredIssues.length > 0 && (
        <div className="mb-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative z-0">
          <IssuesMap issues={filteredIssues} focusedLocation={focusedLocation} />
        </div>
      )}

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
          userRole={userRole}
          onUpdateStatus={async (issue, newStatus) => {
            try {
              await updateIssue(issue.id, { ...issue, status: newStatus });
              toast.success(`Status updated to "${newStatus}"`);
            } catch (err) {
              toast.error("Failed to update status");
            }
          }}
          onEdit={handleEditIssue}
          onDelete={handleDeleteClick}
          onFocusMap={(lat: number, lng: number) => setFocusedLocation([lat, lng])}
          onViewIssue={handleViewIssue}
        />
      )}

      {/* Delete Dialog has been replaced with window.confirm above */}
      
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <IssueDetailsModal issue={viewedIssue || undefined} />
      </Dialog>
    </div>
  );
}
