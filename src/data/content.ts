/**
 * ─────────────────────────────────────────────────────────────────────────
 *  EDITABLE PAGE CONTENT — features, testimonials and FAQ.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const maskFeatures = [
  { title: "Total Blackout", body: "Blocks out unwanted light." },
  { title: "Weighted Comfort", body: "Gentle, balanced pressure." },
  { title: "Adjustable Fit", body: "Designed for comfortable wear." },
  { title: "Travel Ready", body: "Compact and easy to pack." },
];

export const travelMoments = [
  { title: "Flights", body: "Window seat or aisle, dim the cabin on your terms.", image: "flightsLifestyle" },
  { title: "Hotels", body: "Early sunrise, city glow, thin curtains — handled.", image: "hotelLifestyle" },
  { title: "Road Trips", body: "Rest between drivers, wherever you pull over.", image: "roadTripLifestyle" },
  { title: "Business Travel", body: "Arrive composed, with everything in its place.", image: "businessLifestyle" },
] as const;

export const organizationItems = ["Packing cubes", "Tech organizer", "Toiletry bag", "Sleep mask", "Travel pouch"];

export const whyVelara = [
  { title: "Comfort", body: "Thoughtful products designed around rest." },
  { title: "Organization", body: "Everything you need, exactly where you expect it." },
  { title: "Simplicity", body: "One system instead of a bag full of loose accessories." },
  { title: "Style", body: "Travel essentials that look as good as they perform." },
];

/**
 * TESTIMONIALS
 *
 * These are PLACEHOLDERS, and the site labels them as such while
 * `isPlaceholder` is true. Replace them only with genuine reviews from real
 * customers (with their permission), then set `isPlaceholder: false`.
 * Never publish invented reviews, ratings or customer counts.
 */
export const testimonials = {
  isPlaceholder: true,
  items: [
    { quote: "Finally, a travel kit that actually feels premium.", name: "Customer Name", detail: "Verified buyer · City" },
    { quote: "Everything I need for a long flight in one place.", name: "Customer Name", detail: "Verified buyer · City" },
    { quote: "The mask lives in my carry-on now. It goes everywhere I go.", name: "Customer Name", detail: "Verified buyer · City" },
  ],
};

/**
 * FAQ — edit answers freely. Items in [brackets] need store-specific details
 * before launch.
 */
export const faq = [
  {
    q: "What comes with the Travel Sleep System?",
    a: "The system includes seven pieces: a weighted blackout sleep mask, a travel sleep pouch, reusable noise-reducing earplugs in a compact carry case, a tech organizer, a packing organizer cube, a toiletry and overnight pouch, and a luggage tag.",
  },
  {
    q: "How does the weighted sleep mask work?",
    a: "The mask is contoured to sit comfortably around the eyes and block out light, while a softly weighted fill adds gentle, even pressure for a cocooned feel. It's designed for comfort and relaxation — it isn't a medical device and isn't intended to treat any condition.",
  },
  {
    q: "Is the mask adjustable?",
    a: "Yes. The strap adjusts so you can find a secure, comfortable fit whether you're sitting upright on a flight or lying down in a hotel room.",
  },
  {
    q: "How do I clean the mask?",
    a: "[Add care instructions for your final materials — e.g. remove the cover and hand wash cold with a mild detergent, then lay flat to dry.]",
  },
  {
    q: "Can I use the system for flights?",
    a: "That's exactly what it's designed for. Everything packs into a carry-on, and the sleep pouch keeps your mask and earplugs within reach at your seat. As always, check your airline's policies for any specific requirements.",
  },
  {
    q: "How large are the organizers?",
    a: "[Add final dimensions for each organizer — e.g. Packing Cube: 33 × 24 × 10 cm; Tech Organizer: 24 × 16 × 5 cm; Toiletry Bag: 22 × 14 × 10 cm.]",
  },
  {
    q: "How long does shipping take?",
    a: "[Add your processing time and delivery estimates by region, e.g. orders ship within 1–2 business days; standard delivery takes 5–8 business days.]",
  },
  {
    q: "What is your return policy?",
    a: "[Add your return policy — window, condition requirements and how to start a return. Make sure it matches the policy configured in your Shopify admin.]",
  },
];
