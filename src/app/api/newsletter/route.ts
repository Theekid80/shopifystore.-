/**
 * Newsletter sign-up integration point. POST { "email": "..." }.
 *
 * Pick a provider with NEWSLETTER_PROVIDER (server-side env, keys never
 * reach the browser):
 *
 *   klaviyo    KLAVIYO_PUBLIC_KEY (6-char site ID) + KLAVIYO_LIST_ID
 *   mailchimp  MAILCHIMP_API_KEY (ends in -usX) + MAILCHIMP_LIST_ID
 *   webhook    NEWSLETTER_WEBHOOK_URL — receives POST { email, source }
 *              (use with Zapier/Make, Shopify Flow, or your own endpoint)
 *
 * For Shopify Email, the simplest path is Klaviyo's or Shopify Forms'
 * Shopify integration, or a webhook into Shopify Flow. See README.
 *
 * Returns { configured: false } when nothing is set up; the form then tells visitors
 * sign-ups aren't open yet instead of pretending it worked. These calls
 * haven't been exercised against live accounts — send a test sign-up
 * before launch.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    email = String((await request.json()).email ?? "").trim().toLowerCase();
  } catch {
    /* fall through */
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const provider = process.env.NEWSLETTER_PROVIDER;

  try {
    if (provider === "klaviyo" && process.env.KLAVIYO_PUBLIC_KEY && process.env.KLAVIYO_LIST_ID) {
      const res = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${encodeURIComponent(process.env.KLAVIYO_PUBLIC_KEY)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", revision: "2024-10-15" },
          body: JSON.stringify({
            data: {
              type: "subscription",
              attributes: { profile: { data: { type: "profile", attributes: { email } } } },
              relationships: { list: { data: { type: "list", id: process.env.KLAVIYO_LIST_ID } } },
            },
          }),
        },
      );
      if (!res.ok) throw new Error(`Klaviyo ${res.status}`);
      return Response.json({ ok: true });
    }

    if (provider === "mailchimp" && process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      const key = process.env.MAILCHIMP_API_KEY;
      const dc = key.split("-")[1];
      const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Basic ${Buffer.from(`velara:${key}`).toString("base64")}` },
        // "pending" sends Mailchimp's double opt-in confirmation email.
        body: JSON.stringify({ email_address: email, status: "pending" }),
      });
      // 400 "Member Exists" is fine — they're already on the list.
      if (!res.ok && res.status !== 400) throw new Error(`Mailchimp ${res.status}`);
      return Response.json({ ok: true });
    }

    if (provider === "webhook" && process.env.NEWSLETTER_WEBHOOK_URL) {
      const res = await fetch(process.env.NEWSLETTER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "velara-site" }),
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
      return Response.json({ ok: true });
    }
  } catch (err) {
    console.error("Newsletter sign-up failed", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: false, configured: false });
}
