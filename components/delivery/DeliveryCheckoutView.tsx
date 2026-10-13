import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  BookHeart,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Eye,
  Handshake,
  Headset,
  Home,
  Info,
  Leaf,
  Link2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Recycle,
  Shield,
  ShieldCheck,
  Smile,
  Store,
  Tag,
  Truck,
  UserRound,
} from "lucide-react";
import DeliveryMethodOptions from "@/components/delivery/DeliveryMethodOptions";

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

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Truck;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-6 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
        <Icon size={19} aria-hidden="true" />
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
  icon: Icon,
  type = "text",
  defaultValue,
  placeholder,
  required = true,
  withIcon = true,
}: {
  id: string;
  label: string;
  icon?: typeof UserRound;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  withIcon?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex items-center justify-between text-label-md text-on-surface"
      >
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      <div className={withIcon ? "relative" : undefined}>
        {withIcon && Icon && (
          <Icon
            size={18}
            aria-hidden="true"
            className="absolute left-3.5 top-3 text-outline"
          />
        )}
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

export default function DeliveryCheckoutView() {
  const subtotal = orderBooks.reduce((sum, book) => sum + book.price, 0);
  const discount = Math.round(subtotal * 10) / 100;
  const total = subtotal - discount;

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <main className="w-full bg-surface pt-28">
        <section className="mb-8 w-full bg-surface-container-low/60 py-6">
          <div className="mx-auto max-w-7xl px-5 lg:px-12">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <span className="text-label-sm font-semibold uppercase tracking-wider text-tertiary">
                  Step 2 of 4
                </span>
                <h1 className="mt-1 font-display text-headline-lg tracking-tight">
                  Delivery &amp; Contact Details
                </h1>
              </div>
              <ol
                aria-label="Checkout progress"
                className="flex items-center gap-2 sm:gap-4"
              >
                <li className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed shadow-sm">
                    <Check size={16} aria-hidden="true" />
                  </span>
                  <span className="hidden text-label-md font-medium sm:inline">
                    Cart
                  </span>
                </li>
                <li
                  aria-hidden="true"
                  className="h-0.5 w-6 rounded-full bg-primary-container sm:w-10"
                />
                <li aria-current="step" className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-label-sm text-on-primary shadow-md ring-4 ring-primary-fixed/50">
                    2
                  </span>
                  <span className="font-label-md font-bold text-primary">
                    Delivery
                  </span>
                </li>
                <li
                  aria-hidden="true"
                  className="h-0.5 w-6 rounded-full bg-outline-variant/50 sm:w-10"
                />
                <li className="flex items-center gap-2 opacity-60">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-label-sm text-on-surface-variant">
                    3
                  </span>
                  <span className="hidden text-label-md text-on-surface-variant sm:inline">
                    Payment
                  </span>
                </li>
                <li
                  aria-hidden="true"
                  className="h-0.5 w-6 rounded-full bg-outline-variant/50 sm:w-10"
                />
                <li className="flex items-center gap-2 opacity-60">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-label-sm text-on-surface-variant">
                    4
                  </span>
                  <span className="hidden text-label-md text-on-surface-variant sm:inline">
                    Confirmation
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <section
              aria-label="Delivery and contact details"
              className="space-y-8 lg:col-span-7"
            >
              <article className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-8">
                <header className="-mx-6 -mt-6 mb-6 flex items-center justify-between rounded-t-2xl bg-surface-container-low/40 p-6 pb-4 sm:-mx-8 sm:-mt-8 sm:p-8 sm:pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                      <UserRound size={19} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-display text-headline-sm">
                        1. Contact &amp; Recipient
                      </h2>
                      <p className="text-body-sm text-on-surface-variant">
                        We will send dispatch alerts and arrival text updates
                      </p>
                    </div>
                  </div>
                  <span className="hidden items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 text-label-sm text-on-surface-variant sm:inline-flex">
                    <ShieldCheck
                      size={14}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    Pre-filled via Sarah M.
                  </span>
                </header>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      id="full-name"
                      label="Full Name"
                      icon={UserRound}
                      defaultValue="Sarah Mitchell"
                    />
                    <FormField
                      id="phone-number"
                      label="Phone Number"
                      icon={Phone}
                      type="tel"
                      defaultValue="+1 (555) 248-9102"
                    />
                  </div>
                  <FormField
                    id="email-address"
                    label="Email for Tracking & Digital Invoices"
                    icon={Mail}
                    type="email"
                    defaultValue="sarah.mitchell@readingnook.com"
                  />
                  <p className="flex items-center gap-1.5 pt-1 text-caption text-on-surface-variant">
                    <Leaf
                      size={13}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    Paperless invoices automatically save 1.2 oz of carbon per
                    literary package.
                  </p>
                </div>
              </article>

              <article className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-8">
                <header className="-mx-6 -mt-6 mb-6 flex items-center justify-between gap-3 rounded-t-2xl bg-surface-container-low/40 p-6 pb-4 sm:-mx-8 sm:-mt-8 sm:p-8 sm:pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                      <MapPin size={19} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-display text-headline-sm">
                        2. Destination &amp; Pin
                      </h2>
                      <p className="text-body-sm text-on-surface-variant">
                        Neighborhood doorstep or reading patio delivery
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-tertiary-fixed px-3 py-1 text-label-sm font-semibold text-on-tertiary-fixed">
                    Free Shipping Active
                  </span>
                </header>
                <div className="space-y-4">
                  <FormField
                    id="street-address"
                    label="Street Address, Apartment, or Nook"
                    icon={Home}
                    defaultValue="482 Eucalyptus Grove Way, Suite 12"
                    placeholder="e.g. 742 Evergreen Terrace, Apt 3B"
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      id="city"
                      label="City / District"
                      defaultValue="San Francisco"
                      withIcon={false}
                    />
                    <FormField
                      id="postal-code"
                      label="Postal Code"
                      defaultValue="94110"
                      withIcon={false}
                    />
                  </div>
                  <div className="space-y-2 rounded-xl bg-secondary-fixed/30 p-4">
                    <div className="flex items-start gap-2.5">
                      <MapPin
                        size={21}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label
                            htmlFor="maps-pin-link"
                            className="font-title-sm"
                          >
                            Google Maps or Location Pin Link
                          </label>
                          <span className="text-caption font-bold uppercase tracking-wider text-primary">
                            Recommended
                          </span>
                        </div>
                        <p className="mt-0.5 text-body-sm text-on-surface-variant">
                          Paste your dropped pin URL (e.g.{" "}
                          <span className="font-mono text-xs font-semibold text-primary">
                            https://maps.app.goo.gl/...
                          </span>
                          ) so our book courier spots your exact entrance
                          without ringing twice.
                        </p>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <Link2
                        size={18}
                        className="absolute left-3.5 top-4 text-outline"
                        aria-hidden="true"
                      />
                      <input
                        id="maps-pin-link"
                        name="maps-pin-link"
                        type="url"
                        defaultValue="https://maps.app.goo.gl/koala-nest-482sf"
                        placeholder="https://maps.app.goo.gl/k98e29example"
                        className="h-11 w-full rounded-xl bg-surface-container-lowest pl-11 pr-28 text-body-sm focus:outline-none focus:shadow-md"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2.5 rounded-lg bg-secondary-container px-3 py-1.5 text-label-sm text-on-secondary-container transition-colors hover:bg-secondary-fixed"
                      >
                        Verify Pin
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <label
                      htmlFor="delivery-notes"
                      className="flex items-center justify-between text-label-md"
                    >
                      <span>Driver Delivery Instructions &amp; Safe Spot</span>
                      <span className="text-caption font-normal text-on-surface-variant">
                        Optional
                      </span>
                    </label>
                    <textarea
                      id="delivery-notes"
                      name="delivery-notes"
                      rows={2}
                      defaultValue="Please place inside the weather-proof parcel chest on the porch nook. Ringing the bell is fine!"
                      placeholder="e.g. Leave in the wicker basket on the front porch nook."
                      className="w-full rounded-xl bg-surface-container-low p-3.5 text-body-sm focus:bg-surface-container-lowest focus:outline-none focus:shadow-md"
                    />
                  </div>
                </div>
              </article>

              <article className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-8">
                <SectionHeader
                  icon={Truck}
                  title="3. Delivery Method"
                  description="Carbon-offset literature couriers in protective cardboard wrap"
                />
                <DeliveryMethodOptions />
              </article>

              <article className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-8">
                <SectionHeader
                  icon={CreditCard}
                  title="4. Payment Method"
                  description="Choose how you wish to complete your purchase"
                />
                <fieldset className="space-y-4">
                  <legend className="sr-only">Select payment option</legend>
                  <div className="rounded-2xl bg-secondary-container/40 p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <input
                          defaultChecked
                          className="mt-1 h-5 w-5 shrink-0 accent-[#006591]"
                          id="pay-cod"
                          name="payment-method"
                          type="radio"
                          value="cod"
                        />
                        <div>
                          <label
                            htmlFor="pay-cod"
                            className="flex cursor-pointer flex-wrap items-center gap-2 font-title-md font-bold"
                          >
                            Cash on Delivery (COD) / Instant Tap
                            <span className="rounded-full bg-primary px-2.5 py-0.5 text-label-sm text-on-primary shadow-sm">
                              Recommended
                            </span>
                          </label>
                          <p className="mt-1.5 text-body-md leading-relaxed text-on-surface-variant">
                            Pay cash or tap with your credit card upon doorstep
                            arrival. Inspect your pristine books before handing
                            over a single cent.
                          </p>
                        </div>
                      </div>
                      <Handshake
                        size={25}
                        className="shrink-0 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                        <BadgeCheck size={17} aria-hidden="true" />
                      </span>
                      <p className="text-body-sm">
                        <strong>Reader&apos;s Trust Pledge:</strong> Our courier
                        gives you 3 minutes to check book condition, bindings,
                        and bookmarks before confirmation.
                      </p>
                    </div>
                  </div>
                  {[
                    {
                      id: "pay-card",
                      title: "Online Card Payment (Visa, Mastercard, Amex)",
                      description: "Direct 256-bit encrypted checkout portal",
                    },
                    {
                      id: "pay-wallets",
                      title: "Apple Pay & Google Wallet",
                      description: "One-click biometrics pass",
                    },
                  ].map((option) => (
                    <div
                      key={option.id}
                      className="flex cursor-not-allowed items-center justify-between gap-3 rounded-xl bg-surface-container-low/60 p-4 opacity-75"
                    >
                      <span className="flex items-center gap-3.5">
                        <input
                          disabled
                          className="h-5 w-5 cursor-not-allowed"
                          id={option.id}
                          name="payment-method"
                          type="radio"
                        />
                        <span>
                          <label
                            htmlFor={option.id}
                            className="cursor-not-allowed font-title-sm text-on-surface-variant"
                          >
                            {option.title}
                          </label>
                          <span className="mt-0.5 block text-caption text-outline">
                            {option.description}
                          </span>
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-surface-container-high px-2.5 py-1 text-caption font-semibold text-on-surface-variant">
                        Coming Soon
                      </span>
                    </div>
                  ))}
                </fieldset>
              </article>
            </section>

            <aside
              aria-label="Order summary and guarantees"
              className="space-y-6 lg:sticky lg:top-32 lg:col-span-5"
            >
              <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-md sm:p-7">
                <header className="-mx-6 -mt-6 mb-5 flex items-center justify-between rounded-t-2xl bg-surface-container-low/50 p-6 sm:-mx-7 sm:-mt-7 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <BookOpen
                      size={21}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    <h2 className="font-title-md">
                      Order Summary (2 Books + 1 Gift)
                    </h2>
                  </div>
                  <Link
                    href="/cart"
                    className="text-label-sm text-primary hover:underline"
                  >
                    Edit Cart
                  </Link>
                </header>
                <div className="mb-5 space-y-4">
                  {orderBooks.map((book) => (
                    <div key={book.title} className="flex items-center gap-3">
                      <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md bg-surface-container">
                        <Image
                          src={book.image}
                          alt={`${book.title} cover`}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-label-md font-semibold">
                          {book.title}
                        </h3>
                        <p className="text-caption text-on-surface-variant">
                          {book.author}
                        </p>
                        <span className="text-caption text-outline">
                          {book.edition} · Qty: 1
                        </span>
                      </div>
                      <span className="shrink-0 font-label-md font-semibold">
                        ${book.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 rounded-xl bg-tertiary-fixed/30 p-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tertiary-fixed text-tertiary">
                      <BookHeart size={20} aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-label-sm font-bold">
                        Botanical Seed Bookmark
                      </h3>
                      <p className="text-caption text-on-surface-variant">
                        Koala Eco Perks · Wildflower seeded paper
                      </p>
                    </div>
                    <span className="font-label-sm font-bold text-tertiary">
                      FREE
                    </span>
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-between rounded-xl bg-secondary-fixed/40 p-3">
                  <span className="flex items-center gap-2">
                    <Tag
                      size={18}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="block text-label-sm">KOALALOVE</strong>
                      <span className="text-caption text-on-surface-variant">
                        10% Welcome discount applied
                      </span>
                    </span>
                  </span>
                  <CheckCircle2
                    size={17}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-2.5 border-b border-surface-container-low pb-5 text-body-sm text-on-surface-variant">
                  <div className="flex items-center justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-medium text-on-surface">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      Eco-Friendly Courier{" "}
                      <Info
                        size={13}
                        className="text-outline"
                        aria-label="Free on orders over $35"
                      />
                    </span>
                    <span className="font-bold text-primary">FREE</span>
                  </div>
                  <div className="flex items-center justify-between font-medium text-primary">
                    <span>Promo Code (KOALALOVE - 10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span>Local Environmental Packaging Surcharge</span>
                    <span>$0.00</span>
                  </div>
                </div>
                <div className="-mx-6 mb-6 mt-4 flex items-baseline justify-between rounded-xl bg-surface-container-low px-6 py-4 sm:-mx-7 sm:px-7">
                  <div>
                    <span className="block text-caption uppercase tracking-wider text-on-surface-variant">
                      Due Upon Delivery
                    </span>
                    <span className="font-display text-headline-sm font-bold">
                      Total (USD)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-3xl font-bold tracking-tight text-primary">
                      ${total.toFixed(2)}
                    </span>
                    <span className="block text-caption text-on-surface-variant">
                      Taxes included
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary font-display text-headline-sm font-bold text-on-primary shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.99]"
                >
                  <LockKeyhole size={20} aria-hidden="true" />
                  Place Order (${total.toFixed(2)})
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-caption text-on-surface-variant">
                  <ShieldCheck
                    size={15}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  Pay zero today. Settle when your package is in your hands.
                </p>
                <div className="mt-6 text-center">
                  <Link
                    href="/cart"
                    className="inline-flex items-center gap-1 text-label-md text-on-surface-variant transition-colors hover:text-primary"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Return to Cart to add more books
                  </Link>
                </div>
              </div>

              <section
                aria-labelledby="guarantees-title"
                className="space-y-4 rounded-2xl bg-surface-container-low p-6"
              >
                <h2
                  id="guarantees-title"
                  className="flex items-center gap-2 font-title-sm"
                >
                  <Shield
                    size={19}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  Koala Reading Safe Delivery Guarantees
                </h2>
                <ul className="space-y-3 text-body-sm text-on-surface-variant">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface">
                      <Recycle size={16} aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block font-medium text-on-surface">
                        100% Recycled &amp; Plastic-Free Box
                      </strong>
                      Biodegradable cardboard cushion pads keep spines and
                      jackets pristine without harmful plastics.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface">
                      <Smile size={16} aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block font-medium text-on-surface">
                        14-Day Reader Satisfaction Guarantee
                      </strong>
                      Not drawn into the plot? Exchange for store credit or
                      another title, hassle-free.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface">
                      <Eye size={16} aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block font-medium text-on-surface">
                        No-Risk Doorstep Inspection
                      </strong>
                      Open your package in front of our delivery companion
                      before completing payment.
                    </span>
                  </li>
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
