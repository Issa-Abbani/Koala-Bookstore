"use client";

import { Funnel, Grid3X3, List, Search, ShoppingCartPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

type Book = {
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  format: string;
  rating: number;
  reviews: string;
  inStock: boolean;
  badge?: string;
  category: string;
  image: string;
};

const logo =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9UUokMTzxSsu8O1zd_avOuUmAbckbME79VRQKX-QUfF4g_fUDLL230Vlq3C2jCD1Zenvx4KyMxMB90HqdtyRD4spq0pOzr71xpXMXJStHrmLuVMXIKhFA7h7mYTgRxBGCQfjGuH6xCKrvX8Uucd2YKfwlDMDIyGtTwnveLdXO6Rf41YP44E8rpSx1oJO5xVYlzbWqfjvhEHgE9vjPbsR1HNAiFml67z9Y_tcSfPy6SmfOYwDDFPf8GA";

const books: Book[] = [
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    price: 18.99,
    format: "Hardcover",
    rating: 4.9,
    reviews: "1,420",
    inStock: true,
    category: "Fiction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPMPocRNft93dxjDDiDxHvOLkhwXksqhaAKRjFp-eMxyflOQHHW5w8ZnwnYYZuBmqfF_5Isl5BZXhgnH2yuah8L3K_RU6EqLHeFbD7hUfK6Nqq0Af-cvIAPomigKecVVw7bfuicEpEae_14jDZTWLLoa0pLzUNnF7TMgTh1RaZF1N-8Gyt7FAgykAhmR5cZzsWQTA55pQlvJYCxq_nvkKOuK0ZllE10ZLCl36XVYIwZy420yfK22clFA",
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 15.5,
    originalPrice: 20,
    format: "Paperback",
    rating: 4.8,
    reviews: "3,890",
    inStock: true,
    badge: "SALE",
    category: "Fiction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5e2xdeTIpcGnol5Y_YgcfxmlY-XwQ_YBKRz64pDkPoEijQZPK5oA9EoQqRiG_QCxgwvDY23ELl-mMtT1wRtQ4CtQC-E9QugclJn3eg6cMiF-OzIYk3VwQJv8ng2GPwza2suEjmYPXwdGMhNBFGCdSyewgUdxoDtevHwnM-e3uooqKZFqa1F8MIacAjFTiMQc8Cull59R74dhVj2Q9fX2G2Nf4gQ2zEc5UbksXVfQDBrjEcigvs9ahLA",
  },
  {
    title: "Babel: An Arcane History",
    author: "R.F. Kuang",
    price: 21.99,
    format: "Hardcover Special",
    rating: 4.9,
    reviews: "2,110",
    inStock: true,
    badge: "Staff Favorite",
    category: "Sci-Fi & Fantasy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm1LXKxKtcgU6WmlvyJ5bScCOC3XICzPCtBtDoM0oe9fqiD_uTNn-tsfRLVll3GVP2UaHEW1469EG6JZZc2FUlxQv1SroL7XC7UD1U7KyJ4_12l6_2lQu14yW0agQ3GvWLk_yHD1O2cYIoNoWisiVpA3vOyY75x0JMa9TjqsQvPtmiXnehbj0QD77RqPqCXY1KIWgkZMo24nWkNDZrX9AOxcRqWxb5zZ4v_i5VejP25RGfzRk6ufjMOw",
  },
  {
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    price: 19.99,
    format: "Paperback",
    rating: 4.9,
    reviews: "5,240",
    inStock: true,
    badge: "Pulitzer Winner",
    category: "Fiction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHLWLcBUWwH8vq9o4btkivqu1yqmO5m2pHDM7aQWdFrhgR6so6W5Z7jrK87BYv7S6-Q7gtP5zM3attQe8CDTlHEJnVAcpipBTuC2wA3m4jTCb1V76IpWSC4enHEb31b3abzTkZ_LEOR8LWM4EiazCrWr2mNy4wV6AslxYPBCFObH4hC6Gk0s-Ip03ST_2ZakU3wYyMpoqfdO2hIH7HKLqttym5hgxmyt1fVa8Mv6DxzqXuCVKmFS2HSQ",
  },
  {
    title: "Sea of Tranquility",
    author: "Emily St. John Mandel",
    price: 16.5,
    format: "Paperback",
    rating: 4.7,
    reviews: "940",
    inStock: true,
    category: "Sci-Fi & Fantasy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcC6O2fPR7tmm3Wl24QueiXstdZEEexzRer6sRcILAqzvhLNjt_rMvdv09gce5YBdjWh0wlbLzl4ZKzgTVg21m_nBU9watLHUecVgdmpZHw3341UaKKWLdPsi1csWDYviGU1HgPh1RbioQJLfjzO-8C895UBTnlGOWnla-OUzvNfnV2tuEuvCSbr6On9yTPd8LqzB-9xqt71Q4BTEDFZpnTmYe7JOBIL-IRfBtk0qaOJJPE46jvTIu8g",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 17.99,
    originalPrice: 24,
    format: "Hardcover",
    rating: 4.9,
    reviews: "12,980",
    inStock: true,
    badge: "SALE",
    category: "Self-Development",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVhwbRaotLeUNTMCEQdzGAZst35UByTEwjHXNfTsi0tt3dxea4G5jdlGUnIOYzSwaXbSypBH7_cyYooyYiaWRh4BD8CeHgA8PBwLnOA-KWQBIEo_Tix2EHYG79Y4Fq6TtRwQwQqtdMFJGAKnm7wjjmyp8tfKZwGJGm9p4Bm7cvnQUj5CypTKbwnkdgbXtVXQrhYPAQ2MtqXuZzEYn4ss9vATq9BSioomxAOCOv5fhajWPLUm-ilkxlCw",
  },
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    price: 14.25,
    format: "Paperback",
    rating: 4.9,
    reviews: "1,780",
    inStock: true,
    category: "Sci-Fi & Fantasy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDY7uNmp3_kDhXNLrlEKtiIRu28l4GUJrwacRK1rTYAopBD8dTFiU03uoLl5Z2FuGY2DuEDd7RmWz39QrN50u-Xe_Fdg_sfrIdMZnkReU_YMQxPXUoojlbT9M5T-fxg6v2Tte1x06n5o-Mhu2UdUkvA6q_XZ9LRqcqpqkUBsn4IjWO_C4VezyYJq5YUjRwmvNenHv2f8-lk3QrtqYoVykgoDFwdNjUY6IOTPBqFhlpqy-iWqpIMnzldKA",
  },
  {
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    price: 18,
    format: "Paperback",
    rating: 4.9,
    reviews: "3,450",
    inStock: true,
    category: "Non-fiction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbztXyp-yasXacQrZ83NAqxUwvBSfPN2khtcMLe2IiAhDGl-67XrTFtx3Yy_hc3bqP27JhGSLnbq2NqNo-4737jnFtssDub-CepF5e274Oru-cfkXJZbHrd8954KfHXKDwgmN-ubi6jQbWwYdxbBYhL0gtMWCXd4IxNfiugSWAI2wnnsYc6aStxQ-HggBpkQ-Z2UHiA2ALKrx9dnuAi7cpjbqJibfot31DPYdZht1YpE4VIbxXoM2Tyg",
  },
  {
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 16,
    format: "Paperback",
    rating: 4.8,
    reviews: "4,830",
    inStock: true,
    category: "Fiction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPVKet_AbBKCHCHgEdyQW5RKCLfHIufhRslWAPY0Urrjj5dfBlk9WT67XMlIUf98mg3-meXp2HWji6YHcm-fxyk6x6J4FVQnjlFkLCfF6kZ_XB3oG_K5LjV-Qqk7STWeTvdkZds8RuZHKlgTkHu3BGfX3h2Cg8FAJI4Ct6-uPAsrUxpavcvWDmWGAlOEhZL72c2Q6SRKCElhWTK6DpI8iNMJ7943pr5jbChWeDD5oFnOM22-TtmlkGwQ",
  },
];

const categories = [
  "Fiction",
  "Non-fiction",
  "Sci-Fi & Fantasy",
  "Mystery & Crime",
  "Self-Development",
  "Young Adult",
];
const formats = ["Paperback", "Hardcover", "Audiobook edition"];
const quickTags = [
  "All Formats",
  "Hardcover",
  "Paperback",
  "Signed Copies",
  "Bestsellers",
  "Under $20",
];

function Icon({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
    >
      {children}
    </span>
  );
}

export default function StorePage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("100");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [inStock, setInStock] = useState(false);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [quickTag, setQuickTag] = useState("All Formats");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(3);
  const [notice, setNotice] = useState("");

  const visibleBooks = useMemo(() => {
    let result = books.filter((book) => {
      const matchesSearch = `${book.title} ${book.author} ${book.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesDepartment =
        department === "all" ||
        (department === "fiction" && book.category === "Fiction") ||
        (department === "nonfiction" && book.category === "Non-fiction") ||
        (department === "scifi" && book.category === "Sci-Fi & Fantasy") ||
        (department === "indie" &&
          ["R.F. Kuang", "Robin Wall Kimmerer"].includes(book.author));
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(book.category);
      const matchesFormat =
        selectedFormats.length === 0 ||
        selectedFormats.some((format) =>
          book.format.toLowerCase().includes(format.toLowerCase()),
        );
      const matchesQuickTag =
        (quickTag !== "Hardcover" ||
          book.format.toLowerCase().includes("hardcover")) &&
        (quickTag !== "Paperback" ||
          book.format.toLowerCase().includes("paperback")) &&
        (quickTag !== "Signed Copies" ||
          book.format.toLowerCase().includes("signed")) &&
        (quickTag !== "Bestsellers" || book.rating >= 4.9) &&
        (quickTag !== "Under $20" || book.price < 20);
      return (
        matchesSearch &&
        matchesDepartment &&
        matchesCategory &&
        matchesFormat &&
        book.price >= priceRange[0] &&
        book.price <= priceRange[1] &&
        (!inStock || book.inStock) &&
        book.rating >= rating &&
        matchesQuickTag
      );
    });
    if (sort === "price-asc")
      result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating")
      result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [
    department,
    inStock,
    priceRange,
    quickTag,
    rating,
    search,
    selectedCategories,
    selectedFormats,
    sort,
  ]);

  function toggle(
    value: string,
    values: string[],
    update: (next: string[]) => void,
  ) {
    update(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value],
    );
  }

  function resetFilters() {
    setSearch("");
    setDepartment("all");
    setSelectedCategories([]);
    setSelectedFormats([]);
    setMinPrice("0");
    setMaxPrice("100");
    setPriceRange([0, 100]);
    setInStock(false);
    setRating(0);
    setQuickTag("All Formats");
  }

  function applyPrice() {
    const min = Math.max(0, Number(minPrice) || 0);
    const max = Math.max(min, Number(maxPrice) || 100);
    setMinPrice(String(min));
    setMaxPrice(String(max));
    setPriceRange([min, max]);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <main className="w-full bg-surface pt-28">
        <div className="relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-4 lg:px-12">
            <div className="flex flex-col justify-between gap-6 pb-6 md:flex-row md:items-end">
              <div className="max-w-2xl space-y-2">
                <h1 className="font-display text-headline-lg tracking-tight">
                  All Books &amp; Literary Works
                </h1>
                <p className="text-body-md leading-relaxed text-on-surface-variant">
                  Explore 2,400+ handpicked books across fiction, non-fiction,
                  speculative thought, and indie releases, bundled with mindful
                  reading notes.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-3 shadow-sm md:p-4">
              <form
                onSubmit={submitSearch}
                className="flex flex-col items-center gap-3 md:flex-row"
              >
                <label className="relative w-full flex-1">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-outline">
                    <Search color="#006591" />
                  </div>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    id="catalog-search"
                    className="h-12 w-full rounded-xl bg-surface-container-low pl-12 pr-12 text-body-sm placeholder:text-outline focus:bg-surface-container focus:outline-none"
                    placeholder="Search by title, author, keyword, or ISBN..."
                    type="search"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                    >
                      <Icon className="text-lg">close</Icon>
                    </button>
                  )}
                </label>
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-label-md text-on-primary shadow-sm hover:opacity-95 md:w-auto cursor-pointer"
                >
                  Search <Search color="white" />
                </button>
              </form>
              {/* <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                <span className="shrink-0 pl-1 pr-2 text-caption uppercase tracking-wider text-on-surface-variant">
                  Quick Tags:
                </span>
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuickTag(tag)}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-label-sm transition-colors ${quickTag === tag ? "bg-primary-container text-on-primary-fixed shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"}`}
                  >
                    {tag}
                    {tag === "Signed Copies" ? " ✦" : ""}
                  </button>
                ))}
              </div> */}
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 pb-20 lg:px-12">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <aside
              aria-label="Catalog filters"
              className="space-y-6 lg:col-span-3"
            >
              <div className="space-y-6 rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-surface-container pb-4">
                  <div className="flex items-center gap-2">
                    <Funnel color="#006591" />
                    <h2 className="font-title-sm">Filters</h2>
                  </div>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-caption font-semibold text-primary hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <fieldset className="space-y-3">
                  <legend className="text-label-md font-bold">
                    Categories &amp; Genres
                  </legend>
                  <div className="space-y-2 pt-1">
                    {categories.map((category, index) => (
                      <label
                        key={category}
                        className="group flex cursor-pointer items-center justify-between"
                      >
                        <span className="flex items-center gap-2.5 text-body-sm">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() =>
                              toggle(
                                category,
                                selectedCategories,
                                setSelectedCategories,
                              )
                            }
                            className="h-4 w-4 cursor-pointer accent-primary-container"
                          />
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="space-y-3 border-t border-surface-container-low pt-5">
                  <legend className="text-label-md font-bold">
                    Price Range
                  </legend>
                  <div className="flex items-center justify-between gap-3">
                    <label className="flex flex-1 items-center rounded-xl bg-surface-container-low px-3 py-1.5">
                      <span className="mr-1 text-caption text-outline">$</span>
                      <input
                        aria-label="Minimum price"
                        value={minPrice}
                        onChange={(event) => setMinPrice(event.target.value)}
                        max={100}
                        min={0}
                        type="number"
                        className="w-full bg-transparent text-label-md font-semibold focus:outline-none"
                      />
                    </label>
                    <span className="text-caption text-outline">to</span>
                    <label className="flex flex-1 items-center rounded-xl bg-surface-container-low px-3 py-1.5">
                      <span className="mr-1 text-caption text-outline">$</span>
                      <input
                        aria-label="Maximum price"
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                        max={100}
                        min={0}
                        type="number"
                        className="w-full bg-transparent text-label-md font-semibold focus:outline-none"
                      />
                    </label>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-container">
                    <div className="h-full w-3/4 rounded-full bg-primary-container" />
                  </div>
                  <div className="flex justify-between text-[10px] text-outline">
                    <span>$0</span>
                    <span>$50</span>
                    <span>$100+</span>
                  </div>
                  <button
                    type="button"
                    onClick={applyPrice}
                    className="w-full rounded-xl bg-secondary-container py-2 text-label-sm font-semibold text-on-secondary-container hover:bg-surface-container"
                  >
                    Apply Price
                  </button>
                </fieldset>
                <fieldset className="space-y-3 border-t border-surface-container-low pt-5">
                  <legend className="text-label-md font-bold">
                    Availability
                  </legend>
                  <label className="flex cursor-pointer items-center justify-between text-body-sm">
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(event) => setInStock(event.target.checked)}
                        className="h-4 w-4 accent-primary-container"
                      />
                      In Stock only
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </label>
                  <label className="flex cursor-not-allowed items-center justify-between text-body-sm opacity-60">
                    <span className="flex items-center gap-2.5">
                      <input type="checkbox" disabled className="h-4 w-4" />
                      Pre-orders
                    </span>
                    <span className="text-caption text-outline">
                      0 in preview
                    </span>
                  </label>
                </fieldset>
                <fieldset className="space-y-3 border-t border-surface-container-low pt-5">
                  <legend className="text-label-md font-bold">
                    Book Format
                  </legend>
                  <div className="space-y-2">
                    {formats.map((format, index) => (
                      <label
                        key={format}
                        className="flex cursor-pointer items-center justify-between text-body-sm"
                      >
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={selectedFormats.includes(format)}
                            onChange={() =>
                              toggle(
                                format,
                                selectedFormats,
                                setSelectedFormats,
                              )
                            }
                            className="h-4 w-4 accent-primary-container"
                          />
                          {format}
                        </span>
                        <span className="text-caption text-outline">
                          {["1,210", "890", "380"][index]}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </aside>

            <section aria-label="Books" className="space-y-6 lg:col-span-9">
              <div className="flex flex-col justify-between gap-4 rounded-2xl bg-surface-container-lowest p-4 shadow-sm md:flex-row md:items-center md:p-5">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-outline" />
                    <span className="text-label-md font-bold">
                      Showing {visibleBooks.length} curated{" "}
                      {visibleBooks.length === 1 ? "title" : "titles"}
                    </span>
                  </div>
                  {(selectedCategories.length > 0 ||
                    selectedFormats.length > 0 ||
                    search ||
                    quickTag !== "All Formats" ||
                    rating > 0 ||
                    priceRange[0] !== 0 ||
                    priceRange[1] !== 100 ||
                    inStock) && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        ...selectedCategories,
                        ...selectedFormats,
                        ...(search ? [`Search: ${search}`] : []),
                        ...(quickTag !== "All Formats" ? [quickTag] : []),
                        ...(rating ? [`${rating}+ stars`] : []),
                        ...(inStock ? ["In Stock"] : []),
                      ].map((filter) => (
                        <span
                          key={filter}
                          className="inline-flex items-center gap-1 rounded-full bg-secondary-fixed px-2.5 py-1 text-caption font-semibold text-on-secondary-fixed"
                        >
                          {filter}
                          <button
                            type="button"
                            aria-label={`Remove ${filter} filter`}
                            onClick={() => {
                              if (selectedCategories.includes(filter))
                                toggle(
                                  filter,
                                  selectedCategories,
                                  setSelectedCategories,
                                );
                              if (selectedFormats.includes(filter))
                                toggle(
                                  filter,
                                  selectedFormats,
                                  setSelectedFormats,
                                );
                              if (filter.startsWith("Search:")) setSearch("");
                              if (quickTag === filter)
                                setQuickTag("All Formats");
                              if (filter === `${rating}+ stars`) setRating(0);
                              if (filter === "In Stock") setInStock(false);
                            }}
                            className="hover:text-error"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {(priceRange[0] !== 0 || priceRange[1] !== 100) && (
                        <span className="rounded-full bg-secondary-fixed px-2.5 py-1 text-caption font-semibold text-on-secondary-fixed">
                          ${priceRange[0]}–${priceRange[1]}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="ml-1 text-xs text-outline underline hover:text-primary"
                      >
                        Reset
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <label className="flex items-center gap-2 rounded-xl bg-surface-container-low px-3 py-2">
                    <span className="text-caption text-outline">Sort by:</span>
                    <select
                      value={sort}
                      onChange={(event) => setSort(event.target.value)}
                      aria-label="Sort books"
                      className="cursor-pointer bg-transparent text-label-md font-semibold focus:outline-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                    </select>
                  </label>
                  <div className="flex items-center gap-1 rounded-xl bg-surface-container-low p-1">
                    <button
                      type="button"
                      aria-label="Grid view"
                      aria-pressed={view === "grid"}
                      onClick={() => setView("grid")}
                      className={`rounded-lg p-1.5 ${view === "grid" ? "bg-surface-container-lowest text-primary shadow-sm" : "text-outline hover:text-on-surface cursor-pointer"}`}
                    >
                      <Grid3X3 size={16}/>
                    </button>
                    <button
                      type="button"
                      aria-label="List view"
                      aria-pressed={view === "list"}
                      onClick={() => setView("list")}
                      className={`rounded-lg p-1.5 ${view === "list" ? "bg-surface-container-lowest text-primary shadow-sm" : "text-outline hover:text-on-surface cursor-pointer"}`}
                    >
                      <List size={16}/>
                    </button>
                  </div>
                </div>
              </div>
              {notice && (
                <div
                  role="status"
                  className="flex items-center justify-between rounded-xl bg-secondary-container px-4 py-3 text-body-sm text-on-secondary-container"
                >
                  <span>{notice}</span>
                  <button
                    type="button"
                    onClick={() => setNotice("")}
                    aria-label="Dismiss message"
                  >
                    <Icon className="text-base">close</Icon>
                  </button>
                </div>
              )}
              {visibleBooks.length ? (
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid grid-cols-1 gap-4"
                  }
                >
                  {visibleBooks.map((book) => {
                    // const favorite = favorites.includes(book.title);
                    return (
                      <article
                        key={book.title}
                        className={`group flex justify-between rounded-2xl bg-surface-container-lowest p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${view === "list" ? "flex-row gap-5" : "flex-col"}`}
                      >
                        <div
                          className={
                            view === "list" ? "flex min-w-0 gap-5" : "space-y-3"
                          }
                        >
                          <div
                            className={`relative overflow-hidden rounded-xl bg-surface-container ${view === "list" ? "aspect-2/3 w-28 shrink-0 sm:w-36" : "aspect-2/3 w-full"}`}
                          >
                            <Image
                              src={book.image}
                              alt={`${book.title} book cover`}
                              fill
                              sizes={
                                view === "list"
                                  ? "144px"
                                  : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                              }
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {book.badge ? (
                              <span className="absolute left-2.5 top-2.5 rounded-full bg-tertiary-fixed px-2.5 py-1 text-caption font-bold text-on-tertiary-fixed shadow-sm">
                                {book.badge}
                              </span>
                            ) : (
                              <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-surface-container-lowest/90 px-2.5 py-1 text-caption font-semibold text-emerald-700 shadow-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                In Stock
                              </span>
                            )}
                            {/* <button
                              type="button"
                              onClick={() =>
                                toggle(book.title, favorites, setFavorites)
                              }
                              aria-label={
                                favorite
                                  ? `Remove ${book.title} from wishlist`
                                  : `Save ${book.title} to wishlist`
                              }
                              aria-pressed={favorite}
                              className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest/90 shadow-sm hover:text-error ${favorite ? "text-error" : "text-on-surface-variant"}`}
                            >
                              <Icon className="text-base">favorite</Icon>
                            </button> */}
                          </div>
                          <div className="space-y-1 pt-1">
                            <div className="flex items-center gap-1 text-amber-500">
                              <Icon className="text-sm">star</Icon>
                              <span className="text-label-sm font-bold text-on-surface">
                                {book.rating.toFixed(1)}
                              </span>
                              <span className="text-caption text-outline">
                                ({book.reviews})
                              </span>
                            </div>
                            <h2 className="line-clamp-1 font-title-sm transition-colors group-hover:text-primary">
                              {book.title}
                            </h2>
                            <p className="line-clamp-1 text-body-sm text-on-surface-variant">
                              {book.author}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`mt-4 flex items-center justify-between border-t border-surface-container-low pt-4 ${view === "list" ? "min-w-44 flex-col items-end justify-center gap-3 sm:flex-row" : ""}`}
                        >
                          <div>
                            <span className="font-title-md font-bold">
                              ${book.price.toFixed(2)}
                            </span>
                            {book.originalPrice && (
                              <span className="ml-1.5 text-body-sm text-outline line-through">
                                ${book.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="block text-caption text-outline">
                              {book.format}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setCartCount((count) => count + 1);
                              setNotice(`${book.title} added to your cart.`);
                            }}
                            className="flex items-center gap-1.5 rounded-xl bg-primary-container px-3.5 py-2 text-label-md text-on-primary-fixed shadow-sm transition-all hover:bg-primary hover:text-on-primary active:scale-95 cursor-pointer"
                          >
                            <ShoppingCartPlus size={20} />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl bg-surface-container-lowest px-6 py-16 text-center shadow-sm">
                  <Icon className="text-4xl text-outline">menu_book</Icon>
                  <h2 className="mt-3 font-title-md">
                    No books match those filters
                  </h2>
                  <p className="mt-1 text-body-sm text-on-surface-variant">
                    Try adjusting your search or clearing some filters.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-label-md text-on-primary"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
