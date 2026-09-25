import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="eyebrow text-sand-deep">404</p>
      <h1 className="font-display text-headline mt-5">Off the map.</h1>
      <p className="mt-6 text-stone">The page you&apos;re looking for doesn&apos;t exist.</p>
      <ButtonLink href="/" arrow className="mt-10">
        Back to home
      </ButtonLink>
    </section>
  );
}
