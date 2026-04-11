"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="498123859166-9og6tr39s7v81p5fiemkhhgd634tnpob.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
