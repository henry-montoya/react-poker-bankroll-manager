import React from "react";
import { connect } from "react-redux";
import "./SessionModal.css";
import { editSession } from "../../services/session.service";

class SessionModal extends React.Component {
  state = {
    editField: false
  };

  handleEditField = name => {
    this.setState({
      editField: name
    });
  };

  finishEdit = () => {
    if (this.buyIn && this.buyIn.value) {
      let sessionUpdate = {
        id: this.props.sessionDetails.Id,
        gameId: this.props.sessionDetails.GameId,
        gameTypeId: 2,
        stakeId: this.props.sessionDetails.StakeId,
        limitTypeId: this.props.sessionDetails.LimitTypeId,
        locationId: this.props.sessionDetails.LocationId,
        locationTypeId: this.props.sessionDetails.LocationTypeId,
        startTime: this.props.sessionDetails.StartTime,
        endTime: this.props.sessionDetails.EndTime,
        buyIn: parseInt(this.buyIn.value),
        cashedOut: this.props.sessionDetails.CashedOut
      };
      editSession(sessionUpdate).then(response => {
        console.log(response);
        this.props.getSessionData();
        this.props.updateModal(this.props.sessionDetails.Id);
        this.setState({
          editField: false
        });
      });
    }
    if (this.cashedOut && this.cashedOut.value) {
      let sessionUpdate = {
        id: this.props.sessionDetails.Id,
        gameId: this.props.sessionDetails.GameId,
        gameTypeId: 2,
        stakeId: this.props.sessionDetails.StakeId,
        limitTypeId: this.props.sessionDetails.LimitTypeId,
        locationId: this.props.sessionDetails.LocationId,
        locationTypeId: this.props.sessionDetails.LocationTypeId,
        startTime: this.props.sessionDetails.StartTime,
        endTime: this.props.sessionDetails.EndTime,
        buyIn: this.props.sessionDetails.BuyIn,
        cashedOut: parseInt(this.cashedOut.value),
        notes: null,
        breakDuration: 0
      };
      editSession(sessionUpdate).then(response => {
        console.log(response);
        this.props.getSessionData();
        this.props.updateModal(this.props.sessionDetails.Id);
        this.setState({
          editField: false
        });
      });
    }
  };

  render() {
    const showHideClassName = this.props.showModal
      ? "modal display-block"
      : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="modal-header">
            <a
              href="#"
              onClick={this.props.closeModal}
              style={{
                textDecoration: "none",
                float: "right",
                padding: "10px"
              }}
            >
              x
            </a>
          </div>
          <br />

          <br />
          <div className="modal-content">
            <table>
              {/* <tr>
              <th scope="col" />
              <th scope="col" />
              <th scope="col" />
            </tr> */}
              <tr>
                <th scope="row">Game</th>
                <td className="modal-value">
                  {this.props.sessionDetails.Game}
                </td>
                <td className="edit-value">
                  <a
                    href="#"
                    onClick={this.props.editValue}
                    style={{ textDecoration: "none" }}
                  >
                    edit
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">Stakes</th>
                {!this.props.sessionDetails.ThirdBlind ? (
                  <td className="modal-value">
                    {this.props.sessionDetails.SmallBlind}/
                    {this.props.sessionDetails.BigBlind}
                  </td>
                ) : (
                  <td className="modal-value">
                    {this.props.sessionDetails.SmallBlind}/
                    {this.props.sessionDetails.BigBlind}/
                    {this.props.sessionDetails.ThirdBlind}
                  </td>
                )}

                <td className="edit-value">
                  <a
                    href="#"
                    onClick={this.props.editValue}
                    style={{ textDecoration: "none" }}
                  >
                    edit
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">Limit Type</th>
                <td className="modal-value">
                  {this.props.sessionDetails.LimitType}
                </td>
                <td className="edit-value">
                  <a
                    href="#"
                    onClick={this.props.editValue}
                    style={{ textDecoration: "none" }}
                  >
                    edit
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">Location Type</th>
                <td className="modal-value">
                  {this.props.sessionDetails.LocationType}
                </td>
                <td className="edit-value">
                  <a
                    href="#"
                    onClick={this.props.editValue}
                    style={{ textDecoration: "none" }}
                  >
                    edit
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">Location</th>
                <td className="modal-value">
                  {this.props.sessionDetails.Location}
                </td>
                <td className="edit-value">
                  <a
                    href="#"
                    onClick={this.props.editValue}
                    style={{ textDecoration: "none" }}
                  >
                    edit
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">Buy In</th>
                {this.state.editField != "buyIn" && (
                  <td className="modal-value">
                    {this.props.sessionDetails.BuyIn}
                  </td>
                )}
                {this.state.editField == "buyIn" && (
                  <td className="modal-value">
                    <input
                      name="buyIn"
                      type="number"
                      onBlur={this.finishEdit}
                      ref={input => (this.buyIn = input)}
                      autoFocus
                    />
                  </td>
                )}
                <td className="edit-value">
                  <a
                    href="#"
                    onClick={() => this.handleEditField("buyIn")}
                    style={{ textDecoration: "none" }}
                  >
                    edit
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">Cashed Out</th>
                {this.state.editField != "cashedOut" && (
                  <td className="modal-value">
                    {this.props.sessionDetails.CashedOut}
                  </td>
                )}
                {this.state.editField == "cashedOut" && (
                  <td className="modal-value">
                    <input
                      name="cashedOut"
                      type="number"
                      onBlur={this.finishEdit}
                      ref={input => (this.cashedOut = input)}
                      autoFocus
                    />
                  </td>
                )}
                <td className="edit-value">
                  <a
                    href="#"
                    onClick={() => this.handleEditField("cashedOut")}
                    style={{ textDecoration: "none" }}
                  >
                    edit
                  </a>
                </td>
              </tr>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="delete-session"
              onClick={() =>
                this.props.handleDeleteSession(this.props.sessionDetails.Id)
              }
            >
              Delete Session
            </button>
          </div>

          {/* <button onClick={this.props.closeModal}>close</button> */}
        </section>
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
    limitTypes: state.limitTypes,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(SessionModal);
