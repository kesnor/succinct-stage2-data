// components/HourlyView.tsx
import HourlyBidsChart from "./HourlyBidsChart";
import HourlyPointsBox from "./HourlyPointsBox";

type Props = {
  data: any[];
  timezone: string;
};

export default function HourlyView({ data, timezone }: Props) {
  return (
    <>
      <HourlyBidsChart data={data} timezone={timezone} />
      <HourlyPointsBox data={data} timezone={timezone} />
    </>
  );
} 