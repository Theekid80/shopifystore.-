import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "light",
  id,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className={`eyebrow mb-5 ${tone === "dark" ? "text-sand" : "text-sand-deep"}`}>{eyebrow}</p>}
      <Tag id={id} className={`font-display text-headline ${tone === "dark" ? "text-ivory" : "text-charcoal"}`}>
        {title}
      </Tag>
      {body && (
        <p
          className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${centered ? "mx-auto" : ""} ${
            tone === "dark" ? "text-fog" : "text-stone"
          }`}
        >
          {body}
        </p>
      )}
    </Reveal>
  );
}
