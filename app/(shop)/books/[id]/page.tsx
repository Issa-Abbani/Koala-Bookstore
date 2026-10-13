"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";

type Product = {
  id: string;
  title: string;
  author: string;
  price: number;
  format: string;
  rating: string;
  reviews: string;
  category: string;
  image: string;
  originalPrice?: number;
};

const logo =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9UUokMTzxSsu8O1zd_avOuUmAbckbME79VRQKX-QUfF4g_fUDLL230Vlq3C2jCD1Zenvx4KyMxMB90HqdtyRD4spq0pOzr71xpXMXJStHrmLuVMXIKhFA7h7mYTgRxBGCQfjGuH6xCKrvX8Uucd2YKfwlDMDIyGtTwnveLdXO6Rf41YP44E8rpSx1oJO5xVYlzbWqfjvhEHgE9vjPbsR1HNAiFml67z9Y_tcSfPy6SmfOYwDDFPf8GA";

const products: Product[] = [
  {
    id: "tomorrow-and-tomorrow-and-tomorrow",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    price: 18.99,
    format: "Hardcover",
    rating: "4.9",
    reviews: "1,420",
    category: "Fiction",
    originalPrice: 28,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKt5o0-dMHlLfVxC5XpJyneBlC4dp8PmoxAxDAQhgK10thKTp5ZlenrVC4E1H7wqVU2QGxmKoiYAgLlSp4GjQMFLISGjeTsmmHtVw91viExspaO4FYzjGnJGHLaRjqTOexW8tNJRKP4Kz6_9AhvjA8SzuCGsha5mE0A4_9IT_nVwK7eThrYEcnT2K8cXFflPcqZ2dnuaJG5s4yrAtewZaeH2C2bh3URQ3f4U3395_0EEn7klzae8Q7Kg",
  },
  {
    id: "the-midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 15.5,
    format: "Paperback",
    rating: "4.8",
    reviews: "3,890",
    category: "Fiction",
    originalPrice: 20,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDio5GaFNAnFLecudEBfdYdU2YLsb4LejR0Dr8gWkFaU3PRmDg2gZofn09Xy60rcVo0dvwNjniqkdvRHPCfNST0mhkY8vAfnZYty_iu5BGgB-OInXV1pqQlPpSi89SQD-e9gL_N9E1jtSQ3AKhVhmfPxNPkro5JFHCBeIyejR0E2pkbWpgnL-cYCL0-PtEyCuVZT9W5yjw53BAHcNdB_uWNJ9HNybVzFA0FtSRwUmoFYU4P3-P991cl3Q",
  },
  {
    id: "babel-an-arcane-history",
    title: "Babel: An Arcane History",
    author: "R.F. Kuang",
    price: 21.99,
    format: "Hardcover Special",
    rating: "4.9",
    reviews: "2,110",
    category: "Sci-Fi & Fantasy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6IJ9_hAxN8h3M4vxOtK-2aJRZLW3ACycUZj0nstCq5e-hkAp2BTF9htS9UVBusOkV5_Y1tmNh9Xize7cHCQVyeHhA1HGJKUpqTP6Xd9SI7-61dDqyBNTQr6GEArXZq-0BKAI0V4WLsD1s-WZcvWNnDBaJULszcZe-icPeA6Nu0m94V0pwXhS9O3D8WYFNQ1x0LSM1OjuLeGA5_CemZmBLHkE9RaU0t6_hDK5Nh9wJevdDxkgnfoABZA",
  },
  {
    id: "demon-copperhead",
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    price: 19.99,
    format: "Paperback",
    rating: "4.9",
    reviews: "5,240",
    category: "Fiction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHLWLcBUWwH8vq9o4btkivqu1yqmO5m2pHDM7aQWdFrhgR6so6W5Z7jrK87BYv7S6-Q7gtP5zM3attQe8CDTlHEJnVAcpipBTuC2wA3m4jTCb1V76IpWSC4enHEb31b3abzTkZ_LEOR8LWM4EiazCrWr2mNy4wV6AslxYPBCFObH4hC6Gk0s-Ip03ST_2ZakU3wYyMpoqfdO2hIH7HKLqttym5hgxmyt1fVa8Mv6DxzqXuCVKmFS2HSQ",
  },
  {
    id: "sea-of-tranquility",
    title: "Sea of Tranquility",
    author: "Emily St. John Mandel",
    price: 16.5,
    format: "Paperback",
    rating: "4.7",
    reviews: "940",
    category: "Sci-Fi & Fantasy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD56my86U9ADBRtP9ivb5pgYZtPJOxXvP-kjaX97fMg2ctbP6Yh3tUDIQwf6N8Wu_6Y3hsSFMaIG_b7jHotsUUqJBkaBKLKygv3D94XG4MP7a0ptKfBGklGwkkPp7ssRZ3GU20OMHj7kd0cptCQdjqyzOcTQ9L98IeqiWCK-mGsipntXMZnD6XtkJ3fEIx5ixxpPIgj-GabVxgF93bwSI5f7HKY_IbkMs3zLnGP-goXSlgwuej33LK8UA",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    price: 17.99,
    format: "Hardcover",
    rating: "4.9",
    reviews: "12,980",
    category: "Self-Development",
    originalPrice: 24,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVhwbRaotLeUNTMCEQdzGAZst35UByTEwjHXNfTsi0tt3dxea4G5jdlGUnIOYzSwaXbSypBH7_cyYooyYiaWRh4BD8CeHgA8PBwLnOA-KWQBIEo_Tix2EHYG79Y4Fq6TtRwQwQqtdMFJGAKnm7wjjmyp8tfKZwGJGm9p4Bm7cvnQUj5CypTKbwnkdgbXtVXQrhYPAQ2MtqXuZzEYn4ss9vATq9BSioomxAOCOv5fhajWPLUm-ilkxlCw",
  },
  {
    id: "piranesi",
    title: "Piranesi",
    author: "Susanna Clarke",
    price: 14.25,
    format: "Paperback",
    rating: "4.9",
    reviews: "1,780",
    category: "Sci-Fi & Fantasy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0VC_eTU859QkdwVoj4pao005dtSYAvB8a2_HkRDYknJUvCj9LB9jxvKymwN_A25bPvNPENTdneNChN28-7MXBgRM9SXl9ZiFfCvCXP6Sc7PQmJ-u12fwYU6C3ctcSX20Ild4BTZ1X2Ig2p5G6O74TYzImJI5gJCrEiWnF15s0L0jUub7FkbOMbtHaZb2li3tjlpGAtgINjIdGpMvGNCs1onLFT-tkfhUz6_TnqzGxVVzV8PRqeeNUTA",
  },
  {
    id: "braiding-sweetgrass",
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    price: 18,
    format: "Paperback",
    rating: "4.9",
    reviews: "3,450",
    category: "Non-fiction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbztXyp-yasXacQrZ83NAqxUwvBSfPN2khtcMLe2IiAhDGl-67XrTFtx3Yy_hc3bqP27JhGSLnbq2NqNo-4737jnFtssDub-CepF5e274Oru-cfkXJZbHrd8954KfHXKDwgmN-ubi6jQbWwYdxbBYhL0gtMWCXd4IxNfiugSWAI2wnnsYc6aStxQ-HggBpkQ-Z2UHiA2ALKrx9dnuAi7cpjbqJibfot31DPYdZht1YpE4VIbxXoM2Tyg",
  },
  {
    id: "the-song-of-achilles",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 16,
    format: "Paperback",
    rating: "4.8",
    reviews: "4,830",
    category: "Fiction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPVKet_AbBKCHCHgEdyQW5RKCLfHIufhRslWAPY0Urrjj5dfBlk9WT67XMlIUf98mg3-meXp2HWji6YHcm-fxyk6x6J4FVQnjlFkLCfF6kZ_XB3oG_K5LjV-Qqk7STWeTvdkZds8RuZHKlgTkHu3BGfX3h2Cg8FAJI4Ct6-uPAsrUxpavcvWDmWGAlOEhZL72c2Q6SRKCElhWTK6DpI8iNMJ7943pr5jbChWeDD5oFnOM22-TtmlkGwQ",
  },
];

const gallery = [
  {
    label: "Front",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5xaEcYLYuQrlrdCYQQZTrIr8o17ODln8__WjoTMGWD6bjHFmI-L-WZEkG0JWdjN28WOte96nt-uBg_wIWxWVy4xShBc8brOnR8a5ODT0xpvvyYliCK5QGUEv4SOLwg7aYljVHeX8Fh5TfCrK6cGtZtXdhAt_MEwFEBJMEvAUMQhCxwAoYFXVWs7pOcL7zy1ubpCeYHK0fMnfyd2iFonVbC16JqM2UKoPfg-JOqlij34ezk_Ue27ei0g",
  },
  {
    label: "Spine",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBt4iilzs8iSucNKXVzUc-89uOTYvS79oH26GNfZ85mOqdKG8uZtRXshD76GDk1SW_PkphZq07--BA8Gv6c_6l2qXQ7g2yWhq_wuUHh672ohETWiSj-qVmztD5qRiURu6lKe16fb2GJJF8JzWK9Mx-9bEnEvywP-oVuH8gCwciyu0P98CpkLr8dJ8rOLY9-GY8Jdl0V2rKa5je_qqph_PV3bcTvRF8WQ0V3cAV5IoNnDD0qxIFpapviNg",
  },
  {
    label: "Back",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCq8aggKRZ3JLqqM262xrJbaHki1DfadrGZPf2WRVCKh5M2ULd5WSX0YzMdGhPcCCjqSziNUD43WgCKfiEhACNusMfqZuQEx4fxkKIMplUmQBDzswn1l6ZQU2kZnSWB4yU99DZkdXachrzYpEniPD5iV4ArQkXdQ4bB2hh3lEG11TT8DaYLqgPVT3sdL4qfd8hwEIpfbTvhbcn0hvMT-9vNICGsYzGMZ32io_0Qz9EnXz1EioOnCP7TiQ",
  },
  {
    label: "Interior",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXWzqAuYlRFB4tIcDWx2RTtZqDrBBMaolIBetD7aHaGxZbVaAZQNQnEQi0HpbHKGw0CAvPBU6KuhzotDQKzv0SqEXFtZ8lufjDV9am2sCN2XqrOyShJ-yP0izZoKgvKWHdUt1hd6dX0kKzlOMFB6AiipuqY9huh2SPilSlurCumapQie84DBfFBIrd_X4rcekzYMVynXL1ig3iqazs7ZSk_XXc7Wut6_GEZ8XHioJ8V7d9zmM4UFn_dw",
  },
];

const curatorImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA3sBMFU202nR4bqjsKQXK4MMaJMlOvcm8MLNxIRqh_g5VKJ3bOMQaKsqzbKMCf9MKYgXVY4A0W089I0JASCVcX5WE1x0kzVQfykqd_3Q_r3CT7xNb2Icfkour0UVvGBcwWJIYN1S0BMIPs_13KcHzLOxZc44tJqShbfCgtsBT1P4n1ulIEjA5Ee5OBmOXwApmVjXKftvHmdPIAcrUHs769fu3TUxTm4HPOA-45uVQ5jAHPntdmhFA9aw";

function Icon({ children, className = "" }: { children: string; className?: string }) {
  return <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>{children}</span>;
}

const tabs = ["Synopsis & Editorial Review", "Book Details & Specs", "Customer Reviews", "About the Author"];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function BookDetailsContent() {
  const params = useParams<{ id: string }>();
  const requestedId = decodeURIComponent(params.id ?? "").toLowerCase();
  const product =
    products.find((book) => book.id === requestedId || slugify(book.title) === requestedId) ??
    (requestedId === "1" || requestedId === "book-1" ? products[0] : undefined);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sampleOpen, setSampleOpen] = useState(false);
  const [notice, setNotice] = useState("");

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-surface text-on-surface">
        <main className="mx-auto flex flex-1 flex-col items-center justify-center px-5 text-center">
          <Icon className="text-5xl text-outline">menu_book</Icon>
          <h1 className="mt-4 font-display text-headline-lg">We couldn&apos;t find that book</h1>
          <p className="mt-2 text-body-md text-on-surface-variant">Try another title from our catalog.</p>
          <Link href="/store" className="mt-6 rounded-xl bg-primary px-6 py-3 text-label-md text-on-primary">Browse the catalog</Link>
        </main>
      </div>
    );
  }

  const currentProduct = product;
  const isFeatured = product.id === products[0].id;
  const formats = isFeatured
    ? [
        { name: "Hardcover", price: 18.99, caption: "$18.99" },
        { name: "Paperback", price: 15.5, caption: "$15.50" },
        { name: "Audiobook", price: 21.99, caption: "$21.99 • 14h 23m" },
        { name: "eBook (ePub)", price: 11.99, caption: "$11.99 • Instant" },
      ]
    : [{ name: product.format, price: product.price, caption: `$${product.price.toFixed(2)}` }];
  const activeFormat = selectedFormat || formats[0].name;
  const activePrice = formats.find((format) => format.name === activeFormat)?.price ?? product.price;
  const selectedCover = isFeatured ? gallery[selectedImage]?.image ?? product.image : product.image;
  const relatedBooks = products.filter((book) => book.id !== product.id).slice(0, 4);

  function addToCart() {
    setNotice(`${quantity} ${quantity === 1 ? "copy" : "copies"} of ${currentProduct.title} added to your bag.`);
  }

  function buyNow() {
    setNotice("Cash-on-delivery checkout is a preview and is not connected to an order service.");
  }

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <header className="fixed top-0 z-50 w-full shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-center gap-2 bg-tertiary-fixed px-4 py-2 text-center text-label-sm text-on-tertiary-fixed">
          <Icon className="text-sm">spa</Icon>
          <span>Free shipping on orders over $35 | Use code <strong>KOALALOVE</strong> for 10% off your first read</span>
        </div>
        <div className="bg-surface-container-lowest/95 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 lg:px-12">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <span className="relative h-8 w-[120px]"><Image src={logo} alt="Koala Bookstore" fill sizes="120px" className="object-contain object-left" /></span>
              <span className="hidden flex-col sm:flex"><span className="font-title-md leading-tight tracking-tight">Koala Bookstore</span><span className="text-caption text-on-surface-variant">Your cozy reading nook</span></span>
            </Link>
            <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
              <Link href="/" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Home</Link>
              <Link href="/store" aria-current="page" className="rounded-full bg-secondary-container px-3.5 py-2 font-semibold text-on-secondary-container">Catalog / Store</Link>
              <Link href="/#featured" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Bestsellers</Link>
              <Link href="/#categories" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Categories</Link>
              <Link href="/#spotlight" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Staff Picks</Link>
            </nav>
            <label className="relative hidden max-w-sm flex-1 items-center sm:flex">
              <Icon className="pointer-events-none absolute left-3.5 text-lg text-outline">search</Icon>
              <input aria-label="Search books" className="h-11 w-full rounded-full bg-surface-container-low pl-10 pr-4 text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Search by title, author, ISBN..." type="search" />
            </label>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" aria-label="Wishlist" aria-pressed={favorite} onClick={() => setFavorite((value) => !value)} className="relative rounded-full p-2.5 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-error"><Icon className="text-xl">favorite</Icon><span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-tertiary text-caption text-on-tertiary">{favorite ? 3 : 2}</span></button>
              <Link href="/cart" aria-label="Shopping bag, 3 items" className="relative rounded-full p-2.5 text-on-surface-variant transition-colors hover:bg-surface-container-low"><Icon className="text-xl">shopping_bag</Icon><span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-caption text-on-primary">3</span></Link>
              <Link href="/signin" className="flex items-center gap-2 rounded-full bg-surface-container-low px-2.5 py-1 text-label-md font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container"><Icon className="text-lg">person</Icon></span><span className="hidden md:inline">Sarah M.</span><Icon className="hidden text-base text-outline md:inline">expand_more</Icon></Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative w-full overflow-hidden bg-surface pt-32">
        <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-primary-fixed/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-96 h-80 w-80 rounded-full bg-tertiary-fixed/30 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-12">
          <nav aria-label="Breadcrumb" className="relative z-10 mb-8 flex flex-wrap items-center gap-2 text-caption text-on-surface-variant">
            <Link href="/" className="flex items-center gap-1 hover:text-primary"><Icon className="text-sm">home</Icon>Home</Link>
            <Icon className="text-xs text-outline">chevron_right</Icon>
            <Link href="/store" className="hover:text-primary">Store / Catalog</Link>
            <Icon className="text-xs text-outline">chevron_right</Icon>
            <Link href="/store" className="hover:text-primary">{product.category}</Link>
            <Icon className="text-xs text-outline">chevron_right</Icon>
            <span className="max-w-[220px] truncate font-semibold text-on-surface sm:max-w-none">{product.title}</span>
          </nav>

          {notice && <div role="status" className="relative z-10 mb-6 flex items-center justify-between rounded-xl bg-secondary-container px-4 py-3 text-body-sm text-on-secondary-container"><span>{notice}</span><button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><Icon className="text-base">close</Icon></button></div>}

          <section className="relative z-10 grid items-start gap-10 xl:grid-cols-12 xl:gap-14">
            <div className="flex flex-col gap-6 xl:col-span-5">
              <div className="relative flex flex-col items-center rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-8">
                <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-tertiary-fixed px-3 py-1 text-label-sm text-on-tertiary-fixed shadow-sm"><Icon className="text-sm">auto_awesome</Icon><span>{isFeatured ? "Staff Favorite & NYT Bestseller" : `${product.category} Pick`}</span></div>
                <button type="button" aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={favorite} onClick={() => setFavorite((value) => !value)} className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low/80 shadow-sm transition-all hover:bg-surface-container ${favorite ? "text-error" : "text-on-surface-variant hover:text-error"}`}><Icon className="text-xl">favorite</Icon></button>
                <div className="group relative my-4 flex w-full items-center justify-center">
                  <div className="absolute inset-x-12 bottom-0 h-8 translate-y-4 scale-90 rounded-full bg-on-surface/10 blur-xl" />
                  <div className="relative aspect-[2/3] w-64 overflow-hidden rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-[1.02] sm:w-72">
                    <Image src={selectedCover} alt={`${product.title} by ${product.author}`} fill sizes="(min-width: 640px) 288px, 256px" priority className="rounded-lg object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
                <button type="button" onClick={() => setSampleOpen(true)} className="group mt-4 inline-flex items-center gap-2.5 rounded-full bg-surface-container-low px-5 py-2.5 text-label-md text-on-secondary-container shadow-sm transition-all hover:bg-secondary-container">
                  <Icon className="text-lg text-primary transition-transform group-hover:-rotate-12">menu_book</Icon>Look Inside / Sample Excerpt<Icon className="text-base text-outline">visibility</Icon>
                </button>
              </div>
              {isFeatured && (
                <div className="flex items-center justify-between gap-3 overflow-x-auto rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
                  {gallery.map((item, index) => (
                    <button key={item.label} type="button" aria-pressed={selectedImage === index} onClick={() => setSelectedImage(index)} className={`flex min-w-[70px] flex-1 flex-col items-center gap-1.5 rounded-xl p-2 transition-all ${selectedImage === index ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
                      <span className="relative h-16 w-12 overflow-hidden rounded shadow-sm"><Image src={item.image} alt={`${item.label} view`} fill sizes="48px" className="object-cover" /></span>
                      <span className="text-caption font-semibold">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-start gap-3.5 rounded-xl bg-surface-container-low p-4">
                <span className="shrink-0 rounded-lg bg-primary-fixed p-2 text-primary"><Icon className="text-lg">local_library</Icon></span>
                <div className="space-y-0.5"><h2 className="text-label-md">Koala Reading Guarantee</h2><p className="text-body-sm leading-relaxed text-on-surface-variant">Love it or return within 14 days for a full exchange. Orders arrive in recyclable packaging with a reader card.</p></div>
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:col-span-7">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-surface-container-low px-3 py-1 text-label-sm text-on-surface-variant">{product.format} Edition</span>{isFeatured && <span className="rounded-full bg-surface-container-low px-3 py-1 text-label-sm text-on-surface-variant">Published July 2022</span>}</div>
                <h1 className="font-display text-headline-lg leading-tight tracking-tight">{product.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-body-lg text-on-surface-variant">By <strong className="text-on-surface">{product.author}</strong></span>
                  <span className="text-outline-variant">•</span>
                  <Link href="/store" className="flex items-center gap-0.5 text-label-md text-primary hover:underline">Browse more by author<Icon className="text-sm">arrow_outward</Icon></Link>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a href="#reviews-section" className="flex items-center gap-1.5 rounded-full bg-surface-container-lowest px-3 py-1.5 shadow-sm">
                    <span className="flex text-amber-500"><Icon className="text-base">star</Icon><Icon className="text-base">star</Icon><Icon className="text-base">star</Icon><Icon className="text-base">star</Icon><Icon className="text-base">star_half</Icon></span>
                    <strong className="font-title-sm">{product.rating}</strong><span className="text-caption text-on-surface-variant underline decoration-outline-variant">({product.reviews} reader reviews)</span>
                  </a>
                  <span className="flex items-center gap-1 rounded-full bg-secondary-fixed px-3 py-1 text-caption font-semibold text-on-secondary-fixed"><Icon className="text-sm">verified</Icon>Verified Bookstores Community Pick</span>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl bg-surface-container-lowest p-5 shadow-sm">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-display font-bold leading-none tracking-tight">${activePrice.toFixed(2)}</span>
                  {isFeatured && activeFormat === "Hardcover" && <><span className="font-display text-headline-sm leading-none text-outline line-through">$28.00</span><span className="rounded-full bg-tertiary-fixed px-2.5 py-1 text-label-sm font-bold tracking-wide text-on-tertiary-fixed">SAVE 32%</span></>}
                  <span className="ml-auto text-caption text-tertiary">Includes all local taxes</span>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-label-md font-bold">Choose Edition &amp; Format</span><span className="text-caption text-on-surface-variant">Standard US English</span></div>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {formats.map((format) => (
                      <button key={format.name} type="button" aria-pressed={activeFormat === format.name} onClick={() => setSelectedFormat(format.name)} className={`relative rounded-xl p-3 text-left transition-all ${activeFormat === format.name ? "bg-secondary-container text-on-secondary-container shadow-sm" : "bg-surface-container-low text-on-surface hover:bg-surface-container"}`}>
                        {activeFormat === format.name && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />}
                        <span className="block text-label-md font-bold">{format.name}</span><span className="text-caption">{format.caption}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 rounded-xl bg-surface-container-low/70 p-3.5 text-body-sm">
                  <div className="flex items-center gap-2"><span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-600" /></span><strong className="text-emerald-800">In Stock — Ready to ship in 24 hours</strong><span className="ml-auto text-caption text-outline">23 copies left</span></div>
                  <div className="grid grid-cols-1 gap-2 pt-1 text-caption text-on-surface-variant sm:grid-cols-2"><span className="flex items-center gap-1.5"><Icon className="text-sm text-tertiary">eco</Icon>100% Recyclable FSC protective carton</span><span className="flex items-center gap-1.5"><Icon className="text-sm text-primary">payments</Icon>Cash on Delivery available at checkout</span></div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex shrink-0 items-center rounded-xl bg-surface-container-low p-1">
                      <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container disabled:opacity-40"><Icon className="text-base">remove</Icon></button>
                      <span className="w-10 text-center font-title-sm font-bold">{quantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container"><Icon className="text-base">add</Icon></button>
                    </div>
                    <button type="button" onClick={addToCart} className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-primary-container px-6 font-title-sm text-on-primary shadow-md transition-all hover:bg-primary hover:shadow-lg active:scale-[0.98]"><Icon className="text-xl">shopping_bag</Icon>Add to Cart</button>
                  </div>
                  <button type="button" onClick={buyNow} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-secondary-fixed font-title-sm text-on-secondary-fixed transition-colors hover:bg-secondary-fixed/80"><Icon className="text-lg">local_shipping</Icon>Buy Now with Cash on Delivery</button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1 text-caption text-on-surface-variant"><span className="flex items-center gap-1"><Icon className="text-sm text-outline">schedule</Icon>Estimated delivery: <strong>Tomorrow, 2:00 PM – 6:00 PM</strong></span><Link href="/delivery" className="font-semibold text-primary hover:underline">Delivery details</Link></div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-secondary-container/40 p-6">
                <div className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-secondary-container/60 blur-xl" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-container shadow-sm"><Image src={curatorImage} alt="Sarah, Senior Curator" fill sizes="48px" className="object-cover" /></div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2"><strong className="text-label-md">Curator&apos;s Note</strong><span className="text-caption text-on-surface-variant">• Sarah M., Senior Lit Curator</span><span className="ml-auto rounded-full bg-tertiary-fixed px-2 py-0.5 text-caption font-bold text-on-tertiary-fixed">Must-Read of the Year</span></div>
                    <p className="text-body-md italic leading-relaxed text-on-surface-variant">“A luminous story of creative partnership, friendship, and shared passions—full of warmth and heart.”</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="reviews-section" className="relative z-10 mt-16 scroll-mt-32 pt-8">
            <div role="tablist" aria-label="Book information" className="flex items-center gap-2 overflow-x-auto pb-4">
              {tabs.map((tab, index) => <button key={tab} id={`book-tab-${index}`} type="button" role="tab" aria-selected={activeTab === index} aria-controls={`book-panel-${index}`} onClick={() => setActiveTab(index)} className={`whitespace-nowrap rounded-xl px-5 py-3 font-title-sm transition-all ${activeTab === index ? "bg-surface-container text-on-surface shadow-sm" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"}`}>{tab}{index === 2 && <span className="ml-1 font-bold text-primary">({product.reviews})</span>}</button>)}
            </div>
            <div className="mt-2 min-h-80 rounded-2xl bg-surface-container-lowest p-6 shadow-sm sm:p-10">
              {activeTab === 0 && <div role="tabpanel" id="book-panel-0" aria-labelledby="book-tab-0" className="max-w-4xl space-y-8">
                <div className="space-y-4"><h2 className="font-display text-headline-sm">The Story Behind the Pages</h2><p className="text-body-lg leading-relaxed text-on-surface-variant">{isFeatured ? "A chance reunion brings two childhood friends together again. Their shared love of games sparks a creative partnership that grows alongside their friendship, ambitions, and the complications of adult life." : `${product.title} by ${product.author} is a ${product.category.toLowerCase()} selection from our curated bookstore shelf. Explore reader reviews and edition information, or browse our catalog for more staff-selected titles.`}</p><p className="text-body-md leading-relaxed text-on-surface-variant">{isFeatured ? "Across decades of collaboration and change, the novel considers creativity, friendship, and the worlds people build together." : "Book information shown here is a local catalog preview; edition-specific summaries and publication data are not connected to a live catalog."}</p></div>
                {isFeatured && <div className="max-w-3xl rounded-2xl bg-surface-container-low p-6"><div className="flex items-start gap-4"><Icon className="shrink-0 text-4xl text-primary-container">format_quote</Icon><div className="space-y-2"><p className="font-display text-headline-sm italic text-on-surface">A thoughtful story about the risks and rewards of making something together.</p><span className="block text-label-sm uppercase tracking-wider text-on-surface-variant">— Koala Bookstore editorial note</span></div></div></div>}
                <div className="space-y-3 pt-2"><h3 className="text-label-md font-bold uppercase tracking-wider">Themes &amp; Elements</h3><div className="flex flex-wrap gap-2">{(isFeatured ? ["Video Games", "Friendship", "Creative Partnership", "Coming of Age", "Artistic Ambition"] : [product.category, "Reader Favorite", "Koala Curated"]).map((theme) => <span key={theme} className="rounded-full bg-surface-container px-3.5 py-1.5 text-label-sm">#{theme.replaceAll(" ", "")}</span>)}</div></div>
                {isFeatured && <div className="pt-6"><h3 className="mb-4 text-label-md font-bold uppercase tracking-wider">Edition Specifications</h3><div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{[["ISBN-13", "978-0593321201"], ["Page Count", "416 Pages"], ["Publisher", "Knopf Doubleday"], ["Dimensions", "6.4 x 1.4 x 9.5 in"]].map(([label, value]) => <div key={label} className="space-y-1 rounded-xl bg-surface-container-low p-4"><span className="text-caption text-outline">{label}</span><p className="font-title-sm">{value}</p></div>)}</div></div>}
              </div>}
              {activeTab === 1 && <div role="tabpanel" id="book-panel-1" aria-labelledby="book-tab-1" className="max-w-3xl space-y-6">
                <h2 className="font-display text-headline-sm">Book Details &amp; Specs</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{[["Title", product.title], ["Author", product.author], ["Category", product.category], ["Available Edition", product.format], ["Reader Rating", `${product.rating} / 5 (${product.reviews} reviews)`], ["Availability", "In Stock — Ready to ship"]].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 rounded-lg bg-surface-container-low px-4 py-3"><span className="text-body-sm text-on-surface-variant">{label}</span><span className="text-right text-body-sm font-semibold">{value}</span></div>)}</div>
                <p className="text-caption text-outline">Additional publisher and ISBN information is available for the featured edition only.</p>
              </div>}
              {activeTab === 2 && <div role="tabpanel" id="book-panel-2" aria-labelledby="book-tab-2" className="space-y-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="font-display text-headline-sm">Reader Reviews</h2><p className="text-body-sm text-on-surface-variant">Reader feedback from the Koala bookselling community.</p></div><button type="button" onClick={() => setNotice("Review submission is not connected in this preview.")} className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-label-md text-on-primary hover:bg-primary/90">Write a Review</button></div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{[["Maya R.", "Verified Buyer · 3 days ago"], ["Julian K.", "Verified Buyer · 1 week ago"]].map(([name, meta]) => <article key={name} className="space-y-3 rounded-xl bg-surface-container-low p-5"><div className="flex items-center justify-between gap-2"><strong className="text-label-md">{name}</strong><span className="text-caption text-outline">{meta}</span></div><div className="flex text-amber-500" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((star) => <Icon key={star} className="text-sm">star</Icon>)}</div><p className="text-body-md text-on-surface-variant">Readers praise this title for its memorable characters, inviting storytelling, and the way it stays with them after the final page.</p></article>)}</div>
              </div>}
              {activeTab === 3 && <div role="tabpanel" id="book-panel-3" aria-labelledby="book-tab-3" className="max-w-4xl space-y-5">
                <h2 className="font-display text-headline-sm">About {product.author}</h2>
                {isFeatured ? <p className="text-body-lg leading-relaxed text-on-surface-variant">Gabrielle Zevin is an internationally bestselling novelist whose books have been translated into many languages. Her novels include <em>The Storied Life of A.J. Fikry</em> and <em>Young Jane Young</em>.</p> : <p className="text-body-lg leading-relaxed text-on-surface-variant">{product.author} is the author of {product.title}. More author biography details will be available when the catalog is connected.</p>}
                <Link href="/store" className="inline-flex items-center gap-2 text-label-md font-semibold text-primary hover:underline">Browse the catalog<Icon className="text-base">arrow_forward</Icon></Link>
              </div>}
            </div>
          </section>

          <section className="relative z-10 mt-16 space-y-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><span className="text-label-sm font-semibold uppercase tracking-wider text-primary">Expand your reading shelf</span><h2 className="mt-1 font-display text-headline-lg tracking-tight">Readers Also Explored</h2></div><Link href="/store" className="inline-flex items-center gap-2 text-label-md font-semibold text-primary hover:underline">View entire fiction shelf<Icon className="text-base">arrow_forward</Icon></Link></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedBooks.map((book) => <article key={book.id} className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><Link href={`/books/${book.id}`} className="block"><div className="relative mb-4 aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface-container shadow-sm"><Image src={book.image} alt={`Cover of ${book.title}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute left-2 top-2 rounded-full bg-secondary-fixed px-2 py-0.5 text-caption font-bold text-on-secondary-fixed">{book.category}</span></div><div className="space-y-1"><h3 className="line-clamp-1 font-title-sm font-bold transition-colors group-hover:text-primary">{book.title}</h3><p className="text-body-sm text-on-surface-variant">{book.author}</p><div className="flex items-center gap-1 pt-1 text-amber-500"><Icon className="text-sm">star</Icon><span className="text-caption font-bold text-on-surface">{book.rating}</span><span className="text-caption text-outline">({book.reviews})</span></div></div></Link><div className="mt-2 flex items-center justify-between pt-4"><strong className="font-title-md">${book.price.toFixed(2)}</strong><button type="button" aria-label={`Add ${book.title} to bag`} onClick={() => setNotice(`${book.title} added to your bag.`)} className="flex items-center justify-center rounded-xl bg-surface-container-low p-2.5 text-on-surface transition-colors hover:bg-primary hover:text-on-primary"><Icon className="text-lg">add_shopping_cart</Icon></button></div></article>)}
            </div>
          </section>
        </div>
      </main>

      {sampleOpen && <div role="presentation" onClick={() => setSampleOpen(false)} className="fixed inset-0 z-[60] flex items-center justify-center bg-on-surface/40 p-4 backdrop-blur-sm">
        <section role="dialog" aria-modal="true" aria-labelledby="sample-title" onClick={(event) => event.stopPropagation()} className="flex max-h-[80vh] w-full max-w-2xl flex-col gap-6 rounded-2xl bg-surface-container-lowest p-6 shadow-2xl sm:p-8">
          <div className="flex items-center justify-between gap-3 border-b border-surface-container-low pb-3"><div className="flex items-center gap-3"><Icon className="text-2xl text-primary">menu_book</Icon><div><h2 id="sample-title" className="font-title-md">Sample Preview</h2><p className="text-caption text-on-surface-variant">{product.title} — {product.author}</p></div></div><button type="button" onClick={() => setSampleOpen(false)} aria-label="Close sample preview" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container"><Icon className="text-lg">close</Icon></button></div>
          <div className="overflow-y-auto rounded-xl bg-surface-container-low p-6 text-body-md leading-relaxed text-on-surface-variant"><p>Preview availability varies by edition. You can explore the cover gallery, book details, and reader feedback on this page; a digital chapter preview is not available in this storefront demo.</p></div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-container-low pt-4"><span className="text-caption text-outline">Digital excerpt unavailable in this preview</span><button type="button" onClick={() => { setSampleOpen(false); addToCart(); }} className="rounded-xl bg-primary px-6 py-2.5 text-label-md text-on-primary hover:bg-primary/90">Add to Bag — ${activePrice.toFixed(2)}</button></div>
        </section>
      </div>}

      <footer className="w-full bg-surface-container-low py-16 text-on-surface shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl px-5 lg:px-12">
          <div className="grid gap-10 border-b border-outline-variant/30 pb-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2"><Link href="/" className="flex items-center gap-3"><span className="relative h-8 w-[120px]"><Image src={logo} alt="" fill sizes="120px" className="object-contain object-left" /></span><span className="font-title-md font-bold tracking-tight">Koala Bookstore</span></Link><p className="max-w-sm text-body-md leading-relaxed text-on-surface-variant">Your independent neighborhood sanctuary for curated literature, heartfelt recommendations, and peaceful bookish conversations.</p><div className="flex items-center gap-3 pt-2"><Link aria-label="Bookmarks" href="/#featured" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:text-primary"><Icon className="text-lg">bookmark</Icon></Link><Link aria-label="Reviews" href="#reviews-section" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:text-primary"><Icon className="text-lg">rate_review</Icon></Link><Link aria-label="Store location" href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:text-primary"><Icon className="text-lg">storefront</Icon></Link></div></div>
            <div><h2 className="font-title-sm">Explore &amp; Shop</h2><ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant"><li><Link href="/store" className="hover:text-primary">Fiction</Link></li><li><Link href="/store" className="hover:text-primary">Non-fiction</Link></li><li><Link href="/store" className="hover:text-primary">New Arrivals</Link></li><li><Link href="/store" className="hover:text-primary">Rare &amp; Indie</Link></li></ul></div>
            <div><h2 className="font-title-sm">Customer Support</h2><ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant"><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Order Tracking</a></li><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Delivery Info</a></li><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Returns &amp; FAQ</a></li><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Contact</a></li></ul></div>
            <div><h2 className="font-title-sm">Community &amp; Perks</h2><ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant"><li><Link href="/#newsletter" className="hover:text-primary">Book Club</Link></li><li><Link href="/#newsletter" className="hover:text-primary">Koala Rewards</Link></li><li><Link href="/#newsletter" className="hover:text-primary">Gift Cards</Link></li><li><Link href="/#newsletter" className="hover:text-primary">Reading Events</Link></li></ul></div>
          </div>
          <div className="my-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-surface-container p-6 text-center md:flex-row md:text-left"><div className="space-y-1"><h2 className="font-title-md">Join the Reading Haven</h2><p className="text-body-sm text-on-surface-variant">Receive weekly author conversations, literary dispatches, and member-only quiet hours.</p></div><Link href="/#newsletter" className="shrink-0 rounded-xl bg-primary px-6 py-3 text-label-md text-on-primary transition-colors hover:bg-primary/90">Join the newsletter</Link></div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/30 pt-8 text-center text-caption text-on-surface-variant md:flex-row"><p>© 2025 Koala Bookstore Inc. All rights reserved. Made with love for fellow bookworms.</p><div className="flex flex-wrap items-center justify-center gap-6"><span>Cash on Delivery</span><span>Secure Cards</span><span>Apple Pay</span><span>Gift Tokens</span></div><div className="flex items-center gap-4"><a href="mailto:haven@koalabooks.com?subject=Privacy%20Policy" className="hover:text-on-surface">Privacy Policy</a><a href="mailto:haven@koalabooks.com?subject=Terms%20of%20Service" className="hover:text-on-surface">Terms of Service</a></div></div>
        </div>
      </footer>
    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-surface text-body-md text-on-surface-variant">
          Loading book details...
        </main>
      }
    >
      <BookDetailsContent />
    </Suspense>
  );
}