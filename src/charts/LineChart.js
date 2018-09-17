import React from "react";
import { Line } from "react-chartjs-2";
import "./Chart.css";

class LineChart extends React.Component {
  state = {};

  //   renderChart = () => {

  //   }

  render() {
    const options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "USD"
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Session"
            }
          }
        ]
      }
    };
    const data = {
      labels: this.props.sessionLineLabels,
      datasets: [
        {
          label: "Cash Game Profit/Loss",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: this.props.sessionLineData
        }
      ]
    };

    return (
      <div className="chart-container">
        <Line
          data={data}
          options={options}
          width={400}
          height={400}
          //   options={{
          //     maintainAspectRatio: false
          //   }}
        />
      </div>
    );
  }
}

export default LineChart;
