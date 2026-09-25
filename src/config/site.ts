/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — brand, navigation, links, policies and SEO.
 * ─────────────────────────────────────────────────────────────────────────
 *  Every placeholder link is "#…" or a local placeholder page so nothing
 *  404s. Search this file for "TODO" before launch.
 */

export const site = {
  name: "VELARA",
  tagline: "Better Sleep. Smoother Journeys.",
  positioning: "Sleep better. Travel better.",

  /** Used for canonical URLs, Open Graph and structured data. TODO: set your domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",

  seo: {
    title: "VELARA — Better Sleep. Smoother Journeys.",
    description:
      "Discover the Velara Travel Sleep System — premium sleep and organization essentials designed for better rest wherever your journey takes you.",
  },

  currency: "USD",
  locale: "en-US",

  /** Primary navigation. Anchors point to sections on the home page. */
  nav: [
    { label: "Shop", href: "/#system" },
    { label: "Travel", href: "/#travel" },
    { label: "Our Story", href: "/#story" },
    { label: "FAQ", href: "/#faq" },
  ],

  /** The one place every "shop" CTA points to. */
  primaryCta: { label: "Shop the Collection", href: "/#system" },

  /** TODO: point to your Shopify customer account URL once connected,
   *  e.g. "https://your-store.myshopify.com/account". */
  accountHref: "/pages/account",

  /**
   * Store promises shown under the Add to Cart button and in the cart.
   *
   * ⚠️  VERIFY BEFORE LAUNCH. Only keep `enabled: true` for promises your store
   *     actually honors (shipping settings, return policy, payment provider).
   *     Set `enabled: false` to hide any of them.
   */
  storePromises: [
    { id: "shipping", label: "Free Shipping", enabled: true },
    { id: "returns", label: "30-Day Returns", enabled: true },
    { id: "checkout", label: "Secure Checkout", enabled: true },
  ],

  /** Short lifestyle benefits shown along the bottom of the hero. */
  heroBenefits: ["Premium Comfort", "Travel Ready", "Smart Organization", "Designed for Rest"],

  newsletter: {
    /**
     * TODO: connect your email platform. Set NEXT_PUBLIC_NEWSLETTER_ENDPOINT
     * to a URL that accepts a JSON POST of { email } (e.g. a Klaviyo/Shopify
     * Forms proxy or your own API route). Until then the form validates the
     * address and tells the visitor sign-ups are not live yet — nothing is sent.
     */
    endpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? "",
  },

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
        { label: "Travel Sleep System", href: "/#system" },
        { label: "Sleep Masks", href: "/#mask" },
        { label: "Travel Organizers", href: "/#organize" },
        { label: "Accessories", href: "/#collection" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "FAQ", href: "/#faq" },
        { label: "Shipping", href: "/pages/shipping" },
        { label: "Returns", href: "/pages/returns" },
        { label: "Contact", href: "/pages/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Our Story", href: "/#story" },
        { label: "Privacy", href: "/pages/privacy" },
        { label: "Terms", href: "/pages/terms" },
      ],
    },
  ],
} as const;

export type Site = typeof site;
