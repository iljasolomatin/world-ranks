import "@/app/globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import HeroBanner from "@/components/HeroBanner";
import { ModeToggle } from "@/components/ModeToggle";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "World Ranks",
  description:
    "A simple app to view country rankings across various categories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${beVietnamPro.variable} bg-background min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* THEME SWITCHER */}
          <div className="absolute top-4 right-4 z-10">
            <ModeToggle />
          </div>

          <HeroBanner />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
