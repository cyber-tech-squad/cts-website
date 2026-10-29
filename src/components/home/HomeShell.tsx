import "./home-theme.css";
import type { ReactNode } from "react";
import { bodyFont, codeFont, titleFont } from "./fonts";
import { MatrixRain } from "./MatrixRain";

export function HomeShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={`cts-home ${titleFont.variable} ${bodyFont.variable} ${codeFont.variable}`}
    >
      <MatrixRain />
      <div className="relative z-10">{children}</div>
    </div>
  );
}