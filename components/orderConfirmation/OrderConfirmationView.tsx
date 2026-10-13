import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Check,
  Download,
  Heart,
  History,
  House,
  MapPin,
  ReceiptText,
  Store,
  Truck,
  Bike,
  BadgeCheck,
  CreditCard,
  Headset,
  type LucideIcon,
  ShelvingUnit,
} from "lucide-react";
import {
  OrderReferenceCopyButton,
  PreviewActionButton,
} from "@/components/orderConfirmation/OrderConfirmationActions";

type IconProps = { icon: LucideIcon; className?: string };

function Icon({ icon: IconComponent, className = "" }: IconProps) {
  return <IconComponent aria-hidden="true" className={className} />;
}

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

export default function OrderConfirmationView() {
  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <main className="w-full bg-surface pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-8 lg:px-12">
          <section
            aria-labelledby="confirmation-title"
            className="relative overflow-hidden rounded-3xl bg-surface-container-low p-8 shadow-sm lg:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary-container/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-tertiary-fixed/30 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
              <div className="relative flex shrink-0 items-center justify-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-surface-container-lowest p-2 shadow-md lg:h-40 lg:w-40">
                  <Image
                    src={mascotImage}
                    alt="Koala mascot reading a book"
                    fill
                    sizes="160px"
                    className="rounded-full object-cover p-2"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm ring-4 ring-surface-container-lowest">
                    <Icon icon={Check} className="text-2xl font-bold" />
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-tertiary-fixed px-3.5 py-1 text-label-sm text-on-tertiary-fixed">
                  <Icon icon={Heart} className="text-base" />
                  Order Confirmed &amp; Queued
                </div>
                <h1
                  id="confirmation-title"
                  className="font-display text-headline-lg text-on-surface"
                >
                  Your order is confirmed!
                </h1>
                <p className="max-w-2xl text-body-md text-on-surface-variant">
                  Thank you for supporting independent reading, Sarah!
                  We&apos;re packing your books with recycled wraps, pressed
                  botanical seals, and cozy care.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start">
                  <div className="flex items-center gap-2 rounded-xl bg-surface-container-lowest px-4 py-2 text-on-surface shadow-sm">
                    <span className="text-caption uppercase tracking-wider text-outline">
                      Order Reference
                    </span>
                    <span className="font-title-sm font-bold text-primary">
                      #KB-89241
                    </span>
                    <OrderReferenceCopyButton />
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl bg-surface-container-lowest px-4 py-2 text-left text-on-surface shadow-sm">
                    <Icon icon={Truck} className="text-xl text-primary" />
                    <span className="flex flex-col">
                      <span className="text-caption leading-none text-outline">
                        Estimated Delivery
                      </span>
                      <span className="text-label-md font-semibold">
                        Tomorrow, 2:00 PM – 6:00 PM
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-10 rounded-2xl bg-surface-container-lowest/80 p-6 shadow-sm">
              <ol
                aria-label="Order status"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                <li className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm">
                    <Icon icon={Check} className="text-lg" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
                      Step 1 • Completed
                    </span>
                    <span className="font-title-sm">Order Placed</span>
                    <span className="text-caption text-outline">
                      Today, 11:42 AM
                    </span>
                  </span>
                </li>
                <li aria-current="step" className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-sm">
                    <ShelvingUnit />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
                      Step 2 • In Progress
                    </span>
                    <span className="font-title-sm">Packaging with Love</span>
                    <span className="text-caption text-outline">
                      At Nook Workshop
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3.5 opacity-60">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-outline">
                    <Icon icon={Bike} className="text-xl" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-label-sm font-semibold uppercase tracking-wider text-outline">
                      Step 3 • Upcoming
                    </span>
                    <span className="font-title-sm">Out with Courier</span>
                    <span className="text-caption text-outline">
                      Tomorrow morning
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3.5 opacity-60">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-outline">
                    <Icon icon={House} className="text-xl" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-label-sm font-semibold uppercase tracking-wider text-outline">
                      Step 4 • Upcoming
                    </span>
                    <span className="font-title-sm">Delivered</span>
                    <span className="text-caption text-outline">
                      Direct to your door
                    </span>
                  </span>
                </li>
              </ol>
              <div className="mt-6 hidden h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high lg:block">
                <div className="h-full w-2/5 rounded-full bg-primary-container" />
              </div>
            </div>
          </section>

          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <section
                aria-labelledby="purchased-books-title"
                className="space-y-6 rounded-3xl bg-surface-container-lowest p-6 shadow-sm lg:p-8"
              >
                <div className="flex items-center justify-between gap-3 pb-2">
                  <div className="flex items-center gap-3">
                    <Icon icon={BookOpen} className="text-2xl text-primary" />
                    <h2
                      id="purchased-books-title"
                      className="font-display text-headline-sm"
                    >
                      Purchased Books &amp; Gifts
                    </h2>
                  </div>
                  <span className="rounded-full bg-secondary-container px-3 py-1 text-label-sm text-on-secondary-container">
                    2 Items + 1 Gift
                  </span>
                </div>
                <div className="space-y-5">
                  {books.map((book) => (
                    <article
                      key={book.title}
                      className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-surface-container-low p-4 transition-colors hover:bg-surface-container sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-container shadow-sm">
                          <Image
                            src={book.image}
                            alt={`Cover of ${book.title}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-caption font-semibold text-on-surface-variant">
                              {book.edition}
                            </span>
                            <span className="text-caption text-outline">
                              Qty: 1
                            </span>
                          </div>
                          <h3 className="mt-1 truncate font-title-sm">
                            {book.title}
                          </h3>
                          <p className="text-body-sm text-on-surface-variant">
                            {book.author}
                          </p>
                          <p className="mt-0.5 text-caption text-outline">
                            ISBN: {book.isbn}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full shrink-0 items-center justify-between sm:w-auto sm:flex-col sm:items-end">
                        <span className="font-title-sm font-bold">
                          ${book.price.toFixed(2)}
                        </span>
                        <span className="text-caption text-outline">
                          Unit: ${book.price.toFixed(2)}
                        </span>
                      </div>
                    </article>
                  ))}
                  <article className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-tertiary-fixed/30 p-4 transition-colors hover:bg-tertiary-fixed/40 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-container p-1.5 shadow-sm">
                        <Image
                          src={bookmarkImage}
                          alt="Botanical linen bookmark"
                          fill
                          sizes="64px"
                          className="rounded object-cover p-1.5"
                        />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-tertiary px-2 py-0.5 text-label-sm font-bold text-on-tertiary">
                            Complimentary Perk
                          </span>
                          <span className="text-caption text-on-tertiary-fixed">
                            Qty: 1
                          </span>
                        </div>
                        <h3 className="mt-1 truncate font-title-sm">
                          Botanical Bookmark &amp; Linen Sleeve
                        </h3>
                        <p className="text-body-sm text-on-surface-variant">
                          Koala Bookstore Signature Heritage Edition
                        </p>
                        <p className="mt-0.5 text-caption text-tertiary">
                          Crafted with 100% post-consumer cotton fiber
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full shrink-0 items-center justify-between sm:w-auto sm:flex-col sm:items-end">
                      <span className="font-title-sm font-bold text-tertiary">
                        FREE
                      </span>
                      <span className="text-caption text-outline line-through">
                        $4.50 value
                      </span>
                    </div>
                  </article>
                </div>
              </section>

              <section
                aria-labelledby="payment-breakdown-title"
                className="space-y-4 rounded-3xl bg-surface-container-lowest p-6 shadow-sm lg:p-8"
              >
                <div className="flex items-center gap-3">
                  <Icon icon={ReceiptText} className="text-2xl text-primary" />
                  <h2
                    id="payment-breakdown-title"
                    className="font-display text-headline-sm"
                  >
                    Payment Breakdown
                  </h2>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-3 text-body-md text-on-surface-variant">
                    <span>Item Subtotal (2 items)</span>
                    <span className="font-semibold text-on-surface">
                      $35.49
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-body-md text-on-surface-variant">
                    <span className="flex flex-wrap items-center gap-1.5">
                      Promo Discount{" "}
                      <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-label-sm font-bold text-on-secondary-fixed">
                        KOALALOVE
                      </span>
                    </span>
                    <span className="font-semibold text-primary">-$3.55</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-surface-container-low p-4">
                    <div className="flex flex-col">
                      <span className="font-title-md font-bold">
                        Total Due upon Arrival
                      </span>
                      <span className="text-caption text-on-surface-variant">
                        Payable by cash or contactless terminal to courier
                      </span>
                    </div>
                    <span className="shrink-0 font-display text-headline-md font-bold">
                      $31.94
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <section
                aria-labelledby="delivery-payment-title"
                className="space-y-6 rounded-3xl bg-surface-container-lowest p-6 shadow-sm lg:p-8"
              >
                <div className="flex items-center gap-3">
                  <Icon icon={MapPin} className="text-2xl text-primary" />
                  <h2
                    id="delivery-payment-title"
                    className="font-display text-headline-sm"
                  >
                    Delivery &amp; Payment
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-label-md font-semibold uppercase tracking-wider text-outline">
                      Destination
                    </span>
                    <span className="inline-flex items-center gap-1 text-caption font-semibold text-primary">
                      <Icon icon={BadgeCheck} className="text-sm" />
                      Map Pin Verified
                    </span>
                  </div>
                  <div className="flex items-start gap-3.5 rounded-2xl bg-surface-container-low p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-primary">
                      <Icon icon={House} className="text-xl" />
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-title-sm font-semibold">
                        Sarah Mitchell
                      </p>
                      <p className="text-body-sm text-on-surface-variant">
                        742 Evergreen Nook, Apt 4B
                      </p>
                      <p className="text-body-sm text-on-surface-variant">
                        Riverdale District, Melbourne, 3000
                      </p>
                      <p className="pt-1 text-caption text-outline">
                        Note: &quot;Leave with front reception if not
                        answered&quot;
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <span className="text-label-md font-semibold uppercase tracking-wider text-outline">
                    Selected Method
                  </span>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-container-low p-4">
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                        <Icon icon={CreditCard} className="text-xl" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-title-sm">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-caption text-on-surface-variant">
                          Please keep exact amount or card handy
                        </span>
                      </span>
                    </div>
                    <span className="shrink-0 font-title-sm font-bold">
                      $31.94
                    </span>
                  </div>
                </div>
              </section>

              <section
                aria-labelledby="next-steps-title"
                className="space-y-4 rounded-3xl bg-surface-container-lowest p-6 shadow-sm lg:p-8"
              >
                <div className="space-y-1">
                  <h2 id="next-steps-title" className="font-title-md">
                    What&apos;s Next?
                  </h2>
                  <p className="text-body-sm text-on-surface-variant">
                    A dispatch notification and live tracking link will be sent
                    to{" "}
                    <strong className="text-on-surface">
                      sarah.m@havenreads.com
                    </strong>
                    .
                  </p>
                </div>
                <div className="space-y-3 pt-2">
                  <Link
                    href="/store"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-label-md text-on-primary shadow-sm transition-all hover:opacity-95 active:scale-[0.99]"
                  >
                    <Icon icon={Store} className="text-lg" />
                    Continue Browsing Books
                  </Link>
                  <Link
                    href="/signin"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-surface-container text-label-md text-on-surface transition-colors hover:bg-surface-container-high"
                  >
                    <Icon icon={History} className="text-lg" />
                    Track Order in Account History
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
