/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — brand, navigation, shipping, payments, SEO, links.
 * ─────────────────────────────────────────────────────────────────────────
 *  Search this file for "TODO" and "VERIFY" before launch.
 */

export const site = {
  name: "VELARA",
  tagline: "Better Sleep. Smoother Journeys.",

  /** Used for canonical URLs, Open Graph and structured data. TODO: set your domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",

  seo: {
    title: "VELARA | Premium Travel Sleep System",
    description:
      "Meet the VELARA Travel Sleep System — premium sleep and travel essentials designed to help you rest, reset and stay organized wherever you go.",
  },

  currency: "USD",
  locale: "en-US",

  /** Thin bar above the navigation. Set `enabled: false` to hide it. */
  announcement: {
    enabled: true,
    text: "Free U.S. shipping on orders $75+",
    href: "/pages/shipping",
  },

  /**
   * SHIPPING — VERIFY these match your real shipping settings (in Shopify:
   * Settings → Shipping and delivery).
   */
  shipping: {
    /** Orders at or above this subtotal ship free. null = no free-shipping offer. */
    freeThreshold: 75 as number | null,
    region: "U.S.",
    /** Short line shown under the Add to Cart button. */
    summary: "Free U.S. shipping on orders $75+. Ships in [X–Y] business days.",
  },

  /**
   * Store promises shown under Add to Cart. VERIFY: keep only promises your
   * store actually honors; set `enabled: false` to hide one.
   */
  storePromises: [
    { id: "shipping", label: "Free U.S. shipping $75+", enabled: true },
    { id: "returns", label: "30-day returns", enabled: true },
    { id: "checkout", label: "Secure checkout", enabled: true },
  ],

  /**
   * Payment methods listed near the buy button. VERIFY: list only methods
   * enabled in your payment settings. Shopify's checkout shows the real
   * card and wallet logos itself.
   */
  paymentMethods: ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "Shop Pay"],

  nav: [
    { label: "Shop", href: "/shop" },
    { label: "The System", href: "/products/velara-travel-sleep-system" },
    { label: "Why VELARA", href: "/#why" },
    { label: "FAQ", href: "/#faq" },
  ],

  /** Every "shop the system" call to action points here. */
  primaryCta: { label: "Shop the System", href: "/#offer" },

  /** TODO: your Shopify customer account URL once connected. */
  accountHref: "/pages/account",

  /** TODO: replace with your real profiles. */
  social: [
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
    { label: "TikTok", href: "https://tiktok.com/", icon: "tiktok" },
    { label: "Pinterest", href: "https://pinterest.com/", icon: "pinterest" },
  ] as const,

  footer: [
    {
      title: "Shop",
      links: [
        { label: "Shop", href: "/shop" },
        { label: "The System", href: "/products/velara-travel-sleep-system" },
        { label: "About", href: "/pages/about" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Contact", href: "/pages/contact" },
        { label: "Shipping", href: "/pages/shipping" },
        { label: "Returns", href: "/pages/returns" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/pages/privacy" },
        { label: "Terms", href: "/pages/terms" },
      ],
    },
  ],
} as const;

export type Site = typeof site;
