import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const styles = theme => ({
    title: {
        fontSize: 14,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    locked: {
        backgroundColor: red[100],
        '&:hover': {
            backgroundColor: red[300],
        },
    },
    unlocked: {
        backgroundColor: green[100],
        '&:hover': {
            backgroundColor: green[300],
        },
    },
    unlockProgress: {
        color: green[300],
        position: 'absolute',
        top: -6,
        left: -6,
    },
    lockProgress: {
        color: red[300],
        position: 'absolute',
        top: -6,
        left: -6,
    },
});

const LockCard = ({ name, id, onClickLock, status, loading, classes, onUpdate }) => {
    const open = status === 'OPENED';
    const lockClassname = classNames({
        [classes.locked]: !open,
        [classes.unlocked]: open,
    });
    return (
        <Card data-test-id="lock-card" data-test-lock-name={name} data-test-lock-status={status}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <div className={classes.wrapper}>
                    <Tooltip title={open ? 'Lock' : 'Unlock'} enterDelay={500} leaveDelay={200}>
                        <IconButton
                            aria-label={open ? 'Lock' : 'Unlock'}
                            className={lockClassname}
                            onClick={loading ? () => {} : () => onClickLock({ id, status })}
                            data-test-id="lock-toggle-button"
                        >
                            {open ? <LockOpenIcon /> : <LockIcon />}
                        </IconButton>
                    </Tooltip>
                    {loading && (
                        <CircularProgress
                            size={60}
                            className={open ? classes.lockProgress : classes.unlockProgress}
                        />
                    )}
                </div>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => onUpdate(id)}
                    data-test-id="lock-edit-button"
                >
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
};

export default withStyles(styles)(LockCard);
