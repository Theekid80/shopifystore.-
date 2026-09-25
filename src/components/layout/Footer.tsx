import Link from "next/link";
import { site } from "@/config/site";
import { newsletter } from "@/config/content";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { InstagramIcon, PinterestIcon, TikTokIcon } from "@/components/ui/Icons";

const socialIcons = { instagram: InstagramIcon, tiktok: TikTokIcon, pinterest: PinterestIcon };

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-ivory">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-20 md:px-8 md:pt-28 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="font-display mt-6 max-w-xs text-3xl leading-tight text-ivory/90">{site.tagline}</p>
            <div className="mt-8 max-w-sm">
              <p className="mb-3 text-sm text-fog">{newsletter.body}</p>
              <NewsletterForm cta={newsletter.cta} tone="dark" />
            </div>
            <ul className="mt-4 flex gap-2" aria-label="Social media">
              {site.social.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${s.label} (opens in a new tab)`}
                      className="grid size-11 place-items-center rounded-full border border-white/15 text-ivory/80 transition-colors hover:border-white/50 hover:text-ivory"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {site.footer.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="eyebrow text-fog">{col.title}</h2>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-ivory/80 transition-colors hover:text-ivory">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-fog md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-right">
            VELARA travel essentials are designed for comfort and organization. They are not medical devices and are not
            intended to diagnose, treat or prevent any condition.
          </p>
        </div>
      </div>
    </footer>
  );
}
