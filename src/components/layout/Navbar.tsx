"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { site } from "@/config/site";
import { useStore } from "@/lib/commerce/cart";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { AccountIcon, BagIcon, CloseIcon, MenuIcon, SearchIcon } from "@/components/ui/Icons";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart, setSearchOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = overHero && !scrolled;

  // Let the menu finish closing (and unlock page scroll) before navigating,
  // so anchor links land exactly on their section.
  const navigateFromMenu = (e: MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => router.push(href), 480);
  };
  const iconBtn =
    "size-11 place-items-center rounded-full transition-colors duration-300 hover:bg-current/[0.08]";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow,backdrop-filter] duration-500 ${
          transparent
            ? "on-dark bg-transparent text-ivory"
            : "bg-ivory/85 text-charcoal shadow-[0_1px_0_rgba(28,28,27,0.08)] backdrop-blur-xl"
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 md:h-20 md:px-8 lg:px-12">
          <button
            type="button"
            className={`${iconBtn} -ml-2.5 grid lg:hidden`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon size={22} />
          </button>

          <Logo className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0" />

          <ul className="ml-10 hidden items-center gap-9 lg:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="eyebrow relative py-2 opacity-80 transition-opacity hover:opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-0.5 md:gap-1.5">
            <button type="button" className={`${iconBtn} hidden sm:grid`} onClick={() => setSearchOpen(true)} aria-label="Search">
              <SearchIcon />
            </button>
            <Link href={site.accountHref} className={`${iconBtn} hidden sm:grid`} aria-label="Account">
              <AccountIcon />
            </Link>
            <button
              type="button"
              className={`${iconBtn} relative -mr-2.5 grid lg:mr-0`}
              onClick={openCart}
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <BagIcon />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className={`absolute right-1 top-1 grid min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-semibold leading-[18px] ${
                    transparent ? "bg-ivory text-ink" : "bg-charcoal text-ivory"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
            <div className="ml-3 hidden lg:block">
              <ButtonLink href={site.primaryCta.href} variant={transparent ? "light" : "primary"}>
                {site.primaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} label="Menu" panelClassName="max-w-none!">
        <div className="flex h-16 items-center justify-between px-4">
          <Logo onClick={() => setMenuOpen(false)} />
          <button type="button" className={`${iconBtn} grid`} onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <CloseIcon size={22} />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col px-6 pb-10 pt-8">
          <ul className="space-y-1">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => navigateFromMenu(e, item.href)}
                  className="flex items-baseline gap-4 border-b border-charcoal/10 py-5 text-3xl font-medium uppercase tracking-tight"
                >
                  <span className="eyebrow text-sand-deep">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="eyebrow flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-charcoal/15"
            >
              <SearchIcon size={16} /> Search
            </button>
            <Link
              href={site.accountHref}
              onClick={() => setMenuOpen(false)}
              className="eyebrow flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-charcoal/15"
            >
              <AccountIcon size={16} /> Account
            </Link>
          </div>
          <ButtonLink
            href={site.primaryCta.href}
            size="lg"
            arrow
            className="mt-auto w-full"
            onClick={(e) => navigateFromMenu(e, site.primaryCta.href)}
          >
            {site.primaryCta.label}
          </ButtonLink>
        </nav>
      </Sheet>
    </>
  );
}
