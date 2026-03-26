'use client';

import { DashboardContainer } from '@/components/dashboard-container';
import { Toaster } from 'sonner';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#070708] text-foreground flex flex-col font-sans">
      <main className="flex-1 w-full mx-auto max-w-7xl py-12 pt-16 px-4">
        <DashboardContainer />
      </main>
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
