import React from "react";
import { connect } from "react-redux";
import AddSession from "./AddSession";
import Report from "./Report";
import ChartContainer from "./charts/ChartContainer";

import { getStartupData } from "./services/startup.service";
import { getOverallReport, getAllSessions } from "./services/session.service";
import "./Dashboard.css";

class Dashboard extends React.Component {
  state = {
    profitLoss: 0,
    hourly: 0,
    perSession: 0,
    totalHours: 0,
    winPercent: "",
    avgBbPerHour: 0,
    sessions: [],
    //----Line Chart State-----
    sessionLineLabels: [],
    sessionLineData: [],
    //----Pie Chart State------
    gameTimePieLabels: [],
    gameTimePieData: []
  };

  getSessionData = () => {
    getAllSessions(1).then(response => {
      console.log("sessions", response);
      let sessions = response.data.resultSets[1];
      let sessionLineData = [];
      let sessionLineLabels = [];
      let gameTimePieData = [];
      let gameTimePieLabels = [];
      let total = 0;
      for (let i = 0; i < sessions.length; i++) {
        //----Data for Session Line Chart
        sessionLineLabels.push(i + 1);
        sessionLineData.push(
          total + (sessions[i].CashedOut - sessions[i].BuyIn)
        );
        total += sessions[i].CashedOut - sessions[i].BuyIn;

        //----Data for Game / Time Pie Chart
        if (!gameTimePieLabels.includes(sessions[i].Game)) {
          gameTimePieLabels.push(sessions[i].Game);
        }

        let gameTimePieDataObj = {
          game: sessions[i].Game,
          time: sessions[i].TotalTime
        };
        gameTimePieData.push(gameTimePieDataObj);
      }

      this.setState({
        sessions,
        sessionLineLabels,
        sessionLineData,
        gameTimePieLabels,
        gameTimePieData
      });
    });
  };

  getReportData = () => {
    getOverallReport(1).then(res => {
      console.log(res);
      let profitLoss = res.data.profitLoss;
      let hourly = res.data.hourly;
      let perSession = res.data.perSession;
      let totalHours = res.data.totalHours;
      let winPercent = res.data.winPercent;
      let avgBbPerHour = res.data.avgBbPerHour;
      this.setState({
        profitLoss,
        hourly,
        perSession,
        totalHours,
        winPercent,
        avgBbPerHour
      });
    });
  };

  getOptionData = () => {
    getStartupData().then(response => {
      console.log(response);
      let game = response.data.resultSets[0];
      let gameType = response.data.resultSets[1];
      let limitType = response.data.resultSets[2];
      let location = response.data.resultSets[3];
      let locationType = response.data.resultSets[4];
      let stake = response.data.resultSets[5];
      //let user = response.data.resultSets[6];
      this.props.setGames(game);
      this.props.setGameTypes(gameType);
      this.props.setLimitTypes(limitType);
      this.props.setLocations(location);
      this.props.setLocationTypes(locationType);
      this.props.setStakes(stake);
    });
  };

  componentDidMount() {
    this.getOptionData();
    this.getReportData();
    this.getSessionData();
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Hello</h2>
        </div>
        <div className="session-list-item">
          <AddSession getOptionData={this.getOptionData} />
        </div>
        <div className="report-item">
          <Report
            profitLoss={this.state.profitLoss}
            hourly={this.state.hourly}
            perSession={this.state.perSession}
            totalHours={this.state.totalHours}
            winPercent={this.state.winPercent}
            avgBbPerHour={this.state.avgBbPerHour}
            sessions={this.state.sessions}
          />
        </div>
        <div className="chart-item">
          <ChartContainer
            sessions={this.state.sessions}
            sessionLineLabels={this.state.sessionLineLabels}
            sessionLineData={this.state.sessionLineData}
            gameTimePieLabels={this.state.gameTimePieLabels}
            gameTimePieData={this.state.gameTimePieData}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGames: games => dispatch({ type: "ADD_GAMES", games }),
    setGameTypes: gameTypes =>
      dispatch({
        type: "ADD_GAME_TYPES",
        gameTypes
      }),
    setLimitTypes: limitTypes =>
      dispatch({
        type: "ADD_LIMIT_TYPES",
        limitTypes
      }),
    setStakes: stakes =>
      dispatch({
        type: "ADD_STAKES",
        stakes
      }),
    setLocations: locations =>
      dispatch({
        type: "ADD_LOCATIONS",
        locations
      }),
    setLocationTypes: locationTypes =>
      dispatch({
        type: "ADD_LOCATION_TYPES",
        locationTypes
      })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
