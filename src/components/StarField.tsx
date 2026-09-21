"use client";

import dynamic from "next/dynamic";

const ShootingStars = dynamic(
  () => import("@/Aceternity/shooting-stars").then((mod) => mod.ShootingStars),
  { ssr: false }
);
const StarsBackground = dynamic(
  () =>
    import("@/Aceternity/stars-background").then((mod) => mod.StarsBackground),
  { ssr: false }
);

export function StarField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
