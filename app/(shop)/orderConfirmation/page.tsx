"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const books = [
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    edition: "Hardcover",
    isbn: "978-0593321201",
    price: 18.99,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWyoLbLOpgazXPCzH-AhVIkulKrKuNwhPZeGIrQwcnnoyfkshlV3hoQLBb26ujxqLyLEUwxJrLSIgqeGPhwwssTlZnBX-C3psQ9XuVf52sZ_wIke6LnRiUB_mM5G_Cc1FghrcUWYwBZIF2M7h_9O28LbDkg_OCie3y0hvjZtYVCQDNJKL8lVDmEFzi4tHypzVyURjxAe-IlJ8Z5U3j8ZVcHvmUM0svGMPyqvS0gxSfafvhxReeIA8W0g",
  },
  {
    title: "Sea of Tranquility",
    author: "Emily St. John Mandel",
    edition: "Paperback",
    isbn: "978-0593466186",
    price: 16.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdoQTAropbndtkqSnfUTnXsWM9El-FS2totoo3CJ73DCzA1FwTG9VeS0PngNTcnpyO44LwYDObTE2qpDXWu12Ze9v_Ct-coOGAd4E-azIxEghKTmfMUw21FGa0k-YFOteQTbDcWcL1ieLYGV8JGkzLHBkuN7QuT88Eb5JPX3SWB308MbD8Yhj-4iw2AdWVR6jS89Nw726tZaVcWme6Z2q9uH2mVEYY4KOVliKqOMk88t3EmHP4X0i8Sw",
  },
];

const bookmarkImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDLKk3YfiUflCu2XnqbBRSXTYZcb3ma3RXat3337dGnyGiu2TaYFFa49HNaRhKxVtzDR5Z9TJhCeUZEo9Noh34h8bOibSIwds5-QNKbDj51L0P6BdELIX-v7Gqwi_M6BB5fACEtZA_ixYoiSQvkFJnnCXP9eCKwANNOVk_Ez7SPdwwQ09xzfud9kzSB45URONG_N_lPkBrJROTPEe1H-Z0m4Kk5jUhOy13J4Km02CLAW1NMDRPiZ-c6YA";

const mascotImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDPhMjJqGOgeLP8cvawzuNO-72FNp2u9OVDm_WA1DRhB8BJiaumt1ilUwm29qAF4yw5XKcNBf9VWyVZ5BzzCK5tEHnU4OtXX8xPr81Fv3gHPcLPbWWA3bgwd-xmUBL-T-yvUWmTbEcWfZX_u1zbcyVKF21cB-wdXeKCAtm-wfy8skeaC4XA8lsEMhrv0anJfgF7Kf3N8bn8EoaySlT15r3ZLYGL4VKv0cW20e4tpcn3oFiDk-sLMwxw-Q";

function Icon({
  children,
  className = "",
  title,
}: {
  children: string;
  className?: string;
  title?: string;
}) {
  return (
    <span title={title} aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}

export default function OrderConfirmationPage() {
  const [notice, setNotice] = useState("");

  async function copyOrderReference() {
    try {
      await navigator.clipboard.writeText("KB-89241");
      setNotice("Order reference copied to clipboard.");
    } catch {
      setNotice("Could not access the clipboard. Your order reference is #KB-89241.");
    }
  }

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <main className="w-full bg-surface pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-8 lg:px-12">
          {notice && (
            <div role="status" className="flex items-center justify-between rounded-xl bg-secondary-container px-4 py-3 text-body-sm text-on-secondary-container">
              <span>{notice}</span>
              <button type="button" onClick={() => setNotice("")} aria-label="Dismiss message"><Icon className="text-base">close</Icon></button>
            </div>
          )}
          <section aria-labelledby="confirmation-title" className="relative overflow-hidden rounded-3xl bg-surface-container-low p-8 shadow-sm lg:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary-container/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-tertiary-fixed/30 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
              <div className="relative flex shrink-0 items-center justify-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-surface-container-lowest p-2 shadow-md lg:h-40 lg:w-40">
                  <Image src={mascotImage} alt="Koala mascot reading a book" fill sizes="160px" className="rounded-full object-cover p-2" />
                  <span className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm ring-4 ring-surface-container-lowest"><Icon className="text-2xl font-bold">check</Icon></span>
                </div>
              </div>
              <div className="flex-1 space-y-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-tertiary-fixed px-3.5 py-1 text-label-sm text-on-tertiary-fixed">
                  <Icon className="text-base">favorite</Icon>Order Confirmed &amp; Queued
                </div>
                <h1 id="confirmation-title" className="font-display text-headline-lg text-on-surface">Your order is confirmed!</h1>
                <p className="max-w-2xl text-body-md text-on-surface-variant">Thank you for supporting independent reading, Sarah! We&apos;re packing your books with recycled wraps, pressed botanical seals, and cozy care.</p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start">
                  <div className="flex items-center gap-2 rounded-xl bg-surface-container-lowest px-4 py-2 text-on-surface shadow-sm">
                    <span className="text-caption uppercase tracking-wider text-outline">Order Reference</span>
                    <span className="font-title-sm font-bold text-primary">#KB-89241</span>
                    <button type="button" onClick={copyOrderReference} aria-label="Copy order number" title="Copy reference number" className="ml-1 rounded-md p-1 text-outline transition-colors hover:bg-surface-container-high hover:text-on-surface"><Icon className="text-base">content_copy</Icon></button>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl bg-surface-container-lowest px-4 py-2 text-left text-on-surface shadow-sm">
                    <Icon className="text-xl text-primary">local_shipping</Icon>
                    <span className="flex flex-col"><span className="text-caption leading-none text-outline">Estimated Delivery</span><span className="text-label-md font-semibold">Tomorrow, 2:00 PM – 6:00 PM</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-10 rounded-2xl bg-surface-container-lowest/80 p-6 shadow-sm">
              <ol aria-label="Order status" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <li className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm"><Icon className="text-lg">check</Icon></span>
                  <span className="flex flex-col"><span className="text-label-sm font-bold uppercase tracking-wider text-primary">Step 1 • Completed</span><span className="font-title-sm">Order Placed</span><span className="text-caption text-outline">Today, 11:42 AM</span></span>
                </li>
                <li aria-current="step" className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-sm"><Icon className="text-xl">inventory_2</Icon></span>
                  <span className="flex flex-col"><span className="text-label-sm font-bold uppercase tracking-wider text-primary">Step 2 • In Progress</span><span className="font-title-sm">Packaging with Love</span><span className="text-caption text-outline">At Nook Workshop</span></span>
                </li>
                <li className="flex items-start gap-3.5 opacity-60">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-outline"><Icon className="text-xl">two_wheeler</Icon></span>
                  <span className="flex flex-col"><span className="text-label-sm font-semibold uppercase tracking-wider text-outline">Step 3 • Upcoming</span><span className="font-title-sm">Out with Courier</span><span className="text-caption text-outline">Tomorrow morning</span></span>
                </li>
                <li className="flex items-start gap-3.5 opacity-60">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-outline"><Icon className="text-xl">cottage</Icon></span>
                  <span className="flex flex-col"><span className="text-label-sm font-semibold uppercase tracking-wider text-outline">Step 4 • Upcoming</span><span className="font-title-sm">Delivered</span><span className="text-caption text-outline">Direct to your door</span></span>
                </li>
              </ol>
              <div className="mt-6 hidden h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high lg:block"><div className="h-full w-2/5 rounded-full bg-primary-container" /></div>
            </div>
          </section>

          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <section aria-labelledby="purchased-books-title" className="space-y-6 rounded-3xl bg-surface-container-lowest p-6 shadow-sm lg:p-8">
                <div className="flex items-center justify-between gap-3 pb-2">
                  <div className="flex items-center gap-3"><Icon className="text-2xl text-primary">auto_stories</Icon><h2 id="purchased-books-title" className="font-display text-headline-sm">Purchased Books &amp; Gifts</h2></div>
                  <span className="rounded-full bg-secondary-container px-3 py-1 text-label-sm text-on-secondary-container">2 Items + 1 Gift</span>
                </div>
                <div className="space-y-5">
                  {books.map((book) => (
                    <article key={book.title} className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-surface-container-low p-4 transition-colors hover:bg-surface-container sm:flex-row sm:items-center">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-container shadow-sm"><Image src={book.image} alt={`Cover of ${book.title}`} fill sizes="64px" className="object-cover" /></div>
                        <div className="flex min-w-0 flex-col">
                          <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-caption font-semibold text-on-surface-variant">{book.edition}</span><span className="text-caption text-outline">Qty: 1</span></div>
                          <h3 className="mt-1 truncate font-title-sm">{book.title}</h3>
                          <p className="text-body-sm text-on-surface-variant">{book.author}</p>
                          <p className="mt-0.5 text-caption text-outline">ISBN: {book.isbn}</p>
                        </div>
                      </div>
                      <div className="flex w-full shrink-0 items-center justify-between sm:w-auto sm:flex-col sm:items-end"><span className="font-title-sm font-bold">${book.price.toFixed(2)}</span><span className="text-caption text-outline">Unit: ${book.price.toFixed(2)}</span></div>
                    </article>
                  ))}
                  <article className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-tertiary-fixed/30 p-4 transition-colors hover:bg-tertiary-fixed/40 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-container p-1.5 shadow-sm"><Image src={bookmarkImage} alt="Botanical linen bookmark" fill sizes="64px" className="rounded object-cover p-1.5" /></div>
                      <div className="flex min-w-0 flex-col">
                        <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-tertiary px-2 py-0.5 text-label-sm font-bold text-on-tertiary">Complimentary Perk</span><span className="text-caption text-on-tertiary-fixed">Qty: 1</span></div>
                        <h3 className="mt-1 truncate font-title-sm">Botanical Bookmark &amp; Linen Sleeve</h3>
                        <p className="text-body-sm text-on-surface-variant">Koala Bookstore Signature Heritage Edition</p>
                        <p className="mt-0.5 text-caption text-tertiary">Crafted with 100% post-consumer cotton fiber</p>
                      </div>
                    </div>
                    <div className="flex w-full shrink-0 items-center justify-between sm:w-auto sm:flex-col sm:items-end"><span className="font-title-sm font-bold text-tertiary">FREE</span><span className="text-caption text-outline line-through">$4.50 value</span></div>
                  </article>
                </div>
              </section>

              <section aria-labelledby="payment-breakdown-title" className="space-y-4 rounded-3xl bg-surface-container-lowest p-6 shadow-sm lg:p-8">
                <div className="flex items-center gap-3"><Icon className="text-2xl text-primary">receipt_long</Icon><h2 id="payment-breakdown-title" className="font-display text-headline-sm">Payment Breakdown</h2></div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-3 text-body-md text-on-surface-variant"><span>Item Subtotal (2 items)</span><span className="font-semibold text-on-surface">$35.49</span></div>
                  <div className="flex items-center justify-between gap-3 text-body-md text-on-surface-variant"><span className="flex flex-wrap items-center gap-1.5">Promo Discount <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-label-sm font-bold text-on-secondary-fixed">KOALALOVE</span></span><span className="font-semibold text-primary">-$3.55</span></div>
                  <div className="flex items-center justify-between gap-3 text-body-md text-on-surface-variant"><span>Standard Eco-Shipping <span className="text-caption text-outline">(Orders over $35)</span></span><span className="font-semibold text-primary">Free</span></div>
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-surface-container-low p-4">
                    <div className="flex flex-col"><span className="font-title-md font-bold">Total Due upon Arrival</span><span className="text-caption text-on-surface-variant">Payable by cash or contactless terminal to courier</span></div>
                    <span className="shrink-0 font-display text-headline-md font-bold">$31.94</span>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <section aria-labelledby="delivery-payment-title" className="space-y-6 rounded-3xl bg-surface-container-lowest p-6 shadow-sm lg:p-8">
                <div className="flex items-center gap-3"><Icon className="text-2xl text-primary">pin_drop</Icon><h2 id="delivery-payment-title" className="font-display text-headline-sm">Delivery &amp; Payment</h2></div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2"><span className="text-label-md font-semibold uppercase tracking-wider text-outline">Destination</span><span className="inline-flex items-center gap-1 text-caption font-semibold text-primary"><Icon className="text-sm">verified</Icon>Map Pin Verified</span></div>
                  <div className="flex items-start gap-3.5 rounded-2xl bg-surface-container-low p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-primary"><Icon className="text-xl">home</Icon></span>
                    <div className="space-y-0.5"><p className="font-title-sm font-semibold">Sarah Mitchell</p><p className="text-body-sm text-on-surface-variant">742 Evergreen Nook, Apt 4B</p><p className="text-body-sm text-on-surface-variant">Riverdale District, Melbourne, 3000</p><p className="pt-1 text-caption text-outline">Note: &quot;Leave with front reception if not answered&quot;</p></div>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <span className="text-label-md font-semibold uppercase tracking-wider text-outline">Selected Method</span>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-container-low p-4">
                    <div className="flex items-center gap-3.5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed"><Icon className="text-xl">payments</Icon></span><span className="flex flex-col"><span className="font-title-sm">Cash on Delivery (COD)</span><span className="text-caption text-on-surface-variant">Please keep exact amount or card handy</span></span></div>
                    <span className="shrink-0 font-title-sm font-bold">$31.94</span>
                  </div>
                </div>
              </section>

              <section aria-labelledby="next-steps-title" className="space-y-4 rounded-3xl bg-surface-container-lowest p-6 shadow-sm lg:p-8">
                <div className="space-y-1"><h2 id="next-steps-title" className="font-title-md">What&apos;s Next?</h2><p className="text-body-sm text-on-surface-variant">A dispatch notification and live tracking link will be sent to <strong className="text-on-surface">sarah.m@havenreads.com</strong>.</p></div>
                <div className="space-y-3 pt-2">
                  <Link href="/store" className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-label-md text-on-primary shadow-sm transition-all hover:opacity-95 active:scale-[0.99]"><Icon className="text-lg">storefront</Icon>Continue Browsing Books</Link>
                  <Link href="/signin" className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-surface-container text-label-md text-on-surface transition-colors hover:bg-surface-container-high"><Icon className="text-lg">history</Icon>Track Order in Account History</Link>
                </div>
              </section>

              <section aria-labelledby="book-club-title" className="relative overflow-hidden rounded-3xl bg-secondary-container p-6 text-on-secondary-container shadow-sm lg:p-8">
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between"><span className="rounded-full bg-surface-container-lowest/80 px-3 py-1 text-label-sm font-bold text-on-surface">Member Benefit</span><Icon className="text-2xl text-primary">menu_book</Icon></div>
                  <div className="space-y-1.5"><h2 id="book-club-title" className="font-title-md font-bold">Join the November Book Nook Circle</h2><p className="text-body-sm leading-relaxed text-on-secondary-container/90">We&apos;re discussing <em>Tomorrow, and Tomorrow, and Tomorrow</em> next Thursday in our virtual quiet lounge. Download your free companion reading log and discussion primer.</p></div>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button type="button" onClick={() => setNotice("The reading log is not available in this preview yet.")} className="flex items-center gap-2 rounded-xl bg-surface-container-lowest px-4 py-2.5 text-label-sm font-semibold text-on-surface shadow-sm transition-colors hover:bg-surface-container"><Icon className="text-base">download</Icon>Download Reading Log (PDF)</button>
                    <button type="button" onClick={() => setNotice("Book club RSVP is not connected in this preview.")} className="rounded-xl px-4 py-2.5 text-label-sm font-semibold text-on-secondary-container transition-colors hover:bg-surface-container-lowest/50">RSVP to Club</button>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section aria-label="Customer care" className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-surface-container-low p-6 lg:flex-row lg:p-8">
            <div className="flex items-center gap-4 text-center md:text-left">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface-container-lowest text-primary shadow-sm"><Icon className="text-2xl">support_agent</Icon></span>
              <div><h2 className="font-title-sm">Need to make adjustments to your delivery?</h2><p className="text-body-sm text-on-surface-variant">Our friendly local librarians can help with packaging notes, safe-drop instructions, or schedule changes.</p></div>
            </div>
            <div className="flex shrink-0 items-center gap-3"><button type="button" onClick={() => setNotice("Live chat is not connected in this preview. Email haven@koalabooks.com for help.")} className="rounded-xl bg-surface-container-lowest px-5 py-2.5 text-label-md shadow-sm transition-colors hover:bg-surface-container">Live Chat</button><a href="mailto:haven@koalabooks.com" className="rounded-xl bg-surface-container-lowest px-5 py-2.5 text-label-md shadow-sm transition-colors hover:bg-surface-container">Email Help</a></div>
          </section>
        </div>
      </main>
    </div>
  );
}