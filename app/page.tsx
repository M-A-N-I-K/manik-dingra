import MainContainer from "@/components/main-container";
import LenisScroll from "@/lib/lenis-scroll";

export default function Page() {
  return (
    <main className=" bg-gray-900">
      <LenisScroll />
      <MainContainer />
    </main>
  );
}