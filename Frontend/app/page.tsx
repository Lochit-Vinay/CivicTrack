'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Activity, Shield, BarChart3, Users, Zap, Search, Building2, Wrench, CheckCircle2 } from 'lucide-react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };

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

        <div className="flex items-center gap-3.5 text-sm font-medium">
          {mounted && isLoggedIn ? (
            <>
              <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold active:scale-95 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login?role=citizen" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white backdrop-blur-md">
                Citizen Login
              </Link>
              <Link href="/login?role=authority" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white backdrop-blur-md">
                Authority Login
              </Link>
              <Link href="/login?role=admin" className="px-4 py-2 rounded-full bg-white text-black hover:bg-slate-200 border border-white transition-all">
                Admin Login
              </Link>
            </>
          )}
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
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-blue-500/40" viewBox="0 0 200 9" fill="none"><path d="M2.00018 7.0003C51.109 -2.04625 106.603 -1.82136 198.337 7.0003" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
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
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                <div className="mx-auto flex items-center bg-black/40 px-3 py-1 rounded-md border border-white/5">
                  <Search className="w-3 h-3 text-slate-500 mr-2" />
                  <span className="text-[10px] text-slate-500 font-medium">Search mapping data...</span>
                </div>
              </div>

              {/* Fake Map Content */}
              <div className="relative h-full bg-[#040914] p-6 overflow-hidden">
                {/* Dynamic Animated Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>

                {/* Glowing Orbs for Map Background */}
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse delay-1000"></div>

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

                {/* Workflow Cards */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 gap-5 pointer-events-none z-10">

                  {/* Card 1 */}
                  <div className="relative overflow-hidden w-72 p-[1px] rounded-[1.25rem] bg-gradient-to-br from-blue-500/50 via-white/5 to-transparent shadow-2xl transform -translate-x-6 group-hover:translate-x-0 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] cursor-default pointer-events-auto group/card">
                    <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] group-hover/card:left-[200%] transition-all duration-1000 ease-in-out z-20 pointer-events-none"></div>
                    <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-2xl p-4 flex items-center gap-4 transition-colors duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(59,130,246,0.15),transparent_70%)] group-hover/card:bg-[radial-gradient(circle_at_0%_50%,rgba(59,130,246,0.35),transparent_70%)] transition-all duration-500"></div>
                      <div className="relative z-10 w-12 h-12 rounded-[0.85rem] bg-blue-500/20 flex flex-shrink-0 items-center justify-center border border-blue-400/50 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover/card:scale-110 transition-transform duration-500">
                        <MapPin className="w-5 h-5 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      </div>
                      <div className="relative z-10 flex-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-[15px] font-bold text-white tracking-wide drop-shadow-md">Report Issue</p>
                          <span className="text-[9px] uppercase tracking-wider font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">Step 1</span>
                        </div>
                        <p className="text-[11px] text-blue-200 mt-0.5 font-medium drop-shadow-sm">GPS + Image Upload</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative overflow-hidden w-72 p-[1px] rounded-[1.25rem] bg-gradient-to-br from-indigo-500/50 via-white/5 to-transparent shadow-2xl transform translate-x-6 group-hover:translate-x-0 transition-all duration-700 delay-75 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] cursor-default pointer-events-auto group/card">
                    <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] group-hover/card:left-[200%] transition-all duration-1000 ease-in-out z-20 pointer-events-none delay-75"></div>
                    <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-2xl p-4 flex items-center gap-4 transition-colors duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(99,102,241,0.15),transparent_70%)] group-hover/card:bg-[radial-gradient(circle_at_0%_50%,rgba(99,102,241,0.35),transparent_70%)] transition-all duration-500"></div>
                      <div className="relative z-10 w-12 h-12 rounded-[0.85rem] bg-indigo-500/20 flex flex-shrink-0 items-center justify-center border border-indigo-400/50 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover/card:scale-110 transition-transform duration-500">
                        <Building2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                      </div>
                      <div className="relative z-10 flex-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-[15px] font-bold text-white tracking-wide drop-shadow-md">Authority Review</p>
                          <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">Step 2</span>
                        </div>
                        <p className="text-[11px] text-indigo-200 mt-0.5 font-medium drop-shadow-sm">Verify & Assign</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="relative overflow-hidden w-72 p-[1px] rounded-[1.25rem] bg-gradient-to-br from-yellow-500/50 via-white/5 to-transparent shadow-2xl transform -translate-x-6 group-hover:translate-x-0 transition-all duration-700 delay-150 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] cursor-default pointer-events-auto group/card">
                    <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] group-hover/card:left-[200%] transition-all duration-1000 ease-in-out z-20 pointer-events-none delay-150"></div>
                    <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-2xl p-4 flex items-center gap-4 transition-colors duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(234,179,8,0.15),transparent_70%)] group-hover/card:bg-[radial-gradient(circle_at_0%_50%,rgba(234,179,8,0.35),transparent_70%)] transition-all duration-500"></div>
                      <div className="relative z-10 w-12 h-12 rounded-[0.85rem] bg-yellow-500/20 flex flex-shrink-0 items-center justify-center border border-yellow-400/50 text-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.4)] group-hover/card:scale-110 transition-transform duration-500">
                        <Wrench className="w-5 h-5 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                      </div>
                      <div className="relative z-10 flex-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-[15px] font-bold text-white tracking-wide drop-shadow-md">Resolution</p>
                          <span className="text-[9px] uppercase tracking-wider font-bold text-yellow-300 bg-yellow-500/20 px-2 py-0.5 rounded-full border border-yellow-500/30">Step 3</span>
                        </div>
                        <p className="text-[11px] text-yellow-200 mt-0.5 font-medium drop-shadow-sm">Status Updated</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="relative overflow-hidden w-72 p-[1px] rounded-[1.25rem] bg-gradient-to-br from-green-500/50 via-white/5 to-transparent shadow-2xl transform translate-x-6 group-hover:translate-x-0 transition-all duration-700 delay-200 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] cursor-default pointer-events-auto group/card">
                    <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] group-hover/card:left-[200%] transition-all duration-1000 ease-in-out z-20 pointer-events-none delay-200"></div>
                    <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-2xl p-4 flex items-center gap-4 transition-colors duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(34,197,94,0.15),transparent_70%)] group-hover/card:bg-[radial-gradient(circle_at_0%_50%,rgba(34,197,94,0.35),transparent_70%)] transition-all duration-500"></div>
                      <div className="relative z-10 w-12 h-12 rounded-[0.85rem] bg-green-500/20 flex flex-shrink-0 items-center justify-center border border-green-400/50 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover/card:scale-110 transition-transform duration-500">
                        <CheckCircle2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                      </div>
                      <div className="relative z-10 flex-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-[15px] font-bold text-white tracking-wide drop-shadow-md">Citizen Notified</p>
                          <span className="text-[9px] uppercase tracking-wider font-bold text-green-300 bg-green-500/20 px-2 py-0.5 rounded-full border border-green-500/30">Step 4</span>
                        </div>
                        <p className="text-[11px] text-green-200 mt-0.5 font-medium drop-shadow-sm">Real-time Tracking</p>
                      </div>
                    </div>
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
                <MapPin className="w-4 h-4 text-blue-500" /> GPS Enabled
              </div>
              <p className="text-3xl font-bold text-white tracking-tight">Live <span className="text-blue-500">Location</span></p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-medium tracking-wide text-sm uppercase">
                <Shield className="w-4 h-4 text-yellow-500" /> Secure
              </div>
              <p className="text-3xl font-bold text-white tracking-tight">JWT <span className="text-yellow-500">Auth</span></p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-medium tracking-wide text-sm uppercase">
                <Users className="w-4 h-4 text-green-500" /> Multi-State
              </div>
              <p className="text-3xl font-bold text-white tracking-tight">Authority <span className="text-green-500">Portal</span></p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-medium tracking-wide text-sm uppercase">
                <Zap className="w-4 h-4 text-purple-500" /> Real-Time
              </div>
              <p className="text-3xl font-bold text-white tracking-tight">Issue <span className="text-purple-500">Tracking</span></p>
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
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">📍 Report Instantly</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Report civic issues with live location, images, priority, and category in just a few clicks.</p>
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
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">📈 Track Progress</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Follow issue updates as authorities review, assign, and resolve requests in real time.</p>
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
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">🛡️ Authority Dashboard</h3>
                  <p className="text-slate-400 leading-relaxed font-light">State authorities prioritize issues, assign work, and update their status until completion.</p>
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
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
      `}} />
    </div>
  );
}
