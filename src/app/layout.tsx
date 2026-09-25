import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { images } from "@/config/images";
import { site } from "@/config/site";
import { StoreProvider } from "@/lib/commerce/cart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s — ${site.name}` },
  description: site.seo.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    url: "/",
    images: [{ url: images.ogImage.src, width: images.ogImage.width, height: images.ogImage.height, alt: images.ogImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [images.ogImage.src],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <StoreProvider>
          <a
            href="#main"
            className="eyebrow fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-charcoal px-5 py-3 text-ivory transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchDialog />
        </StoreProvider>
      </body>
    </html>
  );
}
