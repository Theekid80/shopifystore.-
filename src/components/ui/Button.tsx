import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { ArrowRightIcon } from "./Icons";

type Variant = "primary" | "secondary" | "light" | "ghost-light" | "link";
type Size = "md" | "lg";

const styles: Record<Variant, string> = {
  primary: "bg-charcoal text-ivory hover:bg-ink",
  secondary: "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  light: "bg-ivory text-ink hover:bg-white",
  "ghost-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
  link: "px-0! h-auto! text-charcoal underline-offset-[6px] hover:underline",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[0.6875rem]",
  lg: "h-14 px-8 text-[0.75rem]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

const classes = (variant: Variant, size: Size, className: string) =>
  [
    "group inline-flex select-none items-center justify-center gap-3 rounded-full font-semibold uppercase tracking-[0.2em]",
    "transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    sizes[size],
    styles[variant],
    className,
  ].join(" ");

const Arrow = () => (
  <ArrowRightIcon size={15} className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
);

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  children,
  ...rest
}: Common & { href: string; onClick?: (e: MouseEvent<HTMLAnchorElement>) => void; "aria-label"?: string }) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({ variant = "primary", size = "md", arrow, className = "", children, type = "button", ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
