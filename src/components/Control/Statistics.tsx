import { Gauge } from "@mui/x-charts/Gauge";

export const Statistics: React.FC = () => {
  return (
    <div className="">
      <Gauge
        value={75}
        startAngle={0}
        endAngle={360}
        innerRadius="80%"
        outerRadius="100%"
      />
    </div>
  );
};
