'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Activity, Shield, BarChart3, Users, Zap, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const CivicTrackLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#1A1D2E" stroke="#5E75EE" strokeWidth="6" />
    <path d="M 12 55 A 40 40 0 0 1 24 16" stroke="#5E75EE" strokeWidth="2" fill="none" />
    <polygon points="17,14 27,17 21,26" fill="#5E75EE" />
    <polygon points="47,47 16,52 35,12" fill="#24A68C" />
    <polygon points="47,47 35,12 85,35" fill="#E1A639" />
    <polygon points="47,47 85,35 75,85" fill="#8B332F" />
    <polygon points="47,47 16,52 25,80" fill="#DF553E" />
    <polygon points="42,54 47,66 52,54" fill="#EA5A45" />
    <circle cx="47" cy="47" r="9" fill="#EA5A45" stroke="#1A1D2E" strokeWidth="1" />
    <circle cx="47" cy="47" r="3" fill="#FFFFFF" />
  </svg>
);
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-[#070708] text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden selection:text-white">
      {/* Refined Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle grid map texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        {/* Layered lighting (Linear/Stripe style) */}
        <div className="absolute top-0 left-[20%] w-[60%] h-[500px] bg-blue-900/10 blur-[120px] rounded-[100%] mix-blend-screen opacity-50 transform -translate-y-1/2"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[600px] bg-indigo-900/10 blur-[130px] rounded-[100%] mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[500px] bg-purple-900/10 blur-[140px] rounded-[100%] mix-blend-screen opacity-50"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6 max-w-[90rem] mx-auto border-b border-white/[0.04]">
        <div className="flex items-center gap-4">
          <CivicTrackLogo className="w-14 h-14" />
          <div className="flex flex-col">
            <span className="text-[26px] leading-tight font-semibold tracking-wide text-white">CivicTrack</span>
            <span className="text-[11px] tracking-[0.25em] text-[#8194F4] font-semibold uppercase mt-0.5">Civic Issue Management</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-slate-400">
          <span className="hover:text-white transition-colors cursor-pointer">Platform</span>
          <span className="hover:text-white transition-colors cursor-pointer">Live Map</span>
          <span className="hover:text-white transition-colors cursor-pointer">Impact Metrics</span>
          <span className="hover:text-white transition-colors cursor-pointer">For Cities</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <span className="hidden md:block text-slate-400 hover:text-white transition-colors cursor-pointer">Log in</span>
          <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-white backdrop-blur-md">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-12 pt-24 pb-32 space-y-40">
        
        {/* 1. HERO SECTION */}
        <section className="flex flex-col lg:flex-row items-center gap-20 lg:gap-12">
          {/* Left: Copy */}
          <div className="flex-1 space-y-10 max-w-2xl lg:max-w-xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Civic Operations Platform
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
              Report Issues.<br className="hidden lg:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Track Impact.</span><br />
              <span className="relative inline-block">
                Hold Authorities
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-blue-500/40" viewBox="0 0 200 9" fill="none"><path d="M2.00018 7.0003C51.109 -2.04625 106.603 -1.82136 198.337 7.0003" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
              </span> Accountable.
            </h1>
            
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              The modern infrastructure for neighborhood operations. Empower citizens to report localized problems, while delivering municipalities the CRM tools to prioritize and resolve them efficiently.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
              <Link href="/dashboard" className="group w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#070708] font-semibold hover:bg-slate-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
                View Live Dashboard 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                Report an Issue
              </Link>
            </div>
          </div>

          {/* Right: Actual Product UI Preview (Asymmetric Map Card) */}
          <div className={`flex-1 relative w-full aspect-square max-w-2xl lg:max-w-none transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute inset-0 bg-[#0B0C0E] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden shadow-blue-900/10 transform lg:rotate-[1.5deg] hover:rotate-0 transition-transform duration-700 group">
              
              {/* Fake OSX Window Header */}
              <div className="h-12 bg-white/[0.02] border-b border-white/5 flex items-center px-6 gap-2 backdrop-blur-sm relative z-20">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="mx-auto flex items-center bg-black/40 px-3 py-1 rounded-md border border-white/5">
                  <Search className="w-3 h-3 text-slate-500 mr-2" />
                  <span className="text-[10px] text-slate-500 font-medium">Search mapping data...</span>
                </div>
              </div>

              {/* Fake Map Content */}
              <div className="relative h-full bg-[#0a0a0a] p-6 overflow-hidden">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=14&size=800x800&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:landscape|color:0x0B0C0E&style=feature:water|color:0x070708&style=feature:road|color:0x1a1a24')] bg-cover bg-center mix-blend-luminosity grayscale contrast-125"></div>
                
                {/* Floating Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-1000" style={{ filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))" }}>
                  <path d="M 150 200 Q 250 150 350 250 T 450 300" fill="none" stroke="url(#blue-gradient)" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_15s_linear_infinite]" />
                  <defs>
                    <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                      <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* UI Element 1: Open Pothole */}
                <div className="absolute top-12 right-12 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl space-y-3 w-64 transform translate-y-4 shadow-black/50 group-hover:-translate-y-2 transition-transform duration-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-semibold text-white">Pothole on 5th Ave</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Reported 2 hours ago</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">In Progress</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                    <div className="bg-yellow-500 h-1 rounded-full w-[65%]"></div>
                  </div>
                </div>

                {/* UI Element 2: Resolved Issue */}
                <div className="absolute bottom-24 left-12 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4 w-72 transform -translate-y-4 shadow-black/50 group-hover:translate-y-2 transition-transform duration-700">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 box-shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                    <Shield className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Streetlight Repaired</p>
                    <p className="text-xs text-slate-400 mt-0.5">Verified by DPW Team • 1m ago</p>
                  </div>
                </div>

                {/* Glowing Map Pins */}
                <div className="absolute top-[45%] left-[40%] group-hover:scale-125 transition-transform duration-500">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-blue-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                    <div className="relative w-4 h-4 bg-blue-500 rounded-full border-[3px] border-[#0B0C0E]"></div>
                  </div>
                </div>
                <div className="absolute top-[30%] right-[35%] group-hover:scale-125 transition-transform duration-500 delay-100">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-red-500 rounded-full blur-md opacity-40 animate-pulse delay-75"></div>
                    <div className="relative w-3 h-3 bg-red-500 rounded-full border-2 border-[#0B0C0E]"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Ambient Backlight for Mockup */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-3xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </section>

        {/* 4. TRUST / IMPACT METRICS */}
        <section className="relative rounded-[2rem] border border-white/5 bg-white/[0.01] p-12 overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-medium tracking-wide text-sm uppercase">
                <MapPin className="w-4 h-4 text-blue-500" /> Issues Logged
              </div>
              <p className="text-5xl font-bold text-white tracking-tight">1,200<span className="text-blue-500 text-3xl">+</span></p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-medium tracking-wide text-sm uppercase">
                <Zap className="w-4 h-4 text-yellow-500" /> Avg Resolution
              </div>
              <p className="text-5xl font-bold text-white tracking-tight">36<span className="text-yellow-500 text-3xl">h</span></p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-medium tracking-wide text-sm uppercase">
                <Shield className="w-4 h-4 text-green-500" /> Resolution Rate
              </div>
              <p className="text-5xl font-bold text-white tracking-tight">98<span className="text-green-500 text-3xl">%</span></p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-medium tracking-wide text-sm uppercase">
                <Users className="w-4 h-4 text-purple-500" /> Target Cities
              </div>
              <p className="text-5xl font-bold text-white tracking-tight">50<span className="text-purple-500 text-3xl">+</span></p>
            </div>
          </div>
        </section>

        {/* 2. HOW IT WORKS */}
        <section className="space-y-20 relative">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Engineered for speed & impact.</h2>
            <p className="text-slate-400 text-xl font-light">A strictly optimized workflow connecting incidents to municipal resolution streams instantly.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/30 transition-colors duration-500">
              <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="h-full rounded-[23px] bg-[#070708] border border-white/5 p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-5xl font-extrabold text-white/5 group-hover:text-blue-500/10 transition-colors">01</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">Report Instantly</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Geolocate issues automatically, append categorization metadata, and push directly to the public ledger without cumbersome paperwork.</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-indigo-500/30 transition-colors duration-500">
              <div className="h-full rounded-[23px] bg-[#070708] border border-white/5 p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-inner">
                    <Activity className="w-6 h-6 text-indigo-400" />
                  </div>
                  <span className="text-5xl font-extrabold text-white/5 group-hover:text-indigo-500/10 transition-colors">02</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">Track Live Sync</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Monitor state changes in real-time as local authorities prioritize, inspect, and transition the issue status across their Kanban boards.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-green-500/30 transition-colors duration-500">
              <div className="h-full rounded-[23px] bg-[#070708] border border-white/5 p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-5xl font-extrabold text-white/5 group-hover:text-green-500/10 transition-colors">03</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">Immutable Audit</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Once resolved, the outcome is recorded permanently. Compare historical efficiency stats across districts and hold leaders accountable.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. AUTH / CTA SECTION (Linear-style Footer CTA) */}
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0B0C0E] p-12 lg:p-24 text-center">
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
          {/* Subtle Bottom Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/20 blur-[100px] rounded-[100%] pointer-events-none"></div>

          <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Ready to map the future?</h2>
            
            <p className="text-xl text-slate-400 font-light leading-relaxed px-4">
              Join thousands of citizens operating the most transparent civic infrastructure. Free for individuals. Powerful for municipalities.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <button className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white text-[#070708] font-bold hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                Continue with Google
              </button>
              
              <Link href="/dashboard" className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white/[0.04] border border-white/10 text-white font-semibold hover:bg-white/10 transition-all backdrop-blur-md">
                Continue as Guest
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-white/[0.05] bg-[#070708] py-12 px-6 lg:px-12 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between max-w-[90rem] mx-auto">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <CivicTrackLogo className="w-6 h-6" />
          <span className="font-semibold text-slate-400">CivicTrack Inc.</span>
        </div>
        <div className="flex gap-6">
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">System Status <span className="inline-block w-2 h-2 ml-1 rounded-full bg-green-500"></span></span>
        </div>
      </footer>

      {/* Global CSS for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
      `}} />
    </div>
  );
}
