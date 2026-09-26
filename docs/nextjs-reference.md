# VELARA — Next.js design reference (legacy)

> This was the original headless prototype. It is kept **only as a design reference**. The production storefront is the Shopify theme in `shopify-theme/` — see the root README. Do not deploy this app for commerce.

The storefront for **VELARA**, a premium travel brand built around one hero product: the **VELARA Travel Sleep System**.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. There are no UI or animation libraries; the only runtime dependencies are Next and React.

> **This is not a Shopify theme.** It's a standalone ("headless") storefront that you host (e.g. on Vercel). Shopify connects behind it for products, checkout, payments and orders. See [Connecting to Shopify](#connecting-to-shopify).

---

## What's in the site

| Page | Purpose |
|---|---|
| `/` | Landing page built for ad traffic: hero → benefits → the six pieces → why a system → airplane → hotel → what's inside → **offer** → comparison → lifestyle → details → reviews → email → FAQ |
| `/products/<handle>` | A page for every product: gallery, price, Add to Cart, Buy Now, shipping and returns, details, lifestyle images, FAQ, related products, and a mobile sticky Add to Cart |
| `/shop` | The system first, then the sets, then each piece sold individually |
| `/checkout` | Order review, then hand-off to Shopify or Stripe hosted checkout |
| `/checkout/success` | Stripe order confirmation (verified server-side) |
| `/pages/about · shipping · returns · contact · privacy · terms · account` | Policy and brand pages |

### Offers (edit in `src/config/products.ts`)

| Offer | Price | Contents |
|---|---|---|
| **VELARA Travel Sleep System** (hero) | $79.99 | Mask, earplugs, travel pouch, toiletry organizer, tech pouch, packing cube |
| **Sleep + Travel Kit** | $59.99 | Mask, earplugs, travel pouch, toiletry organizer |
| **The Sleep Mask** | $39.99 | Mask |
| Each piece individually | $9.99–$39.99 | Plus the Luggage Tag as an extra accessory |

### Commerce
- Bag drawer with quantity, remove, subtotal and a free-shipping progress bar ("You're $X away from free U.S. shipping").
- **Complete the system:** an upgrade offer that swaps pieces already in the bag for the system and states the true price difference.
- **Buy Now:** skips the bag and goes straight to checkout.
- Mobile sticky Add to Cart, and a desktop sticky gallery.
- The bag persists in the browser.

### Honesty guardrails
- **Crossed-out price:** by default it's the *real* total of the pieces sold separately ($119.94), labelled "if bought separately".
- **Reviews:** none are invented. Development builds show "Your customer review here" slots; the live site hides the section until you add real reviews.
- **Checkout and email:** both say plainly when they're not connected yet, instead of pretending.
- **No suppliers named:** supplier data lives in a server-only file the browser can never load.
- **No fake claims:** no medical claims, fake urgency, fake badges, fake press or fake customer numbers. Automated checks enforce this.

### Quality checks run before handoff
There are 106 automated browser checks across desktop, tablet, iPhone and Android:
- every page loads with no sideways scroll, one H1 each, and no broken images;
- all internal links resolve;
- nav, mobile menu, tier selector, bag, quantity, remove, upgrade, Buy Now, checkout, FAQ and newsletter all work;
- analytics events fire;
- no console errors;
- a banned-words scan (medical claims, supplier and urgency language) passes on every page;
- no supplier data appears in browser JavaScript.

Changing a price in config updated every page, and a broken catalog entry failed the build.

---

## Folder structure

```
design/                      Source boards the current photos are cropped from
public/images/               All photography (replace these files)
scripts/crop-photos.mjs      Re-cuts images from /design (npm run photos)
src/
  config/                    ★ Everything you edit ★
    products.ts              Catalog: names, prices, compare-at, SKUs, images, contents, stock, CTA text
    images.ts                Every image path + alt text (productImages.hero, .sleepMask, …)
    site.ts                  Brand, announcement bar, nav, free-shipping threshold, payment methods, footer, SEO
    content.ts               All home-page copy, FAQ, product details, reviews
    policies.ts              Shipping / returns / care text + /pages content
    shopify.ts               Shopify variant IDs
    fulfillment.server.ts    PRIVATE supplier data (server-only, never shipped to browsers)
  app/                       Routes (pages, product pages, checkout, API routes, sitemap, robots)
    api/checkout/stripe/     Stripe Checkout integration point
    api/newsletter/          Klaviyo / Mailchimp / webhook integration point
  lib/
    commerce/cart.tsx        Bag state, Buy Now, upgrade, free-shipping math
    commerce/checkout.ts     Provider switch: shopify | stripe | none
    commerce/shopify.ts      Shopify Storefront API (cartCreate → checkoutUrl)
    analytics.ts             track() → GA4, Google Ads, Meta Pixel, TikTok Pixel
    seo.tsx                  Product + Organization structured data
  components/
    sections/                One file per home-page section
    product/                 PurchasePanel (buy box), ProductGallery, ProductCard, Assurances
    cart/                    CartDrawer, StickyBuyBar
    checkout/ layout/ newsletter/ analytics/ ui/
```

### Common edits

| I want to… | Edit |
|---|---|
| Change a price | `src/config/products.ts` → `price` |
| Change the crossed-out price | `compareAtPrice`: `"items"` (real separate total, recommended), a number, or `null` to hide it |
| Show "Save $X" instead of "Save X%" | `savingsDisplay: "amount"` (or `"none"`) |
| Change what's in the system or kit | `includes: [...]` (the page copy counts update automatically) |
| Mark something sold out / pre-order | `stock: "out_of_stock"` / `"preorder"` |
| Change button text | `cta: { addToCart, buyNow }` |
| Change the free-shipping threshold | `src/config/site.ts` → `shipping.freeThreshold` (and `announcement.text`) |
| Edit headlines and copy | `src/config/content.ts` |
| Add real reviews | `src/config/content.ts` → `reviews.items` |
| Change fonts or colors | `src/app/layout.tsx` (fonts), `src/app/globals.css` (`@theme` colors) |

If the catalog is misconfigured (unknown piece, duplicate SKU, compare-at below price), `npm run build` stops with a clear error instead of shipping a broken store.

---

## Running locally

You need **Node.js 20.9+** ([nodejs.org](https://nodejs.org), "LTS").

```bash
git clone https://github.com/theekid80/shopifystore.-.git velara
cd velara
npm install
npm run dev          # http://localhost:3000
```

In `npm run dev`, every image not yet marked `final: true` shows a small **"Replace: filename"** tag, and the reviews section shows placeholder slots. Neither appears in production builds.

```bash
npm run build && npm start   # production build, locally
npm run lint                 # ESLint
npm run typecheck            # TypeScript
npm run photos               # re-cut images from the boards in /design
```

To test on your phone: run `npm run dev -- -H 0.0.0.0`, then open `http://<your-computer-IP>:3000` on the same Wi-Fi.

## Deploying (Vercel)

1. Go to [vercel.com/new](https://vercel.com/new) → sign in with GitHub → **Import** `shopifystore.-`.
2. Framework: **Next.js** (auto-detected). Keep the default build settings.
3. **Environment Variables:** add `NEXT_PUBLIC_SITE_URL` = your domain. Everything else in `.env.example` is optional until you connect services.
4. Click **Deploy**. Every push to `main` then redeploys, and each branch gets a preview URL.
5. Add a domain under **Project → Settings → Domains** and follow the DNS instructions.

After changing any `NEXT_PUBLIC_…` variable, **redeploy**; those values are baked in at build time.

---

## Connecting to Shopify

Until you do this, the site runs in **preview mode**: the bag works, but checkout says it isn't connected, and nothing is charged.

### 1. Set up the Shopify store
1. Create a store at [shopify.com](https://www.shopify.com) and pick a plan.
2. **Settings → Payments:** activate Shopify Payments. This gives you cards, **Shop Pay**, **Apple Pay** and **Google Pay** on Shopify's checkout.
3. **Settings → Shipping and delivery:** create a free-shipping rate for orders over **$75** (U.S.) and a flat rate below it. Match `src/config/site.ts`.
4. **Settings → Policies:** add refund, privacy, terms and shipping policies. Copy the same text into `src/config/policies.ts`.
5. **Settings → Checkout:** upload your logo and colors so checkout matches the site.

### 2. Create the products
Under **Products → Add product**, create one product per catalog entry. Use the same names, prices and SKUs as `src/config/products.ts`:

| Shopify product | Price | SKU |
|---|---|---|
| VELARA Travel Sleep System | 79.99 (compare-at 119.94) | VEL-SYSTEM-BLK |
| Sleep + Travel Kit | 59.99 (compare-at 84.96) | VEL-KIT-BLK |
| The Sleep Mask | 39.99 | VEL-MASK-BLK |
| The Travel Pouch | 14.99 | VEL-POUCH-BLK |
| The Organizer | 19.99 | VEL-TOIL-BLK |
| The Tech Pouch | 16.99 | VEL-TECH-BLK |
| The Packing Cube | 17.99 | VEL-CUBE-BLK |
| The Earplugs | 9.99 | VEL-PLUG-BLK |
| The Luggage Tag | 9.99 | VEL-TAG-BLK |

For each product:
- Track inventory, or let your fulfillment app manage it.
- Enter the weight so shipping rates calculate correctly.
- Set the status to **Active**.

Connect your fulfillment app in Shopify so orders route automatically. It's handled entirely in the Shopify admin, and nothing about it appears on the site.

### 3. Get a Storefront API token
1. Install the free **Headless** sales channel: Shopify admin → **Sales channels → + → search "Headless" → Install**.
2. Headless → **Create storefront**.
3. In that storefront, open **Storefront API**. Under permissions, make sure *product listings* and *checkouts* are enabled.
4. Copy the **Public access token**. Never use the private token or an Admin API token here.
5. **Products:** open each product → **Publishing** → make it available on the **Headless** channel.

### 4. Link the products
For each product, open it in Shopify admin and click its variant. The URL ends in `/variants/44781234567890`. Paste each one into `src/config/shopify.ts`:

```ts
"system-black":    "gid://shopify/ProductVariant/44781234567890",
"kit-black":       "gid://shopify/ProductVariant/…",
"mask-black":      "gid://shopify/ProductVariant/…",
// …one line per product
```

Commit and push.

### 5. Turn it on
In Vercel → **Settings → Environment Variables**, add:

```bash
NEXT_PUBLIC_CHECKOUT_PROVIDER=shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=<public token from step 3>
```

Redeploy. Now **Checkout** and **Buy Now** send shoppers to Shopify's secure checkout with their bag pre-filled.

### 6. Test before launch
1. Shopify → **Settings → Payments** → enable **test mode** (or use a development store's Bogus Gateway).
2. On the live site, add the system to the bag and check out. Confirm the order appears in **Orders** and reaches your fulfillment app.
3. Turn test mode off.

> I haven't been able to test the Shopify connection against a real store from here. Step 6 is essential.

**How it works:** the bag lives on the site. At checkout, `src/lib/commerce/shopify.ts` calls the Storefront API `cartCreate` mutation with every line and redirects to the returned `checkoutUrl`. Shopify's checkout is the source of truth for price, tax, shipping and payment, so keep prices in `products.ts` in sync with Shopify.

### Alternative: Stripe
If you'd rather not use Shopify, set `NEXT_PUBLIC_CHECKOUT_PROVIDER=stripe` and `STRIPE_SECRET_KEY`. You can also set `STRIPE_SHIPPING_RATE_CENTS`.
- `/api/checkout/stripe` creates a Stripe Checkout Session, looking prices up on the server.
- Apple Pay and Google Pay appear once enabled in Stripe → Settings → Payment methods.
- Stripe has no Shop Pay, and you'd handle order routing yourself.
- Test with Stripe test keys first.

---

## Email list

Set `NEWSLETTER_PROVIDER` (server-side) to one of:
- `klaviyo`: `KLAVIYO_PUBLIC_KEY` (6-character site ID) + `KLAVIYO_LIST_ID`. Recommended with Shopify; Klaviyo's Shopify app also syncs customers.
- `mailchimp`: `MAILCHIMP_API_KEY` + `MAILCHIMP_LIST_ID`. Sends double opt-in.
- `webhook`: `NEWSLETTER_WEBHOOK_URL`. Receives `{ email, source }`; use Zapier or Make to reach Shopify Email or anything else.

Until one is set, the form thanks visitors and says sign-ups open soon; no email is stored. Send yourself a test sign-up after connecting.

## Analytics

Each platform loads only when its ID is set:

| Variable | Platform |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (`G-…`) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL` | Google Ads (`AW-…`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook/Instagram) Pixel |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Pixel |

Events tracked on the site:
- **PageView** on every page.
- **ViewContent** when the buy box is seen.
- **AddToCart**.
- **InitiateCheckout**.
- **Lead**, only after a successful email sign-up.
- **Purchase** on the Stripe success page.

**With Shopify checkout, the purchase happens on Shopify's domain**, so connect the same pixels in Shopify too. Install the **Google & YouTube**, **Facebook & Instagram** and **TikTok** sales channels (or add them under **Settings → Customer events**). That's what records Purchase and gives ad platforms their conversion data.

---

## Images

All images are defined in `src/config/images.ts` (`productImages.hero`, `.bundle`, `.sleepMask`, `.travelPouch`, `.organizer`, `.packingCube`, `.techOrganizer`, `.airplane`, `.hotel`, …). They're currently cropped from the two design boards in `/design`.

**Replace them with full-resolution photos before launch.** Each shot on the boards is only 250–560px wide, so they look soft on large screens.

| Image | Recommended |
|---|---|
| Hero (`hero-travel.jpg`), airplane banner | 2400px+ wide |
| Product shots | 1500×1500 |
| The six-piece flat lay (`whats-included.jpg`) | 2000px+ |
| Lifestyle tiles | 1200×1600 |
| `og-image.jpg` (social share) | exactly 1200×630 |

To replace one: put the file in `public/images/`, update `width`/`height`/`alt` in `images.ts`, and set `final: true`. Compress photos first (e.g. [squoosh.app](https://squoosh.app), quality ~80).

Make sure photos match what customers receive:
- `travel-system.jpg` (used in the hotel section) shows a Velara box and a luggage tag. The system doesn't include the tag, and use the box shot only if you ship in one.
- The main flat lay was cropped to show exactly the six system pieces.

---

## Launch checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to your domain
- [ ] Prices and compare-at confirmed in `products.ts` (and matching Shopify)
- [ ] Every `[bracketed]` value replaced: `products.ts` details, `policies.ts`, `content.ts` FAQ
- [ ] Shipping threshold, returns window and payment methods in `site.ts` match your real settings
- [ ] Real photos in, each marked `final: true`
- [ ] Shopify connected and a test order placed
- [ ] Email provider connected and a test sign-up received
- [ ] Pixels added on the site **and** in Shopify
- [ ] Social links and support email updated
- [ ] Product copy stays lifestyle-only: no medical or sleep-outcome claims, no unconfirmed material claims
