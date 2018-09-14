import React from "react";
import { connect } from "react-redux";
import "./AddSession.css";
import {
  addGameType,
  addGame,
  addStake,
  addLimitType,
  addLocation,
  addLocationType
} from "./services/option.service";

class AddSession extends React.Component {
  state = {
    gameId: 0,
    gameTypeId: 0,
    stakeId: 0,
    limitTypeId: 0,
    locationId: 0,
    locationTypeId: 0,
    buyIn: 0,
    cashedOut: 0,
    startTime: "",
    endTime: "",
    breakDuration: "",
    notes: [],
    addOptions: false
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({
      [key]: val
    });
  };

  saveNewOptions = () => {
    if (this.gameType.value) {
      let gameType = {
        name: this.gameType.value
      };
      addGameType(gameType).then(res => {
        console.log(res);
      });
    }
    if (this.game.value) {
      let game = {
        name: this.game.value
      };
      addGame(game).then(res => {
        console.log(res);
      });
    }
    if (this.smallBlind.value && this.bigBlind.value) {
      if (!this.thirdBlind.value) {
        let stake = {
          smallBlind: this.smallBlind.value,
          bigBlind: this.bigBlind.value
        };
        addStake(stake).then(res => {
          console.log(res);
        });
      } else {
        let stake = {
          smallBlind: this.smallBlind.value,
          bigBlind: this.bigBlind.value,
          thirdBlind: this.thirdBlind.value
        };
        addStake(stake).then(res => {
          console.log(res);
        });
      }
    }
    if (this.limitType.value) {
      let limitType = {
        name: this.limitType.value
      };
      addLimitType(limitType).then(res => {
        console.log(res);
      });
    }
    if (this.locationType.value) {
      let locationType = {
        name: this.locationType.value
      };
      addLocationType(locationType).then(res => {
        console.log(res);
      });
    }
    if (this.location.value) {
      let location = {
        name: this.location.value,
        locationTypeId: this.locationTypeId.value
      };
      addLocation(location).then(res => {
        console.log(res);
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-heading">
            <h1>Add Session</h1>
          </div>
          {!this.state.addOptions && (
            <button
              type="button"
              onClick={() => {
                this.setState({
                  addOptions: !this.state.addOptions
                });
              }}
            >
              + add new options
            </button>
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
          <div className="card">
            <div className="form-item">
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
            </div>
            <div className="form-item">
              <label>Game</label>
              {!this.state.addOptions ? (
                <select
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
                  name="stakeId"
                  name={this.state.stakeId}
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
                    type="number"
                    name="smallBlind"
                    ref={input => (this.smallBlind = input)}
                  />
                  <span>/</span>
                  <input
                    type="number"
                    name="bigBlind"
                    ref={input => (this.bigBlind = input)}
                  />
                  <span>/</span>
                  <input
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
                  type="text"
                  name="limitType"
                  ref={input => (this.limitType = input)}
                />
              )}
            </div>
            <div className="form-item">
              <label>Location Type</label>
              {!this.state.addOptions ? (
                <select
                  name="locationTypeId"
                  value={this.state.locationTypeId}
                  onChange={this.handleChange}
                >
                  {this.props.locationTypes.map(locationTypeOption => {
                    return (
                      <option
                        id={locationTypeOption.id}
                        value={locationTypeOption.id}
                      >
                        {locationTypeOption.name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  type="text"
                  name="locationType"
                  ref={input => (this.locationType = input)}
                />
              )}
            </div>
            <div className="form-item">
              <label>Location</label>
              {!this.state.addOptions ? (
                <select name="locationId">
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
                    type="text"
                    name="location"
                    ref={input => (this.location = input)}
                  />
                  <label>Type</label>
                  <select
                    name="locationTypeId"
                    onChange={this.handleChange}
                    ref={select => (this.locationTypeId = select)}
                  >
                    {this.props.locationTypes.map(locationTypeOption => {
                      return (
                        <option
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
                type="time"
                name="breakDuration"
                disabled={this.state.addOptions && true}
                value={this.state.breakDuration}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-item">
              <h4>Add Notes</h4>
              <textarea
                rows="2"
                name="notes"
                disabled={this.state.addOptions && true}
                value={this.state.notes}
                onChange={this.handleChange}
              />
            </div>
            <button
              type="button"
              onClick={this.postSession}
              disabled={this.state.addOptions && true}
            >
              Post Session
            </button>
          </div>
        </div>
      </div>
    );
  }
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

export default connect(mapStateToProps)(AddSession);
