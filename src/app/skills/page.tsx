import { StarField } from "@/components/StarField";
import { CallToAction } from "./components/action";
import { Vortex } from "@/Aceternity/vortex";
import Skills from "./components/Skills";

const SkillsPage = () => {
  return (
    <>
      <StarField />
      <section className="relative min-h-[55vh] sm:min-h-[70vh] md:h-[80vh] bg-black">
        <Vortex
          backgroundColor="black"
          particleCount={180}
          className="flex items-center flex-col justify-center px-4 sm:px-6 md:px-10 py-16 sm:py-20 w-full h-full"
        >
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-white to-neutral-700 text-2xl sm:text-4xl lg:text-7xl font-sans py-2 sm:py-6 md:py-10 relative z-20 font-bold tracking-tight px-2">
            Here are my skills
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg md:text-2xl text-neutral-400 text-center px-4 relative z-20">
            I work across blockchain, full-stack development, mobile apps,
            and AI solutions.
          </p>
        </Vortex>
      </section>
      <section className="relative bg-black overflow-x-hidden">
        <Skills />
      </section>
      <section className="relative bg-black py-10 sm:py-16 md:py-20">
        <CallToAction />
      </section>
    </>
  );
};

export default SkillsPage;
