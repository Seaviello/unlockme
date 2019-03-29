import React, { useContext, useEffect, Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { LockContext } from '../../contexts/locks';
import { LoadingPage } from '../../components/loadingPage';
import { LockCard } from '../../components/lockCard';
import LockModal from './LockModal';
const styles = theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

const LocksPage = ({ classes }) => {
    const { getLocks, gettingLocks, locks, toggleLock, togglingLock } = useContext(LockContext);

    useEffect(() => {
        getLocks();
    }, []);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedLockId, selectLockId] = useState(null);
    const toggleModal = lockId => {
        selectLockId(lockId);
        setModalOpen(!isModalOpen);
    };
    return gettingLocks ? (
        <LoadingPage />
    ) : (
        <Fragment>
            <Grid container spacing={16}>
                {locks.map(lock => (
                    <Grid key={lock.id} item xs={12} sm={6} md={3}>
                        <LockCard
                            {...lock}
                            onClickLock={toggleLock}
                            onUpdate={toggleModal}
                            loading={togglingLock[lock.id]}
                        />
                    </Grid>
                ))}
            </Grid>
            <LockModal isOpen={isModalOpen} onClose={() => toggleModal()} id={selectedLockId} />
            <Tooltip title="Add lock" enterDelay={500} leaveDelay={200}>
                <Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => toggleModal()}>
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Fragment>
    );
};
const LocksPageWithStyles = withStyles(styles)(LocksPage);
export { LocksPageWithStyles as LocksPage };
