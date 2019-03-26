import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Core from "./Core";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Core />
      </div>
    );
  }
}

export default App;
