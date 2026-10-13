"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

type CartBook = {
  id: string;
  title: string;
  author: string;
  edition: string;
  price: number;
  image: string;
  quantity: number;
};

const logo =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9UUokMTzxSsu8O1zd_avOuUmAbckbME79VRQKX-QUfF4g_fUDLL230Vlq3C2jCD1Zenvx4KyMxMB90HqdtyRD4spq0pOzr71xpXMXJStHrmLuVMXIKhFA7h7mYTgRxBGCQfjGuH6xCKrvX8Uucd2YKfwlDMDIyGtTwnveLdXO6Rf41YP44E8rpSx1oJO5xVYlzbWqfjvhEHgE9vjPbsR1HNAiFml67z9Y_tcSfPy6SmfOYwDDFPf8GA";

const demoBooks: CartBook[] = [
  {
    id: "tomorrow",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    edition: "Hardcover (1st Print)",
    price: 18.99,
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoRq7wNMyJzv9SUqKigIk9TsXRjq84E2QPvfQD5N7THMuuIsBmcpJGTVXEGkoM_0sD9Y_Y7u3cTkLyKzmCtAuu0oibADYJ4KuFXrmbkr2STJve6QDBrlaEjwOq-llpA_tC8ZLjXbsEmgmUUSO7PVp3Yv5pl4tot3nC9D4XP0pWjrJWbFW_AVliZYO8kKx8uSh0sVtSdDz8u7ykQ_P2zYqQD7NK09XQLBqMx51O9kMHUkktbBaKjynqOQ",
  },
  {
    id: "tranquility",
    title: "Sea of Tranquility",
    author: "Emily St. John Mandel",
    edition: "Paperback (Deckle Edge)",
    price: 16.5,
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKlRcM_SMSnpBiG356N6m9cVBjRUypnJEBerTzuF39tuQgjuegepE0UW0G_JGh6k2siqVUhN_xiv1AqpH2qjTSWHQKjrpfVlw4P7pIn9rnn1B0MBRqyDvCWUVILgJo7Y6kFOe8hKOI4nzh45nLoe-EzwNHkdwERsM3NMe8XQ_S3KK5t66jFbw4qD8RwEGVXo3ivWQ7citLcr2rsPlLMW_ZrL9VabybTviZ_EdPuWpIpOEMwxOkvntFtg",
  },
];

const addOns = [
  {
    id: "blind-date",
    title: "Mystery Blind Date Paperback",
    description: "Wrapped in brown kraft with hand-written clues.",
    price: 9.99,
    icon: "mystery",
  },
  {
    id: "gift-wrap",
    title: "Botanical Kraft Gift Wrapping",
    description: "Includes jute twine, eucalyptus sprig & card.",
    price: 3.5,
    icon: "featured_seasonal_and_gifts",
  },
];

function Icon({ children, className = "", title }: { children: string; className?: string; title?: string }) {
  return (
    <span aria-hidden="true" title={title} className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}

function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function CartPage() {
  const [items, setItems] = useState<CartBook[]>(demoBooks);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState("KOALALOVE");
  const [promoApplied, setPromoApplied] = useState(true);
  const [notice, setNotice] = useState("");

  const bookCount = items.reduce((count, item) => count + item.quantity, 0);
  const hasGiftPerk = bookCount > 1;
  const itemCount = bookCount + (hasGiftPerk ? 1 : 0) + selectedAddOns.length;

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= 35 ? 0 : 4.99;
    const addOnTotal = addOns
      .filter((addOn) => selectedAddOns.includes(addOn.id))
      .reduce((sum, addOn) => sum + addOn.price, 0);
    const discount = promoApplied ? Math.round(subtotal * 10) / 100 : 0;
    return {
      subtotal,
      shipping,
      addOnTotal,
      discount,
      total: Math.max(0, subtotal + shipping + addOnTotal - discount),
      shippingProgress: Math.min((subtotal / 35) * 100, 100),
      shippingRemaining: Math.max(35 - subtotal, 0),
    };
  }, [items, promoApplied, selectedAddOns]);

  function updateQuantity(id: string, delta: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
    setNotice("Book removed from your reading bag.");
  }

  function clearCart() {
    setItems([]);
    setSelectedAddOns([]);
    setPromoApplied(false);
    setNotice("Your reading bag is now empty.");
  }

  function restoreDemoItems() {
    setItems(demoBooks);
    setSelectedAddOns([]);
    setPromoCode("KOALALOVE");
    setPromoApplied(true);
    setNotice("Demo cart items restored.");
  }

  function applyPromo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (promoCode.trim().toUpperCase() === "KOALALOVE" && bookCount > 0) {
      setPromoCode("KOALALOVE");
      setPromoApplied(true);
      setNotice("KOALALOVE applied: 10% off your books.");
    } else if (bookCount === 0) {
      setNotice("Add a book to your bag before applying a promo code.");
    } else {
      setPromoApplied(false);
      setNotice("That demo promo code isn't recognized. Try KOALALOVE.");
    }
  }

  function toggleAddOn(id: string) {
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <header className="fixed top-0 z-50 w-full shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-center gap-2 bg-tertiary-fixed px-4 py-2 text-center text-label-sm text-on-tertiary-fixed">
          <Icon className="text-sm">spa</Icon>
          <span>
            Free shipping on orders over $35 | Use code <strong>KOALALOVE</strong> for 10% off your first read
          </span>
        </div>
        <div className="bg-surface-container-lowest/95 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 lg:px-12">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <span className="relative h-8 w-[120px]">
                <Image src={logo} alt="Koala Bookstore" fill sizes="120px" className="object-contain object-left" />
              </span>
              <span className="hidden flex-col sm:flex">
                <span className="font-title-md leading-tight tracking-tight">Koala Bookstore</span>
                <span className="text-caption text-on-surface-variant">Your cozy reading nook</span>
              </span>
            </Link>
            <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
              <Link href="/" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Home</Link>
              <Link href="/store" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Catalog / Store</Link>
              <Link href="/#featured" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Bestsellers</Link>
              <Link href="/#categories" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Categories</Link>
              <Link href="/#spotlight" className="rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">Staff Picks</Link>
            </nav>
            <label className="relative hidden max-w-sm flex-1 items-center sm:flex">
              <Icon className="pointer-events-none absolute left-3.5 text-lg text-outline">search</Icon>
              <input aria-label="Search books" className="h-11 w-full rounded-full bg-surface-container-low pl-10 pr-4 text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Search by title, author, ISBN..." type="search" />
            </label>
            <div className="flex shrink-0 items-center gap-2">
              <Link href="/#featured" aria-label="Wishlist" className="relative rounded-full p-2.5 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">
                <Icon className="text-xl">favorite</Icon>
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-tertiary text-caption text-on-tertiary">2</span>
              </Link>
              <Link href="/cart" aria-label={`Shopping bag, ${itemCount} items`} className="relative rounded-full bg-secondary-container p-2.5 text-on-secondary-container">
                <Icon className="text-xl">shopping_bag</Icon>
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-caption text-on-primary">{itemCount}</span>
              </Link>
              <Link href="/signin" aria-label="Sign in" className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                <Icon className="text-xl">person</Icon>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full bg-surface pt-32">
        <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-body-sm text-on-surface-variant">
            <Link href="/" className="flex items-center gap-1 transition-colors hover:text-primary"><Icon className="text-sm">home</Icon>Home</Link>
            <span className="text-outline-variant">/</span>
            <Link href="/store" className="transition-colors hover:text-primary">Store</Link>
            <span className="text-outline-variant">/</span>
            <span className="font-semibold text-on-surface">Shopping Bag &amp; Cart</span>
          </nav>

          <section className="relative mb-8 overflow-hidden rounded-2xl bg-surface-container-lowest p-6 shadow-sm lg:p-8" aria-labelledby="cart-title">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <h1 id="cart-title" className="font-display text-headline-lg tracking-tight">Your Reading Bag</h1>
                <span className="rounded-full bg-secondary-container px-3 py-1 text-label-sm text-on-secondary-container">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
              </div>
              <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <Icon className="text-lg text-primary">local_shipping</Icon>
                <span>Free express delivery on orders over <strong className="text-label-md text-on-surface">$35.00</strong></span>
              </div>
            </div>
            {items.length > 0 && (
              <div className="rounded-xl bg-surface-container-low p-4">
                <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 text-body-sm">
                  <span className="flex items-center gap-2 font-semibold text-on-surface">
                    <Icon className="text-base text-tertiary">celebration</Icon>
                    {totals.shippingRemaining > 0
                      ? <>You are <span className="text-primary">${totals.shippingRemaining.toFixed(2)}</span> away from FREE Shipping!</>
                      : "Your bag qualifies for FREE Shipping!"}
                  </span>
                  <span className="text-caption uppercase tracking-wider text-on-surface-variant">{Math.round(totals.shippingProgress)}% Reached</span>
                </div>
                <div
                  role="progressbar"
                  aria-label="Free shipping progress"
                  aria-valuemin={0}
                  aria-valuemax={35}
                  aria-valuenow={Math.min(totals.subtotal, 35)}
                  className="relative h-2.5 w-full overflow-hidden rounded-full bg-surface-container-highest"
                >
                  <div className="relative h-full rounded-full bg-primary-container transition-all duration-700" style={{ width: `${totals.shippingProgress}%` }} />
                </div>
              </div>
            )}
          </section>

          {notice && (
            <div role="status" className="mb-6 flex items-center justify-between rounded-xl bg-secondary-container px-4 py-3 text-body-sm text-on-secondary-container">
              <span>{notice}</span>
              <button type="button" onClick={() => setNotice("")} aria-label="Dismiss message"><Icon className="text-base">close</Icon></button>
            </div>
          )}

          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                <section aria-label="Cart items and add-ons" className="flex flex-col gap-6 lg:col-span-8">
                  <div className="overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
                    <div className="hidden grid-cols-12 gap-4 bg-surface-container-low px-6 py-4 text-label-sm uppercase tracking-wider text-on-surface-variant sm:grid">
                      <span className="col-span-6">Book Title</span>
                      <span className="col-span-2 text-right">Price</span>
                      <span className="col-span-2 text-center">Quantity</span>
                      <span className="col-span-2 text-right">Subtotal</span>
                    </div>
                    <div className="divide-y divide-surface-container-low">
                      {items.map((item) => (
                        <article key={item.id} className="p-5 transition-colors hover:bg-surface-container-low/40 sm:p-6">
                          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
                            <div className="flex min-w-0 items-center gap-4 sm:col-span-6">
                              <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg bg-surface-container shadow-sm">
                                <Image src={item.image} alt={`${item.title} book cover`} fill sizes="80px" className="object-cover" />
                              </div>
                              <div className="flex min-w-0 flex-col">
                                <span className="mb-1 inline-flex w-max items-center gap-1 rounded-full bg-[#E6F4EA] px-2 py-0.5 text-xs font-semibold text-[#23865B]">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#23865B]" /> In Stock
                                </span>
                                <h2 className="truncate font-title-sm">{item.title}</h2>
                                <p className="truncate text-body-sm text-on-surface-variant">{item.author}</p>
                                <span className="mt-1 text-caption text-outline">Edition: {item.edition}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-end">
                              <span className="text-body-sm text-on-surface-variant sm:hidden">Unit Price:</span>
                              <span className="font-label-md font-semibold">{formatPrice(item.price)}</span>
                            </div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-center">
                              <span className="text-body-sm text-on-surface-variant sm:hidden">Quantity:</span>
                              <div className="flex items-center rounded-full bg-surface-container-low px-2 py-1 shadow-sm">
                                <button type="button" aria-label={`Decrease ${item.title} quantity`} onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1} className="flex h-7 w-7 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-40"><Icon className="text-sm">remove</Icon></button>
                                <span aria-live="polite" className="w-8 text-center text-label-md font-semibold">{item.quantity}</span>
                                <button type="button" aria-label={`Increase ${item.title} quantity`} onClick={() => updateQuantity(item.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"><Icon className="text-sm">add</Icon></button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 sm:col-span-2 sm:justify-end">
                              <span className="text-body-sm text-on-surface-variant sm:hidden">Subtotal:</span>
                              <span className="font-title-sm font-bold">{formatPrice(item.price * item.quantity)}</span>
                              <button type="button" aria-label={`Remove ${item.title}`} onClick={() => removeItem(item.id)} className="rounded-full p-1.5 text-outline transition-colors hover:bg-error/10 hover:text-error"><Icon className="text-lg">delete</Icon></button>
                            </div>
                          </div>
                        </article>
                      ))}
                      {hasGiftPerk && (
                        <article className="bg-tertiary-fixed/20 p-5 transition-colors sm:p-6">
                          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
                            <div className="flex min-w-0 items-center gap-4 sm:col-span-6">
                              <div className="flex aspect-[2/3] w-20 shrink-0 items-center justify-center rounded-lg bg-tertiary-fixed shadow-sm"><Icon className="text-3xl text-tertiary">local_florist</Icon></div>
                              <div className="flex min-w-0 flex-col">
                                <span className="mb-1 inline-flex w-max items-center gap-1 rounded-full bg-tertiary-fixed px-2.5 py-0.5 text-xs font-semibold text-on-tertiary-container"><Icon className="text-xs">redeem</Icon>Complimentary Reader Perk</span>
                                <h2 className="truncate font-title-sm">Recycled Botanical Bookmark &amp; Sleeve</h2>
                                <p className="text-body-sm text-on-surface-variant">Koala Bookstore Edition</p>
                                <span className="mt-1 text-caption text-tertiary">Included with every multi-book package</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-end"><span className="text-body-sm text-on-surface-variant sm:hidden">Unit Price:</span><span className="font-label-md font-semibold text-tertiary line-through">$4.00</span></div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-center"><span className="text-body-sm text-on-surface-variant sm:hidden">Quantity:</span><span className="rounded-full bg-surface-container px-3 py-1 text-label-md text-on-surface-variant">1 (Gift)</span></div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-end"><span className="text-body-sm text-on-surface-variant sm:hidden">Subtotal:</span><span className="font-title-sm font-bold text-tertiary">FREE</span></div>
                          </div>
                        </article>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-surface-container-low bg-surface-container-lowest p-5 sm:p-6">
                      <Link href="/store" className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-4 py-2.5 text-label-md transition-colors hover:bg-surface-container"><Icon className="text-base">arrow_back</Icon>Continue Browsing Books</Link>
                      <button type="button" onClick={clearCart} className="flex items-center gap-1.5 text-label-md text-on-surface-variant transition-colors hover:text-error"><Icon className="text-base">remove_shopping_cart</Icon>Clear Cart</button>
                    </div>
                  </div>

                  <section aria-labelledby="addons-title" className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                      <Icon className="text-xl text-primary">auto_stories</Icon>
                      <h2 id="addons-title" className="font-title-md">Curator&apos;s Add-Ons</h2>
                      <span className="ml-auto rounded-full bg-secondary-container/50 px-2.5 py-0.5 text-caption text-on-surface-variant">Reader Treats</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {addOns.map((addOn) => {
                        const selected = selectedAddOns.includes(addOn.id);
                        return (
                          <article key={addOn.id} className="flex items-center justify-between gap-4 rounded-xl bg-surface-container-low p-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className={`flex h-16 w-12 shrink-0 items-center justify-center rounded shadow-sm ${addOn.id === "blind-date" ? "bg-tertiary-fixed text-tertiary" : "bg-secondary-fixed text-primary"}`}><Icon>{addOn.icon}</Icon></div>
                              <div className="min-w-0">
                                <h3 className="truncate text-label-md">{addOn.title}</h3>
                                <p className="line-clamp-1 text-body-sm text-on-surface-variant">{addOn.description}</p>
                                <span className="font-label-md font-bold">+{formatPrice(addOn.price)}</span>
                              </div>
                            </div>
                            <button type="button" aria-pressed={selected} onClick={() => toggleAddOn(addOn.id)} className={`shrink-0 rounded-full px-4 py-2 text-label-sm font-semibold transition-all ${selected ? "bg-primary text-on-primary" : "bg-primary-fixed text-on-primary-fixed hover:bg-primary-container hover:text-on-primary"}`}>
                              {selected ? "Added" : "+ Add"}
                            </button>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                </section>

                <aside aria-label="Order summary" className="flex flex-col gap-4 lg:sticky lg:top-32 lg:col-span-4">
                  <div className="relative rounded-2xl bg-surface-container-lowest p-6 shadow-sm lg:p-7">
                    <h2 className="mb-5 font-title-md">Order Summary</h2>
                    <div className="space-y-3.5 border-b border-surface-container-low pb-6 text-body-md text-on-surface-variant">
                      <div className="flex items-center justify-between"><span>Items Subtotal ({bookCount} {bookCount === 1 ? "book" : "books"})</span><span className="font-semibold text-on-surface">{formatPrice(totals.subtotal)}</span></div>
                      {totals.addOnTotal > 0 && <div className="flex items-center justify-between"><span>Reader treats</span><span className="font-semibold text-on-surface">{formatPrice(totals.addOnTotal)}</span></div>}
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5">Standard Shipping<Icon title="Delivery in 2-3 business days" className="text-sm text-outline">help_outline</Icon></span>
                        {totals.shipping === 0 ? <span className="flex items-center gap-1 font-semibold text-[#23865B]"><span className="rounded-full bg-[#E6F4EA] px-2 py-0.5 text-xs">Qualified</span>FREE</span> : <span className="font-semibold text-on-surface">{formatPrice(totals.shipping)}</span>}
                      </div>
                      <div className="flex items-center justify-between"><span>Eco-Packaging &amp; Perk</span><span className="font-semibold text-tertiary">FREE</span></div>
                      <div className="flex items-center justify-between text-body-sm"><span>Estimated Tax</span><span className="text-outline">Calculated at checkout</span></div>
                    </div>
                    <div className="border-b border-surface-container-low py-5">
                      <form onSubmit={applyPromo} className="mb-3 flex gap-2">
                        <label className="sr-only" htmlFor="promo-code">Promo code</label>
                        <input id="promo-code" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Enter promo code" type="text" className="h-11 min-w-0 flex-1 rounded-xl bg-surface-container-low px-4 text-body-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary-container" />
                        <button type="submit" className="h-11 shrink-0 rounded-xl bg-surface-container px-5 text-label-md transition-colors hover:bg-secondary-container">{promoApplied ? "Applied" : "Apply"}</button>
                      </form>
                      {promoApplied && (
                        <div className="flex items-center justify-between gap-2 rounded-lg bg-secondary-fixed/50 p-2.5 text-caption text-on-secondary-fixed">
                          <span className="flex items-center gap-1.5 font-semibold"><Icon className="text-base text-primary">check_circle</Icon>KOALALOVE applied (10% off books)</span>
                          <span className="font-bold text-primary">-{formatPrice(totals.discount)}</span>
                        </div>
                      )}
                    </div>
                    <div className="pb-6 pt-5">
                      <div className="mb-1 flex items-baseline justify-between gap-3">
                        <span className="font-title-sm">Total Order</span>
                        <div className="text-right">
                          <span className="font-display text-3xl font-bold leading-none tracking-tight text-[#16324F]">{formatPrice(totals.total)}</span>
                          <span className="mt-1 block text-caption text-on-surface-variant">USD incl. current promos</span>
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={() => setNotice("Checkout is a visual preview and is not connected to an order service.")} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-4 font-display text-headline-sm text-on-primary shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-[0.99]">
                      Proceed to Checkout<Icon>arrow_forward</Icon>
                    </button>
                    <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-surface-container-low p-3 text-body-sm text-on-surface-variant">
                      <Icon className="mt-0.5 shrink-0 text-lg text-primary">payments</Icon>
                      <p><strong>Cash on Delivery</strong> gladly accepted nationwide. Inspect your titles upon arrival before paying.</p>
                    </div>
                    <div className="mt-6 space-y-3 border-t border-surface-container-low pt-6 text-body-sm text-on-surface-variant">
                      <div className="flex items-center gap-3"><Icon className="text-lg text-primary">eco</Icon><span>100% Recycled &amp; plastic-free book wraps</span></div>
                      <div className="flex items-center gap-3"><Icon className="text-lg text-primary">assignment_return</Icon><span>14-day hassle-free reader return guarantee</span></div>
                      <div className="flex items-center gap-3"><Icon className="text-lg text-primary">support_agent</Icon><span>Friendly neighborhood book concierge support</span></div>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          ) : (
            <section className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-20 text-center" aria-labelledby="empty-cart-title">
              <div className="relative mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-surface-container-low text-primary">
                <Icon className="text-6xl text-primary/70">shopping_bag</Icon>
                <span className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-sm"><Icon className="text-xl">auto_stories</Icon></span>
              </div>
              <h2 id="empty-cart-title" className="mb-3 font-display text-headline-lg tracking-tight">Your reading bag is empty</h2>
              <p className="mb-8 max-w-md text-body-lg text-on-surface-variant">Your reading bag is waiting for its first story. Discover this week&apos;s staff-curated fiction, heartfelt memoirs, and coffee-table treasures.</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/store" className="rounded-full bg-primary-container px-8 py-3.5 font-title-sm text-on-primary shadow-md transition hover:opacity-90">Explore Bestsellers</Link>
                <button type="button" onClick={restoreDemoItems} className="rounded-full bg-surface-container px-6 py-3.5 text-label-md transition-colors hover:bg-surface-container-high">Restore Active Demo Items</button>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="w-full bg-surface-container-low py-16 text-on-surface shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl px-5 lg:px-12">
          <div className="grid gap-10 border-b border-outline-variant/30 pb-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              <Link href="/" className="flex items-center gap-3">
                <span className="relative h-8 w-[120px]"><Image src={logo} alt="" fill sizes="120px" className="object-contain object-left" /></span>
                <span className="font-title-md font-bold tracking-tight">Koala Bookstore</span>
              </Link>
              <p className="max-w-sm text-body-md leading-relaxed text-on-surface-variant">Your independent neighborhood sanctuary for curated literature, heartfelt recommendations, and peaceful bookish conversations.</p>
              <div className="flex items-center gap-3 pt-2">
                <Link aria-label="Bookmarks" href="/#featured" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"><Icon className="text-lg">bookmark</Icon></Link>
                <Link aria-label="Reviews" href="/#spotlight" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"><Icon className="text-lg">rate_review</Icon></Link>
                <Link aria-label="Store location" href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"><Icon className="text-lg">storefront</Icon></Link>
              </div>
            </div>
            <div><h2 className="font-title-sm">Explore &amp; Shop</h2><ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant"><li><Link href="/store" className="hover:text-primary">Fiction</Link></li><li><Link href="/store" className="hover:text-primary">Non-fiction</Link></li><li><Link href="/store" className="hover:text-primary">New Arrivals</Link></li><li><Link href="/store" className="hover:text-primary">Rare &amp; Indie</Link></li></ul></div>
            <div><h2 className="font-title-sm">Customer Support</h2><ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant"><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Order Tracking</a></li><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Delivery Info</a></li><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Returns &amp; FAQ</a></li><li><a href="mailto:haven@koalabooks.com" className="hover:text-primary">Contact</a></li></ul></div>
            <div><h2 className="font-title-sm">Community &amp; Perks</h2><ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant"><li><Link href="/#newsletter" className="hover:text-primary">Book Club</Link></li><li><Link href="/#newsletter" className="hover:text-primary">Koala Rewards</Link></li><li><Link href="/#newsletter" className="hover:text-primary">Gift Cards</Link></li><li><Link href="/#newsletter" className="hover:text-primary">Reading Events</Link></li></ul></div>
          </div>
          <div className="my-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-surface-container p-6 text-center md:flex-row md:text-left">
            <div className="space-y-1"><h2 className="font-title-md">Join the Reading Haven</h2><p className="text-body-sm text-on-surface-variant">Receive weekly author conversations, literary dispatches, and member-only quiet hours.</p></div>
            <Link href="/#newsletter" className="shrink-0 rounded-xl bg-primary px-6 py-3 text-label-md text-on-primary transition-colors hover:bg-primary/90">Join the newsletter</Link>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/30 pt-8 text-center text-caption text-on-surface-variant md:flex-row">
            <p>© 2025 Koala Bookstore Inc. All rights reserved. Made with love for fellow bookworms.</p>
            <div className="flex flex-wrap items-center justify-center gap-6"><span>Cash on Delivery</span><span>Secure Cards</span><span>Apple Pay</span><span>Gift Tokens</span></div>
            <div className="flex items-center gap-4"><a href="mailto:haven@koalabooks.com?subject=Privacy%20Policy" className="transition-colors hover:text-on-surface">Privacy Policy</a><a href="mailto:haven@koalabooks.com?subject=Terms%20of%20Service" className="transition-colors hover:text-on-surface">Terms of Service</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
