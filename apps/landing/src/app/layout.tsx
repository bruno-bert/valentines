import type { Metadata } from "next";

import { buildPageMetadata } from "../lib/content/build-metadata";
import { getLandingPageViewModel } from "../lib/content/map-landing-page";

import "./globals.css";

const landingViewModel = getLandingPageViewModel();

export const metadata: Metadata = buildPageMetadata(landingViewModel.seo);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans bg-landing-page text-landing-text antialiased">
        {children}
      </body>
    </html>
  );
}
