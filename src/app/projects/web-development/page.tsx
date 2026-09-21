import { StarField } from "@/components/StarField";
import { LetsBuild } from "../components/letsbuild";
import { Items } from "../components/Items";
import { web } from "@/data/project";
const WebDevelopment = () => {
  return (
    <>
      <StarField />
      <section className="bg-black py-60 relative">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-white to-neutral-700 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Here are my web projects
        </h2>
        <div className="max-w-xl mx-auto text-base md:text-xl text-neutral-400 text-center px-4">
          These are my web projects. They combine functionality, design, and cutting-edge technology.
        </div>
      </section>
      <section className="relative bg-black py-20">
        <div className="max-w-[90vw] mx-auto relative z-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 items-stretch">
          {web.map((project) => (
            <Items key={project.title} {...project} />
          ))}
        </div>
      </section>
      <section>
        <LetsBuild />
      </section>
    </>
  );
};

export default WebDevelopment;
