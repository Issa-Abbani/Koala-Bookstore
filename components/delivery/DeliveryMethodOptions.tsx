"use client";

import { useState } from "react";

export default function DeliveryMethodOptions() {
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express">(
    "standard",
  );

  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">Choose delivery speed</legend>
      <label
        className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl p-4 transition-all hover:bg-surface-container ${deliverySpeed === "standard" ? "bg-surface-container-low ring-2 ring-primary-container" : "bg-surface-container-low/50"}`}
      >
        <span className="flex min-w-0 items-start gap-3.5">
          <input
            checked={deliverySpeed === "standard"}
            onChange={() => setDeliverySpeed("standard")}
            className="mt-1 h-5 w-5 shrink-0 accent-[#006591]"
            name="delivery-speed"
            type="radio"
            value="standard"
          />
          <span>
            <span className="flex flex-wrap items-center gap-2">
              <strong className="font-title-sm">Standard Eco-Courier</strong>
              <span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-caption font-semibold">
                2–3 Business Days
              </span>
            </span>
            <span className="mt-0.5 block text-body-sm text-on-surface-variant">
              Zero-emission neighborhood delivery. Wrapped with love.
            </span>
          </span>
        </span>
        <span className="shrink-0 pl-2 text-right">
          <strong className="font-title-md text-primary">FREE</strong>
          <span className="block text-caption text-outline line-through">
            $4.50
          </span>
        </span>
      </label>

      <label
        className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl p-4 transition-all hover:bg-surface-container ${deliverySpeed === "express" ? "bg-surface-container-low ring-2 ring-primary-container" : "bg-surface-container-low/50"}`}
      >
        <span className="flex min-w-0 items-start gap-3.5">
          <input
            checked={deliverySpeed === "express"}
            onChange={() => setDeliverySpeed("express")}
            className="mt-1 h-5 w-5 shrink-0 accent-[#006591]"
            name="delivery-speed"
            type="radio"
            value="express"
          />
          <span>
            <span className="flex flex-wrap items-center gap-2">
              <strong className="font-title-sm">
                Express Priority Reading
              </strong>
              <span className="rounded-full bg-tertiary-fixed px-2 py-0.5 text-caption font-semibold text-on-tertiary-fixed">
                Next Day Before 5 PM
              </span>
            </span>
            <span className="mt-0.5 block text-body-sm text-on-surface-variant">
              Top-of-queue fulfillment directly from local store reserve.
            </span>
          </span>
        </span>
        <span className="shrink-0 pl-2 text-right">
          <strong className="font-title-md">$3.99</strong>
          <span className="block text-caption text-on-surface-variant">
            Rush speed
          </span>
        </span>
      </label>
    </fieldset>
  );
}
