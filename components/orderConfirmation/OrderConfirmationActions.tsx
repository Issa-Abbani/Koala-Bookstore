"use client";

import { useState, type ReactNode } from "react";
import { Copy } from "lucide-react";

export function OrderReferenceCopyButton() {
  const [message, setMessage] = useState("");

  async function copyReference() {
    try {
      await navigator.clipboard.writeText("KB-89241");
      setMessage("Order reference copied to clipboard.");
    } catch {
      setMessage("Clipboard access failed. Your order reference is #KB-89241.");
    }
  }

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={copyReference}
        aria-label="Copy order number"
        title="Copy reference number"
        className="ml-1 rounded-md p-1 text-outline transition-colors hover:bg-surface-container-high hover:text-on-surface"
      >
        <Copy aria-hidden="true" className="h-4 w-4" />
      </button>
      {message && (
        <span
          role="status"
          className="absolute left-0 top-full z-20 mt-2 w-56 rounded-lg bg-surface-container-highest px-3 py-2 text-xs text-on-surface shadow-md"
        >
          {message}
        </span>
      )}
    </span>
  );
}

type PreviewActionButtonProps = {
  children: ReactNode;
  message: string;
  className?: string;
};

export function PreviewActionButton({
  children,
  message,
  className = "",
}: PreviewActionButtonProps) {
  const [notice, setNotice] = useState("");

  return (
    <span className="inline-flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={() => setNotice(message)}
        className={className}
      >
        {children}
      </button>
      {notice && (
        <span
          role="status"
          className="max-w-full text-xs text-on-surface-variant"
        >
          {notice}
        </span>
      )}
    </span>
  );
}
