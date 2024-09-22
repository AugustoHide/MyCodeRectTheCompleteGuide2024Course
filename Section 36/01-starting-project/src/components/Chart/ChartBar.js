import "./ChartBar.css";
export default function ChartBar(props) {
  let barFillHeight = "0%";
  if (props.max > 0)
    barFillHeight = Math.round((props.value / props.max) * 100) + "%";
  return (
    <div className="chat-bar">
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight }}
        ></div>
        <div className="chart_bar__label">{props.label}</div>
      </div>
    </div>
  );
}
