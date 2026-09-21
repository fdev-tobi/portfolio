"use client";
import React from "react";
import dynamic from "next/dynamic";

const SparklesCore = dynamic(
  () => import("@/Aceternity/sparkles").then((mod) => mod.SparklesCore),
  { ssr: false }
);

export function LetsBuild() {
  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Let&apos;s build something amazing together
      </h1>
    </div>
  );
}
