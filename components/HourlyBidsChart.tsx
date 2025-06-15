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
  timezone: string;
};

const TIMEZONE_OFFSET_KST: { [key: string]: number } = {
  UTC: 0,
  KST: 9,
  CST: 8,
  ICT: 7,
  WAT: 1,
  CET: ((): number => {
    const now = new Date();
    const start = new Date(Date.UTC(now.getUTCFullYear(), 2, 31));
    start.setUTCDate(31 - start.getUTCDay());
    const end = new Date(Date.UTC(now.getUTCFullYear(), 9, 31));
    end.setUTCDate(31 - end.getUTCDay());
    const inDST = now >= start && now < end;
    return inDST ? 2 : 1;
  })(),
};

export default function HourlyBidsChart({ data, timezone }: Props) {
  const offset = TIMEZONE_OFFSET_KST[timezone] ?? 0;
  const now = Math.floor(Date.now() / 1000);
  const currentHourTimestamp = Math.floor(now / 3600) * 3600;
  const currentHour = new Date(currentHourTimestamp * 1000).getUTCHours();

  const hourlyData = useMemo(() => {
    const fromTimestamp = currentHourTimestamp - 86400;
    const filtered = data.filter(
      (d) => d.Timestamp >= fromTimestamp && d.Timestamp < currentHourTimestamp
    );

    const grouped: { [hour: string]: number[] } = {};
    for (let i = 0; i < 24; i++) {
      const h = ((currentHour - 24 + i + 24) % 24).toString().padStart(2, "0");
      grouped[h] = [];
    }

    filtered.forEach((d) => {
      const utcHour = new Date(d.Timestamp * 1000).getUTCHours();
      const h = utcHour.toString().padStart(2, "0");
      grouped[h]?.push(d.Bids);
    });

    const hours = Array.from({ length: 25 }, (_, i) => (currentHour - 24 + i + 24) % 24);

    return hours.map((h, i) => {
      const hourStr = h.toString().padStart(2, "0");
      const values = grouped[hourStr] || [];

      return {
        hour: hourStr,
        avgBids:
          i === 24
            ? 0.01 // 마지막 바 강제 표시
            : values.length > 0
            ? Number((values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(2))
            : 0,
      };
    });
  }, [data]);

  return (
    <div className="mt-8 border border-black rounded-xl p-4">
      <div className="mb-1 px-2 flex items-center">
        <Image
          src="/info-icon.png"
          alt="info"
          width={14}
          height={14}
          className="mr-1"
        />
        <span style={{ color: "#868e96", fontSize: "0.85rem" }}>
          Hourly Overview data updates every hour.
        </span>
      </div>

      <div className="mb-2 px-2">
        <h2 className="text-pink-400 font-handwriting text-lg">
          Hourly Overview (AVG Bids)
        </h2>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData}>
            <XAxis
              dataKey="hour"
              tick={(props) => {
                const { x, y, payload, index } = props;
                const utcHour = parseInt(payload.value, 10);
                const tzHour = (utcHour + offset + 24) % 24;
                const hourStr = tzHour.toString().padStart(2, "0");

                const isLeft = index === 0;
                const isRight = index === 24;

                return (
                  <text x={x} y={y + 10} textAnchor="middle" fill="#666" fontSize={15}>
                    <tspan x={x} dy="0">{hourStr}</tspan>
                    {isLeft && (
                      <tspan x={x} dy="14" fill="#999" fontSize="14">Yesterday</tspan>
                    )}
                    {isRight && (
                      <tspan x={x} dy="14" fill="#999" fontSize="14">Today</tspan>
                    )}
                  </text>
                );
              }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgBids" fill="#f783ac" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
