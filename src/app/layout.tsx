import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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