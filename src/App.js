import React, { Component } from "react";
import Welcome from "./views/Welcome/Welcome";
import Dashboard from "./views/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Welcome /> */}
        <Dashboard />
      </div>
    );
  }
}

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(App)
// );

export default App;
