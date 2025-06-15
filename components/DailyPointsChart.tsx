import React, { useMemo } from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
};

export default function DailyPointsChart({ data }: Props) {
  const dailyData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const latestTimestamp = Math.max(...data.map((d) => d.Timestamp));
    const latestDate = new Date(latestTimestamp * 1000);
    const baseDate = new Date(Date.UTC(
      latestDate.getUTCFullYear(),
      latestDate.getUTCMonth(),
      latestDate.getUTCDate()
    ));

    const days = Array.from({ length: 8 }, (_, i) => {
      const day = new Date(baseDate);
      day.setUTCDate(baseDate.getUTCDate() - 7 + i);

      const dayStart = Math.floor(day.getTime() / 1000);
      const dayEnd = dayStart + 86400;

      const values = data.filter((d) => d.Timestamp >= dayStart && d.Timestamp < dayEnd);
      const pointsSum = values.reduce((sum, d) => sum + (d.Points_Pool || 0), 0);
      const avgPoints = values.length > 0 ? pointsSum / values.length : 0;

      return {
        dow: day.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
        avgPoints: i === 7 ? 0.01 : Number(avgPoints.toFixed(2)),
        isToday: i === 7,
      };
    });

    return days;
  }, [data]);

  return (
    <div className="mt-1 border border-black rounded-xl p-4">
      <div className="mb-1 px-2 flex items-center">
        <Image
          src="/info-icon.png"
          alt="info"
          width={14}
          height={14}
          className="mr-1"
        />
        <span style={{ color: "#868e96", fontSize: "0.85rem" }}>
          Daily Overview data updates at 00:00 UTC.
        </span>
      </div>

      <div className="mb-2 px-2">
        <h2 className="text-blue-400 font-handwriting text-lg">
          Daily Overview (AVG Points)
        </h2>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%" className="overflow-visible">
          <BarChart data={dailyData}>
            <XAxis
              dataKey="dow"
              tick={{ fontSize: 13, fill: "#666" }}
              tickMargin={20}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgPoints" fill="#3399FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
