import React from "react";

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
    notes: []
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-heading">
            <h1>Add Session</h1>
          </div>
          <div className="card">
            <select name="game">{}</select>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSession;
