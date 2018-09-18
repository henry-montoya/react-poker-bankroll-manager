import React from "react";
import "./Report.css";
import CompletedSessions from "./CompletedSessions";

class Report extends React.Component {
  state = {
    showSessions: false
  };
  render() {
    return (
      <div className="report-container">
        {!this.state.showSessions && (
          <React.Fragment>
            <div className="stats-container">
              <div className="row-label">
                <p>Profit/Loss</p>
              </div>
              <div className="row-data">
                <p>
                  {this.props.profitLoss && this.props.profitLoss.toFixed(2)}
                </p>
              </div>
              <div className="row-label">
                <p>Hourly</p>
              </div>
              <div className="row-data">
                <p>{this.props.hourly && this.props.hourly.toFixed(2)}</p>
              </div>
              <div className="row-label">
                <p>$ / Session</p>
              </div>
              <div className="row-data">
                <p>
                  {this.props.perSession && this.props.perSession.toFixed(2)}
                </p>
              </div>
              <div className="row-label">
                <p>Total Hours</p>
              </div>
              <div className="row-data">
                <p>
                  {this.props.totalHours && this.props.totalHours.toFixed(1)}
                </p>
              </div>
              <div className="row-label">
                <p>Win %</p>
              </div>
              <div className="row-data">
                <p>
                  {this.props.winPercent &&
                    parseInt(this.props.winPercent).toFixed(1)}
                  %
                </p>
              </div>
              <div className="row-label">
                <p>BB/Hr</p>
              </div>
              <div className="row-data">
                <p>
                  {this.props.avgBbPerHour &&
                    this.props.avgBbPerHour.toFixed(1)}
                </p>
              </div>
            </div>
          </React.Fragment>
        )}
        {this.state.showSessions && (
          <CompletedSessions
            sessions={this.props.sessions}
            toggleModal={this.props.toggleModal}
          />
        )}
        <button
          className="row-button"
          onClick={() => {
            this.setState({
              showSessions: !this.state.showSessions
            });
          }}
        >
          {!this.state.showSessions ? (
            <h3>See All Sessions</h3>
          ) : (
            <h3>See Report</h3>
          )}
        </button>
      </div>
    );
  }
}

export default Report;
