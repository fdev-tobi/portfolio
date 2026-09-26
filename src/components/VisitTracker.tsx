"use client";

import { useEffect } from "react";

const VISIT_KEY = "portfolio_visit_logged";

export function VisitTracker() {
  useEffect(() => {
    // One alert per browser tab session to avoid Telegram spam on remounts
    try {
      if (sessionStorage.getItem(VISIT_KEY)) return;
      sessionStorage.setItem(VISIT_KEY, "1");
    } catch {
      // sessionStorage unavailable — still log the visit
    }

    const logVisit = () => {
      void fetch("/api/getClientIp", { method: "POST" }).catch(() => {});
    };

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => window.setTimeout(cb, 1500);

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
