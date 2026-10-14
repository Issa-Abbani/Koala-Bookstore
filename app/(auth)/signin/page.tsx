"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRightToLine,
  Coffee,
  Eye,
  EyeOff,
  Hand,
  LockKeyhole,
  MailQuestionMark,
} from "lucide-react";


function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l2.85-2.22.81-.63Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Sign-in is not connected yet. Your details have not been sent.");
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <main className="w-full bg-surface pt-16">
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-5 lg:px-12">
          <div className="pointer-events-none absolute -left-20 -top-32 -z-10 h-96 w-96 rounded-full bg-secondary-container/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-0 -z-10 h-120 w-120 rounded-full bg-tertiary-fixed/30 blur-3xl" />
          <div className="flex flex-col items-center">
            <section
              aria-labelledby="signin-title"
              className="order-1 flex justify-center lg:order-2 lg:col-span-7 lg:justify-end"
            >
              <div className="w-full max-w-xl space-y-8 rounded-2xl bg-surface-container-lowest p-7 shadow-xl sm:p-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-3 py-1 text-label-sm font-semibold text-on-secondary-fixed">
                    <Hand size={16} color="#006591" />
                    <span>Welcome back, book lover</span>
                  </div>
                  <h2
                    id="signin-title"
                    className="font-display text-headline-lg tracking-tight"
                  >
                    Sign in to your reading nook
                  </h2>
                  <p className="text-body-md text-on-surface-variant">
                    Access your order timeline, saved wishlists, member quiet
                    hours, and tailored shelf updates.
                  </p>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setNotice("Google sign-in is not connected yet.")
                    }
                    className="flex h-12 items-center justify-center gap-3 rounded-xl bg-surface-container-low px-4 text-label-md transition-colors hover:bg-surface-container"
                  >
                    <GoogleMark />
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNotice("Apple sign-in is not connected yet.")
                    }
                    className="flex h-12 items-center justify-center gap-3 rounded-xl bg-surface-container-low px-4 text-label-md transition-colors hover:bg-surface-container"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.86c.64-.78 1.08-1.86.96-2.95-1 .04-2.15.67-2.82 1.45-.58.67-1.1 1.77-.96 2.83 1.12.09 2.19-.55 2.82-1.33z" />
                    </svg>
                    Continue with Apple
                  </button>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="h-px w-full bg-surface-container-high" />
                  <span className="absolute bg-surface-container-lowest px-4 text-caption uppercase tracking-wider text-outline">
                    or sign in with email
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor="readerEmail" className="text-label-md">
                        Email Address
                      </label>
                      <span className="text-caption text-outline">
                        Stored securely
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <div className="pointer-events-none absolute left-4 text-xl text-outline">
                        <MailQuestionMark size={16} color="#006591" />
                      </div>
                      <input
                        autoComplete="email"
                        className="h-12 w-full rounded-xl bg-surface-container-low pl-12 pr-4 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-[3px] focus:ring-primary-container/40"
                        id="readerEmail"
                        name="email"
                        placeholder="you@example.com"
                        required
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor="readerPassword" className="text-label-md">
                        Password
                      </label>
                      <a
                        href="mailto:haven@koalabooks.com?subject=Password%20reset"
                        className="text-label-sm text-primary transition-colors hover:text-on-primary-container"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative flex items-center">
                      <div className="pointer-events-none absolute left-4 text-xl text-outline">
                        <LockKeyhole size={16} color="#006591" />
                      </div>
                      <input
                        autoComplete="current-password"
                        className="h-12 w-full rounded-xl bg-surface-container-low pl-12 pr-12 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-[3px] focus:ring-primary-container/40"
                        id="readerPassword"
                        name="password"
                        placeholder="Enter your password"
                        required
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        aria-pressed={showPassword}
                        className="absolute right-3.5 rounded-lg p-1 text-outline transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-primary cursor-pointer"
                        onClick={() => setShowPassword((visible) => !visible)}
                        type="button"
                      >
                        <div className="text-xl">
                          {showPassword ? (
                            <Eye color="#006591" size={16} />
                          ) : (
                            <EyeOff color="#006591" size={16}/>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <label className="flex cursor-pointer select-none items-center gap-3">
                      <input
                        className="h-4 w-4 cursor-pointer rounded accent-primary-container"
                        name="remember"
                        type="checkbox"
                      />
                      <span className="text-body-sm text-on-surface-variant">
                        Remember me for 30 days
                      </span>
                    </label>
                    <span className="flex items-center justify-center align-middle gap-1 text-label-sm text-tertiary">
                      <Coffee size={16} />
                      <span className="hidden sm:inline">Cozy session</span>
                    </span>
                  </div>

                  <button
                    className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-container font-label-md text-on-primary shadow-md transition hover:brightness-105 hover:shadow-lg active:scale-[0.99] cursor-pointer"
                    type="submit"
                  >
                    <span>Sign In to Your Nook</span>
                    <ArrowRightToLine />
                  </button>
                  <p
                    aria-live="polite"
                    className="min-h-5 text-center text-body-sm text-on-surface-variant"
                  >
                    {notice}
                  </p>
                </form>

                <div className="border-t border-surface-container-high pt-6 text-center">
                  <p className="text-body-md text-on-surface-variant">
                    Don&apos;t have a Koala Bookstore account yet?{" "}
                    <Link
                      className="font-label-md font-bold text-primary hover:underline"
                      href="/signup"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
