/**
 * ─────────────────────────────────────────────────────────────────────────
 *  POLICIES & SUPPORT COPY
 * ─────────────────────────────────────────────────────────────────────────
 *  Used by the buy-box accordions, product pages, FAQ and /pages/*.
 *  Replace every [bracketed] value with your real policy before launch, and
 *  keep it identical to the policies configured in Shopify
 *  (Settings → Policies).
 */

export const policies = {
  shipping: [
    "Free U.S. shipping on orders of $75 or more. Orders under $75 ship for a flat [$X.XX].",
    "Orders are processed within [X–Y] business days. U.S. delivery typically takes [X–Y] business days after dispatch.",
    "You'll receive a tracking link by email as soon as your order ships.",
  ],
  international: ["[Say whether you ship internationally, to which countries, and how duties and taxes are handled.]"],
  returns: [
    "Returns are accepted within [30] days of delivery for unused items in their original condition.",
    "[Explain who pays return shipping, how refunds are issued and how to start a return — e.g. email support@yourdomain.com.]",
  ],
  care: [
    "[Sleep mask: add the final care instructions — e.g. spot clean or hand wash cold, lay flat to dry.]",
    "[Organizers and pouches: add the final care instructions — e.g. wipe clean with a damp cloth.]",
  ],
  contact: ["[Add your support email and expected response time, e.g. support@yourdomain.com — we reply within 1–2 business days.]"],
};

/** Standalone pages at /pages/<slug>. */
export const pages: Record<string, { title: string; intro?: string; body: string[] }> = {
  about: {
    title: "About VELARA",
    intro: "Travel should feel more comfortable, organized and restorative.",
    body: [
      "VELARA brings together premium travel essentials around one simple idea: the hours you spend in transit and away from home deserve the same comfort and order as the ones you spend at home.",
      "Our first product, the VELARA Travel Sleep System, pairs sleep comfort with practical organization in one coordinated set — so everything you need to rest and reset travels together.",
      "[Add your founder story here.]",
    ],
  },
  shipping: { title: "Shipping", body: [...policies.shipping, ...policies.international] },
  returns: { title: "Returns", body: policies.returns },
  contact: { title: "Contact", body: policies.contact },
  privacy: { title: "Privacy Policy", body: ["[Paste your privacy policy. Shopify can generate one under Settings → Policies.]"] },
  terms: { title: "Terms of Service", body: ["[Paste your terms of service. Shopify can generate them under Settings → Policies.]"] },
  account: {
    title: "Account",
    body: [
      "Customer accounts are coming soon.",
      "[Once your Shopify store is connected, point `accountHref` in src/config/site.ts to your Shopify customer account URL.]",
    ],
  },
};
