import Image from "next/image";
import {
  ArrowRightFromLine,
  Truck,
  Banknote,
  BookHeart,
  SparklesIcon,
  BookOpen,
  RocketIcon,
  Brain,
  Landmark,
  Atom,
  Wallpaper,
  ShoppingCartPlus
} from "lucide-react";

const heroBooks = [
  {
    title: "Klara and the Sun",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBm4PC7wPS4SOWBKbBVngWrZi-e8_hzhOhFR9BYVx82nqqzzSyR2hWeoNWQUslgrVQvssVA46RaGBQPYCm5SpPuBT9N7QReNL05vzHfMkhMJCVvX2Lb8layE5YyjVandb7HgSUJJjbve-qJCPRiXnbcjwCJMOZiFJG-ou3k4rOp-EWvKOQ-Fe_ziFIrTdMmkDXW4m2ia_4L46mBCtsN7M1tbA6K3pJ8PSRFz6S5XrUg996epIba9E4H0w",
    className: "left-0 bottom-6 -rotate-12 z-10 hover:-rotate-6",
  },
  {
    title: "The Midnight Library",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpZ3L0xSQhUx1BWwMkJk1tWCXoFpZtXV97ElscWfR8XUX61qqnRfBQQ_zMBYNHHNripvSIg8eOXDEAkgaCoMItr8IPZG8pajasDyG9SaENtZSNngQW8-Ot4S-mmS4aTc-aey57h_xgw3XQxCUeSqmep11uqQKNpln_gvXamwMSprZqXEH-rUNDQhFqIE2pMQtOcWeyx-aGKw3aBO9idF8pqHBWefRePddtRPWbbAs5jL8lGJOcXrlfNw",
    className: "right-0 bottom-4 rotate-12 z-20 hover:rotate-6",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLYTk7h-cxwFprSGTQ592PtDW3uVZMX7veHdejBJxvzGqkqsRN1xOVXNr3f2jcHzsbisx56DV_xrGGsz-RODmmZMiL3p-GWAmc_TBcOF4dKaQMD7wViBsbLObU3j7GteRzxiqfEyvMWS1nlxVribATPVicNdvfWjtwkk5R7roF1MiLybI7RimZMR4Rkgs4TzZAXzByUo90zG_M1rAeGSVi8Sln8WdWgL_5mU-pcZsAhPnh1QhXQ4RRoA",
    className: "relative z-30 hover:scale-105",
  },
];

const benefits = [
  {
    icon: <Truck />,
    title: "Free Shipping",
    description: "On domestic orders over $35, delivered in 2–4 days.",
    iconClass: "bg-secondary-container text-on-secondary-container",
  },
  {
    icon: <BookHeart />,
    title: "Real Reader Curation",
    description: "Handpicked reads from passionate local booksellers.",
    iconClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  {
    icon: <Banknote />,
    title: "Cash on Delivery",
    description: "Pay when your book package arrives at your door.",
    iconClass: "bg-surface-container text-on-surface",
  },
  {
    icon: <SparklesIcon />,
    title: "Premium Quality",
    description: "The finest prints for the lovliest of readers.",
    iconClass: "bg-surface-container text-on-surface",
  },
];

const categories = [
  {
    icon: <BookOpen/>,
    title: "Fiction & Literature",
    description: "420+ curated titles",
  },
  {
    icon: <RocketIcon/>,
    title: "Sci-Fi & Fantasy",
    description: "280+ curated titles",
  },
  {
    icon: <Brain/>,
    title: "Mystery & Thriller",
    description: "195+ curated titles",
  },
  {
    icon: <Landmark/>,
    title: "Biographies & Memoirs",
    description: "150+ curated titles",
  },
  {
    icon: <Atom/>,
    title: "Science & Tech",
    description: "110+ curated titles",
  },
  {
    icon: <Wallpaper/>,
    title: "Graphic Novels & Manga",
    description: "240+ curated titles",
  },
];

const books = [
  {
    title: "Yellowface",
    author: "R.F. Kuang",
    price: "$18.50",
    originalPrice: "$24.00",
    rating: "4.8",
    reviews: "340",
    discount: "-23% OFF",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2ho7aPx-lA8SjBpVwvbO2VoOkIHXu2ItF5AQa-jP2dVeJll9_shlEahEOrU2DUNoWnJEPrctbopgjQJRpwp-xzwwZiXApuhFeBIUI39799fPQxMh7L0CbcrAc_xk5bDUzYpYI9KE7KjP2OVavAHLrPGE6XFjQM1n4Rcu2mE8ladZR2YJugSgZD3Dsdexz7wQIODlxUYWr2lQG7yFZM9V_4FhC-POeSYXnSxE8HX_65dRmDkmADYTsYg",
  },
  {
    title: "Before the Coffee Gets Cold",
    author: "Toshikazu Kawaguchi",
    price: "$14.99",
    rating: "4.7",
    reviews: "512",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqmu0pfmZqwULZgbg5wL9nQLe5VlUgDK7tI7nl29mVGU7ZaByfwU0BZlmvxPSkp0aXNc-xm1Ih5-2-6xxunyBrGdWEux2R0ZGox3HI63FrJWL5MfmMti1DfoRah33BwyAyvuncDGvL-Pfjb86idTiys2SB9XovUIHwcpUCIyj7zWKWRB5Vlv0jNGHkzVgxxu1Z9xQKjqpkFNFwzfs6INHrJxKm3a6Zc3PfibxC0IKGaZjUSBJMIPChoQ",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: "$16.25",
    rating: "4.9",
    reviews: "1,204",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCn8wIv_lUYqpvQ9l50Dr_c02zAH6FEBizemrfnFzS2FKL5ROzadx1ceUdrLz6WT63r6trCnP6st4wMthwjMsc7bRkUX4xxdEg2lvG0gBIH6xqk3pHHwtUSqxFGlEllFa2TxceMyktttSIMeeKyMV4ubc6ZSqJF9uHQ6DS_L3QWQkywupVBKpxc2TtdzanZ3i_HXrx1XvqDKqHgA2VO4vAlJ_zKaIFwPbs_OMpOq6dmU4bx9A_peFBdZA",
  },
  {
    title: "A Day of Fallen Night",
    author: "Samantha Shannon",
    price: "$22.00",
    originalPrice: "$28.00",
    rating: "4.9",
    reviews: "219",
    discount: "-21% OFF",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX72MKyGlkaBevba1DdomYKEKGP8SFZtrEpDgoXqM2bIjGkucvSQBMB_kVpXVm5VCt54Q2b4M52V5TmOBsCO_SVGadxA3h_45CHqNa2htwizDyG7CNR-cT4F5tyKo110t-R_MkH4Egx-7O2GxtrSL3GtH0hhdAHbDSh6wMsqhamGnb_I__e2a2NccODsBgScuqjpg_3Ml3Qh_WCqqIT5aTbRPW3p_zdBLMsC1yqHyDjjGWFYp72y7nug",
  },
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

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <main className="w-full bg-surface pt-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 pb-20 lg:px-12">
          <section className="relative grid items-center gap-12 overflow-hidden rounded-3xl bg-secondary-container/40 p-8 shadow-sm sm:p-12 lg:grid-cols-12 lg:gap-8 lg:p-16">
            <div className="flex flex-col items-start gap-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-3.5 py-1.5 text-label-sm font-semibold tracking-wide shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
                <span>Cozy Reads &amp; Thoughtful Stories</span>
              </div>
              <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight md:text-display">
                Escape into stories that feel like home.
              </h1>
              <p className="max-w-xl text-body-lg leading-relaxed text-on-surface-variant">
                Discover curated bestsellers, indie gems, and handpicked
                literary treasures delivered right to your doorstep with love
                and care.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-7 py-3.5 font-title-sm text-surface-container-lowest shadow-md transition hover:brightness-105"
                >
                  Explore Catalog <ArrowRightFromLine color="#ffffff" />
                </a>
              </div>
              {/* <div className="flex items-center gap-4 pt-4 text-on-surface-variant">
                <div className="flex -space-x-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-label-sm font-bold text-on-primary-fixed">MK</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary-fixed text-label-sm font-bold text-on-tertiary-fixed">JR</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-fixed text-label-sm font-bold text-on-secondary-fixed">AL</span>
                </div>
                <span className="text-caption">
                  Joined by <strong className="font-semibold text-on-surface">14,200+</strong> avid readers this month
                </span>
              </div> */}
            </div>
            <div className="relative flex min-h-96 items-center justify-center py-6 lg:col-span-5">
              <div className="absolute h-72 w-72 rounded-full bg-surface-container-lowest/80 shadow-inner sm:h-88 sm:w-88" />
              <div className="relative flex h-96 w-72 items-center justify-center sm:w-80">
                {heroBooks.map((book) => (
                  <div
                    key={book.title}
                    className={`absolute aspect-2/3 w-44 overflow-hidden rounded-xl bg-surface-container shadow-xl transition-transform duration-300 sm:w-48 ${book.className}`}
                  >
                    <Image
                      src={book.image}
                      alt={`Cover of ${book.title}`}
                      fill
                      sizes="(min-width: 640px) 192px, 176px"
                      loading="eager"
                      className="object-cover"
                    />
                  </div>
                ))}
                {/* <div className="absolute -bottom-3 -right-2 z-40 flex items-center gap-2.5 rounded-2xl bg-surface-container-lowest px-4 py-2.5 shadow-xl sm:-right-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                    <Icon className="text-sm">star</Icon>
                  </span>
                  <span className="flex flex-col">
                    <span className="text-label-sm font-bold">Staff Favorite</span>
                    <span className="text-caption text-on-surface-variant">4.9 ★ Community Score</span>
                  </span>
                </div> */}
              </div>
            </div>
          </section>

          <section
            aria-label="Why readers choose us"
            className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="flex items-start gap-4 rounded-2xl bg-surface-container-lowest p-6 shadow-sm transition hover:shadow-md"
              >
                <span
                  className={`shrink-0 rounded-xl p-3 ${benefit.iconClass}`}
                >
                  {benefit.icon}
                </span>
                <div>
                  <h2 className="font-title-sm text-title-sm">
                    {benefit.title}
                  </h2>
                  <p className="mt-1 text-body-sm text-on-surface-variant">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <section id="categories" className="flex scroll-mt-32 flex-col gap-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-label-sm font-semibold uppercase tracking-wider text-primary">
                  Collections
                </span>
                <h2 className="mt-1 font-display text-headline-lg font-bold tracking-tight">
                  Find Your Next Obsession
                </h2>
              </div>
              <a
                href="#categories"
                className="flex items-center gap-1.5 font-title-sm text-primary transition-colors hover:text-on-primary-container"
              >
                View all categories{" "}
                <ArrowRightFromLine/>
              </a>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <a
                  key={category.title}
                  href="#featured"
                  className={`group flex items-center justify-between rounded-2xl p-6 shadow-sm transition hover:shadow-md ${
                    [
                      "bg-secondary-container/30 hover:bg-secondary-container/60",
                      "bg-surface-container hover:bg-surface-container-high",
                      "bg-tertiary-fixed/30 hover:bg-tertiary-fixed/60",
                      "bg-surface-container-low hover:bg-surface-container",
                      "bg-primary-fixed/30 hover:bg-primary-fixed/60",
                      "bg-tertiary-fixed/20 hover:bg-tertiary-fixed/50",
                    ][index]
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container-lowest text-primary shadow-sm transition-transform group-hover:scale-110">
                      {category.icon}
                    </span>

                    <span className="flex flex-col">
                      <span className="font-title-md text-title-md transition-colors group-hover:text-primary">
                        {category.title}
                      </span>

                      {/* <span className="text-body-sm text-on-surface-variant">
                        {category.description}
                      </span> */}
                    </span>
                  </span>

                  <div className="text-on-surface-variant transition-transform group-hover:translate-x-1">
                    <ArrowRightFromLine color="#006591"/>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="featured" className="flex scroll-mt-32 flex-col gap-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-label-sm font-semibold uppercase tracking-wider text-primary">
                  Weekly Selections
                </span>
                <h2 className="mt-1 font-display text-headline-lg font-bold tracking-tight">
                  Featured Reads on our Shelves
                </h2>
              </div>
              {/* <div
                aria-label="Book filters"
                className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0"
              >
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-secondary-container px-4 py-2 text-label-md font-semibold text-on-secondary-container shadow-sm"
                >
                  Trending Now
                </button>
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-surface-container-lowest px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Editor&apos;s Choice
                </button>
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-surface-container-lowest px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  New Releases
                </button>
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-surface-container-lowest px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Award Winners
                </button>
              </div> */}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {books.map((book) => (
                <article
                  key={book.title}
                  className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-4 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                >
                  <div>
                    <div className="relative mb-4 aspect-2/3 overflow-hidden rounded-xl bg-surface-container">
                      <Image
                        src={book.image}
                        alt={`Cover of ${book.title} by ${book.author}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {book.discount && (
                        <span className="absolute left-3 top-3 rounded-full bg-tertiary-fixed px-2.5 py-1 text-label-sm font-bold text-on-tertiary-fixed shadow-sm">
                          {book.discount}
                        </span>
                      )}
                      {/* <button
                        type="button"
                        aria-label={`Add ${book.title} to wishlist`}
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest/90 text-on-surface-variant shadow-sm transition-colors hover:text-error"
                      >
                        <Icon className="text-lg">favorite</Icon>
                      </button> */}
                    </div>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-label-sm font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
                        In Stock
                      </span>
                      <span className="flex items-center gap-1 text-caption text-on-surface-variant">
                        <Icon className="text-xs text-amber-500">star</Icon>
                        <strong className="text-on-surface">
                          {book.rating}
                        </strong>{" "}
                        ({book.reviews})
                      </span>
                    </div>
                    <h3 className="truncate font-title-md text-title-md font-semibold transition-colors group-hover:text-primary">
                      {book.title}
                    </h3>
                    <p className="mt-0.5 text-body-sm text-outline">
                      {book.author}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2 pt-4">
                    <span className="flex items-baseline gap-1.5">
                      <strong className="font-display text-headline-sm">
                        {book.price}
                      </strong>
                      {book.originalPrice && (
                        <del className="text-body-sm text-outline">
                          {book.originalPrice}
                        </del>
                      )}
                    </span>
                    <button
                      type="button"
                      aria-label={`Add ${book.title} to cart`}
                      className="flex items-center justify-center rounded-xl bg-primary-container p-2.5 text-surface-container-lowest shadow-sm transition hover:brightness-105 cursor-pointer"
                    >
                      <ShoppingCartPlus color="#006591" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}
