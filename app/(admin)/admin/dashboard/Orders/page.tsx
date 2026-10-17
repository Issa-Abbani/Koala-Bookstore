"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownWideNarrow,
  ArrowUp,
  BadgeCheck,
  BookOpen,
  Check,
  CheckCheck,
  ChevronDown,
  CircleAlert,
  Clock3,
  CloudDownload,
  Eye,
  Grid2X2,
  Printer,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";

type FulfillmentStage =
  | "New & Unseen"
  | "Approved & Packing"
  | "Out for Delivery"
  | "Delivered";

type DateGroup = "today" | "week" | "custom";
type StatusTab = "all" | "new" | "packing" | "delivery" | "delivered";
type SortOption = "newest" | "value" | "urgent" | "patron";

type Order = {
  id: string;
  patron: string;
  email: string;
  items: string[];
  total: number;
  payment: "Paid" | "Pending";
  stage: FulfillmentStage;
  placedAt: string;
  placedDate: string;
  dateGroup: DateGroup;
  courierReference: string;
  seen: boolean;
};

const initialOrders: Order[] = [
  {
    id: "KB-89241",
    patron: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    items: ["Tomorrow, and Tomorrow, and Tomorrow", "The Midnight Library"],
    total: 31.94,
    payment: "Paid",
    stage: "New & Unseen",
    placedAt: "Today · 10:42 AM",
    placedDate: "2026-10-17",
    dateGroup: "today",
    courierReference: "Awaiting dispatch",
    seen: false,
  },
  {
    id: "KB-89242",
    patron: "Marcus Chen",
    email: "marcus.chen@example.com",
    items: ["Babel: An Arcane History"],
    total: 18.99,
    payment: "Paid",
    stage: "New & Unseen",
    placedAt: "Today · 10:18 AM",
    placedDate: "2026-10-17",
    dateGroup: "today",
    courierReference: "Awaiting dispatch",
    seen: false,
  },
  {
    id: "KB-89240",
    patron: "Elena Rostova",
    email: "elena.rostova@example.com",
    items: ["Demon Copperhead", "Piranesi", "Sea of Tranquility"],
    total: 45.2,
    payment: "Paid",
    stage: "Approved & Packing",
    placedAt: "Today · 9:36 AM",
    placedDate: "2026-10-17",
    dateGroup: "today",
    courierReference: "Label pending",
    seen: true,
  },
  {
    id: "KB-89238",
    patron: "Jordan Taylor",
    email: "jordan.taylor@example.com",
    items: ["Atomic Habits", "Braiding Sweetgrass"],
    total: 35.99,
    payment: "Paid",
    stage: "Approved & Packing",
    placedAt: "Today · 8:54 AM",
    placedDate: "2026-10-17",
    dateGroup: "today",
    courierReference: "Label pending",
    seen: true,
  },
  {
    id: "KB-89231",
    patron: "Amira Hassan",
    email: "amira.hassan@example.com",
    items: ["The Song of Achilles"],
    total: 16,
    payment: "Paid",
    stage: "Out for Delivery",
    placedAt: "Today · 8:05 AM",
    placedDate: "2026-10-17",
    dateGroup: "today",
    courierReference: "KBL-7042-188",
    seen: true,
  },
  {
    id: "KB-89198",
    patron: "Noah Williams",
    email: "noah.williams@example.com",
    items: ["Tomorrow, and Tomorrow, and Tomorrow"],
    total: 18.99,
    payment: "Paid",
    stage: "Delivered",
    placedAt: "Yesterday · 4:12 PM",
    placedDate: "2026-10-16",
    dateGroup: "week",
    courierReference: "KBL-7042-117",
    seen: true,
  },
];

const statusTabs: { id: StatusTab; label: string }[] = [
  { id: "all", label: "All Active" },
  { id: "new", label: "New & Unseen" },
  { id: "packing", label: "Approved & Packing" },
  { id: "delivery", label: "Out for Delivery" },
  { id: "delivered", label: "Delivered Today" },
];

const stageStyles: Record<FulfillmentStage, string> = {
  "New & Unseen": "bg-tertiary-fixed text-on-tertiary-fixed",
  "Approved & Packing": "bg-secondary-container text-on-secondary-container",
  "Out for Delivery": "bg-primary-fixed text-on-primary-fixed",
  Delivered: "bg-secondary-fixed text-on-secondary-fixed",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function OrdersNavigation({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "flex min-w-max items-center gap-2 rounded-lg px-3 py-2 text-label-sm text-on-surface-variant transition hover:bg-surface-container-high"
    : "flex items-center gap-2 rounded-lg px-3 py-2 text-label-md font-medium text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface";

  return (
    <nav
      aria-label="Admin navigation"
      className={
        mobile ? "flex gap-1 overflow-x-auto pb-1" : "flex flex-col gap-1"
      }
    >
      <Link className={linkClass} href="/admin/dashboard">
        <Grid2X2 aria-hidden="true" size={20} />
        Dashboard
      </Link>
      <span className={`${linkClass} cursor-default`}>
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
        aria-current="page"
        className={`${linkClass} bg-primary-container font-semibold text-on-primary-container shadow-sm`}
        href="/admin/dashboard/Orders"
      >
        <Truck aria-hidden="true" size={20} />
        Orders
        <span className="ml-auto rounded-full bg-tertiary-fixed px-2 py-0.5 text-caption font-bold text-on-tertiary-fixed">
          3
        </span>
      </Link>
    </nav>
  );
}

function matchesTab(order: Order, tab: StatusTab) {
  switch (tab) {
    case "all":
      return order.stage !== "Delivered";
    case "new":
      return order.stage === "New & Unseen";
    case "packing":
      return order.stage === "Approved & Packing";
    case "delivery":
      return order.stage === "Out for Delivery";
    case "delivered":
      return order.stage === "Delivered";
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [dateGroup, setDateGroup] = useState<DateGroup>("today");
  const [selectedDate, setSelectedDate] = useState("");
  const [statusTab, setStatusTab] = useState<StatusTab>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const filteredOrders = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = orders.filter((order) => {
      const matchesSearch =
        search.length === 0 ||
        `${order.id} ${order.patron} ${order.email} ${order.courierReference} ${order.items.join(" ")}`
          .toLowerCase()
          .includes(search);
      const matchesDate =
        dateGroup === "week" ||
        (dateGroup === "today" && order.dateGroup === "today") ||
        (dateGroup === "custom" &&
          selectedDate !== "" &&
          order.placedDate === selectedDate);

      return matchesSearch && matchesDate && matchesTab(order, statusTab);
    });

    return filtered.sort((first, second) => {
      switch (sort) {
        case "value":
          return second.total - first.total;
        case "urgent":
          return Number(first.seen) - Number(second.seen);
        case "patron":
          return first.patron.localeCompare(second.patron);
        case "newest":
          return orders.indexOf(first) - orders.indexOf(second);
      }
    });
  }, [dateGroup, orders, query, selectedDate, sort, statusTab]);

  const currentIds = filteredOrders.map((order) => order.id);
  const allVisibleSelected =
    currentIds.length > 0 &&
    currentIds.every((orderId) => selectedIds.includes(orderId));
  const newCount = orders.filter(
    (order) => order.stage === "New & Unseen",
  ).length;
  const packingCount = orders.filter(
    (order) => order.stage === "Approved & Packing",
  ).length;
  const deliveryCount = orders.filter(
    (order) => order.stage === "Out for Delivery",
  ).length;
  const activeCount = orders.filter(
    (order) => order.stage !== "Delivered",
  ).length;
  const deliveredCount = orders.filter(
    (order) => order.stage === "Delivered" && order.dateGroup === "today",
  ).length;

  function toggleSelected(orderId: string) {
    setSelectedIds((current) =>
      current.includes(orderId)
        ? current.filter((id) => id !== orderId)
        : [...current, orderId],
    );
  }

  function toggleAllVisible() {
    setSelectedIds((current) =>
      allVisibleSelected
        ? current.filter((id) => !currentIds.includes(id))
        : [...new Set([...current, ...currentIds])],
    );
  }

  function updateOrders(
    ids: string[],
    update: (order: Order) => Order,
    confirmation: string,
  ) {
    setOrders((current) =>
      current.map((order) => (ids.includes(order.id) ? update(order) : order)),
    );
    setSelectedIds([]);
    setNotice(`${confirmation} Preview only; changes are not saved.`);
  }

  function markSeen(ids: string[]) {
    updateOrders(
      ids,
      (order) => ({ ...order, seen: true }),
      "Orders marked as seen.",
    );
  }

  function approveOrders(ids: string[]) {
    updateOrders(
      ids,
      (order) => ({
        ...order,
        seen: true,
        stage:
          order.stage === "New & Unseen" ? "Approved & Packing" : order.stage,
      }),
      "Selected orders approved.",
    );
  }

  function updateStage(orderId: string, stage: FulfillmentStage) {
    updateOrders(
      [orderId],
      (order) => ({
        ...order,
        stage,
        seen: true,
      }),
      `Order ${orderId} moved to ${stage}.`,
    );
  }

  function exportOrders() {
    const rows = [
      [
        "Order ID",
        "Placed",
        "Patron",
        "Email",
        "Items",
        "Total",
        "Payment",
        "Fulfillment",
        "Courier reference",
      ],
      ...filteredOrders.map((order) => [
        order.id,
        order.placedAt,
        order.patron,
        order.email,
        order.items.join("; "),
        order.total.toFixed(2),
        order.payment,
        order.stage,
        order.courierReference,
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "koala-bookstore-orders-preview.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Preview orders exported as CSV.");
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-5 pb-10">
        <section className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6 md:flex-row md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-headline-md font-bold tracking-tight sm:text-headline-lg">
                Order Fulfillment &amp; Management
              </h1>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-3 py-1 text-caption font-semibold text-on-secondary-fixed">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 animate-pulse rounded-full bg-primary"
                />
                Preview queue
              </span>
            </div>
            <p className="mt-2 max-w-3xl text-body-sm leading-relaxed text-secondary">
              Monitor incoming patron orders, update fulfillment stages, prepare
              packaging slips, and dispatch book parcels.
            </p>
          </div>
          <button
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-label-sm text-on-primary shadow-sm transition hover:bg-on-primary-container"
            onClick={exportOrders}
            type="button"
          >
            <CloudDownload aria-hidden="true" size={17} />
            Export CSV
          </button>
        </section>

        <section
          aria-label="Order fulfillment metrics"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <article className="rounded-xl bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-label-sm text-secondary">Active Queue</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-fixed text-on-primary-fixed">
                <ShoppingBag aria-hidden="true" size={19} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-headline-lg font-bold">
                {activeCount}
              </span>
              <span className="inline-flex items-center gap-1 text-caption font-semibold text-primary">
                <ArrowUp aria-hidden="true" size={13} />
                +12% today
              </span>
            </div>
            <p className="mt-1 text-caption text-secondary">
              Pending physical processing
            </p>
          </article>

          <article className="rounded-xl bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-label-sm text-secondary">
                Awaiting Review
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
                <CircleAlert aria-hidden="true" size={19} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-headline-lg font-bold">
                {newCount}
              </span>
              <span className="rounded-full bg-tertiary-fixed px-2 py-1 text-caption font-bold text-on-tertiary-fixed">
                ACTION REQ
              </span>
            </div>
            <p className="mt-1 text-caption text-secondary">
              New incoming patron submissions
            </p>
          </article>

          <article className="rounded-xl bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-label-sm text-secondary">
                Ready for Dispatch
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-fixed text-on-secondary-fixed">
                <Truck aria-hidden="true" size={19} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-headline-lg font-bold">
                {packingCount}
              </span>
              <span className="text-caption text-secondary">
                Packed &amp; labeled
              </span>
            </div>
            <p className="mt-1 text-caption text-secondary">
              Courier collection at 3:30 PM
            </p>
          </article>

          <article className="rounded-xl bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-label-sm text-secondary">
                Out &amp; Delivered
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-fixed text-on-primary-fixed">
                <BadgeCheck aria-hidden="true" size={19} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-headline-lg font-bold">
                {deliveryCount + deliveredCount}
              </span>
              <span className="text-caption text-secondary">
                Today&apos;s run
              </span>
            </div>
            <p className="mt-1 text-caption text-secondary">
              98.4% on-time postal dispatch
            </p>
          </article>
        </section>

        <section
          aria-label="Search and filter orders"
          className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <label className="relative block min-w-0 flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                size={19}
              />
              <input
                className="h-11 w-full rounded-xl bg-surface-container-low pl-11 pr-20 text-body-sm placeholder:text-outline focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by order code, patron, email, or courier reference..."
                type="search"
                value={query}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-outline-variant bg-surface-container-lowest px-2 py-1 text-caption text-secondary sm:block">
                Ctrl K
              </span>
            </label>
            <div className="flex flex-wrap items-center justify-between gap-3 xl:justify-end">
              <div
                aria-label="Date range"
                className="inline-flex rounded-lg bg-surface-container-low p-1"
                role="group"
              >
                {(["today", "week", "custom"] as const).map((range) => (
                  <button
                    aria-pressed={dateGroup === range}
                    className={`rounded-md px-3 py-1.5 text-label-sm transition ${
                      dateGroup === range
                        ? "bg-surface-container-lowest text-primary shadow-sm"
                        : "text-secondary hover:text-on-surface"
                    }`}
                    key={range}
                    onClick={() => setDateGroup(range)}
                    type="button"
                  >
                    {range === "today"
                      ? "Today"
                      : range === "week"
                        ? "Week"
                        : "Custom"}
                  </button>
                ))}
              </div>
              {dateGroup === "custom" && (
                <label className="sr-only" htmlFor="custom-order-date">
                  Custom order date
                </label>
              )}
              {dateGroup === "custom" && (
                <input
                  className="h-10 rounded-lg bg-surface-container-low px-3 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  id="custom-order-date"
                  onChange={(event) => setSelectedDate(event.target.value)}
                  type="date"
                  value={selectedDate}
                />
              )}
              <label className="relative">
                <span className="sr-only">Sort orders</span>
                <select
                  className="h-10 appearance-none rounded-lg bg-surface-container-low py-2 pl-3 pr-9 text-label-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  onChange={(event) =>
                    setSort(event.target.value as SortOption)
                  }
                  value={sort}
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="value">Sort: Highest Value</option>
                  <option value="urgent">Sort: Urgent / Unseen First</option>
                  <option value="patron">Sort: Patron Name (A–Z)</option>
                </select>
                <ArrowDownWideNarrow
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                  size={15}
                />
              </label>
            </div>
          </div>

          <div
            aria-label="Filter by fulfillment stage"
            className="flex gap-2 overflow-x-auto border-t border-surface-container-high pt-3"
            role="tablist"
          >
            {statusTabs.map((tab) => {
              const count =
                tab.id === "all"
                  ? activeCount
                  : tab.id === "new"
                    ? newCount
                    : tab.id === "packing"
                      ? packingCount
                      : tab.id === "delivery"
                        ? deliveryCount
                        : deliveredCount;

              return (
                <button
                  aria-selected={statusTab === tab.id}
                  className={`inline-flex min-w-max items-center gap-2 rounded-lg px-3 py-2 text-label-sm transition ${
                    statusTab === tab.id
                      ? "bg-primary-container text-on-primary-container shadow-sm"
                      : "text-secondary hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                  key={tab.id}
                  onClick={() => setStatusTab(tab.id)}
                  role="tab"
                  type="button"
                >
                  {tab.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-caption ${
                      statusTab === tab.id
                        ? "bg-surface-container-lowest/70"
                        : "bg-surface-container-high"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {selectedIds.length > 0 && (
          <section
            aria-label="Bulk order actions"
            className="flex flex-col justify-between gap-3 rounded-xl bg-primary-fixed px-4 py-3 text-on-primary-fixed sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest font-display font-bold text-primary">
                {selectedIds.length}
              </span>
              <span>
                <span className="block text-label-sm">Orders selected</span>
                <span className="block text-caption text-on-primary-fixed/80">
                  Apply preview fulfillment actions
                </span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container-lowest px-3 py-2 text-label-sm text-on-surface transition hover:bg-surface-container-low"
                onClick={() => markSeen(selectedIds)}
                type="button"
              >
                <Eye aria-hidden="true" size={16} />
                Mark Seen
              </button>
              <button
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-container px-3 py-2 text-label-sm text-on-primary-container transition hover:bg-primary hover:text-on-primary"
                onClick={() => approveOrders(selectedIds)}
                type="button"
              >
                <CheckCheck aria-hidden="true" size={16} />
                Approve Selected
              </button>
              <button
                className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container-lowest px-3 py-2 text-label-sm text-on-surface transition hover:bg-surface-container-low"
                onClick={() => window.print()}
                type="button"
              >
                <Printer aria-hidden="true" size={16} />
                Print Slips
              </button>
              <button
                className="rounded-lg px-3 py-2 text-label-sm text-secondary transition hover:bg-surface-container-lowest"
                onClick={() => setSelectedIds([])}
                type="button"
              >
                Deselect
              </button>
            </div>
          </section>
        )}

        <section
          aria-label="Orders"
          className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container-high px-4 py-4 sm:px-5">
            <div>
              <h2 className="font-display text-title-md font-semibold">
                Fulfillment Queue
              </h2>
              <p className="mt-0.5 text-body-sm text-secondary">
                {filteredOrders.length} preview order
                {filteredOrders.length === 1 ? "" : "s"} match this view
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed/60 px-3 py-1.5 text-caption font-medium text-on-tertiary-fixed">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-tertiary"
              />
              Demo data · not connected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] border-collapse text-left">
              <thead className="bg-surface-container-low text-label-sm text-secondary">
                <tr>
                  <th className="px-4 py-3 text-center">
                    <input
                      aria-label="Select all visible orders"
                      checked={allVisibleSelected}
                      className="h-4 w-4 accent-primary"
                      onChange={toggleAllVisible}
                      type="checkbox"
                    />
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    Order ID &amp; Time
                  </th>
                  <th className="px-4 py-3 font-semibold">Patron Details</th>
                  <th className="px-4 py-3 font-semibold">Book Items</th>
                  <th className="px-4 py-3 font-semibold">
                    Total &amp; Payment
                  </th>
                  <th className="px-4 py-3 font-semibold">Fulfillment Stage</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high text-body-sm">
                {filteredOrders.map((order) => (
                  <tr
                    className="transition-colors hover:bg-surface-container-low/60"
                    key={order.id}
                  >
                    <td className="px-4 py-4 text-center align-middle">
                      <input
                        aria-label={`Select order ${order.id}`}
                        checked={selectedIds.includes(order.id)}
                        className="h-4 w-4 accent-primary"
                        onChange={() => toggleSelected(order.id)}
                        type="checkbox"
                      />
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                            order.seen ? "bg-outline-variant" : "bg-primary"
                          }`}
                        />
                        <div>
                          <p className="font-label-md font-semibold text-on-surface">
                            {order.id}
                          </p>
                          <p className="mt-1 inline-flex items-center gap-1 text-caption text-secondary">
                            <Clock3 aria-hidden="true" size={13} />
                            {order.placedAt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <p className="font-label-sm text-on-surface">
                        {order.patron}
                      </p>
                      <p className="mt-1 text-caption text-secondary">
                        {order.email}
                      </p>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <p className="max-w-56 text-body-sm text-on-surface">
                        {order.items[0]}
                      </p>
                      {order.items.length > 1 && (
                        <p className="mt-1 text-caption text-secondary">
                          +{order.items.length - 1} more title
                          {order.items.length === 2 ? "" : "s"}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <p className="font-label-sm font-semibold">
                        {formatPrice(order.total)}
                      </p>
                      <span
                        className={`mt-1 inline-flex items-center gap-1 text-caption ${
                          order.payment === "Paid"
                            ? "text-primary"
                            : "text-tertiary"
                        }`}
                      >
                        <Check aria-hidden="true" size={13} />
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <label className="relative inline-block">
                        <span className="sr-only">
                          Fulfillment stage for {order.id}
                        </span>
                        <select
                          className={`max-w-48 appearance-none rounded-full py-1.5 pl-3 pr-8 text-caption font-semibold focus:outline-none focus:ring-2 focus:ring-primary-container ${stageStyles[order.stage]}`}
                          onChange={(event) =>
                            updateStage(
                              order.id,
                              event.target.value as FulfillmentStage,
                            )
                          }
                          value={order.stage}
                        >
                          <option value="New & Unseen">New &amp; Unseen</option>
                          <option value="Approved & Packing">
                            Approved &amp; Packing
                          </option>
                          <option value="Out for Delivery">
                            Out for Delivery
                          </option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <ChevronDown
                          aria-hidden="true"
                          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                          size={13}
                        />
                      </label>
                      <p className="mt-1.5 max-w-48 truncate text-caption text-secondary">
                        {order.courierReference}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-right align-middle">
                      <Link
                        aria-label={`View order ${order.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-label-sm text-primary transition hover:bg-primary-fixed/50"
                        href={`/admin/dashboard/Orders/OrderDetails/${order.id}`}
                      >
                        <Eye aria-hidden="true" size={16} />
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td className="px-4 py-14 text-center" colSpan={7}>
                      <ShoppingBag
                        aria-hidden="true"
                        className="mx-auto mb-3 text-outline"
                        size={30}
                      />
                      <p className="font-display text-title-sm font-semibold">
                        No orders match this view
                      </p>
                      <p className="mt-1 text-body-sm text-secondary">
                        Change the search, date range, or fulfillment tab.
                      </p>
                      <button
                        className="mt-3 rounded-lg px-3 py-2 text-label-sm text-primary transition hover:bg-surface-container-low"
                        onClick={() => {
                          setQuery("");
                          setDateGroup("week");
                          setStatusTab("all");
                        }}
                        type="button"
                      >
                        Show all orders this week
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-container-high px-4 py-3 text-caption text-secondary sm:px-5">
            <span>
              Showing {filteredOrders.length} preview order
              {filteredOrders.length === 1 ? "" : "s"}
            </span>
            <span>Order updates are local preview only.</span>
          </div>
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
