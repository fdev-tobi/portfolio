import { Hero } from "./components/hero";
import { About } from "./components/about";
import { ShowWorksButton } from "./components/show-works-button";
import { Boxes } from "@/Aceternity/background-boxes";

const Introduction = () => {
  return (
    <main className="relative w-full h-full bg-black ">
      <Hero />
      <section className="h-[80vh] py-20 relative w-screen overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <div className="text-center mt-2 text-neutral-300 relative z-20">
          <About />
          <ShowWorksButton />
        </div>
      </section>
    </main>
  );
};

export default Introduction;
