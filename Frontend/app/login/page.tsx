"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>

      <GoogleLogin
        onSuccess={(response) => {
          console.log("LOGIN SUCCESS", response);

          // 🚀 REDIRECT HERE
          router.push("/dashboard");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}