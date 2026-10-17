"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookCopy,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  CloudUpload,
  Grid2X2,
  ImagePlus,
  LogOut,
  PackagePlus,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Tags,
  Trash2,
  Truck,
  UserRound,
  X,
} from "lucide-react";

type Edition = {
  id: string;
  name: string;
  sku: string;
  retailPrice: string;
  costPrice: string;
  stock: string;
};

const initialEditions: Edition[] = [
  {
    id: "hardcover",
    name: "Hardcover Edition",
    sku: "KB-HC-NEW",
    retailPrice: "28.50",
    costPrice: "14.20",
    stock: "45",
  },
  {
    id: "paperback",
    name: "Trade Paperback Edition",
    sku: "KB-PB-NEW",
    retailPrice: "18.99",
    costPrice: "8.50",
    stock: "120",
  },
];

const genreOptions = [
  "Literary Fiction",
  "Sci-Fi & Speculative",
  "Contemporary Fiction",
  "Mystery & Thriller",
  "Non-Fiction & Memoir",
  "Nature & Botany",
];

const audienceOptions = ["Adult", "Young Adult (YA)", "Middle Grade"];

function SectionHeading({
  icon: Icon,
  title,
  description,
  badge,
}: {
  icon: typeof BookOpen;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary">
          <Icon aria-hidden="true" size={20} />
        </span>
        <div>
          <h2 className="font-display text-title-md font-semibold">{title}</h2>
          <p className="mt-0.5 text-body-sm text-secondary">{description}</p>
        </div>
      </div>
      {badge && (
        <span className="rounded-full bg-secondary-fixed px-3 py-1 text-caption font-bold text-on-secondary-fixed">
          {badge}
        </span>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label
        className="flex flex-wrap items-center justify-between gap-1 text-label-sm"
        htmlFor={htmlFor}
      >
        <span>
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </span>
        {hint && (
          <span className="text-caption font-normal text-secondary">
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-xl bg-surface-container-low px-3 text-body-sm text-on-surface shadow-inner transition placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary";

export default function AddNewProductPage() {
  const [editions, setEditions] = useState(initialEditions);
  const [audience, setAudience] = useState("Adult");
  const [tags, setTags] = useState([
    "Contemporary Fiction",
    "Friendship & Video Games",
    "Staff Pick 2024",
    "Nostalgia & 90s Tech",
  ]);
  const [tagInput, setTagInput] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [notice, setNotice] = useState("");
  const [publishedTitle, setPublishedTitle] = useState("");

  function updateEdition(
    id: string,
    key: keyof Omit<Edition, "id">,
    value: string,
  ) {
    setEditions((current) =>
      current.map((edition) =>
        edition.id === id ? { ...edition, [key]: value } : edition,
      ),
    );
  }

  function addEdition() {
    const nextNumber = editions.length + 1;
    setEditions((current) => [
      ...current,
      {
        id: `edition-${Date.now()}`,
        name: `Collector's Edition ${nextNumber}`,
        sku: `KB-CE-${String(9200 + nextNumber)}`,
        retailPrice: "",
        costPrice: "",
        stock: "0",
      },
    ]);
  }

  function removeEdition(id: string) {
    if (editions.length === 1) {
      setNotice("At least one edition is required.");
      return;
    }
    setEditions((current) => current.filter((edition) => edition.id !== id));
  }

  function addTag() {
    const nextTag = tagInput.trim();
    if (!nextTag) return;
    if (tags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())) {
      setNotice("That discovery tag has already been added.");
      return;
    }
    setTags((current) => [...current, nextTag]);
    setTagInput("");
    setNotice("");
  }

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setNotice("Choose a PNG, JPG, or WEBP image.");
      event.target.value = "";
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setNotice("Cover images must be 10 MB or smaller.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") setCoverPreview(reader.result);
    });
    reader.addEventListener("error", () => {
      setNotice("The selected cover image could not be read.");
    });
    reader.readAsDataURL(file);
    setNotice("Cover loaded for this preview only.");
  }

  function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const isbn13 = String(formData.get("isbn13") ?? "").replace(/[-\s]/g, "");

    if (!/^\d{13}$/.test(isbn13)) {
      setNotice("Enter a valid 13-digit ISBN (hyphens are optional).");
      return;
    }
    if (
      editions.some(
        (edition) =>
          Number(edition.retailPrice) <= 0 ||
          Number(edition.costPrice) < 0 ||
          Number(edition.stock) < 0 ||
          !Number.isInteger(Number(edition.stock)),
      )
    ) {
      setNotice(
        "Enter a valid retail price, cost price, and whole-number stock quantity for each edition.",
      );
      return;
    }

    setPublishedTitle(title);
    setNotice(
      `${title} is ready in the preview. Publishing is not connected, so nothing was saved.`,
    );
  }

  function handleDiscard() {
    document.querySelector<HTMLFormElement>("#new-book-form")?.reset();
    setEditions(initialEditions);
    setAudience("Adult");
    setTags([]);
    setTagInput("");
    setCoverPreview("");
    setPublishedTitle("");
    setNotice("Preview form reset. No catalog changes were saved.");
  }

  return (
    <>
      <div className="mx-auto w-full max-w-screen-2xl pb-32">
        <form className="space-y-5" id="new-book-form" onSubmit={handlePublish}>
          <section className="rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-body-sm text-secondary">
              <Link
                className="transition hover:text-primary"
                href="/admin/dashboard"
              >
                Catalog &amp; Products
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                className="transition hover:text-primary"
                href="/admin/dashboard/SearchAndModify"
              >
                Search &amp; Modify
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-on-surface">Add New Product</span>
            </div>
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div className="max-w-3xl">
                <h1 className="font-display text-headline-md font-bold tracking-tight sm:text-headline-lg">
                  Add New Book Title
                </h1>
                <p className="mt-2 text-body-sm leading-relaxed text-secondary">
                  Enter bibliographic details, format pricing, stock allocation,
                  and storefront catalog settings for the Koala Haven
                  collection.
                </p>
              </div>
              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-label-md text-on-primary shadow-sm transition hover:bg-on-primary-container"
                type="submit"
              >
                <Check aria-hidden="true" size={17} />
                Publish to Storefront
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-12">
            <div className="flex flex-col gap-5 xl:col-span-8">
              <section className="flex flex-col gap-5 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
                <SectionHeading
                  badge="Core Meta"
                  description="Essential metadata, publishing imprint, and synopsis blurb"
                  icon={BookCopy}
                  title="Bibliographic Details"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Field
                      hint="Appears prominently on spine & hero"
                      htmlFor="book-title"
                      label="Book Title"
                      required
                    >
                      <input
                        className={inputClass}
                        id="book-title"
                        maxLength={180}
                        name="title"
                        placeholder="e.g., The Midnight Library"
                        required
                      />
                    </Field>
                  </div>
                  <Field
                    htmlFor="book-subtitle"
                    label="Edition / Subtitle Note"
                  >
                    <input
                      className={inputClass}
                      id="book-subtitle"
                      maxLength={180}
                      name="subtitle"
                      placeholder="e.g., A Novel"
                    />
                  </Field>
                  <Field
                    hint="Separate multiple with commas"
                    htmlFor="book-authors"
                    label="Primary Author(s)"
                    required
                  >
                    <div className="relative">
                      <UserRound
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                        size={17}
                      />
                      <input
                        className={`${inputClass} pl-10`}
                        id="book-authors"
                        maxLength={240}
                        name="authors"
                        placeholder="e.g., Gabrielle Zevin"
                        required
                      />
                    </div>
                  </Field>
                  <Field
                    htmlFor="book-publisher"
                    label="Publishing House / Imprint"
                  >
                    <input
                      className={inputClass}
                      id="book-publisher"
                      maxLength={160}
                      name="publisher"
                      placeholder="Publisher or imprint"
                    />
                  </Field>
                  <Field
                    htmlFor="book-release-date"
                    label="Publication Release Date"
                  >
                    <div className="relative">
                      <CalendarDays
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                        size={17}
                      />
                      <input
                        className={`${inputClass} pl-10`}
                        id="book-release-date"
                        name="releaseDate"
                        type="date"
                      />
                    </div>
                  </Field>
                  <Field
                    hint="EAN barcode"
                    htmlFor="book-isbn-13"
                    label="ISBN-13 (Standard Global)"
                    required
                  >
                    <input
                      className={`${inputClass} font-mono`}
                      id="book-isbn-13"
                      inputMode="numeric"
                      maxLength={17}
                      name="isbn13"
                      placeholder="978-0-593-32120-1"
                      required
                    />
                  </Field>
                  <Field
                    hint="Legacy index"
                    htmlFor="book-isbn-10"
                    label="ISBN-10"
                  >
                    <input
                      className={`${inputClass} font-mono`}
                      id="book-isbn-10"
                      maxLength={13}
                      name="isbn10"
                      placeholder="Optional"
                    />
                  </Field>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-label-sm" htmlFor="book-synopsis">
                      Book Synopsis &amp; Editorial Blurb
                    </label>
                    <span
                      className="text-caption text-secondary"
                      id="synopsis-hint"
                    >
                      Up to 2,000 characters
                    </span>
                  </div>
                  <textarea
                    aria-describedby="synopsis-hint"
                    className="min-h-36 w-full resize-y rounded-xl bg-surface-container-low p-3 text-body-sm shadow-inner placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary"
                    id="book-synopsis"
                    maxLength={2000}
                    name="synopsis"
                    placeholder="Write an engaging synopsis that entices readers and highlights the book's themes..."
                    rows={5}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-caption text-secondary">
                      Plain text synopsis
                    </span>
                    <button
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-label-sm text-primary transition hover:bg-primary-fixed/40"
                      onClick={() =>
                        setNotice(
                          "Haven AI text refinement is not connected. Your synopsis was not changed.",
                        )
                      }
                      type="button"
                    >
                      <Sparkles aria-hidden="true" size={15} />
                      Refine with Haven AI
                    </button>
                  </div>
                </div>
              </section>

              <section className="flex flex-col gap-5 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
                <SectionHeading
                  badge={`${editions.length} ${editions.length === 1 ? "Edition" : "Editions"} active`}
                  description="Manage bindings, cost margins, and initial stock"
                  icon={PackagePlus}
                  title="Format, Pricing & Inventory"
                />

                <div className="flex flex-col gap-4">
                  {editions.map((edition, index) => {
                    const retail = Number(edition.retailPrice);
                    const cost = Number(edition.costPrice);
                    const margin =
                      retail > 0 && Number.isFinite(cost)
                        ? Math.round(((retail - cost) / retail) * 100)
                        : 0;
                    return (
                      <article
                        className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-4 shadow-sm sm:p-5"
                        key={edition.id}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="h-3 w-3 shrink-0 rounded-full bg-primary" />
                            <h3 className="font-display text-title-sm font-semibold">
                              {edition.name}
                            </h3>
                            <span className="rounded bg-surface-container-highest px-2 py-0.5 font-mono text-caption text-secondary">
                              {edition.sku}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {index === 0 && (
                              <span className="rounded-full bg-tertiary-fixed px-2 py-1 text-caption font-semibold text-on-tertiary-fixed">
                                Flagship Binding
                              </span>
                            )}
                            <button
                              aria-label={`Remove ${edition.name}`}
                              className="rounded-lg p-2 text-secondary transition hover:bg-error-container hover:text-error"
                              onClick={() => removeEdition(edition.id)}
                              type="button"
                            >
                              <Trash2 aria-hidden="true" size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                          <label className="flex flex-col gap-1.5">
                            <span className="text-label-sm text-secondary">
                              Retail Price ($)
                            </span>
                            <div className="relative">
                              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-body-sm font-semibold text-secondary">
                                $
                              </span>
                              <input
                                aria-label={`${edition.name} retail price`}
                                className="h-10 w-full rounded-lg bg-surface-container-lowest pl-7 pr-3 font-display text-label-md font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                min="0.01"
                                onChange={(event) =>
                                  updateEdition(
                                    edition.id,
                                    "retailPrice",
                                    event.target.value,
                                  )
                                }
                                required
                                step="0.01"
                                type="number"
                                value={edition.retailPrice}
                              />
                            </div>
                          </label>
                          <label className="flex flex-col gap-1.5">
                            <span className="flex items-center justify-between text-label-sm text-secondary">
                              Cost Price ($)
                              {retail > 0 && (
                                <span className="text-caption text-primary">
                                  {margin}% margin
                                </span>
                              )}
                            </span>
                            <div className="relative">
                              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-body-sm font-semibold text-secondary">
                                $
                              </span>
                              <input
                                aria-label={`${edition.name} cost price`}
                                className="h-10 w-full rounded-lg bg-surface-container-lowest pl-7 pr-3 text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                min="0"
                                onChange={(event) =>
                                  updateEdition(
                                    edition.id,
                                    "costPrice",
                                    event.target.value,
                                  )
                                }
                                required
                                step="0.01"
                                type="number"
                                value={edition.costPrice}
                              />
                            </div>
                          </label>
                          <label className="flex flex-col gap-1.5">
                            <span className="text-label-sm text-secondary">
                              Stock Allocation
                            </span>
                            <input
                              aria-label={`${edition.name} stock allocation`}
                              className="h-10 w-full rounded-lg bg-surface-container-lowest px-3 text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              min="0"
                              onChange={(event) =>
                                updateEdition(
                                  edition.id,
                                  "stock",
                                  event.target.value,
                                )
                              }
                              required
                              step="1"
                              type="number"
                              value={edition.stock}
                            />
                          </label>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/40 pt-3 text-caption text-secondary">
                          <span className="inline-flex items-center gap-1.5">
                            <Truck aria-hidden="true" size={14} />
                            Weight &amp; dimensions: Set shipping specs after
                            publishing
                          </span>
                          <span>SKU is a preview identifier</span>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-outline-variant px-4 text-label-sm text-primary transition hover:bg-primary-fixed/30"
                  onClick={addEdition}
                  type="button"
                >
                  <Plus aria-hidden="true" size={17} />
                  Add Collector&apos;s Edition / Audio Guide Companion
                </button>

                <div className="grid grid-cols-1 gap-4 border-t border-surface-container-high pt-4 sm:grid-cols-2">
                  <label className="flex items-center justify-between gap-3 rounded-xl bg-surface-container-low p-3">
                    <span>
                      <span className="block text-label-sm">
                        Low Stock Alert Level
                      </span>
                      <span className="block text-caption text-secondary">
                        Trigger replenishment warning at
                      </span>
                    </span>
                    <input
                      aria-label="Low stock alert level"
                      className="h-10 w-20 rounded-lg bg-surface-container-lowest px-2 text-center text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue={5}
                      min={0}
                      name="lowStockThreshold"
                      type="number"
                    />
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-surface-container-low p-3">
                    <input
                      className="h-4 w-4 accent-primary"
                      defaultChecked
                      name="cashOnDelivery"
                      type="checkbox"
                    />
                    <span>
                      <span className="block text-label-sm">
                        Enable Cash on Delivery
                      </span>
                      <span className="block text-caption text-secondary">
                        Allow local pickup or cash on delivery
                      </span>
                    </span>
                  </label>
                </div>
              </section>

              <section className="flex flex-col gap-5 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
                <SectionHeading
                  description="Shelf taxonomy, browsing filters, and complimentary reader perks"
                  icon={Tags}
                  title="Categorization & Storefront Tags"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field htmlFor="book-genre" label="Primary Genre / Shelf">
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none pr-10`}
                        defaultValue={genreOptions[0]}
                        id="book-genre"
                        name="genre"
                      >
                        {genreOptions.map((genre) => (
                          <option key={genre} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                        size={16}
                      />
                    </div>
                  </Field>
                  <fieldset className="flex flex-col gap-1.5">
                    <legend className="text-label-sm">
                      Target Audience / Age Bracket
                    </legend>
                    <div className="grid grid-cols-3 gap-1 rounded-xl bg-surface-container-low p-1">
                      {audienceOptions.map((option) => (
                        <button
                          aria-pressed={audience === option}
                          className={`min-h-10 rounded-lg px-2 text-caption transition sm:text-label-sm ${
                            audience === option
                              ? "bg-surface-container-lowest font-semibold text-primary shadow-sm"
                              : "text-secondary hover:bg-surface-container"
                          }`}
                          key={option}
                          onClick={() => setAudience(option)}
                          type="button"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <input name="audience" type="hidden" value={audience} />
                  </fieldset>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-label-sm" htmlFor="new-tag">
                      Storefront Search &amp; Discovery Tags
                    </label>
                    <span className="text-caption text-secondary">
                      Add or remove tags
                    </span>
                  </div>
                  <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-xl bg-surface-container-low p-2">
                    {tags.map((tag, index) => (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm shadow-sm ${
                          index === 2
                            ? "bg-tertiary-fixed font-semibold text-on-tertiary-fixed"
                            : "bg-secondary-container text-on-secondary-container"
                        }`}
                        key={tag}
                      >
                        {tag}
                        <button
                          aria-label={`Remove ${tag} tag`}
                          className="rounded-full hover:text-error"
                          onClick={() =>
                            setTags((current) =>
                              current.filter((item) => item !== tag),
                            )
                          }
                          type="button"
                        >
                          <X aria-hidden="true" size={14} />
                        </button>
                      </span>
                    ))}
                    <div className="flex">
                      <input
                        aria-label="Add custom discovery tag"
                        className="min-w-36 bg-transparent px-2 py-1 text-body-sm placeholder:text-outline focus:outline-none"
                        id="new-tag"
                        maxLength={40}
                        onChange={(event) => setTagInput(event.target.value)}
                        placeholder="+ Add custom tag..."
                        value={tagInput}
                      />
                      {tagInput.trim() && (
                        <button
                          aria-label="Add tag"
                          className="rounded-md p-1 text-primary hover:bg-primary-fixed/50"
                          onClick={addTag}
                          type="button"
                        >
                          <Plus aria-hidden="true" size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  {tags.map((tag) => (
                    <input
                      key={`tag-value-${tag}`}
                      name="tags"
                      type="hidden"
                      value={tag}
                    />
                  ))}
                </div>

                <fieldset className="flex flex-col gap-2 border-t border-surface-container-high pt-4">
                  <legend className="text-label-sm">
                    Literary Perks &amp; Customer Bundles
                  </legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-surface-container-low p-3 text-body-sm transition hover:bg-surface-container">
                      <input
                        className="h-4 w-4 accent-primary"
                        defaultChecked
                        name="wildflowerBookmark"
                        type="checkbox"
                      />
                      Includes Free Wildflower Bookmark
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-surface-container-low p-3 text-body-sm transition hover:bg-surface-container">
                      <input
                        className="h-4 w-4 accent-primary"
                        defaultChecked
                        name="memberCode"
                        type="checkbox"
                      />
                      Eligible for 10% Member Code{" "}
                      <span className="font-mono text-caption">KOALALOVE</span>
                    </label>
                  </div>
                </fieldset>
              </section>
            </div>

            <aside className="flex flex-col gap-5 xl:col-span-4">
              <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="flex items-center gap-2 font-display text-title-sm font-semibold">
                    <ImagePlus
                      aria-hidden="true"
                      className="text-primary"
                      size={19}
                    />
                    Cover Art &amp; Media
                  </h2>
                  <span className="text-caption text-secondary">Ratio 2:3</span>
                </div>

                <div className="relative mx-auto flex aspect-[2/3] w-full max-w-[260px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-fixed via-surface-container to-tertiary-fixed shadow-md">
                  {coverPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt="Selected book cover preview"
                      className="h-full w-full object-cover"
                      src={coverPreview}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-between p-6 text-center text-on-primary-fixed">
                      <BookOpen aria-hidden="true" size={30} />
                      <div>
                        <p className="font-display text-headline-md font-bold">
                          Your Cover
                        </p>
                        <p className="mt-2 text-caption text-on-primary-fixed/75">
                          A 2:3 storefront preview
                        </p>
                      </div>
                      <span className="h-px w-12 bg-on-primary-fixed/35" />
                    </div>
                  )}
                  {coverPreview && (
                    <button
                      aria-label="Remove selected cover"
                      className="absolute right-3 top-3 rounded-full bg-surface-container-lowest/90 p-2 text-error shadow-sm transition hover:bg-error-container"
                      onClick={() => setCoverPreview("")}
                      type="button"
                    >
                      <X aria-hidden="true" size={16} />
                    </button>
                  )}
                </div>

                <label
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline-variant/70 p-5 text-center transition hover:bg-surface-container-low"
                  htmlFor="book-cover-upload"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-fixed text-primary">
                    <CloudUpload aria-hidden="true" size={20} />
                  </span>
                  <span className="text-label-sm">
                    Drop high-res cover art here
                  </span>
                  <span className="text-body-sm text-secondary">
                    or{" "}
                    <span className="font-semibold text-primary underline">
                      Browse files
                    </span>
                  </span>
                  <span className="text-caption text-secondary">
                    Min 1200 × 1800px. PNG, JPG or WEBP up to 10MB.
                  </span>
                  <input
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    id="book-cover-upload"
                    onChange={handleCoverChange}
                    type="file"
                  />
                </label>
                <p className="text-center text-caption text-secondary">
                  Image is held in this browser preview only.
                </p>
              </section>

              <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
                <SectionHeading
                  description="Visibility controls for the storefront"
                  icon={ShieldCheck}
                  title="Publishing & Visibility"
                />
                <div className="flex items-start gap-3 rounded-xl bg-tertiary-fixed/40 p-3 text-body-sm text-on-tertiary-fixed">
                  <CircleHelp
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                    size={18}
                  />
                  <p>
                    Publishing is a preview action only until catalog storage is
                    connected.
                  </p>
                </div>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-surface-container-low p-3">
                  <input
                    className="h-4 w-4 accent-primary"
                    defaultChecked
                    name="visible"
                    type="checkbox"
                  />
                  <span>
                    <span className="block text-label-sm">
                      Visible in storefront
                    </span>
                    <span className="block text-caption text-secondary">
                      Show this title to bookstore visitors
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-surface-container-low p-3">
                  <input
                    className="h-4 w-4 accent-primary"
                    name="featured"
                    type="checkbox"
                  />
                  <span>
                    <span className="block text-label-sm">
                      Feature in curated picks
                    </span>
                    <span className="block text-caption text-secondary">
                      Highlight in discovery collections
                    </span>
                  </span>
                </label>
              </section>

              <section className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
                <div className="border-b border-surface-container-high px-5 py-4">
                  <h2 className="flex items-center gap-2 font-display text-title-sm font-semibold">
                    <BookOpen
                      aria-hidden="true"
                      className="text-primary"
                      size={18}
                    />
                    Live Storefront Preview
                  </h2>
                </div>
                <div className="p-4">
                  <div className="flex gap-3 rounded-xl bg-surface-container-low p-3">
                    <div className="flex h-24 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary-fixed to-tertiary-fixed text-primary">
                      {coverPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt=""
                          className="h-full w-full object-cover"
                          src={coverPreview}
                        />
                      ) : (
                        <BookOpen aria-hidden="true" size={23} />
                      )}
                    </div>
                    <div className="min-w-0 py-1">
                      <p className="line-clamp-3 font-display text-label-md font-semibold">
                        {publishedTitle || "Your book title"}
                      </p>
                      <p className="mt-1 text-body-sm text-secondary">
                        {editions.length > 0 &&
                        Number(editions[0].retailPrice) > 0
                          ? `$${Number(editions[0].retailPrice).toFixed(2)}`
                          : "Set an edition price"}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-secondary-fixed px-2 py-1 text-caption text-on-secondary-fixed">
                        <Check aria-hidden="true" size={12} />
                        Preview card
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-caption text-secondary">
                    {publishedTitle
                      ? "Ready to review. Nothing has been saved."
                      : "Complete the title and cover to prepare its storefront card."}
                  </p>
                </div>
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
        </form>

        <div className="sticky bottom-3 z-10 mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl border border-surface-container-high bg-surface-container-lowest/95 p-3 shadow-xl backdrop-blur-md sm:flex-row sm:px-5">
          <p className="inline-flex items-center gap-2 text-caption text-secondary">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-tertiary"
            />
            Draft preview · changes are not saved
          </p>
          <div className="flex w-full flex-col-reverse justify-end gap-2 sm:w-auto sm:flex-row">
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-label-sm text-secondary transition hover:bg-error-container/40 hover:text-error"
              onClick={handleDiscard}
              type="button"
            >
              <X aria-hidden="true" size={16} />
              Discard Changes
            </button>
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-label-md font-semibold text-on-primary shadow-md transition hover:brightness-105 active:scale-[0.99]"
              form="new-book-form"
              type="submit"
            >
              <Save aria-hidden="true" size={17} />
              Publish Book to Catalog
              <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
