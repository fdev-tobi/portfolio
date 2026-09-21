"use client";
import React from "react";
import { cn } from "@/lib/utils";

const hoverColors = [
  "hover:bg-sky-300",
  "hover:bg-pink-300",
  "hover:bg-green-300",
  "hover:bg-yellow-300",
  "hover:bg-red-300",
  "hover:bg-purple-300",
  "hover:bg-blue-300",
  "hover:bg-indigo-300",
  "hover:bg-violet-300",
];

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = 40;
  const cols = 24;

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
        className
      )}
      {...rest}
    >
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={`row` + i}
          className="w-16 h-8  border-l  border-slate-700 relative"
        >
          {Array.from({ length: cols }, (_, j) => (
            <div
              key={`col` + j}
              className={cn(
                "w-16 h-8 border-r border-t border-slate-700 relative transition-colors duration-150",
                hoverColors[(i + j) % hoverColors.length]
              )}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
