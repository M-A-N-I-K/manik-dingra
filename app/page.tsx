import MainContainer from "@/components/main-container";
import LenisScroll from "@/lib/lenis-scroll";

export default function Page() {
  return (
    <main style={{ backgroundColor: 'var(--background)' }}>
      <LenisScroll />
      <MainContainer />
    </main>
  );
}