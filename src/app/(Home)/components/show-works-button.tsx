"use client";

import { MagicButton } from "@/Aceternity/magic-button";
import { useRouter } from "next/navigation";

export function ShowWorksButton() {
  const router = useRouter();

  return (
    <MagicButton
      title="Show My Work"
      handleClick={() => {
        router.push("/projects");
      }}
    />
  );
}
