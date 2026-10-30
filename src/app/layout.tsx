import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Cyber Tech Squad · UADB", template: "%s · Cyber Tech Squad" },
  description: "Le club de cybersécurité de l’Université Alioune Diop de Bambey.",
  icons: { icon: "/images/4324c803-a96a-4682-b1c8-ffbdf79c28e6.jpeg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}