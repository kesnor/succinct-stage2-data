import React, { useState, useEffect } from "react";
import DailyBidsChart from "./DailyBidsChart";
import DailyPointsChart from "./DailyPointsChart";

type Props = {
  timezone: string; // 여전히 유지 가능
};

export default function DailyView({ timezone }: Props) {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://data.spone.fun/search?sort=kesoonho&id=data");
      const json = await res.json();
      const raw = json[0].data.stage2;
      const withTimestamps = raw.map((i: any) => ({
        ...i,
        Timestamp: Math.floor(new Date(i.Timestamp).getTime() / 1000),
      }));
      setData(withTimestamps);
    } catch (err) {
      console.error("Failed to fetch daily data", err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 1분마다 갱신
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-1 flex flex-col gap-8">
      <DailyBidsChart data={data} />
      <DailyPointsChart data={data} />
    </div>
  );
}
