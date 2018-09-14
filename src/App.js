import React, { Component } from "react";
import { connect } from "react-redux";
import { getStartupData } from "./services/startup.service";
import Welcome from "./Welcome";
import AddSession from "./AddSession";

class App extends Component {
  getAllData = () => {
    getStartupData().then(response => {
      console.log(response);
      let game = response.data.resultSets[0];
      let gameType = response.data.resultSets[1];
      let limitType = response.data.resultSets[2];
      let location = response.data.resultSets[3];
      let locationType = response.data.resultSets[4];
      let stake = response.data.resultSets[5];
      let user = response.data.resultSets[6];
      this.props.setGames(game);
      this.props.setGameTypes(gameType);
      this.props.setLimitTypes(limitType);
      this.props.setLocations(location);
      this.props.setLocationTypes(locationType);
      this.props.setStakes(stake);
      this.props.setUsers(user);
    });
  };
  componentDidMount() {
    this.getAllData();
  }

  render() {
    return (
      <div className="App">
        <Welcome />
        <AddSession getAllData={this.getAllData} />
      </div>
    );
  }
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
    setUsers: users =>
      dispatch({
        type: "ADD_USERS",
        users
      })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);
