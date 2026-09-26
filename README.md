# WEDRA — Shopify theme

**Premium travel, leisure & sleep essentials.**

WEDRA is a curated retailer: it sells products from other brands, unbranded
products, and (later) WEDRA's own products. WEDRA is the store and curator —
the theme never labels another company's or a supplier's product as WEDRA.

This repository is the WEDRA storefront: a Shopify Online Store 2.0 theme.
Shopify hosts the site and handles products, prices, inventory, cart,
checkout, payments, orders, customers, discounts, shipping and taxes.
GitHub holds the source and history. Nothing else is needed to run the store.

```
Customer → wedra.co (Shopify) → Shopify cart → Shopify checkout → Shopify order → fulfillment app → customer
```

The theme never takes payment, stores orders or holds product data of its own.
Everything a customer sees about a product comes from Shopify Admin.

---

## Repository layout

Shopify's GitHub integration reads the theme folders at the root of the branch:

| Folder | What's in it |
| --- | --- |
| `layout/` | `theme.liquid` (every page) and `password.liquid` (pre-launch page) |
| `templates/` | JSON page templates: home, product, collection, collections list, cart, search, pages (About / FAQ / Contact), blog, article, 404, password, customer accounts |
| `sections/` | Editable page sections (hero, brand statement, featured collection, editorial banner, image with text, collections, product spotlight, principles, FAQ, email sign-up, product, cart drawer, header, footer, …) |
| `snippets/` | Reusable parts: product card, price, gallery, variant picker, cart line, logo, SEO tags, structured data |
| `blocks/` | Theme blocks for the free-form "Custom section" |
| `assets/` | `base.css` (design system), `theme.js` (no dependencies), bundled fonts |
| `config/` | Theme settings (brand, colors, type, cart, cards, social) |
| `locales/` | All interface text (`en.default.json`) |

Anything outside those folders (this README, the legacy `src/` app) is ignored by Shopify.

---

## Connect the theme to Shopify (GitHub integration)

1. Shopify Admin → **Online Store → Themes → Add theme → Connect from GitHub**.
2. Authorise GitHub, pick this repository and the branch to publish from.
3. Shopify creates a theme that stays in sync with that branch: commits appear in Shopify, and edits made in the theme editor are committed back to the branch.
4. Click **Customize** to open the theme editor, then **Publish** when ready.

Use one branch for the live theme (for example `main`) and other branches for work in progress.
Theme editor changes are written to `config/settings_data.json` and `templates/*.json`, so pull before editing those files locally.

---

## Store setup checklist

Do these in Shopify Admin. The theme adapts automatically — nothing needs code.

### 1. Brand (Online Store → Themes → Customize → Theme settings)
- **Brand**: name (WEDRA), tagline, optional logo and a light logo for dark backgrounds, favicon.
- **Colors / Typography**: defaults are the WEDRA palette (ivory, black, charcoal, stone) and typefaces (Cormorant Garamond + Manrope, bundled, SIL Open Font License).
- **Social media**: add only accounts that exist; empty ones stay hidden.
- **Search engine & sharing**: a 1200 × 630 sharing image.

### 2. Products (Products → Add product)
Everything shown on a product page comes from here: title, description, images, price, compare-at price, variants, inventory.
- **Brand** — see "How brands work" below. Set the **Vendor** to the product's real brand, or to `Unbranded`.
- **Product type** (for example "Travel") is shown above the name when a product has no brand.
- Write clear product titles without supplier keyword lists, and without putting "WEDRA" in the title of a product WEDRA doesn't make.
- Use your own SKUs if you want them; SKUs are not shown on the storefront.
- Remove supplier tags that come in with imports.

Optional product metafields (Settings → Custom data → Products → Add definition, namespace `custom`):

| Key | Type | Used for |
| --- | --- | --- |
| `brand` | Single line text | The product's brand. Overrides Vendor. Use `WEDRA` only for genuine WEDRA products, `Unbranded` to force unbranded |
| `short_description` | Single line text | Line under the price, card and spotlight text |
| `features` | Multi-line text | Features tab (one feature per line) |
| `specifications` | Multi-line text | Specifications tab (one `Label: value` per line) |
| `whats_included` | Multi-line text | What's included tab (one item per line) |
| `material` | Single line text | Specifications tab |
| `dimensions` | Single line text | Specifications tab |
| `weight` | Single line text | Specifications tab |
| `care` | Multi-line text | Specifications tab |
| `shipping_note` | Multi-line text | Shipping tab (otherwise a neutral line) |
| `product_badge` | Single line text | A small label on the card (use sparingly, factual only) |
| `coming_soon` | True or false | Replaces Add to cart with a sign-up for that product (or add the tag `coming-soon`) |
| `lifestyle_images` | List of files | Editorial images under the product |

Tabs with no content are hidden. The theme never invents specifications.

#### How brands work

The brand shown on cards, product pages, the cart, the Brands page and in Google's product data comes from:

1. the product's **Brand metafield** (`custom.brand`), if set; otherwise
2. the product's **Vendor** — unless that vendor is listed in **Theme settings → Product brands → Vendor values that are not brands** (default: `My Store, Wedra.co, WEDRA, Unbranded, Generic, No brand, Default`).

Products with no brand show **Brand: Unbranded** and **Sold by: WEDRA** on the product page, and no brand anywhere else. `WEDRA` is in the "not brands" list so supplier products are never presented as WEDRA-made. For a genuine WEDRA product, set its Brand metafield to `WEDRA`.

- **A branded product** (e.g. a pillow from "Example Travel Co."): set Vendor to `Example Travel Co.`. It appears on the product, links to all that brand's products (`/collections/vendors?q=…`), and joins the Brands page automatically.
- **An unbranded supplier product**: set Vendor to `Unbranded` (or leave it as a value in the list).
- Only show a brand's logo (Brands section blocks) where you have permission to use it, and don't describe WEDRA as an authorized retailer unless the brand has agreed.

#### Star ratings
Stars appear only when a review app (Judge.me, Yotpo, Okendo, Shopify Product Reviews, …) writes genuine ratings to the product's standard `reviews.rating` / `reviews.rating_count` metafields. Without that data, no stars are shown.

### 3. Collections (Products → Collections)
- `/collections/all` (Shop) lists every product automatically.
- The homepage **Shop by experience** cards link to collections with the handles `travel`, `sleep`, `comfort` and `leisure`. Create them (automated collections by product type or tag work well); each card appears only once its collection has products.
- **The WEDRA Catalogue** on the homepage shows the `the-wedra-travel-edit` collection (change it in the theme editor). It's hidden if that collection is empty.
- Collections with products appear automatically in the Shop dropdown, on `/collections` and in the collection page's sub-navigation. Empty collections are never shown.
- Give each collection an image and a one-line description.

### 4. Navigation (Online Store → Navigation)
- **Main menu**: Shop (with sub-links: All products, Travel Organization, Sleep & Rest, Travel Comfort, Tech & Accessories, Leisure, New Arrivals, Best Sellers — only collections that exist), Travel, Sleep, Leisure, Comfort, Brands (`/pages/brands`), About (`/pages/about`). Nested links become dropdowns on desktop and expandable groups on phones.
  New stores start with a default main menu (Home, Catalog, Contact) — replace its links. If the menu is empty, the header builds one from collections with products and pages that exist.
- Footer columns (Navigation / Customer / Legal) show sensible defaults, and only link to pages and policies that exist. To control them, create menus and pick them in the footer settings.

### 5. Pages (Online Store → Pages)
| Page | Handle | Template |
| --- | --- | --- |
| About | `about` | `page.about` |
| Brands | `brands` | `page.brands` |
| FAQ | `faq` | `page.faq` |
| Contact | `contact` | `page.contact` |

The About and FAQ copy lives in the theme editor (open the page, then Customize). Review every FAQ answer so it matches how the store actually operates.

### 6. Policies (Settings → Policies)
Write the refund, shipping, privacy and terms of service policies (Shopify's templates are a starting point — have them reviewed). The footer and product tabs link to them automatically once they exist. The theme contains no legal wording of its own.

### 7. Shipping, taxes, payments
- **Settings → Shipping and delivery**: rates and zones. The theme never hard-codes shipping. If you offer free shipping over an amount, set the same amount in Theme settings → Cart to show the progress bar.
- **Settings → Taxes and duties**: Shopify calculates taxes at checkout.
- **Settings → Payments**: Shopify Payments, Shop Pay, PayPal, Apple Pay / Google Pay. Enabled methods appear automatically (the "Buy it now" button, footer payment icons).

### 8. Fulfillment
Install the fulfillment app from the Shopify App Store and connect products there. It receives paid Shopify orders; the storefront does not change. Place a test order to confirm the order reaches the app.

### 9. Email sign-ups
All sign-up forms use Shopify's customer form: subscribers are saved in **Customers** with email marketing consent and tags (`newsletter`, `notify-<product>`, `interest-<collection>`, `first-edit`, `prelaunch`).
Shopify Email works directly; Klaviyo and Mailchimp import them through their Shopify apps. No API keys live in the theme.

### 10. Analytics and ads
Use Shopify's built-in channels and pixels — no tracking IDs are hard-coded:
- **Google & YouTube** app → Google Analytics 4 and Google Ads conversions.
- **Facebook & Instagram** app → Meta pixel and Conversions API.
- **TikTok** app → TikTok pixel.
- **Settings → Customer events** for any other pixel. The theme also publishes one custom event, `wedra:lead`, when someone subscribes.
- Set up **Settings → Customer privacy** (cookie banner) before running ads.

### 11. Reviews
Only genuine reviews. Install a review app, then in the theme editor add its app block to the product page "Reviews" section. Nothing shows until you do.

### 12. Domain
wedra.co is already managed by Shopify (Settings → Domains). Make it the primary domain. The theme uses Shopify's own URLs for canonical links, sharing tags and structured data, so nothing needs to change in code.

### 13. Before launch
- Keep **Online Store → Preferences → Password protection** on until products, policies, shipping and fulfillment are confirmed. The password page matches the brand and collects emails.
- Alternatively, **Theme settings → Store status → Pre-launch mode** keeps the site visible but replaces every Add to cart with a sign-up.
- Place a real test order end to end (pay, fulfill, refund), on a phone and a laptop.

---

## Images

The theme ships **without** stock or placeholder photography. Until you add images, sections fall back to a quiet charcoal field or a neutral tile; in the theme editor each shows a hint.

| Where | Recommended |
| --- | --- |
| Hero | 2400 × 1500 or larger, plus an optional 1200 × 1800 mobile crop |
| Editorial banner | 2400px wide |
| Image with text | 1600 × 2000 (portrait) |
| Collection image | 1600 × 2000 |
| Products | Square or 4:5, at least 2048px, consistent background and light |

Shopify's CDN resizes images and serves modern formats (such as WebP) automatically.

---

## What the theme includes

- **Homepage**: cinematic hero, Shop by experience (Travel / Sleep / Comfort / Leisure collections), The WEDRA Catalogue (live products), brand statement, featured brands, editorial banner, optional product spotlight, how-we-choose principles, email sign-up. Every section is editable, reorderable and removable, and sections with no real content are hidden.
- **Product page**: brand (from Vendor or Brand metafield), genuine star ratings only, brand & "Sold by WEDRA" panel, swipeable gallery on phones, thumbnails on desktop, full-screen zoom, variant picker with sold-out handling, quantity, add to cart, Shopify's dynamic checkout, a shipping note, description / details / shipping / returns tabs, recommendations, sticky add to cart on phones.
- **Collections**: Shopify filtering and sorting (configure filters in the Search & Discovery app), pagination, graceful empty states.
- **Search**: predictive results as you type (Shopify Predictive Search API) and a full results page.
- **Cart**: drawer with quantity, remove, free-shipping progress (optional), up to three optional suggestions, checkout to Shopify. Full cart page with Shopify's accelerated checkout buttons.
- **Brands page** (`page.brands`), built automatically from the brands of the products you sell.
- **Accounts, blog, 404, password page.**
- **SEO**: unique titles and descriptions, canonical URLs, Open Graph / X cards, Organization, Product, Article and Breadcrumb structured data (no ratings unless a review app adds genuine ones), one H1 per page, alt text from Shopify.
- **Accessibility**: skip link, keyboard-operable dialogs (native `<dialog>`), visible focus, labelled controls, native accordions, reduced-motion support.
- **Performance**: one stylesheet, one small script, no frameworks, responsive images with lazy loading, two preloaded fonts.

---

## Local development

With the [Shopify CLI](https://shopify.dev/docs/api/shopify-cli):

```bash
shopify theme dev --store wedra.myshopify.com   # live preview against the real store
shopify theme check                               # lint
```

Commit to a branch, review the theme preview, then merge into the published branch.

---

## Legacy code

`src/`, `public/`, `scripts/`, `design/`, `docs/`, `dist/` and the Next.js config files belong to an earlier headless prototype (VELARA). Shopify ignores them and nothing in the theme depends on them. They are scheduled for removal.
