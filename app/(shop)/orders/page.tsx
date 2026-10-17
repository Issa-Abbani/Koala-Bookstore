"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Download,
  Heart,
  Home,
  Library,
  LogOut,
  MapPin,
  PackageCheck,
  PackageOpen,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type OrderStatus = "In Progress" | "Delivered";
type OrderFilter = "All Orders" | OrderStatus | "Cancelled";

type Book = {
  title: string;
  author: string;
  edition: string;
  price: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  year: string;
  status: OrderStatus;
  total: number;
  payment: string;
  books: Book[];
};

const activeOrder: Order = {
  id: "KB-89241",
  date: "Today, 11:42 AM",
  year: "2025",
  status: "In Progress",
  total: 31.94,
  payment: "Cash on Delivery / Tap on Arrival",
  books: [
    {
      title: "Tomorrow, and Tomorrow, and Tomorrow",
      author: "Gabrielle Zevin",
      edition: "Hardcover Collector Edition",
      price: 18.95,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAoRq7wNMyJzv9SUqKigIk9TsXRjq84E2QPvfQD5N7THMuuIsBmcpJGTVXEGkoM_0sD9Y_Y7u3cTkLyKzmCtAuu0oibADYJ4KuFXrmbkr2STJve6QDBrlaEjwOq-llpA_tC8ZLjXbsEmgmUUSO7PVp3Yv5pl4tot3nC9D4XP0pWjrJWbFW_AVliZYO8kKx8uSh0sVtSdDz8u7ykQ_P2zYqQD7NK09XQLBqMx51O9kMHUkktbBaKjynqOQ",
    },
    {
      title: "Sea of Tranquility",
      author: "Emily St. John Mandel",
      edition: "Paperback",
      price: 12.99,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBKlRcM_SMSnpBiG356N6m9cVBjRUypnJEBerTzuF39tuQgjuegepE0UW0G_JGh6k2siqVUhN_xiv1AqpH2qjTSWHQKjrpfVlw4P7pIn9rnn1B0MBRqyDvCWUVILgJo7Y6kFOe8hKOI4nzh45nLoe-EzwNHkdwERsM3NMe8XQ_S3KK5t66jFbw4qD8RwEGVXo3ivWQ7citLcr2rsPlLMW_ZrL9VabybTviZ_EdPuWpIpOEMwxOkvntFtg",
    },
  ],
};

const deliveredOrders: Order[] = [
  {
    id: "KB-77104",
    date: "Oct 14, 2024",
    year: "2024",
    status: "Delivered",
    total: 36.49,
    payment: "Paid via Card •••• 4092",
    books: [
      {
        title: "Babel: An Arcane History",
        author: "R.F. Kuang",
        edition: "Hardcover Edition",
        price: 22.5,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC6IJ9_hAxN8h3M4vxOtK-2aJRZLW3ACycUZj0nstCq5e-hkAp2BTF9htS9UVBusOkV5_Y1tmNh9Xize7cHCQVyeHhA1HGJKUpqTP6Xd9SI7-61dDqyBNTQr6GEArXZq-0BKAI0V4WLsD1s-WZcvWNnDBaJULszcZe-icPeA6Nu0m94V0pwXhS9O3D8WYFNQ1x0LSM1OjuLeGA5_CemZmBLHkE9RaU0t6_hDK5Nh9wJevdDxkgnfoABZA",
      },
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        edition: "Paperback Edition",
        price: 13.99,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDio5GaFNAnFLecudEBfdYdU2YLsb4LejR0Dr8gWkFaU3PRmDg2gZofn09Xy60rcVo0dvwNjniqkdvRHPCfNST0mhkY8vAfnZYty_iu5BGgB-OInXV1pqQlPpSi89SQD-e9gL_N9E1jtSQ3AKhVhmfPxNPkro5JFHCBeIyejR0E2pkbWpgnL-cYCL0-PtEyCuVZT9W5yjw53BAHcNdB_uWNJ9HNybVzFA0FtSRwUmoFYU4P3-P991cl3Q",
      },
    ],
  },
  {
    id: "KB-64219",
    date: "Aug 28, 2024",
    year: "2024",
    status: "Delivered",
    total: 19.99,
    payment: "Paid via Cash on Delivery",
    books: [
      {
        title: "Demon Copperhead",
        author: "Barbara Kingsolver",
        edition: "Paperback Edition",
        price: 19.99,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDHLWLcBUWwH8vq9o4btkivqu1yqmO5m2pHDM7aQWdFrhgR6so6W5WZ7jrK87BYv7S6-Q7gtP5zM3attQe8CDTlHEJnVAcpipBTuC2wA3m4jTCb1V76IpWSC4enHEb31b3abzTkZ_LEOR8LWM4EiazCrWr2mNy4wV6AslxYPBCFObH4hC6Gk0s-Ip03ST_2ZakU3wYyMpoqfdO2hIH7HKLqttym5hgxmyt1fVa8Mv6DxzqXuCVKmFS2HSQ",
      },
    ],
  },
];

const orderFilters: OrderFilter[] = [
  "All Orders",
  "In Progress",
  "Delivered",
  "Cancelled",
];

const accountLinks = [
  { label: "Personal Profile", icon: UserRound },
  { label: "Order History", icon: PackageOpen },
  { label: "Purchased Books & Library", icon: Library },
  { label: "Saved Wishlist", icon: Heart },
  { label: "Addresses", icon: MapPin },
];

function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function matchesSearch(order: Order, search: string) {
  const query = search.trim().toLowerCase();
  return (
    !query ||
    order.id.toLowerCase().includes(query) ||
    order.books.some(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query),
    )
  );
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderFilter>("All Orders");
  const [year, setYear] = useState("All years");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const filteredDeliveredOrders = useMemo(
    () =>
      deliveredOrders.filter(
        (order) =>
          (year === "All years" || order.year === year) &&
          matchesSearch(order, search),
      ),
    [search, year],
  );
  const showActiveOrder =
    filter !== "Delivered" &&
    filter !== "Cancelled" &&
    (year === "All years" || activeOrder.year === year) &&
    matchesSearch(activeOrder, search);
  const showPastOrders =
    filter !== "In Progress" &&
    filter !== "Cancelled" &&
    filteredDeliveredOrders.length > 0;
  const visibleOrderCount =
    (showActiveOrder ? 1 : 0) +
    (showPastOrders ? filteredDeliveredOrders.length : 0);

  function showPreviewNotice(action: string) {
    setNotice(`${action} is a preview action. No account changes were made.`);
  }

  return (
    <div className="min-h-screen bg-surface pb-16 pt-24 text-on-surface sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="min-w-0 space-y-6">
          <header className="flex flex-col justify-between gap-5 rounded-3xl bg-surface-container-low p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <Truck className="h-5 w-5" />
                Your reading journey, delivered
              </p>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Order History &amp; Dispatches
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant sm:text-base">
                Track live book parcels, review previous deliveries, download
                official VAT invoices, and reorder favourite editions all in one
                cozy place.
              </p>
            </div>
          </header>

          <section
            aria-label="Filter orders"
            className="rounded-3xl border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div
                role="group"
                aria-label="Order status"
                className="flex flex-wrap gap-2"
              >
                {orderFilters.map((item) => {
                  const count =
                    item === "All Orders"
                      ? 3
                      : item === "In Progress"
                        ? 1
                        : item === "Delivered"
                          ? 2
                          : 0;
                  const selected = filter === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      aria-pressed={selected}
                      className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                        selected
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      {item} ({count})
                    </button>
                  );
                })}
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
                Year
                <span className="relative">
                  <select
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    className="min-w-36 appearance-none rounded-xl border border-outline-variant bg-surface-container-lowest py-2.5 pl-3 pr-9 text-sm font-medium text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="All years">All years</option>
                    <option value="2025">2025 (1 order)</option>
                    <option value="2024">2024 (2 orders)</option>
                    <option value="2023">2023 (0 orders)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </span>
              </label>
            </div>
            <label className="mt-4 flex items-center gap-3 rounded-2xl border border-outline-variant/70 bg-surface px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
              <Search className="h-5 w-5 shrink-0 text-on-surface-variant" />
              <span className="sr-only">Search orders or book titles</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by order # (e.g. KB-89241) or book title..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-on-surface-variant/70"
              />
            </label>
          </section>

          {notice && (
            <div
              role="status"
              className="flex items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-primary-fixed/50 px-4 py-3 text-sm text-on-primary-fixed"
            >
              <span>{notice}</span>
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
                className="font-semibold text-primary hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {showActiveOrder && (
            <section
              aria-labelledby="active-order-heading"
              className="overflow-hidden rounded-3xl border border-primary/20 bg-surface-container-lowest shadow-sm"
            >
              <div className="flex flex-col gap-3 border-b border-outline-variant/50 bg-primary-fixed/45 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                  <h2
                    id="active-order-heading"
                    className="flex items-center gap-2 font-title-md text-title-md font-bold"
                  >
                    <PackageOpen className="h-5 w-5 text-primary" />
                    Order #{activeOrder.id}
                  </h2>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    Placed {activeOrder.date}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-tertiary-fixed px-3 py-2 text-xs font-bold text-on-tertiary-fixed">
                  <Clock3 className="h-4 w-4" />
                  Packaging with Love (Step 2 of 4)
                </span>
              </div>

              <div className="space-y-7 p-5 sm:p-7">
                <div>
                  <div className="flex flex-col justify-between gap-2 text-sm sm:flex-row sm:items-center">
                    <span className="font-semibold">
                      Estimated delivery: Tomorrow afternoon, by 3:00 PM
                    </span>
                    <span className="flex items-center gap-2 text-on-surface-variant">
                      <Clock3 className="h-4 w-4" />
                      Express Book Carrier
                    </span>
                  </div>
                  <ol
                    aria-label="Delivery progress"
                    className="mt-5 grid grid-cols-4"
                  >
                    {[
                      { label: "Placed", icon: CheckCircle2 },
                      { label: "Packaging", icon: PackageCheck },
                      { label: "With Courier", icon: Truck },
                      { label: "Delivered", icon: Check },
                    ].map(({ label, icon: Icon }, index) => {
                      const complete = index < 2;
                      return (
                        <li
                          key={label}
                          className="relative flex flex-col items-center text-center"
                        >
                          {index < 3 && (
                            <span
                              className={`absolute left-1/2 top-5 h-0.5 w-full ${
                                index === 0
                                  ? "bg-primary"
                                  : "bg-outline-variant/70"
                              }`}
                            />
                          )}
                          <span
                            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                              complete
                                ? "bg-primary text-on-primary"
                                : "border-2 border-outline-variant bg-surface-container-lowest text-on-surface-variant"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <span
                            className={`mt-2 text-xs font-semibold sm:text-sm ${
                              complete
                                ? "text-on-surface"
                                : "text-on-surface-variant"
                            }`}
                          >
                            {label}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-title-sm text-title-sm font-bold">
                        Enclosed reading selections
                      </h3>
                      <span className="text-xs text-on-surface-variant">
                        2 books + 1 gift
                      </span>
                    </div>
                    {activeOrder.books.map((book) => (
                      <article
                        key={book.title}
                        className="flex gap-4 rounded-2xl bg-surface-container-low p-3"
                      >
                        <Image
                          src={book.image}
                          alt={`Cover of ${book.title}`}
                          width={72}
                          height={96}
                          className="h-24 w-[4.5rem] shrink-0 rounded-lg object-cover shadow-sm"
                        />
                        <div className="min-w-0 flex-1 py-1">
                          <h4 className="font-semibold leading-5">
                            {book.title}
                          </h4>
                          <p className="mt-1 text-sm text-on-surface-variant">
                            {book.author} · {book.edition}
                          </p>
                          <p className="mt-3 text-sm font-semibold">
                            {formatPrice(book.price)}{" "}
                            <span className="ml-2 font-normal text-on-surface-variant">
                              Qty: 1
                            </span>
                          </p>
                        </div>
                      </article>
                    ))}
                    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-tertiary/40 bg-tertiary-fixed/40 p-4 text-sm text-on-tertiary-fixed">
                      <Heart className="h-5 w-5 shrink-0 text-tertiary" />
                      <span>
                        Complimentary pressed botanical bookmark &amp; organic
                        tea sachet
                      </span>
                      <span className="ml-auto shrink-0 text-xs font-bold">
                        Free gift
                      </span>
                    </div>
                  </div>

                  <aside className="rounded-2xl bg-surface-container-low p-5">
                    <h3 className="font-title-sm text-title-sm font-bold">
                      Dispatch summary
                    </h3>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-on-surface-variant">Subtotal</dt>
                        <dd className="font-medium">$31.94</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-on-surface-variant">
                          Eco courier delivery
                        </dt>
                        <dd className="text-right font-medium">
                          Free ($35+ promo)
                        </dd>
                      </div>
                      <div className="border-t border-outline-variant/70 pt-3">
                        <div className="flex justify-between gap-4 text-base font-bold">
                          <dt>Grand total</dt>
                          <dd>{formatPrice(activeOrder.total)}</dd>
                        </div>
                      </div>
                    </dl>
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface-container-lowest px-3 py-2.5 text-xs text-on-surface-variant">
                      <ShoppingBag className="h-4 w-4 shrink-0 text-primary" />
                      {activeOrder.payment}
                    </div>
                    <div className="mt-4 grid gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          showPreviewNotice("Live delivery tracking")
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-on-primary-container"
                      >
                        <Truck className="h-4 w-4" />
                        Track delivery live
                      </button>
                      <button
                        type="button"
                        onClick={() => showPreviewNotice("Invoice download")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm font-semibold transition-colors hover:bg-surface-container"
                      >
                        <Download className="h-4 w-4" />
                        View invoice
                      </button>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
          )}

          {showPastOrders && (
            <section
              aria-labelledby="past-orders-heading"
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2
                  id="past-orders-heading"
                  className="font-title-md text-title-md font-bold"
                >
                  Past delivered orders
                </h2>
                <span className="text-sm text-on-surface-variant">
                  {filteredDeliveredOrders.length}{" "}
                  {filteredDeliveredOrders.length === 1 ? "order" : "orders"}
                </span>
              </div>
              {filteredDeliveredOrders.map((order) => (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-3xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm"
                >
                  <div className="flex flex-col gap-3 border-b border-outline-variant/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="mt-1 text-sm text-on-surface-variant">
                        Delivered {order.date}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800">
                        <CheckCircle2 className="h-4 w-4" />
                        Delivered
                      </span>
                      <p className="text-sm font-bold">
                        Total: {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                    <div className="flex flex-wrap gap-4">
                      {order.books.map((book) => (
                        <div
                          key={book.title}
                          className="flex min-w-[220px] flex-1 items-center gap-3"
                        >
                          <Image
                            src={book.image}
                            alt={`Cover of ${book.title}`}
                            width={52}
                            height={72}
                            className="h-[4.5rem] w-[3.25rem] shrink-0 rounded-md object-cover shadow-sm"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold leading-5">
                              {book.title}
                            </p>
                            <p className="mt-1 text-xs text-on-surface-variant">
                              {book.author} · {book.edition}
                            </p>
                            <p className="mt-1 text-sm font-semibold">
                              {formatPrice(book.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 border-t border-outline-variant/50 pt-4 lg:flex-col lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                      <button
                        type="button"
                        onClick={() => showPreviewNotice(`Reorder ${order.id}`)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-on-primary-container"
                      >
                        <ArrowRight className="h-4 w-4" />
                        Buy again
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          showPreviewNotice(`Details for ${order.id}`)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-outline-variant px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-container-low"
                      >
                        View details
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          showPreviewNotice(`Receipt for ${order.id}`)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-fixed/50"
                      >
                        <Download className="h-4 w-4" />
                        Download receipt
                      </button>
                    </div>
                    <p className="text-xs text-on-surface-variant lg:col-span-2">
                      {order.payment}
                    </p>
                  </div>
                </article>
              ))}
            </section>
          )}

          {visibleOrderCount === 0 && (
            <section className="rounded-3xl border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-14 text-center">
              <PackageOpen className="mx-auto h-10 w-10 text-on-surface-variant" />
              <h2 className="mt-4 font-title-md text-title-md font-bold">
                No orders found
              </h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                Try another status, year, or search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All Orders");
                  setYear("All years");
                  setSearch("");
                }}
                className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-on-primary-container"
              >
                Clear filters
              </button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
