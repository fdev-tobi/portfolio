import { StarField } from "@/components/StarField";
import { LetsBuild } from "./components/letsbuild";
import { ProjectItems } from "./components/projects";

const ProjectsPage = () => {
  return (
    <>
      <StarField />
      <section className="bg-black py-60 relative">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-white to-neutral-700 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Here are my projects
        </h2>
        <div className="max-w-xl mx-auto text-base md:text-xl text-neutral-400 text-center">
          This is my work in blockchain, full-stack development, mobile apps,
          and AI solutions.
        </div>
      </section>
      <section className="relative bg-black py-20">
        <div className="max-w-[80vw] mx-auto relative z-20">
          <ProjectItems />
        </div>
      </section>
      <section>
        <LetsBuild />
      </section>
    </>
  );
};

export default ProjectsPage;
