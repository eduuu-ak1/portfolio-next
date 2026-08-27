"use client";

import dynamic from "next/dynamic";
import AutomationGraphFallback from "./AutomationGraphFallback";

const AutomationGraph = dynamic(() => import("./AutomationGraph"), {
  ssr: false,
  loading: AutomationGraphFallback,
});

export default function AutomationGraphCanvas() {
  return (
    <div className="aspect-square w-full max-w-[440px]">
      <AutomationGraph />
    </div>
  );
}
