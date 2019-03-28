import React, { Component, Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { Core } from "./components/core";
import { UsersProvider } from "./contexts/users";
import { LockProvider } from "./contexts/locks";

class App extends Component {
  render() {
    return (
      <Router>
        <UsersProvider>
          <LockProvider>
            <Fragment>
              <CssBaseline />
              <Core />
            </Fragment>
          </LockProvider>
        </UsersProvider>
      </Router>
    );
  }
}

export default App;
