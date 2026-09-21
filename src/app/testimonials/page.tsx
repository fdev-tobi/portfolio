import { StarField } from "@/components/StarField";
import { ClientFeedback } from "./components/cards";
import { CallToAction } from "./components/calltoaction";

const Testimonials = () => {
  return (
    <>
      <StarField />
      <section className="bg-black pt-60 pb-10 relative">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-white to-neutral-700 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          What my clients say about me
        </h2>
        <div className="max-w-xl mx-auto text-base md:text-xl text-neutral-400 text-center">
          Here is how my expertise in blockchain, full-stack development, mobile apps, and AI has helped others succeed.
        </div>
      </section>
      <section className="bg-black py-20 relative">
        <ClientFeedback />
      </section>
      <section className="bg-black py-20 relative">
        <CallToAction />
      </section>
    </>
  );
};

export default Testimonials;
