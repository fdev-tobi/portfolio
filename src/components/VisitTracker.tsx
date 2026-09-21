"use client";

import { useEffect } from "react";

export function VisitTracker() {
  useEffect(() => {
    const logVisit = () => {
      void fetch("/api/getClientIp", { method: "POST" }).catch(() => {});
    };

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => window.setTimeout(cb, 2000);

    const id = idle(logVisit);

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(id as number);
      } else {
        window.clearTimeout(id as number);
      }
    };
  }, []);

  return null;
}
