/**
 * Placeholder content for policy and utility pages served at /pages/<slug>.
 * Replace every [bracketed] note with your real policy text before launch.
 * Once on Shopify, you can instead link the footer to Shopify's built-in
 * policy pages (Settings → Policies).
 */
export const pages: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: "Shipping",
    body: [
      "[Describe your processing time, shipping methods, delivery estimates by region and any free-shipping threshold.]",
      "[If you use a fulfillment partner or ship from multiple locations, explain what customers should expect for tracking and delivery.]",
    ],
  },
  returns: {
    title: "Returns",
    body: [
      "[State your return window, the condition items must be in, who pays return shipping and how refunds are issued.]",
      "[Explain how to start a return — e.g. email address or returns portal link.]",
    ],
  },
  contact: {
    title: "Contact",
    body: ["[Add your support email, expected response time and business hours.]"],
  },
  privacy: {
    title: "Privacy Policy",
    body: ["[Paste your privacy policy. Shopify can generate a template under Settings → Policies.]"],
  },
  terms: {
    title: "Terms of Service",
    body: ["[Paste your terms of service. Shopify can generate a template under Settings → Policies.]"],
  },
  account: {
    title: "Account",
    body: [
      "Customer accounts are coming soon.",
      "[Once your Shopify store is connected, point `accountHref` in src/config/site.ts to your Shopify customer account URL.]",
    ],
  },
};
