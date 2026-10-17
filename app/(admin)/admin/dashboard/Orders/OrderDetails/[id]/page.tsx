"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  Grid2X2,
  Mail,
  MapPin,
  PackageCheck,
  PackageOpen,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Tags,
  Truck,
  UserRound,
  X,
} from "lucide-react";

type OrderStatus =
  | "Awaiting Fulfillment"
  | "Approved & Packing"
  | "Out for Delivery"
  | "Delivered";

type PurchasedItem = {
  title: string;
  author: string;
  detail: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  complimentary?: boolean;
};

type OrderDetails = {
  id: string;
  patron: string;
  email: string;
  phone: string;
  address: string[];
  memberSince: string;
  lifetimeOrders: number;
  memberTier: string;
  placedAt: string;
  status: OrderStatus;
  items: PurchasedItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentReference: string;
  deliveryNote: string;
};

const orderExamples: Record<string, OrderDetails> = {
  "KB-89241": {
    id: "KB-89241",
    patron: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 234-8901",
    address: [
      "742 Evergreen Terrace",
      "Apt 4B",
      "Seattle, WA 98101",
      "United States",
    ],
    memberSince: "September 2022",
    lifetimeOrders: 19,
    memberTier: "Koala Gold Reader",
    placedAt: "Oct 24, 2024 at 2:45 PM",
    status: "Awaiting Fulfillment",
    items: [
      {
        title: "Tomorrow, and Tomorrow, and Tomorrow",
        author: "Gabrielle Zevin",
        detail: "Hardcover Edition · ISBN: 978-0-593-32120-1",
        quantity: 1,
        price: 28.5,
      },
      {
        title: "Sea of Tranquility",
        author: "Emily St. John Mandel",
        detail: "Paperback · ISBN: 978-0-593-46685-8",
        quantity: 1,
        price: 15.29,
        originalPrice: 16.99,
      },
      {
        title: "Wildflower Botanical Linen Bookmark",
        author: "Koala Haven Book Club Exclusive Gift",
        detail: "SKU: MERCH-BM-FLR",
        quantity: 1,
        price: 0,
        complimentary: true,
      },
    ],
    subtotal: 43.79,
    discount: 1.7,
    shipping: 4.99,
    tax: 3.99,
    total: 51.07,
    paymentMethod: "Visa ···· 4242",
    paymentReference: "txn_9831a029",
    deliveryNote: "Please leave package behind front porch planter box.",
  },
  "KB-89242": {
    id: "KB-89242",
    patron: "Marcus Chen",
    email: "marcus.chen@example.com",
    phone: "+1 (555) 410-2278",
    address: ["125 Pine Street", "Seattle, WA 98101", "United States"],
    memberSince: "January 2024",
    lifetimeOrders: 4,
    memberTier: "Koala Reader",
    placedAt: "Oct 24, 2024 at 2:18 PM",
    status: "Awaiting Fulfillment",
    items: [
      {
        title: "Babel: An Arcane History",
        author: "R. F. Kuang",
        detail: "Hardcover Edition · ISBN: 978-0-06-302142-6",
        quantity: 1,
        price: 18.99,
      },
    ],
    subtotal: 18.99,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 18.99,
    paymentMethod: "Visa ···· 1088",
    paymentReference: "txn_9831a030",
    deliveryNote: "No delivery instructions provided.",
  },
  "KB-89240": {
    id: "KB-89240",
    patron: "Elena Rostova",
    email: "elena.rostova@example.com",
    phone: "+1 (555) 882-6701",
    address: ["18 Cedar Lane", "Portland, OR 97205", "United States"],
    memberSince: "June 2023",
    lifetimeOrders: 8,
    memberTier: "Koala Reader",
    placedAt: "Oct 24, 2024 at 1:36 PM",
    status: "Approved & Packing",
    items: [
      {
        title: "Demon Copperhead",
        author: "Barbara Kingsolver",
        detail: "Paperback · ISBN: 978-0-06-325192-2",
        quantity: 1,
        price: 19.99,
      },
      {
        title: "Piranesi",
        author: "Susanna Clarke",
        detail: "Paperback · ISBN: 978-1-63-557563-7",
        quantity: 1,
        price: 14.25,
      },
      {
        title: "Sea of Tranquility",
        author: "Emily St. John Mandel",
        detail: "Paperback · ISBN: 978-0-593-46685-8",
        quantity: 1,
        price: 10.96,
      },
    ],
    subtotal: 45.2,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 45.2,
    paymentMethod: "Mastercard ···· 5520",
    paymentReference: "txn_9831a028",
    deliveryNote: "No delivery instructions provided.",
  },
  "KB-89238": {
    id: "KB-89238",
    patron: "Jordan Taylor",
    email: "jordan.taylor@example.com",
    phone: "+1 (555) 771-0912",
    address: ["86 Lakeview Avenue", "Seattle, WA 98109", "United States"],
    memberSince: "March 2025",
    lifetimeOrders: 3,
    memberTier: "Koala Reader",
    placedAt: "Oct 24, 2024 at 12:54 PM",
    status: "Approved & Packing",
    items: [
      {
        title: "Atomic Habits",
        author: "James Clear",
        detail: "Hardcover · ISBN: 978-0-7352-1129-2",
        quantity: 1,
        price: 17.99,
      },
      {
        title: "Braiding Sweetgrass",
        author: "Robin Wall Kimmerer",
        detail: "Paperback · ISBN: 978-1-57131-356-0",
        quantity: 1,
        price: 18,
      },
    ],
    subtotal: 35.99,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 35.99,
    paymentMethod: "Visa ···· 6603",
    paymentReference: "txn_9831a026",
    deliveryNote: "No delivery instructions provided.",
  },
  "KB-89231": {
    id: "KB-89231",
    patron: "Amira Hassan",
    email: "amira.hassan@example.com",
    phone: "+1 (555) 645-3380",
    address: ["213 Birch Road", "Bellevue, WA 98004", "United States"],
    memberSince: "August 2021",
    lifetimeOrders: 26,
    memberTier: "Koala Gold Reader",
    placedAt: "Oct 24, 2024 at 12:05 PM",
    status: "Out for Delivery",
    items: [
      {
        title: "The Song of Achilles",
        author: "Madeline Miller",
        detail: "Paperback · ISBN: 978-0-06-206062-4",
        quantity: 1,
        price: 16,
      },
    ],
    subtotal: 16,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 16,
    paymentMethod: "Visa ···· 4020",
    paymentReference: "txn_9831a019",
    deliveryNote: "No delivery instructions provided.",
  },
  "KB-89198": {
    id: "KB-89198",
    patron: "Noah Williams",
    email: "noah.williams@example.com",
    phone: "+1 (555) 123-5098",
    address: ["49 Alder Street", "Seattle, WA 98104", "United States"],
    memberSince: "December 2023",
    lifetimeOrders: 6,
    memberTier: "Koala Reader",
    placedAt: "Oct 23, 2024 at 4:12 PM",
    status: "Delivered",
    items: [
      {
        title: "Tomorrow, and Tomorrow, and Tomorrow",
        author: "Gabrielle Zevin",
        detail: "Hardcover · ISBN: 978-0-593-32120-1",
        quantity: 1,
        price: 18.99,
      },
    ],
    subtotal: 18.99,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 18.99,
    paymentMethod: "Visa ···· 0219",
    paymentReference: "txn_9831a018",
    deliveryNote: "No delivery instructions provided.",
  },
};

const statusClass: Record<OrderStatus, string> = {
  "Awaiting Fulfillment": "bg-tertiary-fixed text-on-tertiary-fixed",
  "Approved & Packing": "bg-secondary-container text-on-secondary-container",
  "Out for Delivery": "bg-primary-fixed text-on-primary-fixed",
  Delivered: "bg-secondary-fixed text-on-secondary-fixed",
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function OrderDetail({ order }: { order: OrderDetails }) {
  const [seen, setSeen] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [refundOpen, setRefundOpen] = useState(false);
  const [refundType, setRefundType] = useState<"full" | "item">("full");
  const [refundReason, setRefundReason] = useState(
    "Customer Request - Accidental duplicate",
  );
  const [notice, setNotice] = useState("");

  function confirmRefund() {
    setRefundOpen(false);
    setNotice(
      `${refundType === "full" ? "Full" : "Item"} refund prepared in preview for ${order.id}. No payment was issued.`,
    );
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-5 pb-10">
        <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary">
              <PackageOpen aria-hidden="true" size={24} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-headline-md font-bold tracking-tight sm:text-headline-lg">
                  Order #{order.id}
                </h1>
                <span
                  className={`rounded-full px-3 py-1 text-caption font-semibold ${statusClass[status]}`}
                >
                  {status}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary-fixed px-3 py-1 text-caption font-semibold text-on-secondary-fixed">
                  <BadgeCheck aria-hidden="true" size={14} />
                  Approved
                </span>
              </div>
              <p className="mt-2 text-body-sm text-secondary">
                Placed on{" "}
                <span className="font-medium text-on-surface">
                  {order.placedAt}
                </span>{" "}
                · Origin: Online Web Storefront
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-label-sm transition ${
                seen
                  ? "bg-surface-container-high text-on-surface"
                  : "bg-surface-container-low text-secondary hover:bg-surface-container"
              }`}
              onClick={() => {
                setSeen((current) => !current);
                setNotice(
                  seen
                    ? "Order review state reset in preview."
                    : "Order marked as reviewed in preview. Changes are not saved.",
                );
              }}
              type="button"
            >
              <Eye aria-hidden="true" size={16} />
              {seen ? "Seen" : "Mark Seen"}
            </button>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary-container px-3 text-label-sm text-on-primary-container transition hover:bg-primary hover:text-on-primary"
              onClick={() => {
                setStatus("Approved & Packing");
                setNotice(
                  "Order approval updated in preview only. Changes are not saved.",
                );
              }}
              type="button"
            >
              <CheckCircle2 aria-hidden="true" size={16} />
              Approve Order
            </button>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-secondary-fixed px-3 text-label-sm text-on-secondary-fixed transition hover:bg-secondary-container"
              onClick={() => {
                setStatus("Delivered");
                setNotice(
                  "Delivery status updated in preview only. Changes are not saved.",
                );
              }}
              type="button"
            >
              <PackageCheck aria-hidden="true" size={16} />
              Mark Delivered
            </button>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-surface-container-low px-3 text-label-sm text-secondary transition hover:bg-tertiary-fixed hover:text-on-tertiary-fixed"
              onClick={() => setRefundOpen(true)}
              type="button"
            >
              <RefreshCw aria-hidden="true" size={16} />
              Issue Refund
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-12">
          <div className="flex flex-col gap-5 xl:col-span-7">
            <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                    <UserRound aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <h2 className="font-display text-title-md font-semibold">
                      Patron Information
                    </h2>
                    <p className="mt-0.5 text-body-sm text-secondary">
                      Verified Book Club Member Profile
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed px-3 py-1.5 text-caption font-semibold text-on-tertiary-fixed">
                  <Star aria-hidden="true" size={14} />
                  {order.memberTier}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t border-surface-container-high pt-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <p className="text-caption font-semibold uppercase tracking-wider text-secondary">
                      Customer Details
                    </p>
                    <p className="mt-1 text-label-md font-semibold">
                      {order.patron}
                    </p>
                  </div>
                  <a
                    className="flex items-center gap-2 break-all text-body-sm text-primary hover:underline"
                    href={`mailto:${order.email}`}
                  >
                    <Mail aria-hidden="true" className="shrink-0" size={15} />
                    {order.email}
                  </a>
                  <p className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                    <span aria-hidden="true" className="shrink-0">
                      ☎
                    </span>
                    {order.phone}
                  </p>
                  <p className="text-caption text-secondary">
                    Patron since {order.memberSince} · {order.lifetimeOrders}{" "}
                    lifetime orders
                  </p>
                </div>

                <div className="rounded-xl bg-surface-container-low p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-caption font-semibold uppercase tracking-wider text-secondary">
                      Shipping Address
                    </p>
                    <span className="inline-flex items-center gap-1 text-caption font-semibold text-primary">
                      <ShieldCheck aria-hidden="true" size={14} />
                      Validated
                    </span>
                  </div>
                  <address className="mt-2 not-italic text-body-sm leading-relaxed">
                    {order.address.map((line) => (
                      <span className="block" key={line}>
                        {line}
                      </span>
                    ))}
                  </address>
                  <div className="mt-3 flex items-start gap-2 border-t border-surface-container-high pt-3 text-caption text-secondary">
                    <ReceiptText
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      size={15}
                    />
                    <span>
                      Billing Address:{" "}
                      <strong className="font-semibold text-on-surface">
                        Same as shipping
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-fixed text-on-secondary-fixed">
                    <BookOpen aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <h2 className="font-display text-title-md font-semibold">
                      Purchased Items
                    </h2>
                    <p className="mt-0.5 text-body-sm text-secondary">
                      {order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}{" "}
                      items from Catalog inventory
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-surface-container-low px-3 py-1.5 text-caption text-secondary">
                  Parcel weight: ~2.1 lbs
                </span>
              </div>

              <div className="flex flex-col divide-y divide-surface-container-high border-t border-surface-container-high">
                {order.items.map((item) => (
                  <article
                    className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
                    key={item.title}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        aria-hidden="true"
                        className={`flex h-20 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-sm ${
                          item.complimentary
                            ? "bg-tertiary-fixed text-tertiary"
                            : "bg-gradient-to-br from-primary-fixed via-surface-container to-tertiary-fixed text-primary"
                        }`}
                      >
                        {item.complimentary ? (
                          <Tags size={21} />
                        ) : (
                          <BookOpen size={22} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="mb-1 flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-surface-container-low px-2 py-0.5 text-caption text-secondary">
                            {item.complimentary
                              ? "Complimentary Perk"
                              : item.detail.split(" · ")[0]}
                          </span>
                          {item.originalPrice !== undefined && (
                            <span className="rounded-full bg-tertiary-fixed px-2 py-0.5 text-caption font-semibold text-on-tertiary-fixed">
                              10% Off Applied
                            </span>
                          )}
                        </div>
                        <h3 className="line-clamp-2 font-display text-title-sm font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-body-sm text-secondary">
                          {item.author}
                        </p>
                        <p className="mt-0.5 break-words text-caption text-outline">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 pl-[68px] sm:justify-end sm:pl-0">
                      <span className="rounded-full bg-surface-container-low px-2.5 py-1 text-caption text-secondary">
                        Qty: {item.quantity}
                      </span>
                      <span className="min-w-20 text-right text-label-sm font-semibold">
                        {item.complimentary
                          ? "FREE ($0.00)"
                          : formatPrice(item.price)}
                        {item.originalPrice !== undefined && (
                          <span className="block text-caption font-normal text-outline line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-5 xl:col-span-5">
            <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                    <CreditCard aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <h2 className="font-display text-title-md font-semibold">
                      Financial Summary
                    </h2>
                    <p className="mt-0.5 text-body-sm text-secondary">
                      Payment and processing details
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1.5 text-caption text-secondary">
                  <CreditCard aria-hidden="true" size={14} />
                  {order.paymentMethod}
                </span>
              </div>

              <dl className="space-y-3 text-body-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt>Subtotal ({order.items.length} items)</dt>
                  <dd className="font-medium">{formatPrice(order.subtotal)}</dd>
                </div>
                {order.discount > 0 && (
                  <div className="flex items-center justify-between gap-4 text-primary">
                    <dt className="inline-flex items-center gap-1.5">
                      <Tags aria-hidden="true" size={14} />
                      Bookstore Patron Promo (-10%)
                    </dt>
                    <dd>-{formatPrice(order.discount)}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4">
                  <dt>Standard Tracked Parcel (USPS 2-3 Day)</dt>
                  <dd>{formatPrice(order.shipping)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt>Estimated Sales Tax (8.5% WA State)</dt>
                  <dd>{formatPrice(order.tax)}</dd>
                </div>
              </dl>

              <div className="flex items-end justify-between gap-3 border-t border-surface-container-high pt-4">
                <div>
                  <p className="font-label-md font-semibold">
                    Total Paid by Patron
                  </p>
                  <p className="mt-1 text-caption text-secondary">
                    Processed {order.placedAt.split(" at ")[0]} · Ref:{" "}
                    {order.paymentReference}
                  </p>
                </div>
                <span className="font-display text-headline-md font-bold text-primary">
                  {formatPrice(order.total)}
                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-xl bg-tertiary-fixed/35 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2">
                  <RefreshCw
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-tertiary"
                    size={18}
                  />
                  <div>
                    <p className="text-label-sm">Refund Status</p>
                    <p className="mt-0.5 text-caption text-secondary">
                      Eligible for return or refund (30-day window)
                    </p>
                  </div>
                </div>
                <button
                  className="h-9 shrink-0 rounded-lg bg-surface-container-lowest px-3 text-label-sm text-secondary transition hover:bg-tertiary-fixed"
                  onClick={() => setRefundOpen(true)}
                  type="button"
                >
                  Process Refund
                </button>
              </div>
            </section>

            <section className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-fixed text-on-secondary-fixed">
                  <MapPin aria-hidden="true" size={18} />
                </span>
                <div>
                  <h2 className="font-display text-title-sm font-semibold">
                    Patron Delivery Note
                  </h2>
                  <p className="text-caption text-secondary">
                    Customer note submitted at checkout
                  </p>
                </div>
              </div>
              <blockquote className="rounded-xl bg-surface-container-low p-4 text-body-sm leading-relaxed text-on-surface-variant">
                “{order.deliveryNote}”
              </blockquote>
            </section>

            <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                  <Clock3 aria-hidden="true" size={18} />
                </span>
                <div>
                  <h2 className="font-display text-title-sm font-semibold">
                    Fulfillment Timeline
                  </h2>
                  <p className="text-caption text-secondary">
                    Order events · preview data
                  </p>
                </div>
              </div>
              <ol className="space-y-4 border-l border-surface-container-high pl-4">
                <li className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-surface-container-lowest" />
                  <p className="text-label-sm">Order placed</p>
                  <p className="mt-0.5 text-caption text-secondary">
                    {order.placedAt}
                  </p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-secondary-container ring-4 ring-surface-container-lowest" />
                  <p className="text-label-sm">Payment captured</p>
                  <p className="mt-0.5 text-caption text-secondary">
                    {order.paymentMethod} · {order.paymentReference}
                  </p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-outline-variant ring-4 ring-surface-container-lowest" />
                  <p className="text-label-sm">Current stage</p>
                  <p className="mt-0.5 text-caption text-secondary">{status}</p>
                </li>
              </ol>
            </section>
          </aside>
        </div>

        <div
          aria-live="polite"
          className="min-h-5 text-center text-body-sm text-on-surface-variant"
          role="status"
        >
          {notice}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-container-high pt-4 text-caption text-secondary">
          <span>Koala Haven · Operations Portal · {order.id}</span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-tertiary"
            />
            Preview order · actions are not persisted
          </span>
        </footer>
      </div>

      {refundOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setRefundOpen(false);
          }}
        >
          <section
            aria-labelledby="refund-title"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-5 shadow-2xl sm:p-7"
            role="dialog"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-fixed text-tertiary">
                  <RefreshCw aria-hidden="true" size={19} />
                </span>
                <h2
                  className="font-display text-title-md font-semibold"
                  id="refund-title"
                >
                  Issue Refund for #{order.id}
                </h2>
              </div>
              <button
                aria-label="Close refund dialog"
                className="rounded-lg p-2 text-secondary transition hover:bg-surface-container-low"
                onClick={() => setRefundOpen(false)}
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <p className="mt-3 text-body-sm leading-relaxed text-secondary">
              Choose a refund preview. No funds will be returned because payment
              processing is not connected.
            </p>

            <fieldset className="mt-5 space-y-2">
              <legend className="mb-2 text-label-sm">Refund amount</legend>
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-surface-container-low p-3">
                <span className="flex items-center gap-2 text-body-sm">
                  <input
                    checked={refundType === "full"}
                    className="h-4 w-4 accent-primary"
                    name="refund-type"
                    onChange={() => setRefundType("full")}
                    type="radio"
                  />
                  Full Refund
                </span>
                <span className="text-label-sm font-semibold">
                  {formatPrice(order.total)}
                </span>
              </label>
              {order.items.some((item) => !item.complimentary) && (
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-surface-container-low p-3">
                  <span className="flex items-center gap-2 text-body-sm">
                    <input
                      checked={refundType === "item"}
                      className="h-4 w-4 accent-primary"
                      name="refund-type"
                      onChange={() => setRefundType("item")}
                      type="radio"
                    />
                    Single Book Return
                  </span>
                  <span className="text-label-sm font-semibold">
                    {formatPrice(
                      order.items.find((item) => !item.complimentary)?.price ??
                        0,
                    )}
                  </span>
                </label>
              )}
            </fieldset>

            <label className="mt-4 flex flex-col gap-1.5 text-label-sm">
              Reason for Refund
              <select
                className="h-11 rounded-lg bg-surface-container-low px-3 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => setRefundReason(event.target.value)}
                value={refundReason}
              >
                <option>Customer Request - Accidental duplicate</option>
                <option>Item Out of Stock / Fulfillment Error</option>
                <option>Damaged in transit</option>
                <option>Goodwill concession</option>
              </select>
            </label>

            <div className="mt-5 flex flex-col-reverse justify-end gap-2 sm:flex-row">
              <button
                className="h-10 rounded-lg px-4 text-label-sm text-secondary transition hover:bg-surface-container-low"
                onClick={() => setRefundOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-label-sm text-on-primary transition hover:bg-on-primary-container"
                onClick={() => {
                  confirmRefund();
                  setNotice((current) => `${current} Reason: ${refundReason}.`);
                }}
                type="button"
              >
                <Check aria-hidden="true" size={16} />
                Prepare Refund Preview
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function MissingOrder({ orderId }: { orderId: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-12 text-on-surface">
      <section className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-7 text-center shadow-xl sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tertiary-fixed text-tertiary">
          <ShoppingBag aria-hidden="true" size={26} />
        </span>
        <h1 className="mt-5 font-display text-headline-md font-bold">
          Order not found
        </h1>
        <p className="mt-2 text-body-sm text-secondary">
          There is no preview order matching{" "}
          <span className="font-mono text-on-surface">{orderId}</span>.
        </p>
        <Link
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-label-sm text-on-primary transition hover:bg-on-primary-container"
          href="/admin/dashboard/Orders"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to Orders
        </Link>
      </section>
    </main>
  );
}

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const order = orderExamples[params.id];

  if (!order) {
    return <MissingOrder orderId={params.id} />;
  }

  return <OrderDetail key={order.id} order={order} />;
}
