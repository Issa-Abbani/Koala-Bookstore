"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CircleDollarSign,
  Eye,
  Grid2X2,
  LogOut,
  PackageCheck,
  PackageSearch,
  Percent,
  ShoppingBag,
  Tags,
  Truck,
  WandSparkles,
  X,
} from "lucide-react";

type OrderStatus = "New" | "Packaging" | "Dispatching" | "Processing";

type DashboardOrder = {
  id: string;
  customer: string;
  itemCount: number;
  total: string;
  status: OrderStatus;
};

type Promotion = {
  id: string;
  discount: number;
  title: string;
  description: string;
};

const initialOrders: DashboardOrder[] = [
  {
    id: "KB-89241",
    customer: "Sarah Mitchell",
    itemCount: 2,
    total: "$31.94",
    status: "New",
  },
  {
    id: "KB-89242",
    customer: "Marcus Chen",
    itemCount: 1,
    total: "$18.99",
    status: "New",
  },
  {
    id: "KB-89240",
    customer: "Elena Rostova",
    itemCount: 3,
    total: "$45.20",
    status: "Packaging",
  },
];

const initialPromotions: Promotion[] = [
  {
    id: "literary-fiction",
    discount: 10,
    title: "Genre: Literary Fiction",
    description: "Expires in 3 days · 142 items eligible",
  },
  {
    id: "koalalove",
    discount: 15,
    title: "Coupon: KOALALOVE",
    description: "Storewide Patron Club · 89 redeemed",
  },
];

const sections = [
  "Sci-Fi & Fantasy",
  "Self-Help & Wellness",
  "Memoir & Biography",
  "Indie Press Showcase",
  "Children's Illustrated",
];

const statusStyles: Record<OrderStatus, string> = {
  New: "bg-tertiary-fixed text-on-tertiary-fixed",
  Packaging: "bg-secondary-container text-on-secondary-container",
  Dispatching: "bg-surface-container-highest text-on-surface-variant",
  Processing: "bg-primary-fixed text-on-primary-fixed",
};

function AdminNavigation({ mobile = false }: { mobile?: boolean }) {
  const itemClass = mobile
    ? "flex min-w-max items-center gap-2 rounded-lg px-3 py-2 text-label-sm text-on-surface-variant transition hover:bg-surface-container-high"
    : "flex items-center gap-2 rounded-lg px-3 py-2 text-label-md font-medium text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface";

  return (
    <nav
      aria-label="Admin navigation"
      className={
        mobile ? "flex gap-1 overflow-x-auto pb-1" : "flex flex-col gap-1"
      }
    >
      <Link
        aria-current="page"
        className={`${itemClass} bg-primary-container font-semibold text-on-primary-container shadow-sm`}
        href="/admin/dashboard"
      >
        <Grid2X2 aria-hidden="true" size={20} />
        Dashboard
      </Link>
      <span className={`${itemClass} cursor-default`}>
        <BookOpen aria-hidden="true" size={20} />
        Catalog &amp; Products
      </span>
      <div
        className={
          mobile
            ? "flex min-w-max items-center gap-1"
            : "flex flex-col gap-1 py-1 pl-7"
        }
      >
        <Link
          className={
            mobile
              ? "rounded-lg px-2 py-2 text-label-sm text-secondary transition hover:bg-surface-container-high"
              : "rounded-lg px-2 py-1.5 text-body-sm text-secondary transition hover:bg-surface-container-high hover:text-on-surface"
          }
          href="/admin/dashboard/SearchAndModify"
        >
          Search &amp; Modify
        </Link>
        <Link
          className={
            mobile
              ? "rounded-lg px-2 py-2 text-label-sm text-secondary transition hover:bg-surface-container-high"
              : "rounded-lg px-2 py-1.5 text-body-sm text-secondary transition hover:bg-surface-container-high hover:text-on-surface"
          }
          href="/admin/dashboard/AddNewProduct"
        >
          Add New Product
        </Link>
      </div>
      <Link
        className={`${itemClass} justify-between`}
        href="/admin/dashboard/Orders"
      >
        <span className="flex items-center gap-2">
          <Truck aria-hidden="true" size={20} />
          Orders
        </span>
        <span className="rounded-full bg-tertiary-fixed px-2 py-0.5 text-caption font-bold text-on-tertiary-fixed">
          3
        </span>
      </Link>
    </nav>
  );
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [promotions, setPromotions] = useState(initialPromotions);
  const [notice, setNotice] = useState("");

  function handleApprove(orderId: string) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Processing" } : order,
      ),
    );
    setNotice(
      `Order ${orderId} marked as processing in this preview. Changes are not saved.`,
    );
  }

  function handleCreateDiscount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const section = String(formData.get("section"));
    const discount = Number(formData.get("discount"));
    const days = Number(formData.get("duration"));

    setPromotions((currentPromotions) => [
      ...currentPromotions,
      {
        id: `${section}-${Date.now()}`,
        discount,
        title: `Genre: ${section}`,
        description: `Expires in ${days} days · preview only`,
      },
    ]);
    setNotice("Discount added to this preview only. Changes are not saved.");
    event.currentTarget.reset();
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-5 pb-10">
        <section
          aria-labelledby="dashboard-title"
          className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1
                id="dashboard-title"
                className="font-display text-headline-md font-bold tracking-tight"
              >
                Dashboard
              </h1>
              <p className="mt-1 text-body-sm text-secondary">
                Welcome back, Admin. Here is what is happening today.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-label-sm text-primary transition hover:bg-surface-container-low"
              href="/"
            >
              View storefront
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </section>

        <section
          aria-label="Store performance"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <article className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-label-sm uppercase tracking-wider text-secondary">
                Gross Revenue
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary-fixed px-2 py-1 text-caption font-semibold text-on-secondary-fixed">
                <ArrowUpRight aria-hidden="true" size={14} />
                +14.2%
              </span>
            </div>
            <div>
              <p className="font-display text-headline-lg font-bold tracking-tight">
                $12,480
                <span className="text-title-md text-secondary">.50</span>
              </p>
              <p className="mt-1 text-caption text-secondary">Past 7 days</p>
            </div>
          </article>

          <article className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-label-sm uppercase tracking-wider text-secondary">
                Orders Today
              </h2>
              <span className="rounded-full bg-tertiary-fixed px-2 py-1 text-caption font-bold text-on-tertiary-fixed">
                3 Awaiting
              </span>
            </div>
            <div>
              <p className="font-display text-headline-lg font-bold tracking-tight">
                48 <span className="text-title-md text-secondary">orders</span>
              </p>
              <p className="mt-1 text-caption text-secondary">
                45 processed today
              </p>
            </div>
          </article>

          <article className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-label-sm uppercase tracking-wider text-secondary">
                Catalog &amp; Stock
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-error/10 px-2 py-1 text-caption font-semibold text-error">
                <PackageSearch aria-hidden="true" size={14} />4 Low
              </span>
            </div>
            <div>
              <p className="font-display text-headline-lg font-bold tracking-tight">
                1,420{" "}
                <span className="text-title-md text-secondary">titles</span>
              </p>
              <p className="mt-1 text-caption text-secondary">
                98.2% shelf availability
              </p>
            </div>
          </article>
        </section>

        <section
          aria-labelledby="orders-heading"
          className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2
                id="orders-heading"
                className="flex items-center gap-2 font-display text-title-md font-semibold"
              >
                <PackageCheck
                  aria-hidden="true"
                  className="text-primary"
                  size={21}
                />
                Orders Awaiting Processing
              </h2>
              <p className="mt-1 text-body-sm text-secondary">
                Real-time orders queue requiring fulfillment dispatch
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-label-sm text-primary transition hover:bg-surface-container-low"
              href="/admin/dashboard/Orders"
            >
              View all
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {orders.map((order) => (
              <article
                className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
                key={order.id}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-lowest text-primary shadow-sm">
                    <ShoppingBag aria-hidden="true" size={19} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-label-md">{order.id}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-caption font-bold ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-body-sm text-on-surface-variant">
                      {order.customer} · {order.itemCount}{" "}
                      {order.itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="text-title-sm font-semibold">
                    {order.total}
                  </span>
                  <div className="flex items-center gap-2">
                    {order.status === "New" ? (
                      <button
                        className="inline-flex items-center gap-1 rounded-full bg-primary-container px-3 py-1.5 text-label-sm text-on-primary-container transition hover:bg-primary hover:text-on-primary"
                        onClick={() => handleApprove(order.id)}
                        type="button"
                      >
                        <Check aria-hidden="true" size={15} />
                        Approve
                      </button>
                    ) : (
                      <span className="rounded-full bg-surface-container-highest px-2.5 py-1 text-caption text-secondary">
                        {order.status === "Processing"
                          ? "Preview only"
                          : "Dispatching"}
                      </span>
                    )}
                    <button
                      aria-label={`View ${order.id} details`}
                      className="rounded-full p-2 text-secondary transition hover:bg-surface-container hover:text-on-surface"
                      onClick={() =>
                        setNotice(
                          `Order ${order.id} details are not connected in this preview.`,
                        )
                      }
                      type="button"
                    >
                      <Eye aria-hidden="true" size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-label="Store discounts"
          className="grid grid-cols-1 gap-4 xl:grid-cols-12"
        >
          <article className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6 xl:col-span-5">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 font-display text-title-md font-semibold">
                  <Tags aria-hidden="true" className="text-primary" size={20} />
                  Active Store Discounts
                </h2>
                <span className="rounded-full bg-secondary-fixed px-2 py-1 text-caption font-bold text-on-secondary-fixed">
                  {promotions.length} active
                </span>
              </div>
              <p className="mt-1 text-body-sm text-secondary">
                Promotions automatically applied at checkout registers
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {promotions.length > 0 ? (
                promotions.map((promotion) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-xl bg-surface-container-low p-3"
                    key={promotion.id}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tertiary-fixed text-label-sm font-bold text-on-tertiary-fixed">
                        {promotion.discount}%
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-label-sm">
                          {promotion.title}
                        </h3>
                        <p className="mt-0.5 text-caption text-secondary">
                          {promotion.description}
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label={`Remove ${promotion.title}`}
                      className="shrink-0 rounded-full bg-surface-container-highest px-2.5 py-1 text-caption font-semibold text-secondary transition hover:bg-error-container hover:text-error"
                      onClick={() => {
                        setPromotions((currentPromotions) =>
                          currentPromotions.filter(
                            (item) => item.id !== promotion.id,
                          ),
                        );
                        setNotice(
                          "Discount removed from this preview only. Changes are not saved.",
                        );
                      }}
                      type="button"
                    >
                      <span className="inline-flex items-center gap-1">
                        <X aria-hidden="true" size={13} />
                        Remove
                      </span>
                    </button>
                  </div>
                ))
              ) : (
                <p className="rounded-xl bg-surface-container-low p-4 text-body-sm text-secondary">
                  No active discounts in this preview.
                </p>
              )}
            </div>

            <p className="flex items-start gap-2 rounded-xl bg-tertiary-fixed/30 p-3 text-caption text-on-tertiary-fixed">
              <Percent
                aria-hidden="true"
                className="shrink-0 text-tertiary"
                size={17}
              />
              Genre promotions stack with member cards unless single-use
              restriction is toggled.
            </p>
          </article>

          <article className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6 xl:col-span-7">
            <div>
              <h2 className="flex items-center gap-2 font-display text-title-md font-semibold">
                <WandSparkles
                  aria-hidden="true"
                  className="text-primary"
                  size={20}
                />
                Create Category or Group Discount
              </h2>
              <p className="mt-1 text-body-sm text-secondary">
                Apply bulk promotional pricing without modifying base catalog
                records
              </p>
            </div>

            <form
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              onSubmit={handleCreateDiscount}
            >
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-label-sm"
                  htmlFor="dashboard-discount-section"
                >
                  Target Section
                </label>
                <select
                  className="h-11 rounded-xl bg-surface-container-low px-3 text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue={sections[0]}
                  id="dashboard-discount-section"
                  name="section"
                >
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-label-sm"
                  htmlFor="dashboard-discount-percent"
                >
                  Discount Percentage
                </label>
                <div className="relative">
                  <input
                    className="h-11 w-full rounded-xl bg-surface-container-low px-3 pr-9 text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue={15}
                    id="dashboard-discount-percent"
                    max={75}
                    min={5}
                    name="discount"
                    required
                    type="number"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-label-sm text-secondary">
                    %
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-label-sm"
                  htmlFor="dashboard-discount-duration"
                >
                  Duration (days)
                </label>
                <input
                  className="h-11 rounded-xl bg-surface-container-low px-3 text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue={7}
                  id="dashboard-discount-duration"
                  min={1}
                  name="duration"
                  required
                  type="number"
                />
              </div>

              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-label-md text-on-primary shadow-sm transition hover:bg-on-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:col-span-3 sm:justify-self-end"
                type="submit"
              >
                <CircleDollarSign aria-hidden="true" size={18} />
                Apply Group Discount
              </button>
            </form>
          </article>
        </section>

        <p
          aria-live="polite"
          className="min-h-5 text-center text-body-sm text-on-surface-variant"
          role="status"
        >
          {notice}
        </p>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-container-high pt-4 text-caption text-secondary">
          <span>Koala Haven · Operations Portal</span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-tertiary"
            />
            Preview data · changes are not saved
          </span>
        </footer>
      </div>
    </>
  );
}
