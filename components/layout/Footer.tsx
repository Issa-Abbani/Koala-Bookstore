import Image
 from "next/image";
export default function Footer() {
  const logo =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC9UUokMTzxSsu8O1zd_avOuUmAbckbME79VRQKX-QUfF4g_fUDLL230Vlq3C2jCD1Zenvx4KyMxMB90HqdtyRD4spq0pOzr71xpXMXJStHrmLuVMXIKhFA7h7mYTgRxBGCQfjGuH6xCKrvX8Uucd2YKfwlDMDIyGtTwnveLdXO6Rf41YP44E8rpSx1oJO5xVYlzbWqfjvhEHgE9vjPbsR1HNAiFml67z9Y_tcSfPy6SmfOYwDDFPf8GA";
  return (
    <footer className="w-full bg-surface-container-low py-16 text-on-surface shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-12">
        <div className="grid gap-10 border-b border-outline-variant/40 pb-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <a href="#top" className="flex items-center gap-3">
              <Image
                src={logo}
                alt=""
                width={120}
                height={32}
                style={{ width: "auto" }}
                className="h-8 w-auto object-contain"
              />
              <span className="font-title-md text-title-md font-bold tracking-tight">
                Koala Bookstore
              </span>
            </a>
            <p className="max-w-sm text-body-md leading-relaxed text-on-surface-variant">
              Your independent neighborhood sanctuary for curated literature,
              heartfelt recommendations, and peaceful bookish conversations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                aria-label="Instagram"
                href="#featured"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
              >
                {/* <Icon className="text-lg">bookmark</Icon> */}
              </a>
              <a
                aria-label="Reviews"
                href="#spotlight"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
              >
                {/* <Icon className="text-lg">rate_review</Icon> */}
              </a>
              <a
                aria-label="Store location"
                href="#top"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
              >
                {/* <Icon className="text-lg">location_on</Icon> */}
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-title-sm text-title-sm">Explore &amp; Shop</h2>
            <ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant">
              <li>
                <a href="#featured" className="hover:text-primary">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-primary">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-primary">
                  All Categories
                </a>
              </li>
              <li>
                <a href="#spotlight" className="hover:text-primary">
                  Staff Picks
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-title-sm text-title-sm">Customer Support</h2>
            <ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant">
              <li>
                <a href="#top" className="hover:text-primary">
                  Shipping &amp; Returns
                </a>
              </li>
              <li>
                <a href="#top" className="hover:text-primary">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#top" className="hover:text-primary">
                  Ask About Your Order
                </a>
              </li>
            </ul>
          </div>
          <div>
            {/* <h2 className="font-title-sm text-title-sm">
              Community &amp; Perks
            </h2>
            <ul className="mt-4 space-y-3 text-body-sm text-on-surface-variant">
              <li>
                <a href="#newsletter" className="hover:text-primary">
                  Reading Circle
                </a>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-primary">
                  Koala Rewards
                </a>
              </li>
              <li>
                <a href="#spotlight" className="hover:text-primary">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-primary">
                  The Sunday Dispatch
                </a>
              </li>
            </ul> */}
          </div>
        </div>
        <p className="pt-8 text-center text-caption text-on-surface-variant">
          © 2026 Koala Bookstore Inc. All rights reserved. Made with love for
          fellow bookworms.
        </p>
      </div>
    </footer>
  );
}
