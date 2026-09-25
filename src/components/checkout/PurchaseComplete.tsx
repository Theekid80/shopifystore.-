"use client";

import { useEffect } from "react";
import { track, type AnalyticsItem } from "@/lib/analytics";
import { useStore } from "@/lib/commerce/cart";

/** Clears the bag and fires Purchase once per confirmed order. */
export function PurchaseComplete({ orderId, value, items }: { orderId: string; value: number; items: AnalyticsItem[] }) {
  const { clear } = useStore();

  useEffect(() => {
    const key = `velara:purchase:${orderId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage unavailable — still record once per page load */
    }
    clear();
    track({ name: "Purchase", orderId, value, items });
  }, [orderId, value, items, clear]);

  return null;
}
