"use client";

import { useId, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { ArrowRightIcon } from "@/components/ui/Icons";

type Status = { kind: "idle" | "sending" | "done" | "error"; message?: string };

/**
 * Email sign-up. Posts to /api/newsletter, which forwards to Klaviyo,
 * Mailchimp or a webhook depending on server env (see that route).
 * Fires the Lead event only when the sign-up actually succeeds.
 */
export function NewsletterForm({ cta, tone = "light" }: { cta: string; tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const id = useId();
  const dark = tone === "dark";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; configured?: boolean };
      if (data.configured === false) {
        setStatus({ kind: "done", message: "Thank you. Sign-ups open soon — we're not collecting emails just yet." });
        return;
      }
      if (!res.ok || !data.ok) throw new Error(String(res.status));
      setEmail("");
      setStatus({ kind: "done", message: "Welcome aboard. You're on the VELARA list." });
      track({ name: "Lead" });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div
        className={`flex items-center gap-2 rounded-full border p-1.5 pl-5 transition-colors ${
          dark ? "border-white/20 bg-white/5 focus-within:border-white/60" : "border-charcoal/20 bg-ivory focus-within:border-charcoal"
        }`}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
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
          aria-describedby={`${id}-status`}
          className={`h-11 min-w-0 flex-1 bg-transparent text-base outline-none ${dark ? "text-ivory placeholder:text-fog" : "placeholder:text-stone/80"}`}
        />
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className={`group eyebrow inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 transition-colors disabled:opacity-60 ${
            dark ? "bg-ivory text-ink hover:bg-white" : "bg-charcoal text-ivory hover:bg-ink"
          }`}
        >
          <span className="hidden sm:inline">{cta}</span>
          <span className="sm:hidden">Join</span>
          <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        className={`mt-3 min-h-5 text-sm ${status.kind === "error" ? (dark ? "text-red-300" : "text-red-800") : dark ? "text-fog" : "text-stone"}`}
      >
        {status.message}
      </p>
    </form>
  );
}
