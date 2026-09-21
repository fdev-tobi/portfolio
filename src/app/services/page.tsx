import { ServicesOverview } from "./components/overview";
import { ReasonCard } from "./components/reason_card";
import { StarField } from "@/components/StarField";
import { BackgroundLines } from "@/Aceternity/background-lines";
import { Feedback } from "./components/feedback";
import { Reasons } from "@/data/Reason";

const Services = () => {
  return (
    <>
      <StarField />
      <section className="relative h-[80vh]">
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-white to-neutral-700 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            I bring your ideas to life
          </h2>
          <p className="max-w-xl mx-auto text-base md:text-xl text-neutral-400 text-center relative z-20">
            I specialize in blockchain, full-stack development, mobile
            applications, and AI solutions.
          </p>
          <div className="text-white mt-16 py-2 rounded-md relative z-20 text-base md:text-xl">
            Scroll down to see my services
          </div>
        </BackgroundLines>
      </section>
      <section className=" bg-black py-40 relative">
        <h1 className="relative z-10 text-base md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans mb-10">
          My Services
        </h1>
        <ServicesOverview />
      </section>
      <section className=" bg-black pt-10 pb-20 relative">
        <h1 className="relative z-10 text-base md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans mb-10">
          Why Choose Me?
        </h1>
        <div className="flex items-center justify-center">
          {Reasons.map((reason) => (
            <ReasonCard key={reason.title} reason={reason} />
          ))}
        </div>
      </section>
      <section className="bg-black py-40 relative">
        <h1 className="relative z-10 text-base md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans mb-10">
          What my clients say about me
        </h1>
        <div className="relative z-10">
          <Feedback />
        </div>
      </section>
    </>
  );
};

export default Services;
