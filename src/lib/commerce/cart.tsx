"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { shopifyVariantIds } from "@/config/shopify";
import { bundle, purchasables, type Purchasable, type Variant } from "@/data/products";
import { createPersistentStore } from "@/lib/persistent-store";
import { createShopifyCheckout, shopifyEnabled } from "./shopify";

/* ─────────────────────────── persisted state ─────────────────────────── */

type StoredLine = { productId: string; variantId: string; quantity: number };

const cartStore = createPersistentStore<StoredLine[]>("velara:cart:v1", []);
const wishlistStore = createPersistentStore<string[]>("velara:wishlist:v1", []);

export const MAX_QUANTITY = 10;

export type CartLine = StoredLine & {
  key: string;
  product: Purchasable;
  variant: Variant;
  lineTotal: number;
};

/** Joins stored lines with the live catalog so price/name edits apply instantly. */
function resolveLines(stored: StoredLine[]): CartLine[] {
  return stored.flatMap((line) => {
    const product = purchasables.find((p) => p.id === line.productId);
    const variant = product?.variants.find((v) => v.id === line.variantId);
    if (!product || !variant) return [];
    return [{ ...line, key: line.variantId, product, variant, lineTotal: product.price * line.quantity }];
  });
}

/* ─────────────────────────────── context ─────────────────────────────── */

export type CheckoutResult = { ok: true } | { ok: false; message: string };

type StoreContext = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  /** Swaps one of each included piece in the cart for the complete system. */
  upgradeToBundle: () => void;
  checkout: () => Promise<CheckoutResult>;
  checkoutConnected: boolean;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
};

const Ctx = createContext<StoreContext | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const stored = cartStore.useStore();
  const wishlist = wishlistStore.useStore();
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const lines = useMemo(() => resolveLines(stored), [stored]);
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);

  const addItem = useCallback((productId: string, variantId: string, quantity = 1) => {
    cartStore.set((prev) => {
      const existing = prev.find((l) => l.variantId === variantId);
      if (existing) {
        return prev.map((l) =>
          l.variantId === variantId ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + quantity) } : l,
        );
      }
      return [...prev, { productId, variantId, quantity: Math.min(MAX_QUANTITY, quantity) }];
    });
    setCartOpen(true);
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

  const upgradeToBundle = useCallback(() => {
    cartStore.set((prev) => {
      const seen = new Set<string>();
      const next = prev.flatMap((l) => {
        if (!bundle.includes.includes(l.productId) || seen.has(l.productId)) return [l];
        seen.add(l.productId);
        return l.quantity > 1 ? [{ ...l, quantity: l.quantity - 1 }] : [];
      });
      const variantId = bundle.variants[0].id;
      const existing = next.find((l) => l.variantId === variantId);
      return existing
        ? next.map((l) => (l === existing ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + 1) } : l))
        : [...next, { productId: bundle.id, variantId, quantity: 1 }];
    });
  }, []);

  const checkout = useCallback(async (): Promise<CheckoutResult> => {
    if (!shopifyEnabled) {
      // Mock mode: no payment is taken and no order is created.
      return {
        ok: false,
        message: "Checkout isn't connected yet. This store is in preview mode — no order has been placed.",
      };
    }
    const missing = lines.filter((l) => !shopifyVariantIds[l.variant.id]);
    if (missing.length) {
      return { ok: false, message: `Some items aren't linked to Shopify yet: ${missing.map((l) => l.product.name).join(", ")}.` };
    }
    try {
      const url = await createShopifyCheckout(
        lines.map((l) => ({ merchandiseId: shopifyVariantIds[l.variant.id], quantity: l.quantity })),
      );
      window.location.assign(url);
      return { ok: true };
    } catch (err) {
      console.error(err);
      return { ok: false, message: "We couldn't start checkout. Please try again in a moment." };
    }
  }, [lines]);

  const toggleWishlist = useCallback((productId: string) => {
    wishlistStore.set((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  }, []);

  const value = useMemo<StoreContext>(
    () => ({
      lines,
      count,
      subtotal,
      addItem,
      setQuantity,
      removeItem,
      upgradeToBundle,
      checkout,
      checkoutConnected: shopifyEnabled,
      isCartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      isSearchOpen,
      setSearchOpen,
      wishlist,
      toggleWishlist,
    }),
    [lines, count, subtotal, addItem, setQuantity, removeItem, upgradeToBundle, checkout, isCartOpen, isSearchOpen, wishlist, toggleWishlist],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
