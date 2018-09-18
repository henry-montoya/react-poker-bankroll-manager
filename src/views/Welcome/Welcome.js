import React from "react";
import { postNewUser, getUser, getAllUsers } from "../../services/user.service";
import { connect } from "react-redux";
import "./Welcome.css";
//import { Link, withRouter } from "react-router-dom";

class Welcome extends React.Component {
  state = {
    // firstName: "",
    // lastName: "",
    currentUser: 0,
    username: "",
    newUser: "",
    showAddUser: false
  };

  componentDidMount() {
    getAllUsers().then(res => {
      console.log(res);
      let users = res.data.resultSets[0];
      let defaultUser = res.data.resultSets[0][0].Id;
      this.setState({
        currentUser: defaultUser
      });
      this.props.setUsers(users);
      this.props.setCurrentUser(defaultUser);
    });
  }
  handleUserChange = e => {
    let user = parseInt(e.target.value);
    this.setState({
      currentUser: user
    });

    this.props.setCurrentUser(user);
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
      username: this.state.newUser
    };
    postNewUser(user).then(response => {
      console.log(response);
      getUser(response.data.outputParameters.Id).then(res => {
        console.log(res);
        let newUserData = [
          {
            Id: res.data.resultSets[0][0].Id,
            FirstName: res.data.resultSets[0][0].FirstName,
            LastName: res.data.resultSets[0][0].LastName,
            UserName: res.data.resultSets[0][0].Username,
            Password: res.data.resultSets[0][0].Password,
            DateCreated: res.data.resultSets[0][0].DateCreated,
            DateModified: res.data.resultSets[0][0].DateModified
          }
        ];
        this.props.setUsers(newUserData);
      });
    });
  };

  selectUser = () => {
    this.props.history.push("/dashboard");
    localStorage.setItem("currentUser", this.state.currentUser);
  };

  render() {
    return (
      <div className="welcome-container">
        <div className="welcome-heading">
          <h1>Bankroll Manager</h1>
        </div>
        <div className="welcome-form">
          {/* <label>Select User</label> */}
          <br />
          {!this.state.showAddUser && (
            <React.Fragment>
              <select
                className="welcome-select"
                name="currentUser"
                value={this.state.currentUser}
                onChange={this.handleUserChange}
              >
                {this.props.users.map(user => {
                  return <option value={user.Id}>{user.UserName}</option>;
                })}
              </select>
              <button
                className="welcome-form-go"
                type="button"
                onClick={this.selectUser}
              >
                Go
              </button>
            </React.Fragment>
          )}
          {this.state.showAddUser && (
            <React.Fragment>
              <input
                className="welcome-new-user"
                type="text"
                name="newUser"
                value={this.state.newUser}
                onChange={this.handleChange}
              />
              <button
                className="new-user-start"
                type="button"
                onClick={this.addUser}
              >
                Get Started
              </button>
            </React.Fragment>
          )}

          {/* <Link to={`/app/events/${this.props.eventId}`}>
            <Button color="link">Go To Event Page</Button>
          </Link> */}
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
            <br />
            <a
              style={{ color: "white", float: "right" }}
              href="#"
              onClick={() => {
                this.setState({
                  showAddUser: !this.state.showAddUser
                });
              }}
            >
              {!this.state.showAddUser ? "add new user" : "cancel"}
            </a>
            <br />
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
    users: state.users
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
