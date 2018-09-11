import React from "react";
import { postNewUser } from "./services/user.service";

class Welcome extends React.Component {
  state = {
    firstName: "",
    lastName: "",
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.username
    };
    postNewUser(user).then(response => {
      console.log(response);
    });
  };

  render() {
    return (
      <div className="container">
        <div className="heading">
          <h1>Bankroll Manager</h1>
        </div>
        <div className="welcome-form">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder="first name..."
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder="last name..."
          />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username..."
          />
          <button type="button" onClick={this.addUser}>
            Get Started
          </button>
        </div>
      </div>
    );
  }
}

export default Welcome;
