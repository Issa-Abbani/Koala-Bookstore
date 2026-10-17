"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Suspense } from "react";

export default function Navbar(){
  return(
    <Suspense fallback={"Loading..."}>
      <NavbarHTML />
    </Suspense>
  )
}

export function NavbarHTML() {
  const pathname = usePathname();
  const logo =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC9UUokMTzxSsu8O1zd_avOuUmAbckbME79VRQKX-QUfF4g_fUDLL230Vlq3C2jCD1Zenvx4KyMxMB90HqdtyRD4spq0pOzr71xpXMXJStHrmLuVMXIKhFA7h7mYTgRxBGCQfjGuH6xCKrvX8Uucd2YKfwlDMDIyGtTwnveLdXO6Rf41YP44E8rpSx1oJO5xVYlzbWqfjvhEHgE9vjPbsR1HNAiFml67z9Y_tcSfPy6SmfOYwDDFPf8GA";

  const curator =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Iyli8fmmzY9doU-BiRxk8P1y08AfJNsKPC1s77WX16_j9ZK6L3Lt5rL2fPyda_d6_IAEvHQ-sZCfGvWULuULYlgXFNuCW6H_KS_h6eq_knBn3igC13vOfTw0qDDo8oB5ZwdC3D7dHwDywngmifQbwVjbk9v9xIUc2FopYAeOCs9ozSLlaYCKGa_VeYup6yvbHKSqbkqO8gPgB2mvkNbYN_Ac66OGIcdW37CD6pJxi4R7ATHDsMvA2A";

  const isActive = (href: string) => pathname === href;

  const activeClasses =
    "rounded-full bg-secondary-container px-3.5 py-2 font-semibold text-on-secondary-container";

  const inactiveClasses =
    "rounded-full px-3.5 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface";

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Store", href: "/store" },
    { label: "My Orders", href: "/orders" },
  ];
  return (
    <header className="fixed top-0 z-50 w-full shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* <div className="flex items-center justify-center gap-2 bg-tertiary-fixed px-4 py-2 text-center text-label-sm text-on-tertiary-fixed">
              <Icon className="text-sm">spa</Icon>
              <span>
                Free shipping on orders over $35 | Use code{" "}
                <strong>KOALALOVE</strong> for 10% off your first read
              </span>
            </div> */}
      <div className="bg-surface-container-lowest/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-12">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src={logo}
              alt=""
              width={120}
              height={32}
              style={{ width: "auto" }}
              className="h-8 w-auto object-contain"
            />
            <span className="flex flex-col">
              <span className="font-title-md text-title-md leading-tight tracking-tight">
                Koala Bookstore
              </span>
              <span className="text-caption text-on-surface-variant">
                Your cozy reading nook
              </span>
            </span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 xl:flex"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={active ? activeClasses : inactiveClasses}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="relative rounded-full p-2.5 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
            >
              <ShoppingCart color="#006591" />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-caption text-on-primary">
                3
              </span>
            </Link>
            <Image
              src={curator}
              alt="Your Koala Bookstore account"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
