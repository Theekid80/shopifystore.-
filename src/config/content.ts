/**
 * ─────────────────────────────────────────────────────────────────────────
 *  HOME PAGE COPY — every headline, paragraph and list on the home page.
 * ─────────────────────────────────────────────────────────────────────────
 *  Tone: confident, calm, premium. No urgency tricks, no medical claims,
 *  no invented numbers. [Brackets] = fill in before launch.
 */
import { policies } from "./policies";

export const hero = {
  eyebrow: "The Travel Sleep System",
  headline: ["Sleep better.", "Travel better."],
  subheadline:
    "The premium travel sleep system designed to make every journey feel more comfortable, organized, and effortless.",
  primaryCta: { label: "Shop the Travel Sleep System", href: "/#offer" },
  secondaryCta: { label: "Explore the System", href: "/#system" },
};

export const benefits = [
  { title: "Blackout Comfort", body: "Designed to help create a darker, more comfortable environment." },
  { title: "Travel Ready", body: "Everything organized into one compact system." },
  { title: "Premium Feel", body: "Thoughtfully selected travel essentials." },
  { title: "Made for the Journey", body: "Airplanes, hotels, road trips and weekends away." },
];

export const showcase = {
  eyebrow: "Six essentials · One system",
  headline: "Everything you need to rest on the road.",
};

export const whySystem = {
  eyebrow: "Why a system",
  headline: "Not just a sleep mask.",
  lead: "Travel comfort isn't one thing. It's the combination of rest, organization, and having what you need exactly when you need it.",
  body: "A mask alone won't find your charger at 2am, and a packing cube won't dim the cabin. VELARA brings sleep comfort and travel organization together in one coordinated system, so the things that help you rest travel with the things that keep you organized.",
  points: [
    { title: "Rest", body: "Blackout mask and earplugs for the flight, the hotel and the drive." },
    { title: "Order", body: "A place for toiletries, tech and clothing — found in seconds." },
    { title: "Together", body: "Six pieces that pack as one, so nothing gets left behind." },
  ],
};

export const airplane = {
  eyebrow: "In the air",
  headline: "Your seat just got more comfortable.",
  body: "Long flights, early departures and unfamiliar surroundings don't have to mean sacrificing your routine.",
  cta: { label: "Shop VELARA", href: "/#offer" },
};

export const hotel = {
  eyebrow: "At the hotel",
  headline: "Arrive. Unpack. Reset.",
  body: "The system is designed to work as well after you land as it does in transit.",
  steps: [
    { title: "Arrive", body: "Your organizer and tech pouch come out of the bag already packed and in order." },
    { title: "Unpack", body: "Toiletries go straight to the counter, chargers to the nightstand. Nothing to hunt for." },
    { title: "Reset", body: "Mask and earplugs within reach for a darker, quieter night — whatever the curtains are like." },
  ],
};

export const whatsInside = {
  eyebrow: "What's inside",
  headline: "Six essentials, designed to work together.",
  closing: ["One system.", "Six essentials.", "One better way to travel."],
};

export const comparison = {
  eyebrow: "The value of a system",
  headline: "One system, instead of a bag of separates.",
  columns: [
    {
      title: "Separate travel essentials",
      points: ["Multiple individual purchases", "More items to remember", "Less organized", "Separate storage"],
    },
    {
      title: "VELARA System",
      points: ["One coordinated system", "Everything together", "Travel-ready", "Designed to work together"],
    },
  ],
};

export const lifestyle = {
  eyebrow: "Made for the journey",
  headline: "Wherever you're headed.",
  items: [
    { title: "Air", body: "For long-haul flights and early departures.", image: "airplaneSeat" },
    { title: "Hotel", body: "For creating a familiar nighttime routine away from home.", image: "sleepMask" },
    { title: "Road", body: "For road trips and overnight stops.", image: "road" },
    { title: "Weekend", body: "For short trips when you want to pack lighter.", image: "weekend" },
  ] as const,
};

/** Product details accordion on the home page and system product page. */
export const productDetails = [
  {
    q: "What's included?",
    a: "Six pieces: a weighted blackout sleep mask, earplugs with a carry case, a travel pouch, a toiletry organizer, a packing cube and a tech pouch.",
  },
  {
    q: "How does the sleep mask fit?",
    a: "The mask is contoured around the eyes and has an adjustable strap, so you can find a secure, comfortable fit sitting upright or lying down. [Confirm final fit details.]",
  },
  { q: "How should I care for it?", a: policies.care.join(" ") },
  {
    q: "Is the system suitable for carry-on travel?",
    a: "Every piece is sized for travel, and the pouch keeps your sleep essentials within reach at your seat. [Confirm with final packed dimensions.] Always check your airline's carry-on rules.",
  },
  { q: "How large is the organizer?", a: "[Add final organizer dimensions, e.g. 22 × 14 × 10 cm.]" },
  { q: "When will my order ship?", a: policies.shipping[1] },
  { q: "What is the return policy?", a: policies.returns.join(" ") },
];

/**
 * REVIEWS
 * No reviews are shown until you add real ones. Each entry must come from a
 * genuine customer with permission. Leave `rating` undefined unless the
 * customer gave one. While the list is empty, development builds show
 * clearly marked "Your customer review here" slots and the live site hides
 * the section.
 */
export type Review = { quote: string; name: string; location?: string; rating?: 1 | 2 | 3 | 4 | 5; product?: string };

export const reviews = {
  eyebrow: "Reviews",
  headline: "From the journey.",
  items: [] as Review[],
  /** true = show `emptyMessage` on the live site until reviews exist; false = hide the section. */
  showEmptyMessage: false,
  emptyMessage: "VELARA is new. Customer reviews will appear here as travelers share them.",
};

export const newsletter = {
  eyebrow: "The VELARA List",
  headline: "Travel better.",
  body: "Join the VELARA list for travel inspiration, product updates and early access.",
  cta: "Join VELARA",
};

export const faq = [
  {
    q: "What comes in the VELARA Travel Sleep System?",
    a: "Six coordinated essentials: a weighted blackout sleep mask, earplugs with a carry case, a travel pouch, a toiletry organizer, a packing cube and a tech pouch.",
  },
  { q: "How does shipping work?", a: policies.shipping.join(" ") },
  { q: "Do you ship internationally?", a: policies.international.join(" ") },
  { q: "What is your return policy?", a: policies.returns.join(" ") },
  { q: "How should I care for the sleep mask?", a: policies.care[0] },
  {
    q: "Can I purchase individual components?",
    a: "Yes. Every piece is available on its own in the shop, alongside the Sleep + Travel Kit and the complete system.",
  },
  { q: "How compact is the system?", a: "[Add the packed size of the complete system, e.g. fits in a standard carry-on alongside clothing.]" },
];
