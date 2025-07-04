"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type Props = {
  mode: number;
  bids: number;
  points: number;
  bidsRate: number;
  pointsRate: number;
  setMode: (mode: number) => void;
};

export default function SummaryBox({
  mode,
  bids,
  points,
  bidsRate,
  pointsRate,
  setMode,
}: Props) {
  return (
    <div className="border rounded-xl p-4 mt-6 w-full">
      {/* 탭: Hourly / Daily */}
      <div className="flex items-center gap-6 h-10 px-2">
        <button
          onClick={() => setMode(0)}
          className={`text-sm sm:text-base font-semibold ${
            mode === 0 ? "text-[#f783ac]" : "text-black"
          }`}
        >
          Hourly
        </button>
        <button
          onClick={() => setMode(1)}
          className={`text-sm sm:text-base font-semibold ${
            mode === 1 ? "text-[#f783ac]" : "text-black"
          }`}
        >
          Daily
        </button>
      </div>

      {/* 요약 데이터 박스 */}
      <div className="mt-4 w-full rounded-xl border px-2 sm:px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center text-[11px] sm:text-base">
        {/* Bids */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          <div className="flex flex-col items-start min-w-[44px] sm:min-w-[48px]">
            <div className="text-xs sm:text-sm">Bids</div>
            <div className="text-gray-500 text-[10px] sm:text-xs">
              ({mode === 0 ? "1h" : "24h"})
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={bids}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm sm:text-base font-semibold"
              >
                {bids.toLocaleString()}
              </motion.span>
            </AnimatePresence>
            <Image
              src={bidsRate >= 0 ? "/up.png" : "/down.png"}
              width={12}
              height={12}
              alt="bids trend"
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={bidsRate}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-xs sm:text-base ${
                  bidsRate >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(bidsRate).toFixed(2)}%
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Points */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          <div className="flex flex-col items-start min-w-[54px] sm:min-w-[60px]">
            <div className="text-xs sm:text-sm">Points</div>
            <div className="text-gray-500 text-[10px] sm:text-xs">
              ({mode === 0 ? "1h" : "24h"})
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={points}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm sm:text-base font-semibold"
              >
                {points.toLocaleString()}
              </motion.span>
            </AnimatePresence>
            <Image
              src={pointsRate >= 0 ? "/up.png" : "/down.png"}
              width={12}
              height={12}
              alt="points trend"
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={pointsRate}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-xs sm:text-base ${
                  pointsRate >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(pointsRate).toFixed(2)}%
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
