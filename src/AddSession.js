import React from "react";
import { connect } from "react-redux";
import "./AddSession.css";
import {
  addGameType,
  addGame,
  addStake,
  addLimitType,
  addLocation,
  addLocationType,
  selectGameType,
  selectGame,
  selectStake,
  selectLimitType,
  selectLocation,
  selectLocationType
} from "./services/option.service";
import { addNewSession } from "./services/session.service";

class AddSession extends React.Component {
  state = {
    gameId: 0,
    gameTypeId: 2,
    stakeId: 0,
    limitTypeId: 0,
    locationId: 0,
    locationTypeId: 0,
    buyIn: 0,
    cashedOut: 0,
    startTime: "",
    endTime: "",
    breakDuration: null,
    notes: null,
    addOptions: false,
    disableDerivedState: false
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({
      [key]: val
    });
  };

  saveNewOptions = () => {
    // if (this.gameType.value) {
    //   let gameType = {
    //     name: this.gameType.value
    //   };
    //   addGameType(gameType).then(res => {
    //     selectGameType(res.data.outputParameters.Id).then(res => {
    //       console.log(res);
    //       let gameType = res.data.resultSets[0];
    //       this.props.setGameTypes(gameType);
    //     });
    //   });
    // }
    if (this.game.value) {
      let game = {
        name: this.game.value
      };
      addGame(game).then(res => {
        selectGame(res.data.outputParameters.Id).then(res => {
          console.log(res);
          let game = res.data.resultSets[0];
          this.props.setGames(game);
        });
      });
    }
    if (this.smallBlind.value && this.bigBlind.value) {
      if (!this.thirdBlind.value) {
        let stake = {
          smallBlind: this.smallBlind.value,
          bigBlind: this.bigBlind.value
        };
        addStake(stake).then(res => {
          selectStake(res.data.outputParameters.Id)
            .then(res => {
              console.log(res);
              let stake = res.data.resultSets[0];
              this.props.setStakes(stake);
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
        let stake = {
          smallBlind: this.smallBlind.value,
          bigBlind: this.bigBlind.value,
          thirdBlind: this.thirdBlind.value
        };
        addStake(stake).then(res => {
          selectStake(res.data.outputParameters.Id)
            .then(res => {
              console.log(res);
              let stake = res.data.resultSets[0];
              this.props.setStakes(stake);
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    }
    if (this.limitType.value) {
      let limitType = {
        name: this.limitType.value
      };
      addLimitType(limitType).then(res => {
        selectLimitType(res.data.outputParameters.Id)
          .then(res => {
            console.log(res);
            let limitType = res.data.resultSets[0];
            this.props.setLimitTypes(limitType);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
    // if (this.locationType.value) {
    //   let locationType = {
    //     name: this.locationType.value
    //   };
    //   addLocationType(locationType).then(res => {
    //     selectLocationType(res.data.outputParameters.Id).then(res => {
    //       console.log(res);
    //       let locationType = res.data.resultSets[0];
    //       this.props.setLocationTypes(locationType);
    //     });
    //   });
    // }
    if (this.location.value) {
      let location = {
        name: this.location.value,
        locationTypeId: this.locationTypeId.value
      };
      addLocation(location).then(res => {
        selectLocation(res.data.outputParameters.Id).then(res => {
          console.log(res);
          let location = res.data.resultSets[0];
          this.props.setLocations(location);
        });
      });
    }
  };

  postSession = () => {
    let newSession = {
      // userId: this.props.currentUser.id,
      userId: 1,
      gameId: this.state.gameId,
      gameTypeId: this.state.gameTypeId,
      stakeId: this.state.stakeId,
      limitTypeId: this.state.limitTypeId,
      locationId: this.state.locationId,
      locationTypeId: this.state.locationTypeId,
      buyIn: this.state.buyIn,
      cashedOut: this.state.cashedOut,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      breakDuration: this.state.breakDuration,
      notes: this.state.notes
    };
    addNewSession(newSession).then(res => {
      console.log(res);
    });
  };

  disableDerivedState = e => {
    console.log("no more");
    this.setState({
      disableDerivedState: true
    });
  };

  componentDidMount() {
    console.log(this.props.games);
    document.addEventListener("click", this.disableDerivedState);
    // this.setState({

    // });
  }

  static getDerivedStateFromProps(props, state) {
    if (
      !state.disableDerivedState &&
      props.games &&
      props.stakes &&
      props.limitTypes &&
      props.locations &&
      props.locationTypes &&
      props.games.length > 0 &&
      props.stakes.length > 0 &&
      props.limitTypes.length > 0 &&
      props.locations.length > 0 &&
      props.locationTypes.length > 0
    ) {
      return {
        gameId: props.games[0].id,
        stakeId: props.stakes[0].id,
        limitTypeId: props.limitTypes[0].id,
        locationId: props.locations[0].id,
        locationTypeId: props.locationTypes[0].id
      };
    }
  }

  render() {
    return (
      <div className="session-form-container">
        <div className="form-card">
          {/* <div className="card-heading">
            <h1>Add Session</h1>
          </div> */}
          <div className="add-option-button">
            {!this.state.addOptions && (
              <p style={{ textAlign: "right" }}>
                <a
                  style={{ float: "right", color: "white" }}
                  href="#"
                  onClick={() => {
                    this.setState({
                      addOptions: !this.state.addOptions
                    });
                  }}
                >
                  add new options
                </a>
              </p>
            )}
            {this.state.addOptions && (
              <React.Fragment>
                <button
                  type="button"
                  onClick={() => {
                    this.setState({
                      addOptions: false
                    });
                  }}
                >
                  Cancel
                </button>
                <button type="button" onClick={this.saveNewOptions}>
                  Save
                </button>
              </React.Fragment>
            )}
          </div>
          <br />
          <div className="card">
            {/* <div className="form-item">
              <label>Game Type</label>
              {!this.state.addOptions ? (
                <select
                  name="gameTypeId"
                  value={this.state.gameTypeId}
                  onChange={this.handleChange}
                >
                  {this.props.gameTypes.map(gameTypeOption => {
                    return (
                      <option key={gameTypeOption.id} value={gameTypeOption.id}>
                        {gameTypeOption.name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  type="text"
                  name="gameType"
                  ref={input => (this.gameType = input)}
                />
              )}
            </div> */}
            <div className="form-item">
              <label>Game</label>
              {!this.state.addOptions ? (
                <select
                  className="session-input"
                  name="gameId"
                  value={this.state.gameId}
                  onChange={this.handleChange}
                >
                  {this.props.games.map(gameOption => {
                    return (
                      <option key={gameOption.id} value={gameOption.id}>
                        {gameOption.name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  className="session-input"
                  type="text"
                  name="game"
                  ref={input => (this.game = input)}
                />
              )}
            </div>
            <div className="form-item">
              <label>Stakes</label>
              {!this.state.addOptions ? (
                <select
                  className="session-input"
                  name="stakeId"
                  value={this.state.stakeId}
                  onChange={this.handleChange}
                >
                  {this.props.stakes.map(stakeOption => {
                    if (!stakeOption.thirdBlind) {
                      return (
                        <option key={stakeOption.id} value={stakeOption.id}>
                          {stakeOption.smallBlind}/{stakeOption.bigBlind}
                        </option>
                      );
                    } else {
                      return (
                        <option key={stakeOption.id} value={stakeOption.id}>
                          {stakeOption.smallBlind}/{stakeOption.bigBlind}/
                          {stakeOption.thirdBlind}
                        </option>
                      );
                    }
                  })}
                </select>
              ) : (
                <React.Fragment>
                  <input
                    className="session-input"
                    type="number"
                    name="smallBlind"
                    ref={input => (this.smallBlind = input)}
                  />
                  <span style={{ color: "white" }}>/</span>
                  <input
                    className="session-input"
                    type="number"
                    name="bigBlind"
                    ref={input => (this.bigBlind = input)}
                  />
                  <span style={{ color: "white" }}>/</span>
                  <input
                    className="session-input"
                    type="number"
                    name="thirdBlind"
                    placeholder="(optional)"
                    ref={input => (this.thirdBlind = input)}
                  />
                </React.Fragment>
              )}
            </div>
            <div className="form-item">
              <label>Limit Type</label>
              {!this.state.addOptions ? (
                <select
                  className="session-input"
                  name="limitTypeId"
                  value={this.state.limitTypeId}
                  onChange={this.handleChange}
                >
                  {this.props.limitTypes.map(limitTypeOption => {
                    return (
                      <option
                        key={limitTypeOption.id}
                        value={limitTypeOption.id}
                      >
                        {limitTypeOption.limitType}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  className="session-input"
                  type="text"
                  name="limitType"
                  ref={input => (this.limitType = input)}
                />
              )}
            </div>
            <div className="form-item">
              <label>Location Type</label>
              <select
                className="session-input"
                name="locationTypeId"
                value={this.state.locationTypeId}
                onChange={this.handleChange}
                disabled={this.state.addOptions && true}
              >
                {this.props.locationTypes.map(locationTypeOption => {
                  return (
                    <option
                      key={locationTypeOption.id}
                      id={locationTypeOption.id}
                      value={locationTypeOption.id}
                    >
                      {locationTypeOption.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-item">
              <label>Location</label>
              {!this.state.addOptions ? (
                <select
                  className="session-input"
                  name="locationId"
                  value={this.state.locationId}
                  onChange={this.handleChange}
                >
                  {this.props.locations.map(locationOption => {
                    return (
                      <option key={locationOption.id} value={locationOption.id}>
                        {locationOption.name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <React.Fragment>
                  <input
                    className="session-input"
                    type="text"
                    name="location"
                    ref={input => (this.location = input)}
                  />
                  <label>Type</label>
                  <select
                    className="session-input"
                    name="locationTypeId"
                    onChange={this.handleChange}
                    ref={select => (this.locationTypeId = select)}
                  >
                    {this.props.locationTypes.map(locationTypeOption => {
                      return (
                        <option
                          key={locationTypeOption.id}
                          id={locationTypeOption.id}
                          value={locationTypeOption.id}
                        >
                          {locationTypeOption.name}
                        </option>
                      );
                    })}
                  </select>
                </React.Fragment>
              )}
            </div>
            <div className="form-item">
              <label>Buyin</label>
              <input
                className="session-input"
                type="number"
                name="buyIn"
                disabled={this.state.addOptions && true}
                value={this.state.buyIn}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-item">
              <label>Cashed Out</label>
              <input
                className="session-input"
                type="number"
                name="cashedOut"
                disabled={this.state.addOptions && true}
                value={this.state.cashedOut}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-item">
              <label>Start</label>
              <input
                className="session-input"
                type="datetime-local"
                name="startTime"
                disabled={this.state.addOptions && true}
                value={this.state.startTime}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-item">
              <label>End</label>
              <input
                className="session-input"
                type="datetime-local"
                name="endTime"
                disabled={this.state.addOptions && true}
                value={this.state.endTime}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-item">
              <label>Break Duration</label>
              <input
                className="session-input"
                type="time"
                name="breakDuration"
                disabled={this.state.addOptions && true}
                value={this.state.breakDuration}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-item">
              <label>Add Notes</label>
              <textarea
                className="session-input"
                rows="2"
                name="notes"
                disabled={this.state.addOptions && true}
                value={this.state.notes}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="session-form-button">
          <button
            type="button"
            onClick={this.postSession}
            disabled={this.state.addOptions && true}
          >
            <h3>Post Session</h3>
          </button>
        </div>
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

function mapStateToProps(state) {
  return {
    stakes: state.stakes,
    locations: state.locations,
    locationTypes: state.locationTypes,
    games: state.games,
    gameTypes: state.gameTypes,
    limitTypes: state.limitTypes
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSession);
