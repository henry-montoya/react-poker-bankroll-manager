import React from "react";
import { connect } from "react-redux";
import AddSession from "./AddSession";
import Report from "./Report";
import SessionModal from "./SessionModal";
import ChartContainer from "./ChartContainer";
import Ticker from "./Ticker";

import { getStartupData } from "../../services/startup.service";
import {
  getOverallReport,
  getAllSessions,
  getSessionById,
  deleteSession
} from "../../services/session.service";
import "./Dashboard.css";

class Dashboard extends React.Component {
  state = {
    profitLoss: 0,
    hourly: 0,
    perSession: 0,
    totalHours: 0,
    winPercent: 0,
    avgBbPerHour: 0,
    sessions: [],
    //----Line Chart State-----
    sessionLineLabels: [],
    sessionLineData: [],
    //----Pie Chart State------
    gameTimePieLabels: [],
    gameTimePieData: [],
    gameTimePieTime: [],
    //----Modal-----------
    showModal: false,
    sessionId: 0,
    sessionDetails: []
  };

  toggleModal = id => {
    console.log("modal");
    console.log(id);
    getSessionById(id).then(response => {
      console.log(response);
      let sessionDetails = response.data.resultSets[0][0];
      this.setState({
        showModal: !this.state.showModal,
        sessionDetails
      });
    });
  };

  updateModal = id => {
    getSessionById(id).then(response => {
      console.log(response);
      let sessionDetails = response.data.resultSets[0][0];
      this.setState({
        sessionDetails
      });
    });
  };

  handleDeleteSession = id => {
    deleteSession(id).then(response => {
      console.log(response);
      this.getSessionData();
      this.setState({
        showModal: false
      });
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  getSessionData = () => {
    let currentUser = "";
    if (this.props.currentUser) {
      currentUser = this.props.currentUser;
    } else {
      currentUser = localStorage.getItem("currentUser");
    }
    getAllSessions(parseInt(currentUser)).then(response => {
      console.log("sessions", response);
      if (response.data.resultSets[1]) {
        let sessions = response.data.resultSets[1];
        if (sessions && sessions.length > 0) {
          let sessionLineData = [];
          let sessionLineLabels = [];
          let gameTimePieData = [];
          let gameTimePieLabels = [];
          let gameTimePieTime = [];
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
          for (let i = 0; i < gameTimePieLabels.length; i++) {
            let time = 0;
            for (let j = 0; j < gameTimePieData.length; j++) {
              if (gameTimePieData[j].game == gameTimePieLabels[i]) {
                time += gameTimePieData[j].time;
              }
            }
            gameTimePieTime.push(time / 60);
          }

          this.setState({
            sessions,
            sessionLineLabels,
            sessionLineData,
            gameTimePieLabels,
            gameTimePieData,
            gameTimePieTime
          });
        }
      }
    });
  };

  getReportData = () => {
    let currentUser = "";
    if (this.props.currentUser) {
      currentUser = this.props.currentUser;
    } else {
      currentUser = localStorage.getItem("currentUser");
    }
    getOverallReport(parseInt(currentUser)).then(res => {
      console.log(res);
      if (res.data) {
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
      }
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
    if (!this.props.currentUser) {
      let currentUser = localStorage.getItem("currentUser");
      this.props.setCurrentUser(parseInt(currentUser));
      this.getOptionData();
      this.getReportData();
      this.getSessionData();
    }
    if (this.props.currentUser) {
      this.getOptionData();
      this.getReportData();
      this.getSessionData();
    }
  }

  render() {
    let username = "";
    for (let i = 0; i < this.props.users.length; i++) {
      if (this.props.users[i].Id == this.props.currentUser) {
        username = this.props.users[i].UserName;
      }
    }
    return (
      <div className="dashboard-container">
        <SessionModal
          getSessionData={this.getSessionData}
          updateModal={this.updateModal}
          handleDeleteSession={this.handleDeleteSession}
          showModal={this.state.showModal}
          //handleClose={this.toggleModal}
          closeModal={this.closeModal}
          sessionDetails={this.state.sessionDetails}
        >
          {/* <p>Modal</p>
          <p>Data</p> */}
        </SessionModal>
        <div className="dashboard-header">
          <h2>
            Hello
            <span>
              ,&nbsp;
              {username}
            </span>
          </h2>
        </div>
        <div className="session-list-item">
          <AddSession
            getOptionData={this.getOptionData}
            getSessionData={this.getSessionData}
            getReportData={this.getReportData}
          />
        </div>
        <div className="report-item">
          <Report
            toggleModal={this.toggleModal}
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
            gameTimePieTime={this.state.gameTimePieTime}
          />
        </div>
        <div className="dashboard-footer">
          <Ticker />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    users: state.users
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
      }),
    setCurrentUser: user =>
      dispatch({
        type: "SET_CURRENT_USER",
        user
      })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
