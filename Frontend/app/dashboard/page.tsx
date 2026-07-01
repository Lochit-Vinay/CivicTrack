'use client';

import { DashboardContainer } from '@/components/dashboard-container';
import { Toaster } from 'sonner';

export default function DashboardPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(20px) scale(0.95); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.1); }
        }
        .bg-orb-1 { animation: float-1 15s ease-in-out infinite; }
        .bg-orb-2 { animation: float-2 18s ease-in-out infinite; }
        .bg-orb-3 { animation: float-3 20s ease-in-out infinite; }
      `}} />

      <div className="min-h-screen bg-[#070708] text-slate-50 flex flex-col font-sans relative overflow-hidden">
        
        {/* Refined Background System */}
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
          {/* Subtle grid map texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
          
          {/* Layered lighting (Linear/Stripe style) */}
          <div className="absolute top-0 left-[20%] w-[60%] h-[500px] bg-blue-900/15 blur-[120px] rounded-[100%] mix-blend-screen opacity-50 transform -translate-y-1/2 bg-orb-1"></div>
          <div className="absolute top-[40%] right-[-10%] w-[40%] h-[600px] bg-indigo-900/15 blur-[130px] rounded-[100%] mix-blend-screen opacity-50 bg-orb-2"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[500px] bg-purple-900/15 blur-[140px] rounded-[100%] mix-blend-screen opacity-50 bg-orb-3"></div>
          
          {/* Very subtle vignette to focus center but not darken entirely */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#070708_120%)] opacity-60"></div>
        </div>

        {/* Content Layers */}
        <main className="flex-1 w-full mx-auto max-w-7xl py-12 pt-16 px-4 relative z-10">
          <DashboardContainer />
        </main>
        <Toaster position="top-right" theme="dark" />
      </div>
    </>
  );
}
