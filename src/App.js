import React, { Component, Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { BrowserRouter as Router, } from "react-router-dom";
import {Core} from "./components/core";

class App extends Component {
  render() {
    return (
      <Router>
          <Fragment>
              <CssBaseline />
              <Core />
          </Fragment>
      </Router>
    );
  }
}

export default App;
