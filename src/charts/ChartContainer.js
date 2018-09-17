import React from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import "./Chart.css";

class ChartContainer extends React.Component {
  state = {
    chartType: 1
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({
      [key]: val
    });
  };

  render() {
    return (
      <div className="chart-container">
        {this.state.chartType == 1 && (
          <div className="chart-box">
            <LineChart
              sessions={this.props.sessions}
              sessionLineLabels={this.props.sessionLineLabels}
              sessionLineData={this.props.sessionLineData}
            />
          </div>
        )}
        {this.state.chartType == 2 && (
          <div className="chart-box">
            <PieChart
              sessions={this.props.sessions}
              gameTimePieLabels={this.props.gameTimePieLabels}
              gameTimePieData={this.props.gameTimePieData}
            />
          </div>
        )}

        <div className="chart-select">
          <select
            className="chart-dropdown"
            name="chartType"
            value={this.state.chartType}
            onChange={this.handleChange}
          >
            <option value="1">Profit/Loss By Session (Line)</option>
            <option value="2">Time By Game (Pie)</option>
          </select>
        </div>
      </div>
    );
  }
}

export default ChartContainer;
