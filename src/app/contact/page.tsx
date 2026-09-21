import { StarField } from "@/components/StarField";
import { Hero } from "./components/hero";

const Contact = () => {
  return (
    <>
      <StarField />
      <section className="bg-black relative">
        <Hero />
      </section>
    </>
  );
};

export default Contact;
