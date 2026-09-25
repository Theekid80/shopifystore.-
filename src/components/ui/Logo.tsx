import Link from "next/link";
import { site } from "@/config/site";

/** Minimal ridge-line mark: a horizon of two peaks, evoking the journey. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 20" className={className} fill="none" aria-hidden="true" focusable="false">
      <path
        d="M1 18.5 11 5.5l5.5 7L22 3l13 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M1 18.5h34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function Logo({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={`inline-flex items-center gap-2.5 ${className}`} aria-label={`${site.name} home`}>
      <LogoMark className="h-[14px] w-auto text-sand" />
      <span className="text-[1.05rem] font-semibold tracking-[0.34em]">{site.name}</span>
    </Link>
  );
}
