import React, { Component, Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { Core } from "./components/core";
import { UsersProvider } from "./contexts/users";

class App extends Component {
  render() {
    return (
      <Router>
        <UsersProvider>
          <Fragment>
            <CssBaseline />
            <Core />
          </Fragment>
        </UsersProvider>
      </Router>
    );
  }
}

export default App;
