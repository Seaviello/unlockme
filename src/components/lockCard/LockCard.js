import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const styles = theme => ({
  card: {
    minWidth: 200,
    maxWidth: 350
  },
  title: {
    fontSize: 14
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  lockOpenSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  lockOpenProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6
  }
});

const LockCard = ({
  name,
  id,
  onClickLock,
  status,
  loading,
  classes,
  noPermission
}) => {
  const open = status === "OPENED";
  const lockClassname = classNames({
    [classes.lockOpenSuccess]: open
  });
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.wrapper}>
          <Tooltip title={open ? "Lock" : "Unlock"}>
            <IconButton
              aria-label={open ? "Lock" : "Unlock"}
              className={lockClassname}
              onClick={loading ? () => {} : () => onClickLock({ id, status })}
            >
              {open ? <LockOpenIcon /> : <LockIcon />}
            </IconButton>
          </Tooltip>
          {loading && (
            <CircularProgress size={60} className={classes.lockOpenProgress} />
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(LockCard);
