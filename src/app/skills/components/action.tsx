"use client";

import React from "react";
import { Vortex } from "@/Aceternity/vortex";
import { MagicButton } from "@/Aceternity/magic-button";
import { useRouter } from "next/navigation";
import { FaEnvelope } from "react-icons/fa";

export const CallToAction = () => {
  const router = useRouter();
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6">
      <div className="w-full rounded-md h-[22rem] sm:h-[26rem] md:h-[30rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          particleCount={120}
          className="flex items-center flex-col justify-center px-4 sm:px-6 md:px-10 py-6 w-full h-full"
        >
          <h2 className="text-white text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-center px-2">
            Ready to work with me?
          </h2>
          <p className="text-white/90 text-sm sm:text-lg md:text-2xl max-w-xl mt-4 sm:mt-6 text-center px-2">
            Let&apos;s collaborate and create something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <MagicButton
              title="Contact Me"
              icon={<FaEnvelope />}
              handleClick={() => {
                router.push("/contact");
              }}
            />
          </div>
        </Vortex>
      </div>
    </div>
  );
};
