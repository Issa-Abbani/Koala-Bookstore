"use client";

import { ArrowLeftToLine, ArrowRightCircle, BanknoteCheck, CheckCircle, HelpCircle, ShoppingCartMinus, Trash, Truck, X } from "lucide-react";
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

function Icon({
  children,
  className = "",
  title,
}: {
  children: string;
  className?: string;
  title?: string;
}) {
  return (
    <span
      aria-hidden="true"
      title={title}
      className={`material-symbols-outlined ${className}`}
    >
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
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
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
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface">
      <main className="w-full bg-surface pt-32">
        <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-12">
          <section
            className="relative mb-8 overflow-hidden rounded-2xl bg-surface-container-lowest p-6 shadow-sm lg:p-8"
            aria-labelledby="cart-title"
          >
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <h1
                  id="cart-title"
                  className="font-display text-headline-lg tracking-tight"
                >
                  Your Reading Bag
                </h1>
                <span className="rounded-full bg-secondary-container px-3 py-1 text-label-sm text-on-secondary-container">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <Truck />
                <span>
                  Free express delivery on orders over{" "}
                  <strong className="text-label-md text-on-surface">
                    $70.00
                  </strong>
                </span>
              </div>
            </div>
            {/* {items.length > 0 && (
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
            )} */}
          </section>

          {notice && (
            <div
              role="status"
              className="mb-6 flex items-center justify-between rounded-xl bg-secondary-container px-4 py-3 text-body-sm text-on-secondary-container"
            >
              <span>{notice}</span>
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
                className="cursor-pointer"
              >
                <X color="red"/>
              </button>
            </div>
          )}

          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                <section
                  aria-label="Cart items and add-ons"
                  className="flex flex-col gap-6 lg:col-span-8"
                >
                  <div className="overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
                    <div className="hidden grid-cols-12 gap-4 bg-surface-container-low px-6 py-4 text-label-sm uppercase tracking-wider text-on-surface-variant sm:grid">
                      <span className="col-span-6">Book Title</span>
                      <span className="col-span-2 text-right">Price</span>
                      <span className="col-span-2 text-center">Quantity</span>
                      <span className="col-span-2 text-right">Subtotal</span>
                    </div>
                    <div className="divide-y divide-surface-container-low">
                      {items.map((item) => (
                        <article
                          key={item.id}
                          className="p-5 transition-colors hover:bg-surface-container-low/40 sm:p-6"
                        >
                          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
                            <div className="flex min-w-0 items-center gap-4 sm:col-span-6">
                              <div className="relative aspect-2/3 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-container shadow-sm">
                                <Image
                                  src={item.image}
                                  alt={`${item.title} book cover`}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex min-w-0 flex-col">
                                <span className="mb-1 inline-flex w-max items-center gap-1 rounded-full bg-[#E6F4EA] px-2 py-0.5 text-xs font-semibold text-[#23865B]">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#23865B]" />{" "}
                                  In Stock
                                </span>
                                <h2 className="truncate font-title-sm">
                                  {item.title}
                                </h2>
                                <p className="truncate text-body-sm text-on-surface-variant">
                                  {item.author}
                                </p>
                                <span className="mt-1 text-caption text-outline">
                                  Edition: {item.edition}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-end">
                              <span className="text-body-sm text-on-surface-variant sm:hidden">
                                Unit Price:
                              </span>
                              <span className="font-label-md font-semibold">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-center">
                              <span className="text-body-sm text-on-surface-variant sm:hidden">
                                Quantity:
                              </span>
                              <div className="flex items-center rounded-full bg-surface-container-low px-2 py-1 shadow-sm">
                                <button
                                  type="button"
                                  aria-label={`Decrease ${item.title} quantity`}
                                  onClick={() => updateQuantity(item.id, -1)}
                                  disabled={item.quantity <= 1}
                                  className="flex h-7 w-7 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                                >
                                  <Icon className="text-sm">-</Icon>
                                </button>
                                <span
                                  aria-live="polite"
                                  className="w-8 text-center text-label-md font-semibold"
                                >
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Increase ${item.title} quantity`}
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface  cursor-pointer"
                                >
                                  <Icon className="text-sm">+</Icon>
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 sm:col-span-2 sm:justify-end">
                              <span className="text-body-sm text-on-surface-variant sm:hidden">
                                Subtotal:
                              </span>
                              <span className="font-title-sm font-bold">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <button
                                type="button"
                                aria-label={`Remove ${item.title}`}
                                onClick={() => removeItem(item.id)}
                                className="rounded-full p-1.5 text-outline transition-colors hover:bg-error/10 hover:text-error cursor-pointer"
                              >
                                <Trash color="red" size={20}/>
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                      {/* {hasGiftPerk && (
                        <article className="bg-tertiary-fixed/20 p-5 transition-colors sm:p-6">
                          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
                            <div className="flex min-w-0 items-center gap-4 sm:col-span-6">
                              <div className="flex aspect-2/3 w-20 shrink-0 items-center justify-center rounded-lg bg-tertiary-fixed shadow-sm">
                                <Icon className="text-3xl text-tertiary">
                                  local_florist
                                </Icon>
                              </div>
                              <div className="flex min-w-0 flex-col">
                                <span className="mb-1 inline-flex w-max items-center gap-1 rounded-full bg-tertiary-fixed px-2.5 py-0.5 text-xs font-semibold text-on-tertiary-container">
                                  <Icon className="text-xs">redeem</Icon>
                                  Complimentary Reader Perk
                                </span>
                                <h2 className="truncate font-title-sm">
                                  Recycled Botanical Bookmark &amp; Sleeve
                                </h2>
                                <p className="text-body-sm text-on-surface-variant">
                                  Koala Bookstore Edition
                                </p>
                                <span className="mt-1 text-caption text-tertiary">
                                  Included with every multi-book package
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-end">
                              <span className="text-body-sm text-on-surface-variant sm:hidden">
                                Unit Price:
                              </span>
                              <span className="font-label-md font-semibold text-tertiary line-through">
                                $4.00
                              </span>
                            </div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-center">
                              <span className="text-body-sm text-on-surface-variant sm:hidden">
                                Quantity:
                              </span>
                              <span className="rounded-full bg-surface-container px-3 py-1 text-label-md text-on-surface-variant">
                                1 (Gift)
                              </span>
                            </div>
                            <div className="flex items-center justify-between sm:col-span-2 sm:justify-end">
                              <span className="text-body-sm text-on-surface-variant sm:hidden">
                                Subtotal:
                              </span>
                              <span className="font-title-sm font-bold text-tertiary">
                                FREE
                              </span>
                            </div>
                          </div>
                        </article>
                      )} */}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-surface-container-low bg-surface-container-lowest p-5 sm:p-6">
                      <Link
                        href="/store"
                        className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-4 py-2.5 text-label-md transition-colors hover:bg-surface-container"
                      >
                        <ArrowLeftToLine />
                        Continue
                        Browsing Books
                      </Link>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="flex items-center gap-1.5 text-label-md text-on-surface-variant transition-colors hover:text-error cursor-pointer"
                      >
                        <ShoppingCartMinus size={18}/>
                        Clear Cart
                      </button>
                    </div>
                  </div>

                </section>

                <aside
                  aria-label="Order summary"
                  className="flex flex-col gap-4 lg:sticky lg:top-32 lg:col-span-4"
                >
                  <div className="relative rounded-2xl bg-surface-container-lowest p-6 shadow-sm lg:p-7">
                    <h2 className="mb-5 font-bold text-xl text-primary">Order Summary</h2>
                    <div className="space-y-3.5 border-b border-surface-container-low pb-6 text-body-md text-on-surface-variant">
                      <div className="flex items-center justify-between">
                        <span>
                          Items Subtotal ({bookCount}{" "}
                          {bookCount === 1 ? "book" : "books"})
                        </span>
                        <span className="font-semibold text-on-surface">
                          {formatPrice(totals.subtotal)}
                        </span>
                      </div>
                      {totals.addOnTotal > 0 && (
                        <div className="flex items-center justify-between">
                          <span>Reader treats</span>
                          <span className="font-semibold text-on-surface">
                            {formatPrice(totals.addOnTotal)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5">
                          Standard Shipping
                        </span>
                        {totals.shipping === 0 ? (
                          <span className="flex items-center gap-1 font-semibold text-[#23865B]">
                            <span className="rounded-full bg-[#E6F4EA] px-2 py-0.5 text-xs">
                              Qualified
                            </span>
                            FREE
                          </span>
                        ) : (
                          <span className="font-semibold text-on-surface">
                            {formatPrice(totals.shipping)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-body-sm">
                        <span>Estimated Tax</span>
                        <span className="text-outline">
                          Calculated at checkout
                        </span>
                      </div>
                    </div>
                    <div className="border-b border-surface-container-low py-5">
                      <form onSubmit={applyPromo} className="mb-3 flex gap-2">
                        <label className="sr-only" htmlFor="promo-code">
                          Promo code
                        </label>
                        <input
                          id="promo-code"
                          value={promoCode}
                          onChange={(event) => setPromoCode(event.target.value)}
                          placeholder="Enter promo code"
                          type="text"
                          className="h-11 min-w-0 flex-1 rounded-xl bg-surface-container-low px-4 text-body-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary-container"
                        />
                        <button
                          type="submit"
                          className="h-11 shrink-0 rounded-xl bg-surface-container px-5 text-label-md transition-colors hover:bg-secondary-container"
                        >
                          {promoApplied ? "Applied" : "Apply"}
                        </button>
                      </form>
                      {promoApplied && (
                        <div className="flex items-center justify-between gap-2 rounded-lg bg-secondary-fixed/50 p-2.5 text-caption text-on-secondary-fixed">
                          <span className="flex items-center gap-1.5 font-semibold">
                              <CheckCircle color="#006591" size={16}/>
                            Promo Code applied (10% off books)
                          </span>
                          <span className="font-bold text-primary">
                            -{formatPrice(totals.discount)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="pb-6 pt-5">
                      <div className="mb-1 flex items-baseline justify-between gap-3">
                        <span className="font-title-sm">Total Order</span>
                        <div className="text-right">
                          <span className="font-display text-3xl font-bold leading-none tracking-tight text-[#16324F]">
                            {formatPrice(totals.total)}
                          </span>
                          <span className="mt-1 block text-caption text-on-surface-variant">
                            USD incl. current promos
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setNotice(
                          "Checkout is a visual preview and is not connected to an order service.",
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-4 font-display text-headline-sm text-on-primary shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-[0.99] cursor-pointer"
                    >
                      Proceed to Checkout <ArrowRightCircle />
                    </button>
                    <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-surface-container-low p-3 text-body-sm text-on-surface-variant">
                      <div className="mt-0.5 shrink-0 text-lg text-primary">
                        <BanknoteCheck color="green" />
                      </div>
                      <p>
                        <strong>Cash on Delivery</strong> gladly accepted
                        nationwide. Inspect your titles upon arrival before
                        paying.
                      </p>
                    </div>
                    {/* <div className="mt-6 space-y-3 border-t border-surface-container-low pt-6 text-body-sm text-on-surface-variant">
                      <div className="flex items-center gap-3">
                        <Icon className="text-lg text-primary">eco</Icon>
                        <span>100% Recycled &amp; plastic-free book wraps</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon className="text-lg text-primary">
                          assignment_return
                        </Icon>
                        <span>14-day hassle-free reader return guarantee</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon className="text-lg text-primary">
                          support_agent
                        </Icon>
                        <span>
                          Friendly neighborhood book concierge support
                        </span>
                      </div>
                    </div> */}
                  </div>
                </aside>
              </div>
            </>
          ) : (
            <section
              className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-20 text-center"
              aria-labelledby="empty-cart-title"
            >
              <div className="relative mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-surface-container-low text-primary">
                <Icon className="text-6xl text-primary/70">shopping_bag</Icon>
                <span className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-sm">
                  <Icon className="text-xl">auto_stories</Icon>
                </span>
              </div>
              <h2
                id="empty-cart-title"
                className="mb-3 font-display text-headline-lg tracking-tight"
              >
                Your reading bag is empty
              </h2>
              <p className="mb-8 max-w-md text-body-lg text-on-surface-variant">
                Your reading bag is waiting for its first story. Discover this
                week&apos;s staff-curated fiction, heartfelt memoirs, and
                coffee-table treasures.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/store"
                  className="rounded-full bg-primary-container px-8 py-3.5 font-title-sm text-on-primary shadow-md transition hover:opacity-90"
                >
                  Explore Bestsellers
                </Link>
                <button
                  type="button"
                  onClick={restoreDemoItems}
                  className="rounded-full bg-surface-container px-6 py-3.5 text-label-md transition-colors hover:bg-surface-container-high"
                >
                  Restore Active Demo Items
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
