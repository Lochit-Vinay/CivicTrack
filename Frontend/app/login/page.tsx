"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 overflow-hidden">
      {/* Dashboard-style Ambient glows & Grid pattern */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Simple Realistic Logo Area */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2.5">
              <img src="/icon.svg" alt="CivicTrack Logo" className="w-10 h-10 drop-shadow-md" />
              <span className="text-2xl font-bold tracking-tight">CivicTrack</span>
            </div>
          </div>
          
          <h2 className="text-center text-2xl font-semibold leading-9 tracking-tight text-white mb-2">
            Log in to your account
          </h2>
          <p className="text-center text-sm text-gray-400 mb-8">
            Manage reports, track updates, and engage securely.
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-[400px]">
          <div className="bg-[#121214] border border-white/[0.08] py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-10">
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
                        router.push("/dashboard");
                      } else {
                        console.error("Backend auth failed", await res.text());
                      }
                    } catch (err) {
                      console.error("Error exchanging token", err);
                    }
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                theme="filled_black"
                shape="rectangular"
                text="continue_with"
                size="large"
                width="318"
              />
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-full bg-white/10"></div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-500 bg-[#121214]">Secure</span>
              <div className="h-px w-full bg-white/10"></div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-500 leading-relaxed">
              <p>By continuing, you agree to our <a href="#" className="underline decoration-white/20 underline-offset-2 hover:text-white transition-colors">Terms of Service</a> and <br/><a href="#" className="underline decoration-white/20 underline-offset-2 hover:text-white transition-colors">Privacy Policy</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}