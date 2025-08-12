"use client";
import { useState } from "react";
import SizeChart from "@/components/sizeChart/sizeChart";

interface SizeChartLinkProps {
  className: string;
}

export default function SizeChartLink({ className }: SizeChartLinkProps) {
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsSizeChartOpen(true)} className={className}>
        Sizing Chart / Reference
      </button>

      <SizeChart
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />
    </>
  );
}
