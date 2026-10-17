import Link from "next/link";
import { Grid2X2 } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Truck } from "lucide-react";


export default function AdminNavigation({ mobile = false }: { mobile?: boolean }) {
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
      {!mobile ? (
        <span className={`${linkClass} cursor-default`}>
          <BookOpen aria-hidden="true" size={20} />
          Catalog &amp; Products
        </span>
      ) : (
        <></>
      )}

      <div
        className={
          mobile
            ? "flex min-w-max items-center gap-1"
            : "flex flex-col gap-1 py-1 pl-7"
        }
      >
        <Link
          className={
            mobile
              ? "rounded-lg px-2 py-2 text-label-sm text-secondary transition hover:bg-surface-container-high"
              : "rounded-lg px-2 py-1.5 text-body-sm text-secondary transition hover:bg-surface-container-high hover:text-on-surface"
          }
          href="/admin/dashboard/SearchAndModify"
        >
          Search &amp; Modify
        </Link>
        <Link
          aria-current="page"
          className={
            mobile
              ? "rounded-lg bg-primary-container px-2 py-2 text-label-sm font-semibold text-on-primary-container"
              : "rounded-lg bg-primary-container px-2 py-1.5 text-body-sm font-semibold text-on-primary-container"
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