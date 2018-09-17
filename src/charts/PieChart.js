import React from "react";
import { Pie } from "react-chartjs-2";
import "./Chart.css";

class PieChart extends React.Component {
  state = {};
  render() {
    const data = {
      labels: this.props.gameTimePieLabels,
      datasets: [
        {
          data: this.props.gameTimePieData,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };
    return (
      <div className="chart-container">
        <Pie data={data} height={225} />
      </div>
    );
  }
}

export default PieChart;
