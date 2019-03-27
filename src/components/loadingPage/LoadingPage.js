import React from "react";
import { withStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = () => ({
  loader: {
    display: "flex",
    height: "75vh",
    justifyContent: "center",
    alignItems: "center"
  }
});

const LoadingPage = ({ classes }) => (
  <div className={classes.loader}>
    <CircularProgress />
  </div>
);
export default withStyles(styles)(LoadingPage);
