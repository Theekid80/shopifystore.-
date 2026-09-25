"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { site } from "@/config/site";
import { getProduct, VELARA_TRAVEL_SLEEP_SYSTEM as SYSTEM, type Product, type Variant } from "@/config/products";
import { track, type AnalyticsItem } from "@/lib/analytics";
import { createPersistentStore } from "@/lib/persistent-store";
import { checkoutConnected, startCheckout, type CheckoutResult } from "./checkout";

/* ─────────────────────────── persisted state ─────────────────────────── */

type StoredLine = { productId: string; variantId: string; quantity: number };

const cartStore = createPersistentStore<StoredLine[]>("velara:cart:v2", []);

export const MAX_QUANTITY = 10;

export type CartLine = StoredLine & { key: string; product: Product; variant: Variant; lineTotal: number };

/** Joins stored lines with the live catalog so price/name edits apply instantly. */
function resolveLines(stored: StoredLine[]): CartLine[] {
  return stored.flatMap((line) => {
    const product = getProduct(line.productId);
    const variant = product?.variants.find((v) => v.id === line.variantId);
    if (!product || !variant) return [];
    return [{ ...line, key: line.variantId, product, variant, lineTotal: product.price * line.quantity }];
  });
}

export const toAnalyticsItem = (p: Product, quantity = 1): AnalyticsItem => ({
  id: p.sku,
  name: p.name,
  price: p.price,
  quantity,
});

/* ─────────────────────────────── context ─────────────────────────────── */

type StoreContext = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** Dollars left to free shipping (0 once reached; null if no free-shipping offer). */
  freeShippingRemaining: number | null;

  addItem: (product: Product, opts?: { variantId?: string; quantity?: number; openCart?: boolean }) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  /** Swaps one of each system piece already in the bag for the complete system. */
  upgradeToSystem: () => void;
  clear: () => void;

  checkout: () => Promise<CheckoutResult>;
  checkoutConnected: boolean;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const Ctx = createContext<StoreContext | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const stored = cartStore.useStore();
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const lines = useMemo(() => resolveLines(stored), [stored]);
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = Math.round(lines.reduce((n, l) => n + l.lineTotal, 0) * 100) / 100;
  const threshold = site.shipping.freeThreshold;
  const freeShippingRemaining = threshold == null ? null : Math.max(0, Math.round((threshold - subtotal) * 100) / 100);

  const addItem = useCallback<StoreContext["addItem"]>((product, { variantId, quantity = 1, openCart = true } = {}) => {
    if (product.stock === "out_of_stock") return;
    const vid = variantId ?? product.variants[0].id;
    cartStore.set((prev) => {
      const existing = prev.find((l) => l.variantId === vid);
      if (existing) {
        return prev.map((l) => (l.variantId === vid ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + quantity) } : l));
      }
      return [...prev, { productId: product.id, variantId: vid, quantity: Math.min(MAX_QUANTITY, quantity) }];
    });
    track({ name: "AddToCart", item: toAnalyticsItem(product, quantity) });
    if (openCart) setCartOpen(true);
  }, []);

  const setQuantity = useCallback((variantId: string, quantity: number) => {
    cartStore.set((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity: Math.min(MAX_QUANTITY, quantity) } : l)),
    );
  }, []);

  const removeItem = useCallback((variantId: string) => {
    cartStore.set((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const upgradeToSystem = useCallback(() => {
    cartStore.set((prev) => {
      const seen = new Set<string>();
      const next = prev.flatMap((l) => {
        if (!SYSTEM.includes?.includes(l.productId) || seen.has(l.productId)) return [l];
        seen.add(l.productId);
        return l.quantity > 1 ? [{ ...l, quantity: l.quantity - 1 }] : [];
      });
      const vid = SYSTEM.variants[0].id;
      const existing = next.find((l) => l.variantId === vid);
      return existing
        ? next.map((l) => (l === existing ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + 1) } : l))
        : [...next, { productId: SYSTEM.id, variantId: vid, quantity: 1 }];
    });
    track({ name: "AddToCart", item: toAnalyticsItem(SYSTEM) });
  }, []);

  const clear = useCallback(() => cartStore.set([]), []);

  const checkout = useCallback(async () => {
    track({ name: "InitiateCheckout", items: lines.map((l) => toAnalyticsItem(l.product, l.quantity)), value: subtotal });
    const result = await startCheckout(
      lines.map((l) => ({ productId: l.productId, variantId: l.variantId, quantity: l.quantity, name: l.product.name })),
    );
    if (result.ok) window.location.assign(result.url);
    return result;
  }, [lines, subtotal]);

  const value = useMemo<StoreContext>(
    () => ({
      lines,
      count,
      subtotal,
      freeShippingRemaining,
      addItem,
      setQuantity,
      removeItem,
      upgradeToSystem,
      clear,
      checkout,
      checkoutConnected,
      isCartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      isSearchOpen,
      setSearchOpen,
    }),
    [lines, count, subtotal, freeShippingRemaining, addItem, setQuantity, removeItem, upgradeToSystem, clear, checkout, isCartOpen, isSearchOpen],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
