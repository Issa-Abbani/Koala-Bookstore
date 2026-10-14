"use client";

import {
  ArrowRightToLine,
  Eye,
  EyeOff,
  Flower2,
  LockKeyhole,
  LockKeyholeOpen,
  MailQuestionMark,
  Phone,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

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

function AppleMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.86c.64-.78 1.08-1.86.96-2.95-1-.04-2.15.67-2.82 1.45-.58.67-1.1 1.77-.96 2.83 1.12.09 2.19-.55 2.82-1.33z" />
    </svg>
  );
}

function getPasswordStrength(password: string) {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 8 && /\d/.test(password)) strength++;
  if (/[A-Z]/.test(password) && strength >= 2) strength++;
  if (/[^A-Za-z0-9]/.test(password) && strength >= 3) strength++;
  return strength;
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const strength = getPasswordStrength(password);
  const strengthLabels = [
    "Strength rating",
    "Weak password",
    "Fair password",
    "Good security",
    "Resilient password",
  ];
  const strengthColors = [
    "",
    "bg-error",
    "bg-tertiary-container",
    "bg-primary-container",
    "bg-primary",
  ];


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const passwordInput = form.elements.namedItem("password");
    const confirmInput = form.elements.namedItem("confirmPassword");

    if (
      !(passwordInput instanceof HTMLInputElement) ||
      !(confirmInput instanceof HTMLInputElement)
    ) {
      throw new Error("Signup password fields were not found.");
    }

    if (passwordInput.value !== confirmInput.value) {
      confirmInput.setCustomValidity("Passwords do not match.");
      confirmInput.reportValidity();
      confirmInput.setCustomValidity("");
      return;
    }

    setNotice(
      "Account creation is not connected yet. Your details have not been sent.",
    );
  }

  function showProviderNotice(provider: string) {
    setNotice(`${provider} sign-up is not connected yet.`);
  }

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <main className="w-full bg-surface pt-28">
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-5 lg:px-12">
          <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center lg:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-tertiary-fixed px-3.5 py-1.5 text-label-sm text-on-tertiary-fixed shadow-sm">
              <Flower2 size={16} />
              Join the Reading Haven
            </div>
            <h1 className="font-display text-[34px] leading-10.5 tracking-tight sm:text-display">
              Join the Koala Bookstore community
            </h1>
            <p className="text-body-lg leading-relaxed text-on-surface-variant">
              Discover indie gems, support local literacy projects, and unlock
              curated membership perks on every parcel.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <section
              aria-label="Create your account"
              className="rounded-2xl bg-surface-container-lowest p-6 shadow-md transition-shadow sm:p-10 lg:col-span-7"
            >
              <div className="space-y-4">
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => showProviderNotice("Google")}
                    className="flex h-12 items-center justify-center gap-3 rounded-xl bg-surface-container-low px-4 text-label-md transition-all hover:bg-surface-container active:scale-[0.99]"
                  >
                    <GoogleMark /> Continue with Google
                  </button>
                  <button
                    type="button"
                    onClick={() => showProviderNotice("Apple")}
                    className="flex h-12 items-center justify-center gap-3 rounded-xl bg-surface-container-low px-4 text-label-md transition-all hover:bg-surface-container active:scale-[0.99]"
                  >
                    <AppleMark /> Continue with Apple
                  </button>
                </div>
                <div className="flex items-center py-2">
                  <span className="h-px grow bg-surface-container-high" />
                  <span className="shrink-0 px-4 text-caption uppercase tracking-wider text-on-surface-variant">
                    or register with your email
                  </span>
                  <span className="h-px grow bg-surface-container-high" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="full-name"
                      className="flex items-center gap-1.5 text-label-sm"
                    >
                      Full Name <span className="text-error">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">
                        <UserRound size={16} color="#006591" />
                      </div>
                      <input
                        id="full-name"
                        name="name"
                        autoComplete="name"
                        required
                        type="text"
                        placeholder="e.g. John Doe"
                        className="h-11 w-full rounded-xl bg-surface-container-low pl-10 pr-4 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone-number"
                      className="flex items-center justify-between gap-2 text-label-sm"
                    >
                      <span>Phone Number</span>
                      <span className="text-caption font-normal text-on-surface-variant">
                        For courier updates
                      </span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">
                        <Phone size={16} color="#006591" />
                      </div>
                      <input
                        id="phone-number"
                        name="phone"
                        autoComplete="tel"
                        type="tel"
                        placeholder="e.g. +961 71 111 111"
                        className="h-11 w-full rounded-xl bg-surface-container-low pl-10 pr-4 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-email"
                    className="flex items-center gap-1.5 text-label-sm"
                  >
                    Email Address <span className="text-error">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">
                      <MailQuestionMark size={16} color="#006591" />
                    </div>
                    <input
                      id="signup-email"
                      name="email"
                      autoComplete="email"
                      required
                      type="email"
                      placeholder="e.g. you@example.com"
                      className="h-11 w-full rounded-xl bg-surface-container-low pl-10 pr-4 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label
                      htmlFor="signup-password"
                      className="flex items-center gap-1.5 text-label-sm"
                    >
                      Password <span className="text-error">*</span>
                    </label>
                    <span className="text-caption text-on-surface-variant">
                      At least 8 characters, 1 number
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <div className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">
                      <LockKeyhole size={16} color="#006591" />
                    </div>
                    <input
                      id="signup-password"
                      name="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      pattern="(?=.*[0-9]).{8,}"
                      title="Use at least 8 characters, including one number."
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Create a sturdy password"
                      className="h-11 w-full rounded-xl bg-surface-container-low pl-10 pr-11 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                    <button
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((visible) => !visible)}
                      type="button"
                      className="absolute right-3 rounded-md p-1 text-on-surface-variant transition-colors hover:text-on-surface cursor-pointer"
                    >
                      <div className="text-xl">
                        {showPassword ? (
                          <Eye color="#006591" size={16} />
                        ) : (
                          <EyeOff color="#006591" size={16} />
                        )}
                      </div>
                    </button>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div
                      className="flex w-full items-center gap-1.5"
                      aria-label={`Password strength: ${strengthLabels[strength]}`}
                    >
                      {[0, 1, 2, 3].map((index) => (
                        <span
                          key={index}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${strength > index ? strengthColors[strength] : "bg-surface-container-high"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-2 text-caption">
                      <span
                        aria-live="polite"
                        className={
                          strength
                            ? "font-medium text-on-surface"
                            : "text-on-surface-variant"
                        }
                      >
                        {strengthLabels[strength]}
                      </span>
                      <span className="text-right text-on-surface-variant">
                        Symbols add extra security
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="confirm-password"
                    className="flex items-center gap-1.5 text-label-sm"
                  >
                    Confirm Password <span className="text-error">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">
                      <LockKeyholeOpen size={16} color="#006591" />
                    </div>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className="h-11 w-full rounded-xl bg-surface-container-low pl-10 pr-11 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="group flex cursor-pointer items-start gap-3">
                    <input
                      name="newsletter"
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-primary-container"
                    />
                    <span className="text-body-sm leading-relaxed text-on-surface-variant">
                      Send me regular promotional emails.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-container font-label-md text-on-primary shadow-sm transition-all hover:bg-primary-fixed-dim hover:shadow-md active:translate-y-0.5 cursor-pointer"
                  >
                    Create My Account
                    <div className="text-lg transition-transform group-hover:translate-x-1">
                      <ArrowRightToLine />
                    </div>
                  </button>
                  <p
                    aria-live="polite"
                    className="mt-3 min-h-5 text-center text-body-sm text-on-surface-variant"
                  >
                    {notice}
                  </p>
                </div>

                <div className="border-t border-surface-container-high pt-4 text-center">
                  <p className="text-body-sm text-on-surface-variant">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="ml-1 font-label-sm font-semibold text-primary hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
