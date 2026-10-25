import { Hanken_Grotesk, JetBrains_Mono, Unbounded } from "next/font/google";

export const titleFont = Unbounded({
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

export const bodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const codeFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});