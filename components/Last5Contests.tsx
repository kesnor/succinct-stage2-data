import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const TIMEZONES = ["UTC", "KST", "CST", "CET", "ICT", "WAT"];

export default function Last5Contests({ display, timezone, setTimezone, formatTimestamp }: any) {
  return (
    <div className="rounded-xl border p-2 mt-6">
      <div className="flex justify-between items-center px-2 h-8">
        <span className="text-[#f783ac] font-semibold">Last 5 Contests</span>
        <div className="flex gap-1">
          {TIMEZONES.map((tz) => (
            <button
              key={tz}
              onClick={() => setTimezone(tz)}
              className={`border rounded-full px-2 text-xs font-semibold ${
                timezone === tz
                  ? "bg-[#f783ac] text-white border-[#f783ac]"
                  : "bg-white text-[#f783ac] border-[#f783ac]"
              }`}
            >
              {tz}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col border px-2 text-xs md:text-base">
        <div className="grid grid-cols-6 place-items-center font-semibold">
          <span>Time</span>
          <span className="text-green-400">Bids</span>
          <span className="text-blue-400">Points</span>
          <span className="text-pink-400">Stars</span>
          <span className="text-yellow-400">Multiplier</span>
          <span className="text-purple-400">Prize</span>
        </div>

        {/* Header-bottom line */}
        <div className="w-full border-t my-1" style={{ borderColor: "#e9ecef" }} />

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
