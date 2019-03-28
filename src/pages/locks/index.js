import React, { useContext, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { LockContext } from "../../contexts/locks";
import { LoadingPage } from "../../components/loadingPage";
import { LockCard } from "../../components/lockCard";
const styles = () => ({});

const LocksPage = ({}) => {
  const {
    getLocks,
    gettingLocks,
    locks,
    toggleLock,
    togglingLock,
    togglingError
  } = useContext(LockContext);

  useEffect(() => {
    getLocks();
  }, []);
  return gettingLocks ? (
    <LoadingPage />
  ) : (
    <Grid container justify="center" spacing={16}>
      {locks.map(lock => (
        <Grid key={lock.id} item>
          <LockCard
            {...lock}
            onClickLock={toggleLock}
            loading={togglingLock[lock.id]}
          />
        </Grid>
      ))}
    </Grid>
  );
};
const LocksPageWithStyles = withStyles(styles)(LocksPage);
export { LocksPageWithStyles as LocksPage };
