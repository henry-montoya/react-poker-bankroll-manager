import React, { Component } from "react";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";

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
