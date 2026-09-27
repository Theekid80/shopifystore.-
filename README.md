# WEDRA — Shopify theme

**Products worth discovering.**

WEDRA is a curation brand for wellness and everyday living. WEDRA finds
useful, well-made products, filters out the noise and features the few worth
knowing about. **WEDRA is the finder, not the maker**: the theme never
presents a featured product as WEDRA-designed or WEDRA-made.

The store launches with one product, **WEDRA Discovery #01: Portable Electric
Juicer Blender**. The brand, pages and components are product-agnostic, so the
next discovery can be added without redesigning anything.

This repository is the storefront: a Shopify Online Store 2.0 theme. Shopify
is the source of truth for products, variants, inventory, prices, cart,
checkout, orders, customers, discounts, shipping, taxes and the domain.

```
Customer → wedra.co (Shopify) → Shopify cart → Shopify checkout → Shopify order → fulfillment app → customer
```

The theme never takes payment, stores orders or holds product data of its own.

| Document | What it covers |
| --- | --- |
| [`docs/brand-system.md`](docs/brand-system.md) | Positioning, voice, brand vs product messaging, visual identity, reusable components, the one-product strategy |
| [`docs/ai-creative-system.md`](docs/ai-creative-system.md) | The AI photo and video prompt engine: master template, 8 photo categories, 7 video concepts, formats, rules, QA |
| [`docs/discovery-01-blender.md`](docs/discovery-01-blender.md) | Verified facts for the blender, allowed and forbidden claims, the Shopify fields to fill in, launch checklist |
| [`docs/content-templates.md`](docs/content-templates.md) | Reusable Instagram, TikTok and website content templates |
| [`docs/ad-testing-bank.md`](docs/ad-testing-bank.md) | 90 ad hooks, test variables, naming, test plan, metrics, footage and creator briefs |
| [`docs/discovery-next-four.md`](docs/discovery-next-four.md) | Creative development for the next four candidate discoveries (not in Shopify yet): audit, image systems, video concepts, hooks, claims to avoid |
| [`docs/platform-ads.md`](docs/platform-ads.md) | Which file goes to which Instagram, Facebook and TikTok placement, safe zones, copy fields, pre-launch checklist |
| [`tools/ad-bank/`](tools/ad-bank/) | Renders the hook-testing videos, statics and carousel from `bank.json` |
| [`tools/discovery-video/`](tools/discovery-video/) | Renders the reusable "WEDRA Discovery" short video (9:16, 4:5, 1:1, 16:9) from product photos |

---

## Repository layout

| Folder | What's in it |
| --- | --- |
| `layout/` | `theme.liquid` (every page) and `password.liquid` (pre-launch page) |
| `templates/` | JSON templates: home, product, collection, cart, search, pages (About / FAQ / Contact), blog, 404, password, accounts |
| `sections/` | Editable sections (see "Components" below) |
| `snippets/` | Product card, price, gallery, variant picker, cart line, logo, SEO tags, structured data |
| `blocks/` | Theme blocks for the free-form "Custom section" |
| `assets/` | `base.css` (design system), `theme.js` (no dependencies), bundled fonts |
| `config/` | Theme settings (brand, SEO, colours, type, cart, cards, social) |
| `locales/` | Interface text |
| `docs/`, `tools/` | Brand and creative system; ignored by Shopify |

---

## Components

Every section reads live Shopify data and hides itself when it has nothing
real to show, so no section ever needs a placeholder product.

| Component | Section | Source |
| --- | --- | --- |
| Hero + discovery carousel | `hero-carousel` | Brand statement; cards are the first image of each live product. One product: a still card and the button goes straight to it. Several: they loop (seconds per slide is a setting). |
| Featured discovery | `featured-product` | Picked product, else the current product, else the first live product. "WEDRA Discovery #01" is the eyebrow setting. |
| Discovery highlights | `discovery-highlights` | The product's `custom.specifications` metafield |
| Everyday use | `product-story` | The product's `custom.everyday` metafield + one of its photos |
| Video block | `featured-video` | The product's first video in Shopify media |
| Brand philosophy | `principles`, `statement` | Section settings |
| Discovery grid | `featured-collection`, collection page | Any collection (use it once there are several discoveries) |
| FAQ | `faq` | Section blocks |
| Email sign-up | `newsletter` | Shopify customers with marketing consent |

**Homepage:** hero → featured discovery → highlights → why WEDRA → video →
"One discovery today. More to come." → FAQ → email sign-up.

**Product page:** gallery → name → price → variants → short value line →
add to cart → specifications → what's included → product details → shipping
→ returns → everyday use (lifestyle photo) → video → genuine reviews (only if
a review app provides them) → FAQ → more discoveries (only when there are
other products).

No fake reviews, ratings, sales counts, scarcity, countdowns, badges or
guarantees exist anywhere in the theme.

---

## Setting up the store

### Brand and SEO (Online Store → Themes → Customize → Theme settings)
- **Brand**: name, tagline ("Products worth discovering."), logo optional.
- **Homepage title** and **Default meta description** are set for search results; edit them there.
- **Product brands**: vendors that are not real brands (including `Zendrop`, `My Store`, `Unbranded`) are never shown. Keep the supplier's name out of every public field.

### Products
Import the product through the Zendrop app so fulfilment stays connected,
then follow [`docs/discovery-01-blender.md`](docs/discovery-01-blender.md):
title, description, verified specifications, photos, SEO fields.

Product metafields (Settings → Custom data → Products, namespace `custom`):

| Key | Type | Used for |
| --- | --- | --- |
| `short_description` | Single line text | Line under the price; spotlight text |
| `specifications` | Multi-line text | Specifications tab and homepage highlights (one `Label: value` per line; verified facts only) |
| `everyday` | Multi-line text | "Everyday use" section (real use cases, no health or performance claims) |
| `whats_included` | Multi-line text | What's included tab (one item per line) |
| `features` | Multi-line text | Features tab (one per line) |
| `shipping_note` | Multi-line text | Shipping tab (otherwise a neutral line + the shipping policy) |
| `brand` | Single line text | Only for a product with a genuine brand you may name |

Tabs and sections without content are hidden. The theme never invents specifications.

### Navigation
Main menu: **Discover** (`/collections/all`), **About**, **Contact**. Add
category links (for example Wellness, Everyday, New discoveries) only when
they have products. If the menu is empty the header shows the same three
links, and only for pages that exist.

### Collections
`/collections/all` lists every live product. **Discoveries**
(`/collections/discoveries`) is the curated collection. Hide collections that
have no live products (Products → Collections → the collection → Sales
channels → remove Online Store).

### Pages
| Page | Handle | Template |
| --- | --- | --- |
| About | `about` | `page.about` |
| FAQ | `faq` | `page.faq` |
| Contact | `contact` | `page.contact` |

### Policies, shipping, taxes, payments
Write the refund, shipping, privacy and terms policies (Settings → Policies).
Set rates in Settings → Shipping and delivery. The theme never states delivery
times or shipping prices itself.

### Reviews
Only genuine reviews: install a review app and add its block to the product
page "Reviews" section. Nothing shows until then.

### Before launch
Keep **Online Store → Preferences → Password protection** on until the
product, policies, shipping and fulfilment are confirmed, then place a test
order end to end on a phone.

---

## Business rule: one product until $10K

WEDRA sells one product until it reaches $10,000 in sales. Then it adds one
more carefully chosen discovery for the same wellness and everyday-living
audience. Don't add products just because the theme can show them. When the
second discovery arrives, it appears in the hero carousel, the Discover page
and "More discoveries" automatically; update the "WEDRA Discovery #" eyebrow
on the homepage.

---

## Local development

With the [Shopify CLI](https://shopify.dev/docs/api/shopify-cli):

```bash
shopify theme dev --store wedra.myshopify.com   # live preview against the real store
shopify theme check                               # lint
```
