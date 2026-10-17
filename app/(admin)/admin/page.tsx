"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Admin sign-in is not connected yet. Your details have not been sent.",
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4 py-10 text-on-surface sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-primary-fixed/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-12 h-80 w-80 rounded-full bg-tertiary-fixed/35 blur-3xl"
      />

      <section
        aria-labelledby="admin-login-title"
        className="relative w-full max-w-xl overflow-hidden rounded-xl bg-surface-container-lowest shadow-xl"
      >
        <div className="h-1.5 bg-gradient-to-r from-primary-container via-primary to-secondary-container" />
        <div className="flex flex-col gap-7 p-6 sm:gap-8 sm:p-10">
          <header className="flex flex-col items-center gap-2 pt-1 text-center">
            <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-low text-primary shadow-sm">
              <BookOpen aria-hidden="true" size={30} strokeWidth={1.8} />
            </div>
            <h1
              id="admin-login-title"
              className="font-display text-headline-md font-bold tracking-tight"
            >
              Koala Bookstore
            </h1>
            <p className="text-body-md text-secondary">Admin Portal</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-username" className="text-label-md">
                Username
              </label>
              <div className="relative flex items-center">
                <UserRound
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 text-secondary"
                  size={19}
                />
                <input
                  autoComplete="username"
                  className="h-11 w-full rounded-lg bg-surface-container-low pl-11 pr-4 text-body-md text-on-surface placeholder:text-outline transition focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                  id="admin-username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-password" className="text-label-md">
                Password
              </label>
              <div className="relative flex items-center">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 text-secondary"
                  size={18}
                />
                <input
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg bg-surface-container-low pl-11 pr-12 text-body-md text-on-surface placeholder:text-outline transition focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                  id="admin-password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  type={showPassword ? "text" : "password"}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 flex items-center justify-center rounded-full p-1 text-secondary transition hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" size={19} />
                  ) : (
                    <Eye aria-hidden="true" size={19} />
                  )}
                </button>
              </div>
            </div>

            <button
              className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-label-md text-on-primary shadow-md transition hover:bg-on-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.99]"
              type="submit"
            >
              <span>Sign In</span>
              <ArrowRight aria-hidden="true" size={18} />
            </button>
            <p
              aria-live="polite"
              className="min-h-5 rounded-lg text-center text-body-sm text-on-surface-variant"
              role="status"
            >
              {notice}
            </p>
          </form>

          <div className="flex items-start gap-3 rounded-lg bg-surface-container-low p-3.5 text-body-sm text-on-surface-variant">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-primary"
              size={18}
            />
            <p>
              This portal is for authorized bookstore staff. Keep your sign-in
              details private.
            </p>
          </div>

          <footer className="border-t border-surface-container-high pt-5 text-center">
            <Link
              className="inline-flex items-center gap-2 text-label-sm text-primary transition hover:text-on-primary-container hover:underline"
              href="/"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Back to the bookstore
            </Link>
          </footer>
        </div>
      </section>
    </main>
  );
}
