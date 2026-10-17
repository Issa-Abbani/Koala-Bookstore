import type { ReactNode } from "react";

import AdminNavigation from "@/components/layout/AdminNavigation";
import Link from "next/link";
import { BookOpen, LogOut } from "lucide-react";

export default function ShopLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 flex-col justify-between bg-surface-container-low px-4 py-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] lg:flex">
        <div>
          <Link
            className="mb-8 flex items-center gap-2 px-3"
            href="/admin/dashboard"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm">
              <BookOpen aria-hidden="true" size={23} />
            </span>
            <span>
              <span className="block text-title-sm font-semibold">
                Koala Haven
              </span>
              <span className="block text-caption font-semibold uppercase tracking-wider text-secondary">
                Operations Portal
              </span>
            </span>
          </Link>
          <AdminNavigation />
        </div>
        <div>
          <p className="mb-3 flex items-center gap-2 px-3 text-caption text-secondary">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-primary"
            />
            Branch online · Preview mode
          </p>
          <Link
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-label-md text-secondary transition hover:bg-surface-container-high hover:text-on-surface"
            href="/admin"
          >
            <LogOut aria-hidden="true" size={20} />
            Log Out
          </Link>
        </div>
      </aside>

      <div className="lg:ml-72">
        <header className="border-b border-surface-container-high bg-surface-container-low px-4 py-4 lg:hidden">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-on-primary">
              <BookOpen aria-hidden="true" size={20} />
            </span>
            <span>
              <span className="block text-label-md font-bold">Koala Haven</span>
              <span className="block text-caption font-semibold uppercase tracking-wider text-outline">
                Operations Portal
              </span>
            </span>
            <Link
              aria-label="Log out"
              className="ml-auto rounded-lg p-2 text-secondary hover:bg-surface-container-high"
              href="/admin"
            >
              <LogOut aria-hidden="true" size={19} />
            </Link>
          </div>
          <AdminNavigation mobile />
        </header>

      <main className="px-4 py-5 sm:px-6 sm:py-6 xl:px-8">
        {children}
      </main>
      </div>
    </div>
  );
}