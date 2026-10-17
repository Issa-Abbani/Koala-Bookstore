"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  CloudUpload,
  Grid2X2,
  ImagePlus,
  Layers3,
  LogOut,
  Minus,
  PackageSearch,
  Plus,
  Save,
  ShieldCheck,
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
  bin: string;
  price: number;
  cost: number;
  stock: number;
  alertLevel: number;
};

type EditableBook = {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  releaseDate: string;
  isbn13: string;
  isbn10: string;
  synopsis: string;
  genre: string;
  audience: string;
  tags: string[];
  editions: Edition[];
  status: "In Stock" | "Low Stock" | "Out of Stock";
  visible: boolean;
};

const sampleBooks: Record<string, EditableBook> = {
  "book-1": {
    id: "KB-BK-009210",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    subtitle: "A Novel (Special Hardcover Edition)",
    authors: "Gabrielle Zevin",
    publisher: "Knopf Doubleday Publishing Group",
    releaseDate: "2024-05-14",
    isbn13: "978-0-593-32120-1",
    isbn10: "059332120X",
    synopsis:
      "In this exhilarating novel by the New York Times bestselling author of The Storied Life of A. J. Fikry, two friends—often in love, but never lovers—come together as creative partners in the world of video game design, where success brings them fame, joy, tragedy, duplicity, and, ultimately, a kind of immortality.",
    genre: "Literary Fiction",
    audience: "Adult",
    tags: [
      "Contemporary Fiction",
      "Friendship & Video Games",
      "Nostalgia & 90s Tech",
    ],
    editions: [
      {
        id: "hardcover",
        name: "Hardcover Edition",
        sku: "KB-HC-9210",
        bin: "A-12",
        price: 28.5,
        cost: 14.2,
        stock: 45,
        alertLevel: 10,
      },
      {
        id: "paperback",
        name: "Trade Paperback",
        sku: "KB-PB-9211",
        bin: "B-08",
        price: 18.99,
        cost: 8.5,
        stock: 120,
        alertLevel: 15,
      },
    ],
    status: "In Stock",
    visible: true,
  },
  "book-2": {
    id: "KB-FIC-1018",
    title: "The Midnight Library",
    subtitle: "",
    authors: "Matt Haig",
    publisher: "Canongate Books",
    releaseDate: "",
    isbn13: "9780525559474",
    isbn10: "",
    synopsis: "",
    genre: "Literary Fiction",
    audience: "Adult",
    tags: ["Contemporary Fiction"],
    editions: [
      {
        id: "paperback",
        name: "Paperback Edition",
        sku: "KB-FIC-1018",
        bin: "B-12",
        price: 15.5,
        cost: 8.25,
        stock: 4,
        alertLevel: 6,
      },
    ],
    status: "Low Stock",
    visible: true,
  },
  "book-3": {
    id: "KB-SFF-2086",
    title: "Babel: An Arcane History",
    subtitle: "",
    authors: "R. F. Kuang",
    publisher: "Harper Voyager",
    releaseDate: "",
    isbn13: "9780063021426",
    isbn10: "",
    synopsis: "",
    genre: "Sci-Fi & Speculative",
    audience: "Adult",
    tags: ["Fantasy", "Historical Fiction"],
    editions: [
      {
        id: "hardcover",
        name: "Hardcover Edition",
        sku: "KB-SFF-2086",
        bin: "C-08",
        price: 21.99,
        cost: 11.4,
        stock: 5,
        alertLevel: 6,
      },
    ],
    status: "Low Stock",
    visible: true,
  },
  "book-4": {
    id: "KB-FIC-1165",
    title: "Demon Copperhead",
    subtitle: "",
    authors: "Barbara Kingsolver",
    publisher: "Harper",
    releaseDate: "",
    isbn13: "9780063251922",
    isbn10: "",
    synopsis: "",
    genre: "Contemporary Fiction",
    audience: "Adult",
    tags: ["Literary Fiction"],
    editions: [
      {
        id: "paperback",
        name: "Paperback Edition",
        sku: "KB-FIC-1165",
        bin: "A-04",
        price: 19.99,
        cost: 10,
        stock: 3,
        alertLevel: 6,
      },
    ],
    status: "Low Stock",
    visible: true,
  },
  "book-5": {
    id: "KB-NF-3024",
    title: "Atomic Habits",
    subtitle: "",
    authors: "James Clear",
    publisher: "Avery",
    releaseDate: "",
    isbn13: "9780735211292",
    isbn10: "",
    synopsis: "",
    genre: "Non-Fiction & Memoir",
    audience: "Adult",
    tags: ["Personal Growth", "Bestseller"],
    editions: [
      {
        id: "hardcover",
        name: "Hardcover Edition",
        sku: "KB-NF-3024",
        bin: "D-02",
        price: 17.99,
        cost: 9.2,
        stock: 42,
        alertLevel: 8,
      },
    ],
    status: "In Stock",
    visible: true,
  },
  "book-6": {
    id: "KB-NF-3088",
    title: "Braiding Sweetgrass",
    subtitle: "",
    authors: "Robin Wall Kimmerer",
    publisher: "Milkweed Editions",
    releaseDate: "",
    isbn13: "9781571313560",
    isbn10: "",
    synopsis: "",
    genre: "Nature & Botany",
    audience: "Adult",
    tags: ["Nature Writing", "Ecology"],
    editions: [
      {
        id: "paperback",
        name: "Paperback Edition",
        sku: "KB-NF-3088",
        bin: "D-14",
        price: 18,
        cost: 9.5,
        stock: 11,
        alertLevel: 5,
      },
    ],
    status: "In Stock",
    visible: true,
  },
};

const genreOptions = [
  "Literary Fiction",
  "Contemporary Fiction",
  "Sci-Fi & Speculative",
  "Mystery & Thriller",
  "Non-Fiction & Memoir",
  "Nature & Botany",
];

const inputClass =
  "h-11 w-full rounded-xl bg-surface-container-low px-3 text-body-sm shadow-inner transition focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary";

function getInventoryStatus(editions: Edition[]) {
  const total = editions.reduce((sum, edition) => sum + edition.stock, 0);
  const low = editions.some(
    (edition) => edition.stock > 0 && edition.stock <= edition.alertLevel,
  );
  if (total === 0) return "Out of Stock";
  return low ? "Low Stock" : "In Stock";
}

function AdminNavigation({ mobile = false }: { mobile?: boolean }) {
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
          aria-current="page"
          className={
            mobile
              ? "rounded-lg bg-primary-container px-2 py-2 text-label-sm font-semibold text-on-primary-container"
              : "rounded-lg bg-primary-container px-2 py-1.5 text-body-sm font-semibold text-on-primary-container"
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
      <Link className={linkClass} href="/admin/dashboard/Orders">
        <Truck aria-hidden="true" size={20} />
        Orders
      </Link>
    </nav>
  );
}

function BookField({
  id,
  label,
  children,
  hint,
}: {
  id: string;
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="flex flex-wrap items-center justify-between gap-1 text-label-sm"
        htmlFor={id}
      >
        <span>{label}</span>
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

function EditBookForm({
  initialBook,
  routeId,
}: {
  initialBook: EditableBook;
  routeId: string;
}) {
  const [book, setBook] = useState(initialBook);
  const [tagInput, setTagInput] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [notice, setNotice] = useState("");
  const [archived, setArchived] = useState(false);

  function updateBook<Key extends keyof EditableBook>(
    key: Key,
    value: EditableBook[Key],
  ) {
    setBook((current) => ({ ...current, [key]: value }));
  }

  function updateEdition(
    editionId: string,
    key: keyof Omit<Edition, "id">,
    value: string | number,
  ) {
    setBook((current) => ({
      ...current,
      editions: current.editions.map((edition) =>
        edition.id === editionId ? { ...edition, [key]: value } : edition,
      ),
    }));
  }

  function addEdition() {
    const index = book.editions.length + 1;
    setBook((current) => ({
      ...current,
      editions: [
        ...current.editions,
        {
          id: `edition-${Date.now()}`,
          name: `Additional Edition ${index}`,
          sku: `KB-NEW-${String(index).padStart(3, "0")}`,
          bin: "Unassigned",
          price: 0,
          cost: 0,
          stock: 0,
          alertLevel: 5,
        },
      ],
    }));
  }

  function removeEdition(editionId: string) {
    if (book.editions.length === 1) {
      setNotice("A title must have at least one edition.");
      return;
    }
    setBook((current) => ({
      ...current,
      editions: current.editions.filter((edition) => edition.id !== editionId),
    }));
  }

  function addTag() {
    const nextTag = tagInput.trim();
    if (!nextTag) return;
    if (book.tags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())) {
      setNotice("That tag is already on this title.");
      return;
    }
    setBook((current) => ({
      ...current,
      tags: [...current.tags, nextTag],
    }));
    setTagInput("");
    setNotice("");
  }

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setNotice("Choose a PNG, JPG, or WEBP cover image.");
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

  function discardChanges() {
    setBook(initialBook);
    setTagInput("");
    setCoverPreview("");
    setArchived(false);
    setNotice("Changes discarded. The original preview data was restored.");
  }

  function saveChanges(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isbn13 = book.isbn13.replace(/[-\s]/g, "");
    if (!/^\d{13}$/.test(isbn13)) {
      setNotice("ISBN-13 must contain exactly 13 digits.");
      return;
    }
    if (
      book.editions.some(
        (edition) =>
          !Number.isFinite(edition.price) ||
          edition.price <= 0 ||
          !Number.isFinite(edition.cost) ||
          edition.cost < 0 ||
          !Number.isInteger(edition.stock) ||
          edition.stock < 0 ||
          !Number.isInteger(edition.alertLevel) ||
          edition.alertLevel < 0,
      )
    ) {
      setNotice(
        "Check that each edition has a positive retail price and valid non-negative cost, stock, and alert level.",
      );
      return;
    }
    setNotice(
      `“${book.title}” changes are ready in the preview. Nothing was saved.`,
    );
  }

  function archiveListing() {
    setArchived((current) => !current);
    setNotice(
      archived
        ? "Listing restored in this preview. Changes are not saved."
        : "Listing archived in this preview only. Changes are not saved.",
    );
  }

  function deleteListing() {
    setNotice(
      "Product deletion is not connected. No catalog data was deleted.",
    );
  }

  const totalStock = book.editions.reduce(
    (sum, edition) => sum + edition.stock,
    0,
  );
  const inventoryStatus = getInventoryStatus(book.editions);

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-5 pb-28">
        <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-body-sm text-secondary">
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
              <span className="text-on-surface">Modify Book</span>
            </div>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-caption font-semibold ${
                inventoryStatus === "In Stock"
                  ? "bg-secondary-fixed text-on-secondary-fixed"
                  : inventoryStatus === "Low Stock"
                    ? "bg-tertiary-fixed text-on-tertiary-fixed"
                    : "bg-error/10 text-error"
              }`}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-current"
              />
              {inventoryStatus} · {totalStock} total units across formats
            </span>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-headline-md font-bold tracking-tight sm:text-headline-lg">
                  Modify Book: {book.title}
                </h1>
                <span className="rounded-full bg-surface-container-high px-2.5 py-1 text-caption font-semibold text-secondary">
                  Edition v2.4
                </span>
              </div>
              <p className="mt-2 text-body-sm leading-relaxed text-secondary">
                Update bibliographic specs, manage multi-format inventory stock
                levels, adjust retail pricing, and change storefront visibility.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-surface-container-low px-3 text-label-sm text-secondary transition hover:bg-surface-container"
                onClick={discardChanges}
                type="button"
              >
                <ArrowLeft aria-hidden="true" size={16} />
                Discard Changes
              </button>
              <button
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-label-sm text-on-primary shadow-sm transition hover:bg-on-primary-container"
                form="edit-book-form"
                type="submit"
              >
                <Save aria-hidden="true" size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </section>

        <form
          className="grid grid-cols-1 items-start gap-5 xl:grid-cols-12"
          id="edit-book-form"
          onSubmit={saveChanges}
        >
          <div className="flex flex-col gap-5 xl:col-span-8">
            <section className="flex flex-col gap-5 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                    <BookOpen aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <h2 className="font-display text-title-md font-semibold">
                      Bibliographic Details
                    </h2>
                    <p className="mt-0.5 text-body-sm text-secondary">
                      Global public metadata registered with Nielsen &amp;
                      Bowker
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-surface-container-low px-3 py-1 text-caption font-mono text-secondary">
                  ID: {book.id}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <BookField id="edit-title" label="Book Title">
                    <input
                      className={inputClass}
                      id="edit-title"
                      maxLength={180}
                      onChange={(event) =>
                        updateBook("title", event.target.value)
                      }
                      required
                      value={book.title}
                    />
                  </BookField>
                </div>
                <div className="md:col-span-2">
                  <BookField id="edit-subtitle" label="Edition / Subtitle Note">
                    <input
                      className={inputClass}
                      id="edit-subtitle"
                      maxLength={180}
                      onChange={(event) =>
                        updateBook("subtitle", event.target.value)
                      }
                      value={book.subtitle}
                    />
                  </BookField>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <label className="text-label-sm" htmlFor="edit-authors">
                      Primary Author(s)
                    </label>
                    <button
                      className="text-label-sm text-primary hover:underline"
                      onClick={() =>
                        setNotice("Add Contributor is a preview-only control.")
                      }
                      type="button"
                    >
                      + Add Contributor
                    </button>
                  </div>
                  <div className="relative">
                    <UserRound
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                      size={17}
                    />
                    <input
                      className={`${inputClass} pl-10`}
                      id="edit-authors"
                      maxLength={240}
                      onChange={(event) =>
                        updateBook("authors", event.target.value)
                      }
                      required
                      value={book.authors}
                    />
                  </div>
                </div>
                <BookField
                  id="edit-publisher"
                  label="Publishing House / Imprint"
                >
                  <input
                    className={inputClass}
                    id="edit-publisher"
                    maxLength={180}
                    onChange={(event) =>
                      updateBook("publisher", event.target.value)
                    }
                    value={book.publisher}
                  />
                </BookField>
                <BookField
                  id="edit-release-date"
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
                      id="edit-release-date"
                      onChange={(event) =>
                        updateBook("releaseDate", event.target.value)
                      }
                      type="date"
                      value={book.releaseDate}
                    />
                  </div>
                </BookField>
                <BookField id="edit-isbn13" label="ISBN-13">
                  <input
                    className={`${inputClass} font-mono`}
                    id="edit-isbn13"
                    inputMode="numeric"
                    onChange={(event) =>
                      updateBook("isbn13", event.target.value)
                    }
                    required
                    value={book.isbn13}
                  />
                </BookField>
                <BookField id="edit-isbn10" label="ISBN-10">
                  <input
                    className={`${inputClass} font-mono`}
                    id="edit-isbn10"
                    onChange={(event) =>
                      updateBook("isbn10", event.target.value)
                    }
                    value={book.isbn10}
                  />
                </BookField>
              </div>

              <BookField
                id="edit-synopsis"
                label="Book Synopsis & Editorial Blurb"
                hint={`${book.synopsis.length} / 2,000 characters`}
              >
                <textarea
                  className="min-h-36 w-full resize-y rounded-xl bg-surface-container-low p-3 text-body-sm shadow-inner placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary"
                  id="edit-synopsis"
                  maxLength={2000}
                  onChange={(event) =>
                    updateBook("synopsis", event.target.value)
                  }
                  rows={5}
                  value={book.synopsis}
                />
              </BookField>
            </section>

            <section className="flex flex-col gap-5 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-title-md font-semibold">
                    <Layers3
                      aria-hidden="true"
                      className="text-primary"
                      size={20}
                    />
                    Format, Pricing &amp; Inventory Matrix
                  </h2>
                  <p className="mt-1 text-body-sm text-secondary">
                    Manage warehouse stocking, wholesale cost bases, and
                    customer retail prices
                  </p>
                </div>
                <button
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-label-sm text-on-primary transition hover:bg-on-primary-container"
                  onClick={addEdition}
                  type="button"
                >
                  <Plus aria-hidden="true" size={16} />
                  Add Edition
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {book.editions.map((edition, index) => {
                  const margin =
                    edition.price > 0
                      ? (
                          ((edition.price - edition.cost) / edition.price) *
                          100
                        ).toFixed(1)
                      : "0.0";
                  return (
                    <article
                      className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-4 sm:p-5"
                      key={edition.id}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-primary" />
                          <h3 className="font-display text-title-sm font-semibold">
                            {edition.name}
                          </h3>
                          <span className="rounded bg-surface-container-highest px-2 py-0.5 font-mono text-caption text-secondary">
                            SKU: {edition.sku}
                          </span>
                          {index === 0 && (
                            <span className="rounded-full bg-tertiary-fixed px-2 py-0.5 text-caption font-semibold text-on-tertiary-fixed">
                              Flagship Binding
                            </span>
                          )}
                        </div>
                        <button
                          aria-label={`Remove ${edition.name}`}
                          className="rounded-lg p-2 text-secondary transition hover:bg-error-container hover:text-error"
                          onClick={() => removeEdition(edition.id)}
                          type="button"
                        >
                          <Trash2 aria-hidden="true" size={16} />
                        </button>
                      </div>

                      {index === 0 && (
                        <span className="inline-flex items-center gap-1.5 text-caption font-medium text-primary">
                          <Check aria-hidden="true" size={14} />
                          Primary Display Edition
                        </span>
                      )}

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <label className="flex flex-col gap-1.5">
                          <span className="text-label-sm text-secondary">
                            Retail Price
                          </span>
                          <span className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-body-sm text-secondary">
                              $
                            </span>
                            <input
                              aria-label={`${edition.name} retail price`}
                              className={`${inputClass} pl-7`}
                              min="0.01"
                              onChange={(event) =>
                                updateEdition(
                                  edition.id,
                                  "price",
                                  Number(event.target.value),
                                )
                              }
                              required
                              step="0.01"
                              type="number"
                              value={edition.price}
                            />
                          </span>
                        </label>
                        <label className="flex flex-col gap-1.5">
                          <span className="flex items-center justify-between text-label-sm text-secondary">
                            Cost Basis (Unit)
                            <span className="text-caption text-primary">
                              {margin}%
                            </span>
                          </span>
                          <span className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-body-sm text-secondary">
                              $
                            </span>
                            <input
                              aria-label={`${edition.name} cost basis`}
                              className={`${inputClass} pl-7`}
                              min="0"
                              onChange={(event) =>
                                updateEdition(
                                  edition.id,
                                  "cost",
                                  Number(event.target.value),
                                )
                              }
                              required
                              step="0.01"
                              type="number"
                              value={edition.cost}
                            />
                          </span>
                        </label>
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="text-label-sm text-secondary"
                            htmlFor={`stock-${edition.id}`}
                          >
                            Stock in Bay {edition.bin}
                          </label>
                          <div className="flex h-11 items-center overflow-hidden rounded-xl bg-surface-container-lowest">
                            <button
                              aria-label={`Decrease ${edition.name} stock`}
                              className="flex h-full items-center px-3 text-secondary transition hover:bg-surface-container-high"
                              onClick={() =>
                                updateEdition(
                                  edition.id,
                                  "stock",
                                  Math.max(0, edition.stock - 1),
                                )
                              }
                              type="button"
                            >
                              <Minus aria-hidden="true" size={15} />
                            </button>
                            <input
                              className="h-full min-w-0 flex-1 bg-transparent text-center text-label-md font-semibold focus:outline-none"
                              id={`stock-${edition.id}`}
                              min={0}
                              onChange={(event) =>
                                updateEdition(
                                  edition.id,
                                  "stock",
                                  Math.max(0, Number(event.target.value)),
                                )
                              }
                              required
                              step={1}
                              type="number"
                              value={edition.stock}
                            />
                            <button
                              aria-label={`Increase ${edition.name} stock`}
                              className="flex h-full items-center px-3 text-secondary transition hover:bg-surface-container-high"
                              onClick={() =>
                                updateEdition(
                                  edition.id,
                                  "stock",
                                  edition.stock + 1,
                                )
                              }
                              type="button"
                            >
                              <Plus aria-hidden="true" size={15} />
                            </button>
                          </div>
                        </div>
                        <label className="flex flex-col gap-1.5">
                          <span className="text-label-sm text-secondary">
                            Low Alert Level
                          </span>
                          <span className="relative">
                            <input
                              aria-label={`${edition.name} low stock alert level`}
                              className={inputClass}
                              min={0}
                              onChange={(event) =>
                                updateEdition(
                                  edition.id,
                                  "alertLevel",
                                  Number(event.target.value),
                                )
                              }
                              required
                              step={1}
                              type="number"
                              value={edition.alertLevel}
                            />
                          </span>
                        </label>
                      </div>
                      <p className="border-t border-outline-variant/40 pt-3 text-caption text-secondary">
                        Warehouse bin {edition.bin}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="flex flex-col gap-5 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-fixed text-tertiary">
                  <Tags aria-hidden="true" size={20} />
                </span>
                <div>
                  <h2 className="font-display text-title-md font-semibold">
                    Categorization &amp; Storefront Tags
                  </h2>
                  <p className="mt-0.5 text-body-sm text-secondary">
                    Optimize navigation, collection filters, and search
                    discovery
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <BookField
                  id="edit-genre"
                  label="Primary Genre / Curated Shelf"
                >
                  <span className="relative">
                    <select
                      className={`${inputClass} appearance-none pr-10`}
                      id="edit-genre"
                      onChange={(event) =>
                        updateBook("genre", event.target.value)
                      }
                      value={book.genre}
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
                  </span>
                </BookField>
                <fieldset className="flex flex-col gap-1.5">
                  <legend className="text-label-sm">Target Audience</legend>
                  <div className="grid grid-cols-3 gap-1 rounded-xl bg-surface-container-low p-1">
                    {["Adult", "Young Adult (YA)", "Middle Grade"].map(
                      (audience) => (
                        <button
                          aria-pressed={book.audience === audience}
                          className={`min-h-10 rounded-lg px-2 text-caption transition ${
                            book.audience === audience
                              ? "bg-surface-container-lowest font-semibold text-primary shadow-sm"
                              : "text-secondary hover:bg-surface-container"
                          }`}
                          key={audience}
                          onClick={() => updateBook("audience", audience)}
                          type="button"
                        >
                          {audience}
                        </button>
                      ),
                    )}
                  </div>
                </fieldset>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-label-sm" htmlFor="edit-tag-input">
                    Storefront Search &amp; Discovery Tags
                  </label>
                  <span className="text-caption text-secondary">
                    Click × to remove
                  </span>
                </div>
                <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-xl bg-surface-container-low p-2">
                  {book.tags.map((tag) => (
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-label-sm text-on-secondary-container"
                      key={tag}
                    >
                      {tag}
                      <button
                        aria-label={`Remove ${tag}`}
                        className="rounded-full hover:text-error"
                        onClick={() =>
                          updateBook(
                            "tags",
                            book.tags.filter((value) => value !== tag),
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
                      className="min-w-36 bg-transparent px-2 py-1 text-body-sm placeholder:text-outline focus:outline-none"
                      id="edit-tag-input"
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
              </div>
            </section>

            <section className="flex flex-col gap-4 rounded-xl border border-error/20 bg-surface-container-lowest p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-error/10 text-error">
                  <CircleAlert aria-hidden="true" size={20} />
                </span>
                <div>
                  <h2 className="font-display text-title-sm font-semibold">
                    Archive or Delete Book Listing
                  </h2>
                  <p className="mt-1 max-w-xl text-body-sm text-secondary">
                    Archiving preserves transaction records while removing the
                    title from public search.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="h-10 rounded-lg bg-surface-container-low px-3 text-label-sm text-secondary transition hover:bg-surface-container"
                  onClick={archiveListing}
                  type="button"
                >
                  {archived ? "Restore Listing" : "Archive Listing"}
                </button>
                <button
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-error/10 px-3 text-label-sm text-error transition hover:bg-error-container"
                  onClick={deleteListing}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={15} />
                  Delete Product
                </button>
              </div>
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
              <div className="relative mx-auto flex aspect-[2/3] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-fixed via-surface-container to-tertiary-fixed shadow-md">
                {coverPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={`${book.title} cover preview`}
                    className="h-full w-full object-cover"
                    src={coverPreview}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-between p-6 text-center text-on-primary-fixed">
                    <BookOpen aria-hidden="true" size={30} />
                    <div>
                      <p className="font-display text-title-md font-bold">
                        {book.title}
                      </p>
                      <p className="mt-2 text-body-sm text-on-primary-fixed/75">
                        {book.authors}
                      </p>
                    </div>
                    <span className="h-px w-12 bg-on-primary-fixed/35" />
                  </div>
                )}
                {coverPreview && (
                  <button
                    aria-label="Remove selected cover"
                    className="absolute right-3 top-3 rounded-full bg-surface-container-lowest/90 p-2 text-error shadow-sm"
                    onClick={() => setCoverPreview("")}
                    type="button"
                  >
                    <X aria-hidden="true" size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-surface-container px-3 text-label-sm transition hover:bg-surface-container-high"
                  htmlFor="edit-cover-upload"
                >
                  <CloudUpload aria-hidden="true" size={16} />
                  Replace Cover
                  <input
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    id="edit-cover-upload"
                    onChange={handleCoverChange}
                    type="file"
                  />
                </label>
                <button
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-surface-container-low px-3 text-label-sm text-secondary transition hover:bg-surface-container"
                  onClick={() =>
                    setNotice("Full-resolution cover storage is not connected.")
                  }
                  type="button"
                >
                  Full Res
                </button>
              </div>
              <p className="text-center text-caption text-secondary">
                PNG, JPG or WEBP · max 10MB · preview only
              </p>
              <div className="flex flex-col gap-2 border-t border-surface-container-high pt-4">
                <span className="text-caption font-semibold text-secondary">
                  Supplementary Asset Slots
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {["Spine (Active)", "Back Cover", "+ Add Slot"].map(
                    (slot) => (
                      <button
                        className="flex h-20 flex-col items-center justify-center gap-1 rounded-lg bg-surface-container-low px-1 text-caption text-secondary transition hover:bg-surface-container-high hover:text-primary"
                        key={slot}
                        onClick={() =>
                          setNotice(
                            "Supplementary media storage is not connected.",
                          )
                        }
                        type="button"
                      >
                        <ImagePlus aria-hidden="true" size={18} />
                        {slot}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-fixed text-on-secondary-fixed">
                  <ShieldCheck aria-hidden="true" size={18} />
                </span>
                <div>
                  <h2 className="font-display text-title-sm font-semibold">
                    Storefront Visibility
                  </h2>
                  <p className="text-caption text-secondary">
                    Merchandising controls
                  </p>
                </div>
              </div>
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-surface-container-low p-3">
                <span>
                  <span className="block text-label-sm">
                    Visible in storefront
                  </span>
                  <span className="block text-caption text-secondary">
                    Allow customers to find this title
                  </span>
                </span>
                <input
                  checked={book.visible}
                  className="h-4 w-4 accent-primary"
                  onChange={(event) =>
                    updateBook("visible", event.target.checked)
                  }
                  type="checkbox"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-surface-container-low p-3">
                <span>
                  <span className="block text-label-sm">
                    Featured in curated picks
                  </span>
                  <span className="block text-caption text-secondary">
                    Highlight in discovery collections
                  </span>
                </span>
                <input
                  className="h-4 w-4 accent-primary"
                  defaultChecked={book.tags.includes("Staff Pick 2024")}
                  type="checkbox"
                />
              </label>
              {archived && (
                <p className="rounded-lg bg-tertiary-fixed p-3 text-body-sm text-on-tertiary-fixed">
                  This title is archived in the current preview.
                </p>
              )}
            </section>

            <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
              <div>
                <h2 className="font-display text-title-sm font-semibold">
                  Inventory History
                </h2>
                <p className="mt-1 text-caption text-secondary">
                  Recent stock movement
                </p>
              </div>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-label-sm">Stock count adjusted</p>
                    <p className="mt-1 text-caption text-secondary">
                      Preview entry · Current quantity {totalStock} units
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary-container" />
                  <div>
                    <p className="text-label-sm">Listing last reviewed</p>
                    <p className="mt-1 text-caption text-secondary">
                      Sample catalog record · not a live audit log
                    </p>
                  </div>
                </li>
              </ol>
            </section>
          </aside>
        </form>

        <p
          aria-live="polite"
          className="min-h-5 text-center text-body-sm text-on-surface-variant"
          role="status"
        >
          {notice}
        </p>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-container-high pt-4 text-caption text-secondary">
          <span>Koala Haven · Operations Portal · {routeId}</span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-tertiary"
            />
            Preview data · changes are not saved
          </span>
        </footer>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-surface-container-high bg-surface-container-lowest/95 px-4 py-3 shadow-xl backdrop-blur-md lg:left-72 sm:px-6">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-caption text-secondary">
            Preview edits · no catalog data is saved
          </p>
          <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-label-sm text-secondary transition hover:bg-surface-container-low"
              onClick={discardChanges}
              type="button"
            >
              Discard Changes
            </button>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-label-sm font-semibold text-on-primary transition hover:bg-on-primary-container"
              form="edit-book-form"
              type="submit"
            >
              Save Changes / Update Book
              <ArrowRight aria-hidden="true" size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function MissingBook({ routeId }: { routeId: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-12 text-on-surface">
      <section className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-7 text-center shadow-xl sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tertiary-fixed text-tertiary">
          <PackageSearch aria-hidden="true" size={26} />
        </span>
        <h1 className="mt-5 font-display text-headline-md font-bold">
          Book not found
        </h1>
        <p className="mt-2 text-body-sm text-secondary">
          No preview catalog entry matches ID{" "}
          <span className="font-mono text-on-surface">{routeId}</span>.
        </p>
        <Link
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-label-sm text-on-primary transition hover:bg-on-primary-container"
          href="/admin/dashboard/SearchAndModify"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to catalog
        </Link>
      </section>
    </main>
  );
}

export default function ModifyBookPage() {
  const params = useParams<{ id: string }>();
  const routeId = params.id;
  const book =
    sampleBooks[routeId] ??
    Object.values(sampleBooks).find((entry) => entry.id === routeId);

  if (!book) {
    return <MissingBook routeId={routeId} />;
  }

  return <EditBookForm key={routeId} initialBook={book} routeId={routeId} />;
}
