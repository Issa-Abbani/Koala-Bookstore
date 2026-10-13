"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";


const perks = [
  {
    icon: "percent",
    title: "10% Off Your Next 3 Reads",
    description: "Your welcome discount is ready for your next order.",
    colors: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    icon: "eco",
    title: "Handmade Botanical Bookmark",
    description: "A pressed eucalyptus and wildflower keepsake in every order.",
    colors: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  {
    icon: "forum",
    title: "Virtual Author Salons",
    description: "Join intimate fireside conversations with authors.",
    colors: "bg-secondary-container text-on-secondary-container",
  },
];

function Icon({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l2.85-2.22.81-.63Z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z" fill="#EA4335" />
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
      <main className="w-full bg-surface pt-28">
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-5 py-12 md:py-20 lg:px-12 lg:py-24">
          <div className="pointer-events-none absolute -left-20 -top-32 -z-10 h-96 w-96 rounded-full bg-secondary-container/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-0 -z-10 h-120 w-120 rounded-full bg-tertiary-fixed/30 blur-3xl" />

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <section className="order-2 flex flex-col space-y-8 lg:order-1 lg:col-span-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-tertiary-fixed px-3.5 py-1.5 text-label-sm font-semibold tracking-wide text-on-tertiary-fixed shadow-sm">
                <Icon className="text-base">local_cafe</Icon>
                Curated Haven Member Log
              </div>
              <div className="space-y-4">
                <h1 className="font-display text-[34px] leading-10.5 tracking-tight sm:text-display">
                  Step back inside your quiet corner.
                </h1>
                <p className="text-body-lg leading-relaxed text-on-surface-variant">
                  Your personalized bookshelf, member dispatches, and curated
                  reservations are waiting right where you left them.
                </p>
              </div>

              <div className="space-y-6 overflow-hidden rounded-2xl bg-surface-container-low p-7 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="text-2xl text-primary">auto_stories</Icon>
                    <span className="text-label-md font-bold uppercase tracking-wider">
                      The Haven Promise
                    </span>
                  </div>
                  <span className="rounded-full bg-surface-container-highest px-2.5 py-1 text-caption font-semibold text-on-secondary-container">
                    Club Perks
                  </span>
                </div>
                <div className="space-y-4">
                  {perks.map((perk) => (
                    <div key={perk.title} className="flex items-start gap-3.5">
                      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${perk.colors}`}>
                        <Icon className="text-base">{perk.icon}</Icon>
                      </span>
                      <div>
                        <h2 className="font-title-sm text-title-sm">{perk.title}</h2>
                        <p className="text-body-sm text-on-surface-variant">{perk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <blockquote className="mt-2 flex items-start gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
                  <Icon className="mt-0.5 text-xl text-primary">format_quote</Icon>
                  <div className="space-y-1">
                    <p className="text-body-sm italic text-on-surface">
                      “A room without books is like a body without a soul.”
                    </p>
                    <cite className="text-caption font-medium not-italic text-outline">
                      Cicero — Inscribed at Koala Bookstore Entry
                    </cite>
                  </div>
                </blockquote>
              </div>

              <div className="flex w-fit items-center gap-3 rounded-full bg-surface-container-low px-4 py-2.5 text-on-surface-variant">
                <Icon className="text-base text-primary">menu_book</Icon>
                <span className="text-caption">Your reading nook, ready whenever you are</span>
              </div>
            </section>

            <section aria-labelledby="signin-title" className="order-1 flex justify-center lg:order-2 lg:col-span-7 lg:justify-end">
              <div className="w-full max-w-xl space-y-8 rounded-2xl bg-surface-container-lowest p-7 shadow-xl sm:p-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-3 py-1 text-label-sm font-semibold text-on-secondary-fixed">
                    <Icon className="text-sm">waving_hand</Icon>
                    <span>Welcome back, book lover</span>
                  </div>
                  <h2 id="signin-title" className="font-display text-headline-lg tracking-tight">
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
                    onClick={() => setNotice("Google sign-in is not connected yet.")}
                    className="flex h-12 items-center justify-center gap-3 rounded-xl bg-surface-container-low px-4 text-label-md transition-colors hover:bg-surface-container"
                  >
                    <GoogleMark />
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotice("Apple sign-in is not connected yet.")}
                    className="flex h-12 items-center justify-center gap-3 rounded-xl bg-surface-container-low px-4 text-label-md transition-colors hover:bg-surface-container"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
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
                      <label htmlFor="readerEmail" className="text-label-md">Email Address</label>
                      <span className="text-caption text-outline">Stored securely</span>
                    </div>
                    <div className="relative flex items-center">
                      <Icon className="pointer-events-none absolute left-4 text-xl text-outline">mail</Icon>
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
                      <label htmlFor="readerPassword" className="text-label-md">Password</label>
                      <a
                        href="mailto:haven@koalabooks.com?subject=Password%20reset"
                        className="text-label-sm text-primary transition-colors hover:text-on-primary-container"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative flex items-center">
                      <Icon className="pointer-events-none absolute left-4 text-xl text-outline">lock</Icon>
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
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="absolute right-3.5 rounded-lg p-1 text-outline transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-primary"
                        onClick={() => setShowPassword((visible) => !visible)}
                        type="button"
                      >
                        <Icon className="text-xl">{showPassword ? "visibility_off" : "visibility"}</Icon>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <label className="flex cursor-pointer select-none items-center gap-3">
                      <input className="h-4 w-4 cursor-pointer rounded accent-primary-container" name="remember" type="checkbox" />
                      <span className="text-body-sm text-on-surface-variant">Remember me for 30 days</span>
                    </label>
                    <span className="flex items-center gap-1 text-label-sm text-tertiary">
                      <Icon className="text-sm">local_cafe</Icon>
                      <span className="hidden sm:inline">Cozy session</span>
                    </span>
                  </div>

                  <button
                    className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-container font-label-md font-bold text-on-primary-fixed shadow-md transition hover:brightness-105 hover:shadow-lg active:scale-[0.99]"
                    type="submit"
                  >
                    <span>Sign In to Your Nook</span>
                    <Icon className="text-lg">arrow_forward</Icon>
                  </button>
                  <p aria-live="polite" className="min-h-5 text-center text-body-sm text-on-surface-variant">
                    {notice}
                  </p>
                </form>

                <div className="border-t border-surface-container-high pt-6 text-center">
                  <p className="text-body-md text-on-surface-variant">
                    Don&apos;t have a Koala Bookstore account yet?{" "}
                    <Link className="font-label-md font-bold text-primary hover:underline" href="/signup">
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-surface-container pt-8 text-caption text-on-surface-variant lg:mt-24">
            <div className="flex items-center gap-2">
              <Icon className="text-base text-primary">support_agent</Icon>
              <span>
                Need assistance? Reach out to{" "}
                <a className="font-semibold text-on-surface hover:text-primary" href="mailto:haven@koalabooks.com">haven@koalabooks.com</a>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary-container" />Australian Owned</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-tertiary-container" />Eco-Pulp Packaging</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" />Independent Spirit</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
