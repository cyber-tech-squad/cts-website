"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./cts-theme.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MatrixRain from "./MatrixRain";
import { useHacker } from "./useTheme";

export default function PageShell({ children }) {
  const [hacker] = useHacker();

  return (
    <div className={hacker ? "cts hacker" : "cts"}>
      {hacker && <MatrixRain />}
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}