"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, MutableRefObject } from "react";
import SummaryBox from "@/components/SummaryBox";
import Last5Contests from "@/components/Last5Contests";
import HourlyView from "@/components/HourlyView";
import DailyView from "@/components/DailyView";
import SlideMenu from "@/components/SlideMenu";
import DevSection from "@/components/DevSection";
import TeamSection from "@/components/TeamSection";

const TIMEZONE_OFFSET_KST: { [key: string]: number } = {
  UTC: -9,
  KST: 0,
  CST: -1,
  CET: ((): number => {
    const now = new Date();
    const start = new Date(Date.UTC(now.getUTCFullYear(), 2, 31));
    start.setUTCDate(31 - start.getUTCDay());
    const end = new Date(Date.UTC(now.getUTCFullYear(), 9, 31));
    end.setUTCDate(31 - end.getUTCDay());
    const inDST = now >= start && now < end;
    return inDST ? -7 : -8;
  })(),
  ICT: -2,
  WAT: -8,
};

export default function Home() {
  const projectRef = useRef<HTMLDivElement | null>(null);
  const thanksRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState(0);
  const [timezone, setTimezone] = useState("KST");
  const [data, setData] = useState<any[]>([]);
  const [display, setDisplay] = useState<any[]>([]);
  const lastUpdateMinuteRef = useRef<number | null>(null);

  const scrollToSection = (ref: MutableRefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getOffset = (target: string) => TIMEZONE_OFFSET_KST[target] * 3600;

  const formatTimestamp = (timestamp: number) => {
    const offset = getOffset(timezone);
    const local = new Date((timestamp + offset) * 1000);
    const mm = String(local.getMonth() + 1).padStart(2, "0");
    const dd = String(local.getDate()).padStart(2, "0");
    const hh = String(local.getHours()).padStart(2, "0");
    const min = String(local.getMinutes()).padStart(2, "0");
    return `[${mm}/${dd} ${hh}:${min}]`;
  };

  const filterByHourRanges = () => {
    const now = Math.floor(Date.now() / 1000);
    const oneHourAgo = now - 3600;
    const twoHoursAgo = now - 7200;
    return {
      last1Hour: data.filter((d) => d.Timestamp >= oneHourAgo && d.Timestamp <= now),
      last2to1Hour: data.filter((d) => d.Timestamp >= twoHoursAgo && d.Timestamp < oneHourAgo),
    };
  };

  const getRate = () => {
    const { last1Hour } = filterByHourRanges();
    return {
      bids: last1Hour.reduce((s, i) => s + i.Bids, 0),
      points: last1Hour.reduce((s, i) => s + i.Points_Pool, 0),
    };
  };

  const getChangeRate = () => {
    const { last1Hour, last2to1Hour } = filterByHourRanges();
    const sum = (arr: any[], key: string) => arr.reduce((a, b) => a + (b[key] || 0), 0);
    const calcRate = (a: number, b: number) =>
      b === 0 ? (a === 0 ? 0 : Infinity) : ((a - b) / b) * 100;
    return {
      bidsRate: calcRate(sum(last1Hour, "Bids"), sum(last2to1Hour, "Bids")),
      pointsRate: calcRate(sum(last1Hour, "Points_Pool"), sum(last2to1Hour, "Points_Pool")),
    };
  };

  const convertTimestampsToUnix = (arr: any[]) =>
    arr.map((i) => ({ ...i, Timestamp: Math.floor(new Date(i.Timestamp).getTime() / 1000) }));

  const getData = async () => {
    try {
      const res = await fetch("https://data.spone.fun/search?sort=kesoonho&id=data");
      const json = await res.json();
      const fetched = convertTimestampsToUnix(json[0].data.stage2);

      const last = fetched[fetched.length - 1];
      const lastMinute = new Date(last.Timestamp * 1000).getUTCMinutes();

      if (lastUpdateMinuteRef.current !== lastMinute) {
        setData(fetched);
        lastUpdateMinuteRef.current = lastMinute;
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setData([]);
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.length >= 5) {
      const latestFive = data.slice(-5).reverse();
      if (JSON.stringify(latestFive) !== JSON.stringify(display)) setDisplay(latestFive);
    }
  }, [data]);

  const { bidsRate, pointsRate } = getChangeRate();
  const { bids, points } = getRate();

  return (
    <div className="h-dvh w-dvw">
      <main className="flex flex-col gap-2 p-2 font-key overflow-y-scroll">
        {/* 상단 바 */}
        <div className="px-4 pt-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src="/slogo.svg" width={30} height={30} alt="logo" />
              <span className="text-2xl font-bold">Succinct</span>
            </div>
            <div className="flex items-center gap-10">
              <Link href="https://x.com/kesoonho" className="flex items-center gap-1 text-xl">
                <span className="font-bold">x:</span>
                <span className="font-bold">@kesoonho</span>
              </Link>
              <button onClick={() => setMenuOpen(true)}>
                <Image src="/menu-icon.png" width={24} height={24} alt="menu" className="h-10 w-10" />
              </button>
            </div>
          </div>
          <div className="w-full border-t mt-2" style={{ borderColor: "#e9ecef" }} />
        </div>

        {/* 요약 및 컨텐츠 */}
        <SummaryBox
          mode={mode}
          bids={bids}
          points={points}
          bidsRate={bidsRate}
          pointsRate={pointsRate}
          setMode={setMode}
        />

        <Last5Contests
          display={display}
          timezone={timezone}
          setTimezone={setTimezone}
          formatTimestamp={formatTimestamp}
        />

        {mode === 0 ? (
          <HourlyView data={data} timezone={timezone} />
        ) : (
          <DailyView />
        )}

        {/* 섹션들 */}
        <div ref={projectRef}>
          <DevSection />
        </div>

        <div ref={thanksRef}>
          <TeamSection />
        </div>
      </main>

      {/* 메뉴 */}
      {menuOpen && (
        <SlideMenu
          onClose={() => setMenuOpen(false)}
          scrollToProject={() => {
            scrollToSection(projectRef);
            setMenuOpen(false);
          }}
          scrollToThanks={() => {
            scrollToSection(thanksRef);
            setMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}
