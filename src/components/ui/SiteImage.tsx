import Image, { type ImageProps } from "next/image";
import type { ImageAsset } from "@/config/images";

const SHOW_TAGS = process.env.NODE_ENV === "development";

/**
 * next/image driven by an ImageAsset from src/config/images.ts.
 * In development, images not yet marked `final` carry a small
 * "Replace: <file>" tag so it's obvious where final photography goes.
 */
export function SiteImage({
  image,
  alt,
  tagPosition = "bottom-left",
  ...props
}: Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  image: ImageAsset;
  /** Override the configured alt, e.g. "" for decorative thumbnails. */
  alt?: string;
  tagPosition?: "bottom-left" | "top-left";
}) {
  const sizing = props.fill ? {} : { width: image.width, height: image.height };
  return (
    <>
      <Image src={image.src} alt={alt ?? image.alt} {...sizing} {...props} />
      {SHOW_TAGS && !image.final && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 rounded bg-ink/70 px-1.5 py-0.5 font-mono text-[9px] text-white ${
            tagPosition === "top-left" ? "left-2 top-2" : "bottom-2 left-2"
          }`}
        >
          Replace: {image.src.split("/").pop()}
        </span>
      )}
    </>
  );
}
