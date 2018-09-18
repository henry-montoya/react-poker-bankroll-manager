import React from "react";
import "./CompletedSessions.css";

class CompletedSessions extends React.Component {
  render() {
    return (
      <div className="session-container">
        {this.props.sessions.map(session => {
          return (
            <div
              key={session.Id}
              className="session-item"
              onClick={() => this.props.toggleModal(session.Id)}
            >
              <p className="session-text">
                <span>{session.StartTime.slice(5, 7)}</span>/
                <span>{session.StartTime.slice(8, 10)}</span>
                <span>&nbsp;&nbsp;</span>
                <span>{session.Game}</span>
                <span>&nbsp;&nbsp;</span>
                {!session.ThirdBlind ? (
                  <span>
                    ${session.SmallBlind}/{session.BigBlind}
                  </span>
                ) : (
                  <span>
                    ${session.SmallBlind}/{session.BigBlind}/
                    {session.ThirdBlind}
                  </span>
                )}
                <span>&nbsp;&nbsp;</span>
                {session.CashedOut > session.BuyIn ? (
                  <span className="session-result" style={{ color: "green" }}>
                    +{session.CashedOut - session.BuyIn}
                  </span>
                ) : (
                  <span className="session-result" style={{ color: "red" }}>
                    {session.CashedOut - session.BuyIn}
                  </span>
                )}
                {/* <a
                  href="#"
                  className="session-delete"
                  onClick={this.props.deleteSession}
                >
                  X&nbsp;&nbsp;
                </a> */}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default CompletedSessions;
