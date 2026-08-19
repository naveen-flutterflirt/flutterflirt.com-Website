"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Loader2,
  Lock,
  Mail,
  ArrowRight
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();
  // Auth State
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("flutterflirt_admin_token");
    if (savedToken) {
      setToken(savedToken);
      router.push("/flutterflirt-admin-login/blogs");
    }
    setIsInitializing(false);
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      localStorage.setItem("flutterflirt_admin_token", data.token);
      setToken(data.token);
      router.push("/flutterflirt-admin-login/blogs");
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#edf5ff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
      </div>
    );
  }

  // If already logged in, we are redirecting
  if (token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#edf5ff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf5ff] px-6 py-32">
      <div className="w-full max-w-[440px] overflow-hidden rounded-[32px] border border-[#cbe0fb] bg-white/70 shadow-[0_20px_60px_rgba(30,60,110,0.08)] backdrop-blur-xl">
        {showForgotPassword ? (
          <div className="p-10 md:p-12">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eff4fb] shadow-sm">
              <Mail className="h-6 w-6 text-[#2563eb]" />
            </div>
            <h2 className="font-serif text-[28px] font-bold tracking-tight text-[#142845]">
              Reset Password
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#617b9b]">
              Since your authentication is securely managed via environment variables, you cannot reset it here.
            </p>
            <div className="mt-6 rounded-2xl border border-[#fee2e2] bg-[#fef2f2] p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
                <p className="text-sm font-semibold text-[#991b1b]">
                  Please update the <code className="rounded bg-[#fca5a5] px-1.5 py-0.5 text-xs">ADMIN_PASSWORD</code> value directly in your backend <code className="rounded bg-[#fca5a5] px-1.5 py-0.5 text-xs">.env</code> file and restart the server to change your password.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="mt-8 flex w-full justify-center rounded-2xl bg-[#eff4fb] px-4 py-3.5 text-sm font-bold text-[#1e3a60] transition hover:bg-[#e2edf9]"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="p-10 md:p-12">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eff4fb] shadow-sm">
              <Lock className="h-6 w-6 text-[#2563eb]" />
            </div>
            <h2 className="font-serif text-[32px] font-bold tracking-tight text-[#142845]">
              Admin Access
            </h2>
            <p className="mt-2 text-sm text-[#617b9b]">
              Sign in to manage your premium blog content.
            </p>

            {loginError && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#fee2e2] bg-[#fef2f2] p-4 text-sm font-semibold text-[#dc2626]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#3b5980]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8babc6]" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="E-mail Address"
                    className="w-full rounded-2xl border border-[#cbdff8] bg-white py-3.5 pl-12 pr-4 text-[15px] font-medium text-[#112239] transition placeholder:text-[#9aaebd] focus:border-[#2563eb] focus:outline-none focus:ring-4 focus:ring-[#2563eb]/15"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3b5980]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs font-bold text-[#2563eb] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8babc6]" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-2xl border border-[#cbdff8] bg-white py-3.5 pl-12 pr-4 text-[15px] font-medium text-[#112239] transition placeholder:text-[#9aaebd] focus:border-[#2563eb] focus:outline-none focus:ring-4 focus:ring-[#2563eb]/15"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2563eb] px-4 py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-[#1d4ed8] disabled:opacity-70"
              >
                {isLoggingIn ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>Secure Login</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
