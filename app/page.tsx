import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Freelance } from "@/components/sections/Freelance";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SakuraPetals } from "@/components/ui/SakuraPetals";
import { OnePieceBackground } from "@/components/ui/OnePieceBackground";
import LenisScroll from "@/lib/lenis-scroll";

export default function Page() {
  return (
    <>
      <CustomCursor />
      <SakuraPetals />
      <OnePieceBackground />

      <main className="min-h-screen bg-background text-foreground font-sans relative">
        <LenisScroll />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Freelance />
        <Contact />
      </main>
    </>
  );
}
