import ChartBar from "./ChartBar";
import "./Chart.css";

export default function Chart(props) {
  const totalMax = Math.max(
    ...props.dataPoints.map((dataPoint) => dataPoint.value)
  );
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          max={totalMax}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
}
