"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const genres = [
  "Fiction",
  "Sci-Fi & Speculative",
  "Mystery & Thriller",
  "Memoir & Essays",
  "Indie Press",
  "Poetry",
  "Nature & Botany",
];

const benefits = [
  {
    icon: "potted_plant",
    title: "Botanical Wildflower Bookmark",
    description:
      "Seeded pressed paper that blossoms when planted, tucked into every book parcel.",
    color: "bg-tertiary-container/40 text-on-tertiary-container",
  },
  {
    icon: "local_cafe",
    title: "10% Welcome Discount",
    description: "Automatically applied to your first order of fiction, essays, or art tomes.",
    color: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    icon: "pedal_bike",
    title: "Zero-Emission Neighborhood Courier",
    description: "Quiet electric cargo-bike drop-offs and recyclable cotton mailers.",
    color: "bg-surface-container-high text-on-surface-variant",
  },
  {
    icon: "forum",
    title: "Virtual Book Nook & Author Salons",
    description: "Monthly reading clubs, lively Q&As, and advance digital review copies.",
    color: "bg-secondary-fixed text-on-secondary-fixed",
  },
];

const readerPhotos = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8hqvbswa2YRFstaZWEr3XeExRbF3PryrR1KmVfGM9PwF84jhYE7lwGJfVocDg1oaTHDBUaPRjAjoizEFhBPJJoGCflLpijUzrGH3CU2tpl3c_2HxcDupaT-szfgHwLi4AExHnwbqzF4AYqXY0G9R_TPXhLZJZWJiAcsuDc1xY_r2rsxpsGKPXIB0baV0KQqqRR-ncf7dSUkli8L7pGf9QZW30fO5DDXY_j8VKdWixFAuDhXjeIq6fQw",
    alt: "Reader enjoying a book in a bookstore",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCldOkDDw3wvC62WJUJ0cGF1MaxczHNTq4XVeXqtQf-2xLV8aBJ1Qd5XvUfwJdU3k2gUP_aEYvmcokqrTGNIt4Ls0Ok9wFpE6Oi1C9x70gX1-IFEfqUjQAkNjPjNryPBXO-N7kIwlt-tFIn1m5mfuIxcB9MhnpzFxIXBoL0tvAWx2Vrzhi-cCX9qHRzuY5HJCRzdvi6i24dYLCrUA_4i3A5MuguU32yuAyR6duM2v2O0XFRri4Imk0KlQ",
    alt: "Reader by a library bookshelf",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoj4Y23Yy4FsTX7VAbX4m9h89l6-Y0rJciZ6puJk2CosgjBsOlcXQnh5Kx9osZHV-CsDOtiH6ixOir1PmhjBJ7DLL7IBcbzsHlIqgscq1U3EivqFP5rkJYOF8bzH9ImpSGlqdSKq6Y0rMWsoQtssq_cso5oYKDngPTLcPrQjHg9GZ9Fa7VicDbWccGBlPGemAd2SfcddOHeu93EtvgRNN6PR4WE3Ra6h18OuP1gTzPu2ybEJkyqEbO8g",
    alt: "Reader enjoying a magazine in a cafe",
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

function AppleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
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
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    "Sci-Fi & Speculative",
    "Indie Press",
  ]);
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

  function toggleGenre(genre: string) {
    setSelectedGenres((current) =>
      current.includes(genre)
        ? current.filter((item) => item !== genre)
        : [...current, genre],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const passwordInput = form.elements.namedItem("password");
    const confirmInput = form.elements.namedItem("confirmPassword");

    if (!(passwordInput instanceof HTMLInputElement) || !(confirmInput instanceof HTMLInputElement)) {
      throw new Error("Signup password fields were not found.");
    }

    if (passwordInput.value !== confirmInput.value) {
      confirmInput.setCustomValidity("Passwords do not match.");
      confirmInput.reportValidity();
      confirmInput.setCustomValidity("");
      return;
    }

    setNotice("Account creation is not connected yet. Your details have not been sent.");
  }

  function showProviderNotice(provider: string) {
    setNotice(`${provider} sign-up is not connected yet.`);
  }

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <main className="w-full bg-surface pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-12 lg:py-14">
          <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center lg:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-tertiary-fixed px-3.5 py-1.5 text-label-sm text-on-tertiary-fixed shadow-sm">
              <Icon className="text-base">local_florist</Icon>
              Join the Reading Haven
            </div>
            <h1 className="font-display text-[34px] leading-[42px] tracking-tight sm:text-display">
              Join the Koala Bookstore community
            </h1>
            <p className="text-body-lg leading-relaxed text-on-surface-variant">
              Discover indie gems, support local literacy projects, and unlock
              curated membership perks on every parcel.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <section aria-label="Create your account" className="rounded-2xl bg-surface-container-lowest p-6 shadow-md transition-shadow sm:p-10 lg:col-span-7">
              <div className="space-y-4">
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <button type="button" onClick={() => showProviderNotice("Google")} className="flex h-12 items-center justify-center gap-3 rounded-xl bg-surface-container-low px-4 text-label-md transition-all hover:bg-surface-container active:scale-[0.99]">
                    <GoogleMark /> Continue with Google
                  </button>
                  <button type="button" onClick={() => showProviderNotice("Apple")} className="flex h-12 items-center justify-center gap-3 rounded-xl bg-surface-container-low px-4 text-label-md transition-all hover:bg-surface-container active:scale-[0.99]">
                    <AppleMark /> Continue with Apple
                  </button>
                </div>
                <div className="flex items-center py-2">
                  <span className="h-px flex-grow bg-surface-container-high" />
                  <span className="shrink-0 px-4 text-caption uppercase tracking-wider text-on-surface-variant">
                    or register with your email
                  </span>
                  <span className="h-px flex-grow bg-surface-container-high" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="full-name" className="flex items-center gap-1.5 text-label-sm">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Icon className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">person</Icon>
                      <input id="full-name" name="name" autoComplete="name" required type="text" placeholder="e.g. Sarah Mitchell" className="h-11 w-full rounded-xl bg-surface-container-low pl-10 pr-4 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone-number" className="flex items-center justify-between gap-2 text-label-sm">
                      <span>Phone Number</span>
                      <span className="text-caption font-normal text-on-surface-variant">For courier updates</span>
                    </label>
                    <div className="relative flex items-center">
                      <Icon className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">phone</Icon>
                      <input id="phone-number" name="phone" autoComplete="tel" type="tel" placeholder="e.g. +1 (555) 248-9102" className="h-11 w-full rounded-xl bg-surface-container-low pl-10 pr-4 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="signup-email" className="flex items-center gap-1.5 text-label-sm">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Icon className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">mail</Icon>
                    <input id="signup-email" name="email" autoComplete="email" required type="email" placeholder="e.g. you@example.com" className="h-11 w-full rounded-xl bg-surface-container-low pl-10 pr-4 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label htmlFor="signup-password" className="flex items-center gap-1.5 text-label-sm">
                      Password <span className="text-error">*</span>
                    </label>
                    <span className="text-caption text-on-surface-variant">At least 8 characters, 1 number</span>
                  </div>
                  <div className="relative flex items-center">
                    <Icon className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">lock</Icon>
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
                    <button aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)} type="button" className="absolute right-3 rounded-md p-1 text-on-surface-variant transition-colors hover:text-on-surface">
                      <Icon className="text-lg">{showPassword ? "visibility_off" : "visibility"}</Icon>
                    </button>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex w-full items-center gap-1.5" aria-label={`Password strength: ${strengthLabels[strength]}`}>
                      {[0, 1, 2, 3].map((index) => (
                        <span key={index} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${strength > index ? strengthColors[strength] : "bg-surface-container-high"}`} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-2 text-caption">
                      <span aria-live="polite" className={strength ? "font-medium text-on-surface" : "text-on-surface-variant"}>
                        {strengthLabels[strength]}
                      </span>
                      <span className="text-right text-on-surface-variant">Symbols add extra security</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="confirm-password" className="flex items-center gap-1.5 text-label-sm">
                    Confirm Password <span className="text-error">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Icon className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant">lock_reset</Icon>
                    <input id="confirm-password" name="confirmPassword" autoComplete="new-password" required type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter your password" className="h-11 w-full rounded-xl bg-surface-container-low pl-10 pr-11 text-body-sm text-on-surface placeholder:text-outline transition-all focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container" />
                    <button aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"} aria-pressed={showConfirmPassword} onClick={() => setShowConfirmPassword((visible) => !visible)} type="button" className="absolute right-3 rounded-md p-1 text-on-surface-variant transition-colors hover:text-on-surface">
                      <Icon className="text-lg">{showConfirmPassword ? "visibility_off" : "visibility"}</Icon>
                    </button>
                  </div>
                </div>

                <fieldset className="space-y-2.5 pt-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <legend className="text-label-sm">Favorite Reading Realms</legend>
                    <span className="text-caption text-on-surface-variant">Optional · Guides our shelf curation</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => {
                      const selected = selectedGenres.includes(genre);
                      return (
                        <button
                          key={genre}
                          aria-pressed={selected}
                          onClick={() => toggleGenre(genre)}
                          type="button"
                          className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-label-sm transition-all ${
                            selected
                              ? "bg-secondary-container font-semibold text-on-secondary-container"
                              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                          }`}
                        >
                          {selected && <Icon className="text-xs">check</Icon>}
                          {genre}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="space-y-3 pt-2">
                  <label className="group flex cursor-pointer items-start gap-3">
                    <input name="terms" required type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary-container" />
                    <span className="text-body-sm leading-relaxed text-on-surface-variant">
                      I agree to the{" "}
                      <a href="mailto:haven@koalabooks.com?subject=Terms%20of%20Service" className="font-medium text-primary hover:underline">Terms of Service</a>
                      {" "}and{" "}
                      <a href="mailto:haven@koalabooks.com?subject=Privacy%20Policy" className="font-medium text-primary hover:underline">Privacy Policy</a>.
                    </span>
                  </label>
                  <label className="group flex cursor-pointer items-start gap-3">
                    <input name="newsletter" type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary-container" />
                    <span className="text-body-sm leading-relaxed text-on-surface-variant">
                      Send me the optional Sunday Dispatch with literary news and author conversations.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button type="submit" className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-container font-label-md text-on-primary-fixed shadow-sm transition-all hover:bg-primary-fixed-dim hover:shadow-md active:translate-y-0.5">
                    Create My Account
                    <Icon className="text-lg transition-transform group-hover:translate-x-1">arrow_forward</Icon>
                  </button>
                  <p aria-live="polite" className="mt-3 min-h-5 text-center text-body-sm text-on-surface-variant">{notice}</p>
                </div>

                <div className="border-t border-surface-container-high pt-4 text-center">
                  <p className="text-body-sm text-on-surface-variant">
                    Already have an account?{" "}
                    <Link href="/signin" className="ml-1 font-label-sm font-semibold text-primary hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </section>

            <aside aria-labelledby="member-benefits-title" className="space-y-6 lg:col-span-5">
              <section className="relative space-y-6 overflow-hidden rounded-2xl bg-surface-container-low p-7 shadow-sm">
                <div className="pointer-events-none absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-secondary-container/40 blur-2xl" />
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
                      <Icon className="text-xl">auto_stories</Icon>
                    </span>
                    <div>
                      <h2 id="member-benefits-title" className="font-title-md text-title-md">Reader Member Benefits</h2>
                      <p className="text-caption text-on-surface-variant">Included free with every profile</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary-fixed px-2.5 py-1 text-label-sm font-bold text-on-secondary-fixed">Complimentary</span>
                </div>

                <div className="relative space-y-4 pt-1">
                  {benefits.map((benefit) => (
                    <article key={benefit.title} className="flex items-start gap-3.5 rounded-xl bg-surface-container-lowest/80 p-3 transition-transform duration-200 hover:translate-x-1">
                      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${benefit.color}`}>
                        <Icon className="text-lg">{benefit.icon}</Icon>
                      </span>
                      <div>
                        <h3 className="text-label-sm">{benefit.title}</h3>
                        <p className="text-body-sm leading-snug text-on-surface-variant">{benefit.description}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="relative flex items-center gap-4 rounded-xl bg-surface-container p-4">
                  <div className="flex shrink-0 -space-x-2">
                    {readerPhotos.map((reader) => (
                      <Image key={reader.alt} src={reader.src} alt={reader.alt} width={32} height={32} className="h-8 w-8 rounded-full border-2 border-surface object-cover" />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <div aria-label="5 out of 5 stars" className="flex items-center gap-1 text-tertiary">
                      {[0, 1, 2, 3, 4].map((star) => <Icon key={star} className="text-sm">star</Icon>)}
                    </div>
                    <p className="truncate text-label-sm">14,200+ avid readers</p>
                    <p className="text-caption text-on-surface-variant">Sharing stories across 42 cities</p>
                  </div>
                </div>
              </section>

              <figure className="relative space-y-3 rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
                <Icon className="text-2xl text-primary">format_quote</Icon>
                <blockquote className="text-body-sm italic leading-relaxed text-on-surface">
                  “Koala Bookstore has transformed my evening routine. Opening each
                  package feels like receiving a thoughtful handwritten letter from
                  an old friend who knows your reading taste perfectly.”
                </blockquote>
                <figcaption className="flex items-center justify-between gap-3 pt-2">
                  <span>
                    <span className="block text-label-sm">Julian Vance</span>
                    <span className="text-caption text-on-surface-variant">Member since October 2023</span>
                  </span>
                  <span className="rounded-full bg-surface-container px-2.5 py-1 text-caption text-on-surface-variant">Reader Review</span>
                </figcaption>
              </figure>
            </aside>
          </div>

          <section aria-label="Our promises" className="mt-14 grid gap-6 pt-8 text-center md:grid-cols-3 md:text-left">
            <article className="flex items-center gap-3.5 rounded-xl bg-surface-container-low/70 p-4">
              <Icon className="shrink-0 text-2xl text-primary">verified_user</Icon>
              <div>
                <h2 className="text-label-md">Data Privacy Guaranteed</h2>
                <p className="text-caption text-on-surface-variant">We never sell personal details. Pure reading passion.</p>
              </div>
            </article>
            <article className="flex items-center gap-3.5 rounded-xl bg-surface-container-low/70 p-4">
              <Icon className="shrink-0 text-2xl text-primary">local_shipping</Icon>
              <div>
                <h2 className="text-label-md">Free Tracked Delivery</h2>
                <p className="text-caption text-on-surface-variant">Complimentary shipping on orders above $35.</p>
              </div>
            </article>
            <article className="flex items-center gap-3.5 rounded-xl bg-surface-container-low/70 p-4">
              <Icon className="shrink-0 text-2xl text-primary">published_with_changes</Icon>
              <div>
                <h2 className="text-label-md">Easy 30-Day Returns</h2>
                <p className="text-caption text-on-surface-variant">Hassle-free exchanges on catalog titles.</p>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
