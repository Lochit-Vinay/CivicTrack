"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Mail, Lock, AlertCircle, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import RevolvingGlobe from "@/components/revolving-globe";

const CivicTrackLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
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

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<"citizen" | "authority" | "admin">("citizen");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "citizen" || roleParam === "authority" || roleParam === "admin") {
      setRole(roleParam as "citizen" | "authority" | "admin");
    }
  }, [searchParams]);
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (role === "authority") {
      const emailLower = email.toLowerCase();
      if (!emailLower.endsWith("_auth@civictrack.com")) {
        setError("Invalid email format. Authority email must be in state_auth@civictrack.com format.");
        setIsLoading(false);
        return;
      }
      const stateName = emailLower.replace("_auth@civictrack.com", "");
      if (!stateName) {
        setError("Invalid email format. State name cannot be empty.");
        setIsLoading(false);
        return;
      }
      const expectedPassword = `${stateName}@123`;
      if (password !== expectedPassword && password !== "state@123") {
        setError(`Invalid password. Password must be in statename@123 format (e.g. ${stateName}@123) or literally "state@123".`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", role);
        router.push("/dashboard");
      } else {
        const errData = await res.json().catch(() => ({ error: "Invalid email or password" }));
        setError(errData.error || "Authentication failed");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please check if the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Simple Realistic Logo Area */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2.5">
            <CivicTrackLogo className="w-10 h-10 drop-shadow-md" />
            <span className="text-2xl font-bold tracking-tight">CivicTrack</span>
          </div>
        </div>

        <h2 className="text-center text-2xl font-semibold leading-9 tracking-tight text-white mb-2">
          {role === "citizen" ? "Citizen Portal" : role === "authority" ? "Authority Portal" : "Admin Portal"} Login
        </h2>
        <p className="text-center text-sm text-gray-400 mb-8 max-w-xs mx-auto">
          {role === "citizen"
            ? "Report neighborhood issues and track resolution progress securely."
            : role === "authority"
              ? "Review service requests. Use state_auth@civictrack.com and statename@123 format."
              : "Monitor and manage issues nationwide with full administrative control."}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[420px]">
        <div className="bg-[#0c0c0e]/90 border border-white/[0.08] py-8 px-6 shadow-[0_0_50px_-12px_rgba(94,117,238,0.15)] sm:rounded-2xl sm:px-10 backdrop-blur-xl">
          {/* Tab Selector */}
          <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 mb-8 gap-1">
            <button
              onClick={() => {
                setRole("citizen");
                setError("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${role === "citizen"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
                  : "text-slate-400 hover:text-white"
                }`}
            >
              Citizen
            </button>
            <button
              onClick={() => {
                setRole("authority");
                setError("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${role === "authority"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
                  : "text-slate-400 hover:text-white"
                }`}
            >
              Authority
            </button>
            <button
              onClick={() => {
                setRole("admin");
                setError("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${role === "admin"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
                  : "text-slate-400 hover:text-white"
                }`}
            >
              Admin
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 flex gap-2 items-center">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {role === "citizen" ? (
            <div className="space-y-6">
              <div className="flex justify-center w-full pb-2">
                <GoogleLogin
                  onSuccess={async (response) => {
                    console.log("LOGIN SUCCESS", response);
                    if (response.credential) {
                      try {
                        const res = await fetch("http://localhost:8080/auth/google", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ token: response.credential }),
                        });

                        if (res.ok) {
                          const data = await res.json();
                          localStorage.setItem("token", data.token);
                          localStorage.setItem("role", "citizen");
                          router.push("/dashboard");
                        } else {
                          setError("Google authentication failed. Please try again.");
                        }
                      } catch (err) {
                        setError("Unable to reach authentication server.");
                      }
                    }
                  }}
                  onError={() => {
                    setError("Google authentication login failed.");
                  }}
                  theme="filled_black"
                  shape="rectangular"
                  text="continue_with"
                  size="large"
                  width="338"
                />
              </div>
            </div>
          ) : (
            <form onSubmit={handleCredentialsLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  {role === "authority" ? "Department Email" : "Administrator Email"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm mt-2"
              >
                {isLoading
                  ? "Signing in..."
                  : role === "authority"
                    ? "Sign In to Authority Portal"
                    : "Sign In to Admin Portal"}
              </button>
            </form>
          )}

          {role === "citizen" ? (
            <div className="mt-6 space-y-5">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <ul className="space-y-3 text-[13px] text-slate-300 font-medium px-2 py-2">
                <li className="flex items-center gap-3"><span className="text-[15px] flex-shrink-0 leading-none">🔒</span> Secure authentication with Google</li>
                <li className="flex items-center gap-3"><span className="text-[15px] flex-shrink-0 leading-none">🛡️</span> No passwords to remember</li>
                <li className="flex items-center gap-3"><span className="text-[15px] flex-shrink-0 text-emerald-500 font-bold leading-none">✓</span> Automatic account setup</li>
              </ul>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="text-center text-[11px] text-slate-500 leading-relaxed">
                <p>By continuing, you agree to our <br /><a href="#" className="hover:text-white transition-colors text-slate-400">Terms of Service</a> &bull; <a href="#" className="hover:text-white transition-colors text-slate-400">Privacy Policy</a></p>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="text-center text-[11px] text-slate-500 leading-relaxed">
                <p>By continuing, you agree to our <br /><a href="#" className="hover:text-white transition-colors text-slate-400">Terms of Service</a> &bull; <a href="#" className="hover:text-white transition-colors text-slate-400">Privacy Policy</a></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 overflow-hidden">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/5 backdrop-blur-md"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      {/* Dashboard-style Ambient glows & Grid pattern */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
      <RevolvingGlobe />

      <Suspense fallback={<div className="flex flex-1 items-center justify-center">Loading login parameters...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}