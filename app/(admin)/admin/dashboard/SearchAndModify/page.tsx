"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownWideNarrow,
  BadgePercent,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Download,
  Edit3,
  FilterX,
  Grid2X2,
  LibraryBig,
  LogOut,
  PackageSearch,
  Plus,
  Search,
  Tags,
  Trash2,
  Truck,
} from "lucide-react";

type CatalogBook = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  sku: string;
  genre: string;
  format: "Hardcover" | "Paperback";
  stock: number;
  price: number;
  originalPrice?: number;
  updatedAt: number;
};

type StockFilter = "all" | "in-stock" | "low-stock" | "out-of-stock";
type PricingFilter = "all" | "on-sale" | "full-price";
type SortOption = "updated" | "title" | "price-low" | "price-high" | "stock";

const initialBooks: CatalogBook[] = [
  {
    id: "book-1",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    isbn: "9780593321201",
    sku: "KB-FIC-1042",
    genre: "Fiction",
    format: "Hardcover",
    stock: 28,
    price: 18.99,
    updatedAt: 6,
  },
  {
    id: "book-2",
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "9780525559474",
    sku: "KB-FIC-1018",
    genre: "Fiction",
    format: "Paperback",
    stock: 4,
    price: 15.5,
    originalPrice: 20,
    updatedAt: 5,
  },
  {
    id: "book-3",
    title: "Babel: An Arcane History",
    author: "R. F. Kuang",
    isbn: "9780063021426",
    sku: "KB-SFF-2086",
    genre: "Sci-Fi & Fantasy",
    format: "Hardcover",
    stock: 5,
    price: 21.99,
    updatedAt: 4,
  },
  {
    id: "book-4",
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    isbn: "9780063251922",
    sku: "KB-FIC-1165",
    genre: "Fiction",
    format: "Paperback",
    stock: 3,
    price: 19.99,
    updatedAt: 3,
  },
  {
    id: "book-5",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    sku: "KB-NF-3024",
    genre: "Self-Development",
    format: "Hardcover",
    stock: 42,
    price: 17.99,
    originalPrice: 24,
    updatedAt: 2,
  },
  {
    id: "book-6",
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    isbn: "9781571313560",
    sku: "KB-NF-3088",
    genre: "Non-fiction",
    format: "Paperback",
    stock: 11,
    price: 18,
    updatedAt: 1,
  },
];

const genres = [
  "Fiction",
  "Non-fiction",
  "Sci-Fi & Fantasy",
  "Self-Development",
  "Mystery & Crime",
  "Young Adult",
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function getStockLabel(stock: number) {
  if (stock === 0) return "Out of stock";
  if (stock < 6) return "Low stock";
  return "In stock";
}

function getStockStyle(stock: number) {
  if (stock === 0) return "bg-error/10 text-error";
  if (stock < 6) return "bg-tertiary-fixed text-on-tertiary-fixed";
  return "bg-secondary-fixed text-on-secondary-fixed";
}

function CatalogNavigation({ mobile = false }: { mobile?: boolean }) {
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

function BookCover({ title, genre }: { title: string; genre: string }) {
  const isFantasy = genre === "Sci-Fi & Fantasy";
  const isFiction = genre === "Fiction";

  return (
    <div
      aria-label={`Cover placeholder for ${title}`}
      className={`flex h-[76px] w-14 shrink-0 flex-col justify-between overflow-hidden rounded-md p-1.5 text-white shadow-sm ${
        isFantasy
          ? "bg-gradient-to-br from-secondary to-primary"
          : isFiction
            ? "bg-gradient-to-br from-tertiary to-[#bc806b]"
            : "bg-gradient-to-br from-primary to-secondary"
      }`}
      role="img"
    >
      <BookOpen aria-hidden="true" size={14} />
      <span className="line-clamp-3 text-[7px] font-semibold leading-tight">
        {title}
      </span>
    </div>
  );
}

export default function SearchAndModifyPage() {
  const [books, setBooks] = useState(initialBooks);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [format, setFormat] = useState("all");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [pricingFilter, setPricingFilter] = useState<PricingFilter>("all");
  const [sort, setSort] = useState<SortOption>("updated");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const visibleBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = books.filter((book) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${book.title} ${book.author} ${book.isbn} ${book.sku} ${book.genre}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesGenre = genre === "all" || book.genre === genre;
      const matchesFormat = format === "all" || book.format === format;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && book.stock >= 6) ||
        (stockFilter === "low-stock" && book.stock > 0 && book.stock < 6) ||
        (stockFilter === "out-of-stock" && book.stock === 0);
      const matchesPricing =
        pricingFilter === "all" ||
        (pricingFilter === "on-sale" && book.originalPrice !== undefined) ||
        (pricingFilter === "full-price" && book.originalPrice === undefined);

      return (
        matchesQuery &&
        matchesGenre &&
        matchesFormat &&
        matchesStock &&
        matchesPricing
      );
    });

    return filtered.sort((first, second) => {
      switch (sort) {
        case "title":
          return first.title.localeCompare(second.title);
        case "price-low":
          return first.price - second.price;
        case "price-high":
          return second.price - first.price;
        case "stock":
          return first.stock - second.stock;
        case "updated":
          return second.updatedAt - first.updatedAt;
      }
    });
  }, [books, format, genre, pricingFilter, query, sort, stockFilter]);

  const visibleIds = visibleBooks.map((book) => book.id);
  const allVisibleSelected =
    visibleIds.length > 0 &&
    visibleIds.every((bookId) => selectedIds.includes(bookId));
  const lowStockCount = books.filter(
    (book) => book.stock > 0 && book.stock < 6,
  ).length;
  const outOfStockCount = books.filter((book) => book.stock === 0).length;

  function clearFilters() {
    setQuery("");
    setGenre("all");
    setFormat("all");
    setStockFilter("all");
    setPricingFilter("all");
    setSort("updated");
  }

  function toggleSelection(bookId: string) {
    setSelectedIds((current) =>
      current.includes(bookId)
        ? current.filter((id) => id !== bookId)
        : [...current, bookId],
    );
  }

  function toggleVisibleSelection() {
    setSelectedIds((current) =>
      allVisibleSelected
        ? current.filter((id) => !visibleIds.includes(id))
        : [...new Set([...current, ...visibleIds])],
    );
  }

  function applyBulkDiscount() {
    if (selectedIds.length === 0) {
      setNotice("Select at least one title to apply a preview discount.");
      return;
    }

    setBooks((current) =>
      current.map((book) =>
        selectedIds.includes(book.id)
          ? {
              ...book,
              originalPrice: book.originalPrice ?? book.price,
              price: Number((book.price * 0.9).toFixed(2)),
              updatedAt: Date.now(),
            }
          : book,
      ),
    );
    setNotice(
      `10% preview discount applied to ${selectedIds.length} selected title${selectedIds.length === 1 ? "" : "s"}. Changes are not saved.`,
    );
  }

  function deleteSelected() {
    if (selectedIds.length === 0) {
      setNotice("Select at least one title to remove it from this preview.");
      return;
    }

    setBooks((current) =>
      current.filter((book) => !selectedIds.includes(book.id)),
    );
    setNotice(
      `${selectedIds.length} title${selectedIds.length === 1 ? "" : "s"} removed from this preview. Changes are not saved.`,
    );
    setSelectedIds([]);
  }

  function exportCatalog() {
    const csvRows = [
      ["Title", "Author", "ISBN", "SKU", "Genre", "Format", "Stock", "Price"],
      ...visibleBooks.map((book) => [
        book.title,
        book.author,
        book.isbn,
        book.sku,
        book.genre,
        book.format,
        String(book.stock),
        book.price.toFixed(2),
      ]),
    ];
    const csv = csvRows
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "koala-bookstore-catalog-preview.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Preview catalog exported as CSV.");
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-5 pb-10">
        <section className="flex flex-col gap-5 rounded-xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 text-body-sm text-secondary">
            <Link
              className="transition hover:text-primary"
              href="/admin/dashboard"
            >
              Catalog &amp; Products
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-on-surface">
              Search &amp; Modify Products
            </span>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <h1 className="font-display text-headline-md font-bold tracking-tight sm:text-headline-lg">
                Search &amp; Modify Catalog
              </h1>
              <p className="mt-2 text-body-sm leading-relaxed text-secondary">
                Search across 1,420 titles in the bookstore database, adjust
                real-time stock and pricing, or open full product specs to
                modify.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-label-sm text-on-surface-variant transition hover:bg-surface-container"
                onClick={exportCatalog}
                type="button"
              >
                <Download aria-hidden="true" size={17} />
                Export CSV / Barcodes
              </button>
              <button
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-label-sm text-on-surface-variant transition hover:bg-surface-container"
                onClick={applyBulkDiscount}
                type="button"
              >
                <BadgePercent aria-hidden="true" size={17} />
                Bulk Price Adjustment
              </button>
              <Link
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-label-sm text-on-primary shadow-sm transition hover:bg-on-primary-container"
                href="/admin/dashboard/AddNewProduct"
              >
                <Plus aria-hidden="true" size={17} />
                Add New Title
              </Link>
            </div>
          </div>
        </section>

        <section
          aria-label="Catalog summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <article className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-fixed text-on-primary-fixed">
              <LibraryBig aria-hidden="true" size={21} />
            </span>
            <span>
              <span className="block text-body-sm text-secondary">
                Total Titles
              </span>
              <span className="block font-display text-title-md font-bold">
                1,420
              </span>
            </span>
          </article>
          <article className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
              <CircleAlert aria-hidden="true" size={21} />
            </span>
            <span>
              <span className="block text-body-sm text-secondary">
                Low Stock Alerts
              </span>
              <span className="block font-display text-title-md font-bold">
                {lowStockCount} Titles
              </span>
            </span>
          </article>
          <article className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-fixed text-on-secondary-fixed">
              <CheckCircle2 aria-hidden="true" size={21} />
            </span>
            <span>
              <span className="block text-body-sm text-secondary">
                Out of Stock
              </span>
              <span className="block font-display text-title-md font-bold">
                {outOfStockCount} Titles
              </span>
            </span>
          </article>
          <article className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
              <Tags aria-hidden="true" size={21} />
            </span>
            <span>
              <span className="block text-body-sm text-secondary">
                Promos &amp; Picks
              </span>
              <span className="block font-display text-title-md font-bold">
                142 Active
              </span>
            </span>
          </article>
        </section>

        <section
          aria-label="Search and filter catalog"
          className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm sm:p-5"
        >
          <label className="relative block">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary"
              size={20}
            />
            <input
              autoComplete="off"
              className="h-12 w-full rounded-xl bg-surface-container-low pl-12 pr-20 text-body-sm placeholder:text-outline focus:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary-container"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, author, ISBN-10/13, SKU, or discovery tags..."
              type="search"
              value={query}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-outline-variant bg-surface-container-lowest px-2 py-1 text-caption text-secondary sm:flex">
              Ctrl K
            </span>
          </label>

          <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative">
                <span className="sr-only">Genre filter</span>
                <select
                  className="h-10 appearance-none rounded-lg bg-surface-container-low py-2 pl-3 pr-9 text-label-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  onChange={(event) => setGenre(event.target.value)}
                  value={genre}
                >
                  <option value="all">Genre: All Genres (12)</option>
                  {genres.map((item) => (
                    <option key={item} value={item}>
                      Genre: {item}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                  size={15}
                />
              </label>
              <label className="relative">
                <span className="sr-only">Format filter</span>
                <select
                  className="h-10 appearance-none rounded-lg bg-surface-container-low py-2 pl-3 pr-9 text-label-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  onChange={(event) => setFormat(event.target.value)}
                  value={format}
                >
                  <option value="all">Format: All Formats</option>
                  <option value="Hardcover">Format: Hardcover</option>
                  <option value="Paperback">Format: Paperback</option>
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                  size={15}
                />
              </label>
              <label className="relative">
                <span className="sr-only">Stock filter</span>
                <select
                  className="h-10 appearance-none rounded-lg bg-surface-container-low py-2 pl-3 pr-9 text-label-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  onChange={(event) =>
                    setStockFilter(event.target.value as StockFilter)
                  }
                  value={stockFilter}
                >
                  <option value="all">Stock: All Stock</option>
                  <option value="in-stock">Stock: In Stock</option>
                  <option value="low-stock">Stock: Low Stock</option>
                  <option value="out-of-stock">Stock: Out of Stock</option>
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                  size={15}
                />
              </label>
              <label className="relative">
                <span className="sr-only">Pricing filter</span>
                <select
                  className="h-10 appearance-none rounded-lg bg-surface-container-low py-2 pl-3 pr-9 text-label-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  onChange={(event) =>
                    setPricingFilter(event.target.value as PricingFilter)
                  }
                  value={pricingFilter}
                >
                  <option value="all">Pricing: All Pricing</option>
                  <option value="on-sale">Pricing: On Sale</option>
                  <option value="full-price">Pricing: Full Price</option>
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                  size={15}
                />
              </label>
              <button
                className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 text-label-sm text-secondary transition hover:bg-surface-container-low hover:text-on-surface"
                onClick={clearFilters}
                type="button"
              >
                <FilterX aria-hidden="true" size={16} />
                Clear Filters
              </button>
            </div>

            <label className="flex items-center gap-2 text-label-sm text-secondary">
              Sort:
              <span className="relative">
                <select
                  className="h-10 appearance-none rounded-lg bg-surface-container-low py-2 pl-3 pr-9 text-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
                  onChange={(event) =>
                    setSort(event.target.value as SortOption)
                  }
                  value={sort}
                >
                  <option value="updated">Last Updated (Newest)</option>
                  <option value="title">Title (A–Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="stock">Stock (Low to High)</option>
                </select>
                <ArrowDownWideNarrow
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                  size={15}
                />
              </span>
            </label>
          </div>
        </section>

        {selectedIds.length > 0 && (
          <section
            aria-label="Bulk actions"
            className="flex flex-col justify-between gap-3 rounded-xl bg-primary-fixed px-4 py-3 text-on-primary-fixed sm:flex-row sm:items-center"
          >
            <div className="flex flex-wrap items-center gap-2 text-label-sm">
              <Check aria-hidden="true" size={17} />
              <span>
                {selectedIds.length} title{selectedIds.length === 1 ? "" : "s"}{" "}
                selected
              </span>
              <span aria-hidden="true" className="hidden sm:inline">
                |
              </span>
              <button
                className="underline decoration-on-primary-fixed/40 underline-offset-2 hover:decoration-on-primary-fixed"
                onClick={toggleVisibleSelection}
                type="button"
              >
                Select all {visibleBooks.length} matching titles
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-container px-3 py-2 text-label-sm text-on-primary-container transition hover:bg-primary hover:text-on-primary"
                onClick={applyBulkDiscount}
                type="button"
              >
                <BadgePercent aria-hidden="true" size={16} />
                Apply Promo (-10%)
              </button>
              <button
                className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container-lowest px-3 py-2 text-label-sm text-error transition hover:bg-error-container"
                onClick={deleteSelected}
                type="button"
              >
                <Trash2 aria-hidden="true" size={16} />
                Delete Selected
              </button>
            </div>
          </section>
        )}

        <section
          aria-label="Catalog inventory"
          className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container-high px-4 py-4 sm:px-5">
            <div>
              <h2 className="font-display text-title-md font-semibold">
                Catalog Inventory
              </h2>
              <p className="mt-0.5 text-body-sm text-secondary">
                Showing {visibleBooks.length} preview title
                {visibleBooks.length === 1 ? "" : "s"}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed/60 px-3 py-1.5 text-caption font-medium text-on-tertiary-fixed">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-tertiary"
              />
              Demo inventory · not connected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="bg-surface-container-low text-label-sm text-secondary">
                <tr>
                  <th className="px-4 py-3 text-center font-semibold">
                    <input
                      aria-label="Select all visible titles"
                      checked={allVisibleSelected}
                      className="h-4 w-4 accent-primary"
                      onChange={toggleVisibleSelection}
                      type="checkbox"
                    />
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    Book Title &amp; Details
                  </th>
                  <th className="px-4 py-3 font-semibold">Editions / SKUs</th>
                  <th className="px-4 py-3 font-semibold">
                    Department &amp; Tags
                  </th>
                  <th className="px-4 py-3 font-semibold">Inventory Level</th>
                  <th className="px-4 py-3 font-semibold">
                    Retail &amp; Margin
                  </th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high text-body-sm">
                {visibleBooks.map((book) => (
                  <tr
                    className="group transition-colors hover:bg-surface-container-low/60"
                    key={book.id}
                  >
                    <td className="px-4 py-4 text-center align-middle">
                      <input
                        aria-label={`Select ${book.title}`}
                        checked={selectedIds.includes(book.id)}
                        className="h-4 w-4 accent-primary"
                        onChange={() => toggleSelection(book.id)}
                        type="checkbox"
                      />
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex min-w-[250px] items-center gap-3">
                        <BookCover title={book.title} genre={book.genre} />
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 font-display text-label-md font-semibold text-on-surface transition-colors group-hover:text-primary">
                            {book.title}
                          </h3>
                          <p className="mt-1 text-body-sm text-secondary">
                            {book.author}
                          </p>
                          <p className="mt-1 font-mono text-caption text-outline">
                            ISBN {book.isbn}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <span className="block text-on-surface">
                        {book.format}
                      </span>
                      <span className="mt-1 block font-mono text-caption text-secondary">
                        SKU {book.sku}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <span className="inline-flex max-w-40 rounded-full bg-secondary-fixed px-2.5 py-1 text-caption text-on-secondary-fixed">
                        {book.genre}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <span className="block font-semibold text-on-surface">
                        {book.stock} copies
                      </span>
                      <span className="mt-1 block text-caption text-secondary">
                        Reorder at 6
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <span className="block font-semibold text-on-surface">
                        {formatPrice(book.price)}
                      </span>
                      {book.originalPrice !== undefined && (
                        <span className="mt-1 flex items-center gap-1 text-caption text-secondary">
                          <span className="text-outline line-through">
                            {formatPrice(book.originalPrice)}
                          </span>
                          <span className="rounded bg-tertiary-fixed px-1 py-0.5 text-on-tertiary-fixed">
                            SALE
                          </span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-caption font-semibold ${getStockStyle(book.stock)}`}
                      >
                        {getStockLabel(book.stock)}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex justify-end">
                        <Link
                          aria-label={`Edit ${book.title}`}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-label-sm text-primary transition hover:bg-primary-fixed/50"
                          href={`/admin/dashboard/SearchAndModify/ModifyProduct/${book.id}`}
                        >
                          <Edit3 aria-hidden="true" size={16} />
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {visibleBooks.length === 0 && (
                  <tr>
                    <td className="px-4 py-14 text-center" colSpan={8}>
                      <PackageSearch
                        aria-hidden="true"
                        className="mx-auto mb-3 text-outline"
                        size={30}
                      />
                      <p className="font-display text-title-sm font-semibold">
                        No titles match these filters
                      </p>
                      <p className="mt-1 text-body-sm text-secondary">
                        Try a different search or clear the filters.
                      </p>
                      <button
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-label-sm text-primary hover:bg-surface-container-low"
                        onClick={clearFilters}
                        type="button"
                      >
                        <FilterX aria-hidden="true" size={16} />
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-container-high px-4 py-3 text-caption text-secondary sm:px-5">
            <span>
              {visibleBooks.length} preview title
              {visibleBooks.length === 1 ? "" : "s"} shown
            </span>
            <span>Catalog actions are local preview only.</span>
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
