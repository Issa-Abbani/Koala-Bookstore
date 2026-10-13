"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const logo =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9UUokMTzxSsu8O1zd_avOuUmAbckbME79VRQKX-QUfF4g_fUDLL230Vlq3C2jCD1Zenvx4KyMxMB90HqdtyRD4spq0pOzr71xpXMXJStHrmLuVMXIKhFA7h7mYTgRxBGCQfjGuH6xCKrvX8Uucd2YKfwlDMDIyGtTwnveLdXO6Rf41YP44E8rpSx1oJO5xVYlzbWqfjvhEHgE9vjPbsR1HNAiFml67z9Y_tcSfPy6SmfOYwDDFPf8GA";

const orderBooks = [
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    edition: "Hardcover Edition",
    price: 18.99,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoRq7wNMyJzv9SUqKigIk9TsXRjq84E2QPvfQD5N7THMuuIsBmcpJGTVXEGkoM_0sD9Y_Y7u3cTkLyKzmCtAuu0oibADYJ4KuFXrmbkr2STJve6QDBrlaEjwOq-llpA_tC8ZLjXbsEmgmUUSO7PVp3Yv5pl4tot3nC9D4XP0pWjrJWbFW_AVliZYO8kKx8uSh0sVtSdDz8u7ykQ_P2zYqQD7NK09XQLBqMx51O9kMHUkktbBaKjynqOQ",
  },
  {
    title: "Sea of Tranquility",
    author: "Emily St. John Mandel",
    edition: "Paperback",
    price: 16.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKlRcM_SMSnpBiG356N6m9cVBjRUypnJEBerTzuF39tuQgjuegepE0UW0G_JGh6k2siqVUhN_xiv1AqpH2qjTSWHQKjrpfVlw4P7pIn9rnn1B0MBRqyDvCWUVILgJo7Y6kFOe8hKOI4nzh45nLoe-EzwNHkdwERsM3NMe8XQ_S3KK5t66jFbw4qD8RwEGVXo3ivWQ7citLcr2rsPlLMW_ZrL9VabybTviZ_EdPuWpIpOEMwxOkvntFtg",
  },
];

function Icon({ children, className = "", title }: { children: string; className?: string; title?: string }) {
  return (
    <span aria-hidden="true" title={title} className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-6 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
        <Icon className="text-lg">{icon}</Icon>
      </span>
      <div>
        <h2 className="font-display text-headline-sm">{title}</h2>
        <p className="text-body-sm text-on-surface-variant">{description}</p>
      </div>
    </header>
  );
}

function FormField({
  id,
  label,
  icon,
  type = "text",
  defaultValue,
  placeholder,
  required = true,
  withIcon = true,
}: {
  id: string;
  label: string;
  icon?: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  withIcon?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center justify-between text-label-md text-on-surface">
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      <div className={withIcon ? "relative" : undefined}>
        {withIcon && icon && <Icon className="absolute left-3.5 top-3 text-lg text-outline">{icon}</Icon>}
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`h-11 w-full rounded-xl bg-surface-container-low text-body-sm text-on-surface transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:shadow-md ${withIcon ? "pl-11 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}

export default function DeliveryPage() {
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express">("standard");
  const [pinLink, setPinLink] = useState("https://maps.app.goo.gl/koala-nest-482sf");
  const [pinVerified, setPinVerified] = useState(false);
  const [notice, setNotice] = useState("");

  const subtotal = orderBooks.reduce((sum, book) => sum + book.price, 0);
  const discount = Math.round(subtotal * 10) / 100;
  const total = subtotal - discount + (deliverySpeed === "express" ? 3.99 : 0);

  function verifyPin() {
    try {
      const url = new URL(pinLink);
      if (url.protocol !== "https:" || !url.hostname) {
        throw new Error("Enter a secure Google Maps or location-pin link.");
      }
      setPinVerified(true);
      setNotice("Location pin link looks valid.");
    } catch {
      setPinVerified(false);
      setNotice("Enter a valid secure location link, such as https://maps.app.goo.gl/...");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Checkout is a visual preview and is not connected to an order service. No order was placed.");
  }

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <header className="fixed top-0 z-50 w-full shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-center gap-2 bg-tertiary-fixed px-4 py-2 text-center text-label-sm text-on-tertiary-fixed">
          <Icon className="text-sm">spa</Icon>
          <span>Free shipping on orders over $35 | Use code <strong>KOALALOVE</strong> for 10% off your first read</span>
        </div>
        <div className="bg-surface-container-lowest/95 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 lg:px-12">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <span className="relative h-8 w-[120px]">
                <Image src={logo} alt="Koala Bookstore" fill sizes="120px" className="object-contain object-left" />
              </span>
              <span className="hidden flex-col sm:flex">
                <span className="font-title-md leading-tight tracking-tight">Koala Bookstore</span>
                <span className="text-caption text-on-surface-variant">Your cozy reading nook</span>
              </span>
            </Link>
            <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
              <Link href="/" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Home</Link>
              <Link href="/store" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Catalog / Store</Link>
              <Link href="/#featured" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Bestsellers</Link>
              <Link href="/#categories" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Categories</Link>
              <Link href="/#spotlight" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Staff Picks</Link>
            </nav>
            <label className="relative hidden max-w-sm flex-1 items-center sm:flex">
              <Icon className="pointer-events-none absolute left-3.5 text-lg text-outline">search</Icon>
              <input aria-label="Search books" className="h-11 w-full rounded-full bg-surface-container-low pl-10 pr-4 text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Search by title, author, ISBN..." type="search" />
            </label>
            <div className="flex shrink-0 items-center gap-2">
              <Link href="/#featured" aria-label="Wishlist" className="relative rounded-full p-2.5 text-on-surface-variant transition-colors hover:bg-surface-container-low">
                <Icon className="text-xl">favorite</Icon>
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-tertiary text-caption text-on-tertiary">2</span>
              </Link>
              <Link href="/cart" aria-label="Shopping bag, 3 items" className="relative rounded-full p-2.5 text-on-surface-variant transition-colors hover:bg-surface-container-low">
                <Icon className="text-xl">shopping_bag</Icon>
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-caption text-on-primary">3</span>
              </Link>
              <Link href="/signin" aria-label="Sign in" className="flex items-center gap-2 rounded-full bg-surface-container-low px-2.5 py-1 text-label-md font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container"><Icon className="text-lg">person</Icon></span>
                <span className="hidden md:inline">Sarah M.</span>
                <Icon className="hidden text-base text-outline md:inline">expand_more</Icon>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full bg-surface pt-28">
        <section className="mb-8 w-full bg-surface-container-low/60 py-6">
          <div className="mx-auto max-w-7xl px-5 lg:px-12">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-label-sm text-on-surface-variant">
              <Link href="/store" className="flex items-center gap-1 hover:text-primary"><Icon className="text-sm">storefront</Icon>Store</Link>
              <Icon className="text-xs text-outline">chevron_right</Icon>
              <Link href="/cart" className="hover:text-primary">Shopping Bag</Link>
              <Icon className="text-xs text-outline">chevron_right</Icon>
              <span className="font-semibold text-primary">Checkout</span>
            </nav>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <span className="text-label-sm font-semibold uppercase tracking-wider text-tertiary">Step 2 of 4</span>
                <h1 className="mt-1 font-display text-headline-lg tracking-tight">Delivery &amp; Contact Details</h1>
              </div>
              <ol aria-label="Checkout progress" className="flex items-center gap-2 sm:gap-4">
                <li className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed shadow-sm"><Icon className="text-base">check</Icon></span>
                  <span className="hidden text-label-md font-medium sm:inline">Cart</span>
                </li>
                <li aria-hidden="true" className="h-0.5 w-6 rounded-full bg-primary-container sm:w-10" />
                <li aria-current="step" className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-label-sm text-on-primary shadow-md ring-4 ring-primary-fixed/50">2</span>
                  <span className="font-label-md font-bold text-primary">Delivery</span>
                </li>
                <li aria-hidden="true" className="h-0.5 w-6 rounded-full bg-outline-variant/50 sm:w-10" />
                <li className="flex items-center gap-2 opacity-60">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-label-sm text-on-surface-variant">3</span>
                  <span className="hidden text-label-md text-on-surface-variant sm:inline">Payment</span>
                </li>
                <li aria-hidden="true" className="h-0.5 w-6 rounded-full bg-outline-variant/50 sm:w-10" />
                <li className="flex items-center gap-2 opacity-60">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-label-sm text-on-surface-variant">4</span>
                  <span className="hidden text-label-md text-on-surface-variant sm:inline">Confirmation</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-12">
          {notice && (
            <div role="status" className="mb-6 flex items-center justify-between gap-3 rounded-xl bg-secondary-container px-4 py-3 text-body-sm text-on-secondary-container">
              <span>{notice}</span>
              <button type="button" onClick={() => setNotice("")} aria-label="Dismiss message"><Icon className="text-base">close</Icon></button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <section aria-label="Delivery and contact form" className="space-y-8 lg:col-span-7">
              <article className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-8">
                <header className="-mx-6 -mt-6 mb-6 flex items-center justify-between rounded-t-2xl bg-surface-container-low/40 p-6 pb-4 sm:-mx-8 sm:-mt-8 sm:p-8 sm:pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container"><Icon className="text-lg">person</Icon></span>
                    <div><h2 className="font-display text-headline-sm">1. Contact &amp; Recipient</h2><p className="text-body-sm text-on-surface-variant">We will send dispatch alerts and arrival text updates</p></div>
                  </div>
                  <span className="hidden items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 text-label-sm text-on-surface-variant sm:inline-flex"><Icon className="text-sm text-primary">verified_user</Icon>Pre-filled via Sarah M.</span>
                </header>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField id="full-name" label="Full Name" icon="badge" defaultValue="Sarah Mitchell" />
                    <FormField id="phone-number" label="Phone Number" icon="call" type="tel" defaultValue="+1 (555) 248-9102" />
                  </div>
                  <FormField id="email-address" label="Email for Tracking & Digital Invoices" icon="mail" type="email" defaultValue="sarah.mitchell@readingnook.com" />
                  <p className="flex items-center gap-1.5 pt-1 text-caption text-on-surface-variant"><Icon className="text-xs text-primary">eco</Icon>Paperless invoices automatically save 1.2 oz of carbon per literary package.</p>
                </div>
              </article>

              <article className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-8">
                <header className="-mx-6 -mt-6 mb-6 flex items-center justify-between gap-3 rounded-t-2xl bg-surface-container-low/40 p-6 pb-4 sm:-mx-8 sm:-mt-8 sm:p-8 sm:pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container"><Icon className="text-lg">location_on</Icon></span>
                    <div><h2 className="font-display text-headline-sm">2. Destination &amp; Pin</h2><p className="text-body-sm text-on-surface-variant">Neighborhood doorstep or reading patio delivery</p></div>
                  </div>
                  <span className="shrink-0 rounded-full bg-tertiary-fixed px-3 py-1 text-label-sm font-semibold text-on-tertiary-fixed">Free Shipping Active</span>
                </header>
                <div className="space-y-4">
                  <FormField id="street-address" label="Street Address, Apartment, or Nook" icon="home" defaultValue="482 Eucalyptus Grove Way, Suite 12" placeholder="e.g. 742 Evergreen Terrace, Apt 3B" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField id="city" label="City / District" defaultValue="San Francisco" withIcon={false} />
                    <FormField id="postal-code" label="Postal Code" defaultValue="94110" withIcon={false} />
                  </div>
                  <div className="space-y-2 rounded-xl bg-secondary-fixed/30 p-4">
                    <div className="flex items-start gap-2.5">
                      <Icon className="mt-0.5 shrink-0 text-xl text-primary">share_location</Icon>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label htmlFor="maps-pin-link" className="font-title-sm">Google Maps or Location Pin Link</label>
                          <span className="text-caption font-bold uppercase tracking-wider text-primary">Recommended</span>
                        </div>
                        <p className="mt-0.5 text-body-sm text-on-surface-variant">Paste your dropped pin URL (e.g. <span className="font-mono text-xs font-semibold text-primary">https://maps.app.goo.gl/...</span>) so our book courier spots your exact entrance without ringing twice.</p>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <Icon className="absolute left-3.5 top-4 text-lg text-outline">link</Icon>
                      <input id="maps-pin-link" name="maps-pin-link" type="url" value={pinLink} onChange={(event) => { setPinLink(event.target.value); setPinVerified(false); }} placeholder="https://maps.app.goo.gl/k98e29example" className="h-11 w-full rounded-xl bg-surface-container-lowest pl-11 pr-28 text-body-sm focus:outline-none focus:shadow-md" />
                      <button type="button" onClick={verifyPin} className="absolute right-2 top-2.5 rounded-lg bg-secondary-container px-3 py-1.5 text-label-sm text-on-secondary-container transition-colors hover:bg-secondary-fixed">{pinVerified ? "Verified" : "Verify Pin"}</button>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <label htmlFor="delivery-notes" className="flex items-center justify-between text-label-md">
                      <span>Driver Delivery Instructions &amp; Safe Spot</span><span className="text-caption font-normal text-on-surface-variant">Optional</span>
                    </label>
                    <textarea id="delivery-notes" name="delivery-notes" rows={2} defaultValue="Please place inside the weather-proof parcel chest on the porch nook. Ringing the bell is fine!" placeholder="e.g. Leave in the wicker basket on the front porch nook." className="w-full rounded-xl bg-surface-container-low p-3.5 text-body-sm focus:bg-surface-container-lowest focus:outline-none focus:shadow-md" />
                  </div>
                </div>
              </article>

              <article className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-8">
                <SectionHeader icon="local_shipping" title="3. Delivery Method" description="Carbon-offset literature couriers in protective cardboard wrap" />
                <fieldset className="space-y-3">
                  <legend className="sr-only">Choose delivery speed</legend>
                  <label className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl p-4 transition-all hover:bg-surface-container ${deliverySpeed === "standard" ? "bg-surface-container-low ring-2 ring-primary-container" : "bg-surface-container-low/50"}`}>
                    <span className="flex min-w-0 items-start gap-3.5">
                      <input checked={deliverySpeed === "standard"} onChange={() => setDeliverySpeed("standard")} className="mt-1 h-5 w-5 shrink-0 accent-[#006591]" name="delivery-speed" type="radio" value="standard" />
                      <span>
                        <span className="flex flex-wrap items-center gap-2"><strong className="font-title-sm">Standard Eco-Courier</strong><span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-caption font-semibold">2-3 Business Days</span></span>
                        <span className="mt-0.5 block text-body-sm text-on-surface-variant">Zero-emission neighborhood delivery. Wrapped with love.</span>
                      </span>
                    </span>
                    <span className="shrink-0 pl-2 text-right"><strong className="font-title-md text-primary">FREE</strong><span className="block text-caption text-outline line-through">$4.50</span></span>
                  </label>
                  <label className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl p-4 transition-all hover:bg-surface-container ${deliverySpeed === "express" ? "bg-surface-container-low ring-2 ring-primary-container" : "bg-surface-container-low/50"}`}>
                    <span className="flex min-w-0 items-start gap-3.5">
                      <input checked={deliverySpeed === "express"} onChange={() => setDeliverySpeed("express")} className="mt-1 h-5 w-5 shrink-0 accent-[#006591]" name="delivery-speed" type="radio" value="express" />
                      <span>
                        <span className="flex flex-wrap items-center gap-2"><strong className="font-title-sm">Express Priority Reading</strong><span className="rounded-full bg-tertiary-fixed px-2 py-0.5 text-caption font-semibold text-on-tertiary-fixed">Next Day Before 5 PM</span></span>
                        <span className="mt-0.5 block text-body-sm text-on-surface-variant">Top-of-queue fulfillment directly from local store reserve.</span>
                      </span>
                    </span>
                    <span className="shrink-0 pl-2 text-right"><strong className="font-title-md">$3.99</strong><span className="block text-caption text-on-surface-variant">Rush speed</span></span>
                  </label>
                </fieldset>
              </article>

              <article className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-8">
                <SectionHeader icon="payments" title="4. Payment Method" description="Choose how you wish to complete your purchase" />
                <fieldset className="space-y-4">
                  <legend className="sr-only">Select payment option</legend>
                  <div className="rounded-2xl bg-secondary-container/40 p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <input defaultChecked className="mt-1 h-5 w-5 shrink-0 accent-[#006591]" id="pay-cod" name="payment-method" type="radio" value="cod" />
                        <div>
                          <label htmlFor="pay-cod" className="flex cursor-pointer flex-wrap items-center gap-2 font-title-md font-bold">Cash on Delivery (COD) / Instant Tap<span className="rounded-full bg-primary px-2.5 py-0.5 text-label-sm text-on-primary shadow-sm">Recommended</span></label>
                          <p className="mt-1.5 text-body-md leading-relaxed text-on-surface-variant">Pay cash or tap with your credit card upon doorstep arrival. Inspect your pristine books before handing over a single cent.</p>
                        </div>
                      </div>
                      <Icon className="shrink-0 text-2xl text-primary">handshake</Icon>
                    </div>
                    <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed"><Icon className="text-base">verified</Icon></span>
                      <p className="text-body-sm"><strong>Reader&apos;s Trust Pledge:</strong> Our courier gives you 3 minutes to check book condition, bindings, and bookmarks before confirmation.</p>
                    </div>
                  </div>
                  {[
                    ["pay-card", "Online Card Payment (Visa, Mastercard, Amex)", "Direct 256-bit encrypted checkout portal"],
                    ["pay-wallets", "Apple Pay & Google Wallet", "One-click biometrics pass"],
                  ].map(([id, title, description]) => (
                    <div key={id} className="flex cursor-not-allowed items-center justify-between gap-3 rounded-xl bg-surface-container-low/60 p-4 opacity-75">
                      <span className="flex items-center gap-3.5">
                        <input disabled className="h-5 w-5 cursor-not-allowed" id={id} name="payment-method" type="radio" />
                        <span><label htmlFor={id} className="cursor-not-allowed font-title-sm text-on-surface-variant">{title}</label><span className="mt-0.5 block text-caption text-outline">{description}</span></span>
                      </span>
                      <span className="shrink-0 rounded-full bg-surface-container-high px-2.5 py-1 text-caption font-semibold text-on-surface-variant">Coming Soon</span>
                    </div>
                  ))}
                </fieldset>
              </article>
            </section>

            <aside aria-label="Order summary and guarantees" className="space-y-6 lg:sticky lg:top-32 lg:col-span-5">
              <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-md sm:p-7">
                <header className="-mx-6 -mt-6 mb-5 flex items-center justify-between rounded-t-2xl bg-surface-container-low/50 p-6 sm:-mx-7 sm:-mt-7 sm:p-7">
                  <div className="flex items-center gap-2.5"><Icon className="text-xl text-primary">auto_stories</Icon><h2 className="font-title-md">Order Summary (2 Books + 1 Gift)</h2></div>
                  <Link href="/cart" className="text-label-sm text-primary hover:underline">Edit Cart</Link>
                </header>
                <div className="mb-5 space-y-4">
                  {orderBooks.map((book) => (
                    <div key={book.title} className="flex items-center gap-3">
                      <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md bg-surface-container"><Image src={book.image} alt={`${book.title} cover`} fill sizes="44px" className="object-cover" /></div>
                      <div className="min-w-0 flex-1"><h3 className="truncate text-label-md font-semibold">{book.title}</h3><p className="text-caption text-on-surface-variant">{book.author}</p><span className="text-caption text-outline">{book.edition} · Qty: 1</span></div>
                      <span className="shrink-0 font-label-md font-semibold">{`$${book.price.toFixed(2)}`}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 rounded-xl bg-tertiary-fixed/30 p-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tertiary-fixed text-tertiary"><Icon>bookmark_heart</Icon></span>
                    <div className="flex-1"><h3 className="text-label-sm font-bold">Botanical Seed Bookmark</h3><p className="text-caption text-on-surface-variant">Koala Eco Perks · Wildflower seeded paper</p></div>
                    <span className="font-label-sm font-bold text-tertiary">FREE</span>
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-between rounded-xl bg-secondary-fixed/40 p-3">
                  <span className="flex items-center gap-2"><Icon className="text-primary">local_offer</Icon><span><strong className="block text-label-sm">KOALALOVE</strong><span className="text-caption text-on-surface-variant">10% Welcome discount applied</span></span></span>
                  <Icon className="text-base text-primary">check_circle</Icon>
                </div>
                <div className="space-y-2.5 border-b border-surface-container-low pb-5 text-body-sm text-on-surface-variant">
                  <div className="flex items-center justify-between"><span>Items Subtotal</span><span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span></div>
                  <div className="flex items-center justify-between"><span className="flex items-center gap-1.5">Eco-Friendly Courier<Icon title="Free on orders over $35" className="text-xs text-outline">info</Icon></span><span className="font-bold text-primary">{deliverySpeed === "standard" ? "FREE" : "$3.99"}</span></div>
                  <div className="flex items-center justify-between font-medium text-primary"><span>Promo Code (KOALALOVE - 10%)</span><span>-${discount.toFixed(2)}</span></div>
                  <div className="flex items-center justify-between pt-1"><span>Local Environmental Packaging Surcharge</span><span>$0.00</span></div>
                </div>
                <div className="-mx-6 mb-6 mt-4 flex items-baseline justify-between rounded-xl bg-surface-container-low px-6 py-4 sm:-mx-7 sm:px-7">
                  <div><span className="block text-caption uppercase tracking-wider text-on-surface-variant">Due Upon Delivery</span><span className="font-display text-headline-sm font-bold">Total (USD)</span></div>
                  <div className="text-right"><span className="font-display text-3xl font-bold tracking-tight text-primary">${total.toFixed(2)}</span><span className="block text-caption text-on-surface-variant">Taxes included</span></div>
                </div>
                <button type="submit" className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary font-display text-headline-sm font-bold text-on-primary shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.99]">
                  <Icon className="text-xl">lock</Icon>Place Order (${total.toFixed(2)})
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-caption text-on-surface-variant"><Icon className="text-sm text-primary">safety_check</Icon>Pay zero today. Settle when your package is in your hands.</p>
                <div className="mt-6 text-center"><Link href="/cart" className="inline-flex items-center gap-1 text-label-md text-on-surface-variant transition-colors hover:text-primary"><Icon className="text-base">arrow_back</Icon>Return to Cart to add more books</Link></div>
              </div>

              <section aria-labelledby="guarantees-title" className="space-y-4 rounded-2xl bg-surface-container-low p-6">
                <h2 id="guarantees-title" className="flex items-center gap-2 font-title-sm"><Icon className="text-lg text-primary">shield</Icon>Koala Reading Safe Delivery Guarantees</h2>
                <ul className="space-y-3 text-body-sm text-on-surface-variant">
                  <li className="flex items-start gap-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface"><Icon className="text-base">recycling</Icon></span><span><strong className="block font-medium text-on-surface">100% Recycled &amp; Plastic-Free Box</strong>Biodegradable cardboard cushion pads keep spines and jackets pristine without harmful plastics.</span></li>
                  <li className="flex items-start gap-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface"><Icon className="text-base">sentiment_very_satisfied</Icon></span><span><strong className="block font-medium text-on-surface">14-Day Reader Satisfaction Guarantee</strong>Not drawn into the plot? Exchange for store credit or another title, hassle-free.</span></li>
                  <li className="flex items-start gap-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface"><Icon className="text-base">visibility</Icon></span><span><strong className="block font-medium text-on-surface">No-Risk Doorstep Inspection</strong>Open your package in front of our delivery companion before completing payment.</span></li>
                </ul>
                <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4 text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-2"><Icon className="text-lg text-primary">support_agent</Icon>Need a quick answer? Our bibliophiles are live in chat</span>
                  <a href="mailto:haven@koalabooks.com" className="shrink-0 font-label-sm text-primary hover:underline">Ask Librarian</a>
                </div>
              </section>
            </aside>
          </form>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low py-16 text-on-surface shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl px-5 lg:px-12">
          <div className="grid gap-10 border-b border-outline-variant/30 pb-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              <Link href="/" className="flex items-center gap-3"><span className="relative h-8 w-[120px]"><Image src={logo} alt="" fill sizes="120px" className="object-contain object-left" /></span><span className="font-title-md font-bold tracking-tight">Koala Bookstore</span></Link>
              <p className="max-w-sm text-body-md leading-relaxed text-on-surface-variant">Your independent neighborhood sanctuary for curated literature, heartfelt recommendations, and peaceful bookish conversations.</p>
              <div className="flex items-center gap-3 pt-2"><Link aria-label="Bookmarks" href="/#featured" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:text-primary"><Icon className="text-lg">bookmark</Icon></Link><Link aria-label="Reviews" href="/#spotlight" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:text-primary"><Icon className="text-lg">rate_review</Icon></Link><Link aria-label="Store location" href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:text-primary"><Icon className="text-lg">storefront</Icon></Link></div>
            </div>
            <div><h2 className="font-title-sm">Explore &amp; Shop</h2><ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant"><li><Link href="/store" className="hover:text-primary">Fiction</Link></li><li><Link href="/store" className="hover:text-primary">Non-fiction</Link></li><li><Link href="/store" className="hover:text-primary">New Arrivals</Link></li><li><Link href="/store" className="hover:text-primary">Rare &amp; Indie</Link></li></ul></div>
            <div><h2 className="font-title-sm">Customer Support</h2><ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant"><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Order Tracking</a></li><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Delivery Info</a></li><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Returns &amp; FAQ</a></li><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Contact</a></li></ul></div>
            <div><h2 className="font-title-sm">Community &amp; Perks</h2><ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant"><li><Link href="/#newsletter" className="hover:text-primary">Book Club</Link></li><li><Link href="/#newsletter" className="hover:text-primary">Koala Rewards</Link></li><li><Link href="/#newsletter" className="hover:text-primary">Gift Cards</Link></li><li><Link href="/#newsletter" className="hover:text-primary">Reading Events</Link></li></ul></div>
          </div>
          <div className="my-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-surface-container p-6 text-center md:flex-row md:text-left"><div className="space-y-1"><h2 className="font-title-md">Join the Reading Haven</h2><p className="text-body-sm text-on-surface-variant">Receive weekly author conversations, literary dispatches, and member-only quiet hours.</p></div><Link href="/#newsletter" className="shrink-0 rounded-xl bg-primary px-6 py-3 text-label-md text-on-primary transition-colors hover:bg-primary/90">Join the newsletter</Link></div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/30 pt-8 text-center text-caption text-on-surface-variant md:flex-row"><p>© 2025 Koala Bookstore Inc. All rights reserved. Made with love for fellow bookworms.</p><div className="flex flex-wrap items-center justify-center gap-6"><span>Cash on Delivery</span><span>Secure Cards</span><span>Apple Pay</span><span>Gift Tokens</span></div><div className="flex items-center gap-4"><a href="mailto:haven@koalabooks.com?subject=Privacy%20Policy" className="hover:text-on-surface">Privacy Policy</a><a href="mailto:haven@koalabooks.com?subject=Terms%20of%20Service" className="hover:text-on-surface">Terms of Service</a></div></div>
        </div>
      </footer>
    </div>
  );
}