import { HoverEffect } from "@/Aceternity/card-hover-effect";

export function ServicesOverview() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Blockchain Development",
    description:
      "I build smart contracts, decentralized apps (dApps), and blockchain integrations.",
    link: "/projects/blockchain",
    image: "/assets/images/services/blockchain.png",
  },
  {
    title: "Full-Stack Development",
    description:
      "I build end-to-end web and software solutions for seamless user experiences.",
    link: "/projects/web-development",
    image: "/assets/images/services/full-stack.png",
  },
  {
    title: "Mobile App Development",
    description:
      "I build custom iOS and Android apps for performance and usability.",
    link: "/projects/mobile-apps",
    image: "/assets/images/services/mobile.png",
  },
  {
    title: "AI Solutions",
    description:
      "I build machine learning models, AI-powered applications, and data-driven insights.",
    link: "/projects/ai-solutions",
    image: "/assets/images/services/ai.png",
  },
];
