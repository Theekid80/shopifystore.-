"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

type Status = { kind: "idle" | "sending" | "done" | "error"; message?: string };

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!site.newsletter.endpoint) {
      // Not connected: be honest rather than pretend the sign-up succeeded.
      setStatus({ kind: "done", message: "Thanks! Sign-ups open soon — we're not collecting emails just yet." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(site.newsletter.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setEmail("");
      setStatus({ kind: "done", message: "Welcome aboard. You're on the Velara travel list." });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <section aria-labelledby="newsletter-title" className="py-24 md:py-36">
      <Reveal className="mx-auto max-w-2xl px-4 text-center md:px-8">
        <p className="eyebrow text-sand-deep">The Velara Travel List</p>
        <h2 id="newsletter-title" className="text-headline mt-5 font-medium uppercase">
          Travel better.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-stone">
          Join the Velara travel list for new releases, travel guides and exclusive offers.
        </p>

        <form onSubmit={onSubmit} noValidate className="mx-auto mt-10 max-w-md">
          <div className="flex items-center gap-2 rounded-full border border-charcoal/20 bg-ivory p-1.5 pl-6 transition-colors focus-within:border-charcoal">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status.kind === "error") setStatus({ kind: "idle" });
              }}
              placeholder="Enter your email"
              aria-invalid={status.kind === "error"}
              aria-describedby="newsletter-status"
              className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-stone/80"
            />
            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="group eyebrow inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-charcoal px-5 text-ivory transition-colors hover:bg-ink disabled:opacity-60"
            >
              <span className="hidden sm:inline">Join Velara</span>
              <span className="sm:hidden">Join</span>
              <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <p
            id="newsletter-status"
            role="status"
            className={`mt-4 min-h-5 text-sm ${status.kind === "error" ? "text-red-800" : "text-stone"}`}
          >
            {status.message}
          </p>
          <p className="mt-2 text-xs text-stone/90">No spam. Unsubscribe anytime.</p>
        </form>
      </Reveal>
    </section>
  );
}
