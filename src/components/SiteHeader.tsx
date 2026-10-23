import { ThemeToggle } from "@/components/ThemeProvider";
import { Brand } from "@/components/Brand";
import { SiteNavigation } from "@/components/SiteNavigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <SiteNavigation />
      <div className="header-actions">
        <ThemeToggle />
      </div>
    </header>
  );
}
