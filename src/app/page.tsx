import { SiteHeader } from "@/components/SiteHeader";
import { Brand } from "@/components/Brand";
import { Hero } from "@/components/home/Hero";
import { HomeShell } from "@/components/home/HomeShell";
import { HomeSections } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeShell>
          <Hero />
          <HomeSections />
        </HomeShell>
      </main>
      <footer className="site-footer">
        <Brand />
        <span>UADB · Bambey, Sénégal</span>
        <span>© {new Date().getFullYear()} Cyber Tech Squad</span>
      </footer>
    </>
  );
}