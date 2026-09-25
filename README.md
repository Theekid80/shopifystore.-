# VELARA — Better Sleep. Smoother Journeys.

The storefront for **Velara**, a premium travel sleep brand. It's a single-page site built to guide every visitor to one product: **The Velara Travel Sleep System**.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**. No UI libraries and no animation libraries. The only runtime dependencies are Next and React.

> **Important: this is not a Shopify theme.** You can't upload it as a `.zip` under *Online Store → Themes*. It's a separate website (a "headless" storefront) that you host yourself, for example on Vercel. Shopify still handles products, checkout, payments and orders behind it. See [Connecting to Shopify](#f-connecting-to-shopify).

---

## A. What's included

| Area | Details |
|---|---|
| **Sections** | Sticky nav · Hero · Product showcase · Featured mask · Rest Anywhere · Pack Smart (before/after slider) · Bundle / buy box · Why Velara · Testimonials (placeholders) · FAQ · Newsletter · Footer |
| **Commerce** | Product cards · Add to cart · Quantity selector · Cart drawer (update, remove, subtotal) · Checkout button · Wishlist hearts · Image gallery · Colorway selector · Cart that survives page reloads |
| **Mobile** | Hamburger menu · Horizontally scrolling product cards · Large tap targets · Support for the iPhone notch and home-bar areas |
| **Accessibility** | Semantic landmarks · Skip link · Visible focus states · Keyboard-operable dialogs (native `<dialog>`: focus stays inside, Escape closes) · Standard accessible accordion (WAI-ARIA) · Labelled icon buttons · Alt text · Respects "reduce motion" settings |
| **SEO** | Title, description, Open Graph and Twitter cards · Product and Organization structured data (JSON-LD, no fake ratings) · `robots.txt` · `sitemap.xml` · Canonical URL |
| **Performance** | Statically generated · `next/image` (AVIF/WebP, responsive `srcset`, lazy-loaded below the fold, hero preloaded) · Self-hosted font via `next/font` |
| **Honesty guardrails** | Checkout clearly says "preview mode" until Shopify is connected · Newsletter doesn't pretend to save emails until connected · Testimonials are visibly labelled as placeholders · No medical claims, plus a footer disclaimer · Store promises (free shipping, returns) can be switched off in config |

## B. Folder structure

```
├── public/images/            ← all photography (replace these files)
├── scripts/
│   └── generate-placeholders.mjs   ← regenerates placeholder images
├── src/
│   ├── app/
│   │   ├── layout.tsx         ← fonts, SEO metadata, nav/footer/cart shell
│   │   ├── page.tsx           ← home page: section order + product JSON-LD
│   │   ├── pages/[slug]/      ← shipping, returns, contact, privacy, terms, account
│   │   ├── globals.css        ← design tokens (colors, type, motion)
│   │   ├── icon.svg           ← favicon
│   │   ├── not-found.tsx · robots.ts · sitemap.ts
│   ├── config/                ← ★ EDIT THESE ★
│   │   ├── images.ts          ← every image path + alt text
│   │   ├── site.ts            ← brand, nav, links, store promises, SEO, socials
│   │   └── shopify.ts         ← Shopify variant IDs
│   ├── data/                  ← ★ EDIT THESE ★
│   │   ├── products.ts        ← products, prices, variants, bundle pricing
│   │   ├── content.ts         ← features, testimonials, FAQ
│   │   └── pages.ts           ← policy page text
│   ├── lib/
│   │   ├── commerce/cart.tsx  ← cart + wishlist state, checkout
│   │   ├── commerce/shopify.ts← Shopify Storefront API adapter
│   │   ├── commerce/money.ts  ← currency + "Save X%" formatting
│   │   └── persistent-store.ts
│   └── components/
│       ├── layout/  Navbar · Footer · SearchDialog
│       ├── cart/    CartDrawer
│       ├── sections/ Hero · ProductShowcase · FeaturedProduct · LifestyleSection ·
│       │            OrganizationSection · BundleSection · WhyVelara ·
│       │            Testimonials · FAQ · Newsletter
│       └── ui/      Button · ProductCard · Price · QuantitySelector ·
│                    VariantSelector · WishlistButton · Sheet · Reveal ·
│                    SectionHeading · Logo · Icons
└── .env.example
```

### Common edits

| I want to change… | Edit |
|---|---|
| Bundle price, crossed-out price, "Save 33%" badge | `src/data/products.ts` → `bundle.pricing` (`savingsDisplay`: `"percent"`, `"amount"` or `"none"`; `compareAtPrice: null` hides it) |
| Product names, benefits, individual prices, colorways | `src/data/products.ts` |
| Free Shipping / 30-Day Returns / Secure Checkout | `src/config/site.ts` → `storePromises` (set `enabled: false` to hide one) |
| FAQ answers, testimonials, feature cards | `src/data/content.ts` |
| Nav links, footer links, social links | `src/config/site.ts` |
| Any image | Replace the file in `public/images/`, or change the path in `src/config/images.ts` |
| Colors / fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |

## C. Running it locally

You need **Node.js 20.9 or newer** ([nodejs.org](https://nodejs.org), choose "LTS").

```bash
git clone https://github.com/theekid80/shopifystore.-.git velara
cd velara
npm install
npm run dev
```

Open **http://localhost:3000**. Edits reload instantly.

Other commands:

```bash
npm run build      # production build (run this before deploying)
npm start          # serve the production build locally
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run placeholders   # re-create any missing placeholder images
```

To try it on your phone, run `npm run dev -- -H 0.0.0.0` and open `http://<your-computer's-IP>:3000` on a phone connected to the same Wi-Fi.

## D. Deploying (Vercel, recommended)

1. Push this repo to GitHub (it's already there).
2. Go to **[vercel.com/new](https://vercel.com/new)**, sign in with GitHub and **Import** `shopifystore.-`.
3. Framework preset: **Next.js** (detected automatically). Leave the build settings as they are.
4. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with your final URL (e.g. `https://www.velara.com`). Add the Shopify variables later.
5. Click **Deploy**. Every push to `main` then redeploys automatically, and every branch gets its own preview URL.
6. Custom domain: in Vercel go to **Project → Settings → Domains**, add your domain and follow the DNS instructions.

Any other host that runs Node.js also works (Netlify, Railway, Render, your own server running `npm run build && npm start`).

> After changing any `NEXT_PUBLIC_…` variable, **redeploy**. Those values are baked in at build time.

## E. Everything you need to replace before launch

### Images (`public/images/`)

Keep the same filename, or update the path in `src/config/images.ts`. Every placeholder has "PLACEHOLDER · filename" printed on it, so a missed one is easy to spot.

| File | Used for | Recommended size |
|---|---|---|
| `hero-travel.jpg` | Hero background: product in a premium airport/travel setting. Keep the left side calm and dark for the text. | 2400×1500+, landscape |
| `travel-system.jpg` | Full-system flat lay (showcase, bundle gallery, cart, search) | 2000×1400 |
| `sleep-mask.jpg` | Featured mask, Midnight colorway | 1600×1600 |
| `sleep-mask-stone.jpg` | Mask, Stone colorway | 1600×1600 |
| `sleep-mask-sand.jpg` | Mask, Sand colorway | 1600×1600 |
| `sleep-mask-detail.jpg` | Close-up inset on the featured mask | 1600×1600 |
| `travel-pouch.jpg` | Product card | 1200×1500 (4:5) |
| `earplugs.jpg` | Product card | 1200×1500 |
| `tech-organizer.jpg` | Product card + gallery | 1200×1500 |
| `packing-cubes.jpg` | Product card + gallery | 1200×1500 |
| `toiletry-bag.jpg` | Product card + gallery | 1200×1500 |
| `luggage-tag.jpg` | Product card | 1200×1500 |
| `airplane-lifestyle.jpg` | "Rest Anywhere" banner: someone wearing the mask in flight | 2400×1350 |
| `flights-lifestyle.jpg` | Travel tile: Flights | 1000×1250 |
| `hotel-lifestyle.jpg` | Travel tile: Hotels | 1000×1250 |
| `road-trip-lifestyle.jpg` | Travel tile: Road Trips | 1000×1250 |
| `business-lifestyle.jpg` | Travel tile: Business Travel | 1000×1250 |
| `suitcase-before.jpg` | Before/after slider: messy suitcase | 2000×1400 |
| `suitcase-after.jpg` | Before/after slider: the **same framing**, organized with Velara | 2000×1400 |
| `og-image.jpg` | Link preview on social media and messaging apps | exactly 1200×630 |

Also update each image's `alt` text in `src/config/images.ts` so it describes the real photo. Compress photos before uploading (e.g. [squoosh.app](https://squoosh.app), quality ~80).

### Text and settings

- [ ] `NEXT_PUBLIC_SITE_URL`: your real domain
- [ ] `src/data/products.ts`: final prices, compare-at price, colorways. The compare-at price must be a genuine reference price (for example, the real combined price of the items sold separately). Showing an inflated "was" price can breach consumer-protection law.
- [ ] `src/config/site.ts` → `storePromises`: keep only promises your store actually honors
- [ ] `src/data/content.ts` → FAQ: replace every `[bracketed]` answer (care instructions, dimensions, shipping, returns)
- [ ] `src/data/content.ts` → testimonials: replace them with **real** reviews (with permission) and set `isPlaceholder: false`, or remove the section from `src/app/page.tsx` until you have some
- [ ] `src/data/pages.ts`: shipping, returns, contact, privacy and terms text
- [ ] `src/config/site.ts`: social profile URLs, `accountHref`
- [ ] `src/components/sections/WhyVelara.tsx`: your brand/founder story paragraph
- [ ] Product copy stays lifestyle-only. Don't claim the products treat insomnia, anxiety or any condition.

## F. Connecting to Shopify

Until you connect Shopify, the site runs in **preview mode**. The cart works, but checkout shows *"Checkout isn't connected yet"* and no order or payment happens. Here's how to switch on real checkout.

### 1. Create the products in Shopify

In **Shopify admin → Products**, create:

- **The Velara Travel Sleep System** with a *Color* option: Midnight, Stone, Sand. Set the price to match `bundle.pricing.price`, and the compare-at price if you use one.
- Optionally, each individual piece you also want to sell separately.

### 2. Get a Storefront API token

1. Install the free **Headless** sales channel from the Shopify App Store (Shopify admin → *Sales channels → +*, search "Headless").
2. Open Headless → **Create storefront**.
3. Under **Storefront API**, copy the **public access token**. Don't use the private token or an Admin API token in this site.
4. Under the same storefront's permissions, make sure product listings and checkouts are enabled.
5. In **Products**, make the products available to the **Headless** sales channel ("Publishing" / "Sales channels" on each product).

### 3. Link the variants

For each variant, open the product in Shopify admin and click the variant. The URL ends in `/variants/44781234567890`. Paste it into `src/config/shopify.ts`:

```ts
"system-midnight": "gid://shopify/ProductVariant/44781234567890",
```

### 4. Add environment variables

Locally, copy `.env.example` to `.env.local`. In production, add these under **Vercel → Settings → Environment Variables**:

```bash
NEXT_PUBLIC_COMMERCE_PROVIDER=shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=<public token from step 2>
```

Redeploy.

### 5. Test

1. In Shopify: **Settings → Payments**, turn on **test mode** (or use the "Bogus Gateway" on a development store).
2. On your site, add the system to the cart and press **Checkout**. You're sent to Shopify's hosted checkout with the items already in the cart.
3. Place a test order and confirm it appears under **Orders**. Then turn test mode off.

**How it works:** the cart lives on the site. At checkout, `src/lib/commerce/shopify.ts` calls the Storefront API `cartCreate` mutation with every line and sends the shopper to the returned `checkoutUrl`. Shopify's checkout is the source of truth for price, tax, shipping, discounts and payment, so keep the prices in `products.ts` in sync with Shopify. I haven't tested this path against a live store from here. Do the test order above before launch.

### Other things to connect

- **Newsletter:** set `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` to a URL that accepts `POST {"email": "..."}` as JSON. For example, a small API route or serverless function that forwards to Klaviyo, Mailchimp or Shopify Email.
- **Customer accounts:** point `accountHref` in `src/config/site.ts` to `https://<your-store>.myshopify.com/account` (or your Shopify customer accounts URL).
- **Search:** the built-in search runs over the local catalog. To search Shopify directly, swap the index in `src/components/layout/SearchDialog.tsx` for the Storefront API `predictiveSearch` query.
- **Product images from Shopify's CDN:** `cdn.shopify.com` is already allowed in `next.config.ts`.

### Simpler alternative: Shopify Buy Button

If you'd rather not use the Storefront API, create a Buy Button in the Shopify **Buy Button** sales channel. Then replace the **Add to Cart** button in `src/components/sections/BundleSection.tsx` with a link to the product's checkout link. You lose the on-site cart drawer, but you have no tokens to manage.
