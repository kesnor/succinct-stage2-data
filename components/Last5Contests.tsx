"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const TIMEZONES = ["UTC", "KST", "CST", "CET", "ICT", "WAT"];

export default function Last5Contests({ display, timezone, setTimezone, formatTimestamp }: any) {
  return (
    <div className="rounded-xl border p-4 mt-6 w-full max-h-none overflow-y-visible">
      {/* 타이틀 + 타임존 버튼 (2줄 구성) */}
      <div className="w-full overflow-x-auto overflow-y-visible mb-3">
        <div className="inline-flex flex-wrap items-center gap-2 min-w-fit px-1 pb-1">
          <div className="text-base font-bold text-pink-400 whitespace-nowrap mr-4">
            Last 5 Contests
          </div>
          {TIMEZONES.map((tz) => (
            <button
              key={tz}
              onClick={() => setTimezone(tz)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition-colors ${
                timezone === tz
                  ? "bg-pink-300 text-white border-pink-300"
                  : "text-pink-400 border-pink-300"
              }`}
            >
              {tz}
            </button>
          ))}
        </div>
      </div>

      {/* 데이터 영역 */}
      <div className="flex flex-col border px-2 text-xs md:text-base">
        {/* 헤더 */}
        <div className="grid grid-cols-6 place-items-center font-semibold">
          <span>Time</span>
          <span className="text-green-400">Bids</span>
          <span className="text-blue-400">Points</span>
          <span className="text-pink-400">Stars</span>
          <span className="text-yellow-400">Multiplier</span>
          <span className="text-purple-400">Prize</span>
        </div>

        <div className="w-full border-t my-1" style={{ borderColor: "#e9ecef" }} />

        {/* 최근 5개 데이터 */}
        <AnimatePresence initial={false}>
          {display.map((item: any, i: number) => (
            <motion.div
              key={`${item.Timestamp}-${i}`}
              initial={i < 3 ? { y: -20, opacity: 0 } : false}
              animate={i < 3 ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-6 place-items-center"
            >
              <span>{formatTimestamp(item.Timestamp)}</span>
              <span className="text-green-400">{item.Bids}</span>
              <span className="text-blue-400">{item.Points_Pool}</span>
              <span className="text-pink-400">{item.Star_Pool}</span>
              <span className="text-yellow-400">{item.Multiplier.toFixed(2)}</span>
              <span className="text-purple-400">{item.Prize}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="w-full border-t border-black opacity-50 my-1" />

        {/* 평균값 */}
        <div className="grid grid-cols-6 place-items-center font-medium">
          <span>AVG</span>
          <span className="text-green-400">
            {Math.round(display.reduce((s: any, x: any) => s + x.Bids, 0) / display.length)}
          </span>
          <span className="text-blue-400">
            {Math.round(display.reduce((s: any, x: any) => s + x.Points_Pool, 0) / display.length)}
          </span>
          <span className="text-pink-400">
            {Math.round(display.reduce((s: any, x: any) => s + x.Star_Pool, 0) / display.length)}
          </span>
          <span className="text-yellow-400">
            {(display.reduce((s: any, x: any) => s + x.Multiplier, 0) / display.length).toFixed(2)}
          </span>
          <span className="text-purple-400">
            {Math.round(display.reduce((s: any, x: any) => s + x.Prize, 0) / display.length)}
          </span>
        </div>
      </div>
    </div>
  );
}
