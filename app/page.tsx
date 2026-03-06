import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SakuraPetals } from "@/components/ui/SakuraPetals";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import LenisScroll from "@/lib/lenis-scroll";

export default function Page() {
  return (
    <>
      <CustomCursor />
      <SakuraPetals />
      
      {/* Fixed Theme Toggle floating button */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <main className="min-h-screen bg-background text-foreground font-sans relative">
        <LenisScroll />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}