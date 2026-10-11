import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Freelance } from "@/components/sections/Freelance";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Scene3DProvider } from "@/components/three/Scene3DProvider";
import { BackgroundLayer, ForegroundLayer } from "@/components/three/SceneLayers";
import LenisScroll from "@/lib/lenis-scroll";

export default function Page() {
  return (
    <Scene3DProvider>
      <CustomCursor />
      {/* WebGL ocean scene on capable devices, flat SVG theme otherwise */}
      <BackgroundLayer />

      <main className="min-h-screen text-foreground font-sans relative z-10">
        <LenisScroll />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Freelance />
        <Contact />
      </main>

      <ForegroundLayer />
    </Scene3DProvider>
  );
}
