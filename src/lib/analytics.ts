/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ANALYTICS — one `track()` call fans out to every configured platform.
 * ─────────────────────────────────────────────────────────────────────────
 *  Platforms load only when their ID is set (see .env.example):
 *    NEXT_PUBLIC_GA_ID               Google Analytics 4 (G-XXXXXXX)
 *    NEXT_PUBLIC_GOOGLE_ADS_ID       Google Ads (AW-XXXXXXX)
 *    NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL   conversion label for purchases
 *    NEXT_PUBLIC_META_PIXEL_ID       Meta (Facebook/Instagram) Pixel
 *    NEXT_PUBLIC_TIKTOK_PIXEL_ID     TikTok Pixel
 *
 *  Events: PageView · ViewContent · AddToCart · InitiateCheckout · Purchase · Lead
 *
 *  Note: when checkout happens on Shopify's hosted checkout, the Purchase
 *  event fires there — connect the same pixels in Shopify
 *  (Settings → Customer events / the Google & YouTube, Facebook & Instagram
 *  and TikTok sales channels). See README.
 */

export const analyticsIds = {
  ga: process.env.NEXT_PUBLIC_GA_ID ?? "",
  googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  googleAdsPurchaseLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL ?? "",
  meta: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
};

export type AnalyticsItem = { id: string; name: string; price: number; quantity: number };

export type AnalyticsEvent =
  | { name: "PageView"; path: string }
  | { name: "ViewContent"; item: AnalyticsItem }
  | { name: "AddToCart"; item: AnalyticsItem }
  | { name: "InitiateCheckout"; items: AnalyticsItem[]; value: number }
  | { name: "Purchase"; items: AnalyticsItem[]; value: number; orderId?: string }
  | { name: "Lead" };

type Fn = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Fn;
    fbq?: Fn;
    ttq?: { track: Fn; page: Fn };
    dataLayer?: unknown[];
    /** Every event is also recorded here, handy for debugging and tests. */
    __velaraEvents?: AnalyticsEvent[];
  }
}

const CURRENCY = "USD";

const ga4Items = (items: AnalyticsItem[]) =>
  items.map((i) => ({ item_id: i.id, item_name: i.name, price: i.price, quantity: i.quantity }));

/**
 * Records an event and sends it to every loaded platform.
 * `dispatch: false` records only (used for the first page view, which each
 * platform's own loader already reports).
 */
export function track(event: AnalyticsEvent, { dispatch = true } = {}) {
  if (typeof window === "undefined") return;
  (window.__velaraEvents ??= []).push(event);
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", event);
  if (!dispatch) return;

  const { gtag, fbq, ttq } = window;

  switch (event.name) {
    case "PageView":
      gtag?.("event", "page_view", { page_path: event.path });
      fbq?.("track", "PageView");
      ttq?.page();
      break;

    case "ViewContent": {
      const { item } = event;
      gtag?.("event", "view_item", { currency: CURRENCY, value: item.price, items: ga4Items([item]) });
      fbq?.("track", "ViewContent", { content_ids: [item.id], content_name: item.name, content_type: "product", value: item.price, currency: CURRENCY });
      ttq?.track("ViewContent", { content_id: item.id, content_type: "product", value: item.price, currency: CURRENCY });
      break;
    }

    case "AddToCart": {
      const { item } = event;
      const value = item.price * item.quantity;
      gtag?.("event", "add_to_cart", { currency: CURRENCY, value, items: ga4Items([item]) });
      fbq?.("track", "AddToCart", { content_ids: [item.id], content_type: "product", value, currency: CURRENCY });
      ttq?.track("AddToCart", { content_id: item.id, content_type: "product", quantity: item.quantity, value, currency: CURRENCY });
      break;
    }

    case "InitiateCheckout":
      gtag?.("event", "begin_checkout", { currency: CURRENCY, value: event.value, items: ga4Items(event.items) });
      fbq?.("track", "InitiateCheckout", { content_ids: event.items.map((i) => i.id), num_items: event.items.length, value: event.value, currency: CURRENCY });
      ttq?.track("InitiateCheckout", { value: event.value, currency: CURRENCY });
      break;

    case "Purchase":
      gtag?.("event", "purchase", { transaction_id: event.orderId, currency: CURRENCY, value: event.value, items: ga4Items(event.items) });
      if (analyticsIds.googleAds && analyticsIds.googleAdsPurchaseLabel) {
        gtag?.("event", "conversion", {
          send_to: `${analyticsIds.googleAds}/${analyticsIds.googleAdsPurchaseLabel}`,
          value: event.value,
          currency: CURRENCY,
          transaction_id: event.orderId,
        });
      }
      fbq?.("track", "Purchase", { content_ids: event.items.map((i) => i.id), value: event.value, currency: CURRENCY });
      ttq?.track("CompletePayment", { value: event.value, currency: CURRENCY });
      break;

    case "Lead":
      gtag?.("event", "generate_lead");
      fbq?.("track", "Lead");
      ttq?.track("SubmitForm");
      break;
  }
}
