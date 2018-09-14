import React from "react";
import { postNewUser } from "./services/user.service";
import { connect } from "react-redux";

class Welcome extends React.Component {
  state = {
    // firstName: "",
    // lastName: "",
    username: ""
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({
      [key]: val
    });
  };

  addUser = () => {
    let user = {
      // firstName: this.state.firstName,
      // lastName: this.state.lastName,
      userName: this.state.username
    };
    postNewUser(user).then(response => {
      console.log(response);
    });
  };

  selectUser = () => {
    this.props.setCurrentUser(this.state.username);
  };

  render() {
    console.log(this.props.game);
    return (
      <div className="container">
        <div className="heading">
          <h1>Bankroll Manager</h1>
        </div>
        <div className="welcome-form">
          <label>Select User</label>
          <select
            name="user"
            value={this.state.currentUser}
            onChange={this.handleChange}
          >
            {this.props.users.map(user => {
              return <option value={user.id}>{user.username}</option>;
            })}
          </select>
          <button type="button" onClick={this.selectUser}>
            Go
          </button>
          {/* <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              placeholder="first name..."
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              placeholder="last name..."
            />
          </div> */}
          <div>
            <label>Add New User</label>
            <button
              type="button"
              onClick={() => {
                this.setState({
                  showAddUser: !this.state.showAddUser
                });
              }}
            >
              +
            </button>
            {this.state.showAddUser && (
              <React.Fragment>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <button type="button" onClick={this.addUser}>
                  Get Started
                </button>
              </React.Fragment>
            )}
          </div>
          <div />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: user =>
      dispatch({
        type: "SET_CURRENT_USER",
        user
      })
  };
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
