import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/data/pages";
import { ButtonLink } from "@/components/ui/Button";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/pages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return page ? { title: page.title, robots: { index: false } } : {};
}

export default async function InfoPage({ params }: PageProps<"/pages/[slug]">) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 pb-28 pt-36 md:px-8 md:pt-44">
      <p className="eyebrow text-sand-deep">Velara</p>
      <h1 className="text-headline mt-5 font-medium uppercase">{page.title}</h1>
      <div className="mt-10 space-y-5 text-base leading-relaxed text-stone">
        {page.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <ButtonLink href="/" variant="secondary" className="mt-12">
        Back to home
      </ButtonLink>
    </section>
  );
}
