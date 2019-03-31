import React, { useContext, useEffect, useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LockContext } from '../../contexts/locks';
import { UserContext } from '../../contexts/users';

const styles = theme => ({
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

const LockModal = ({ open = false, id, onClose, classes }) => {
    const [name, setName] = useState('');
    /* For basic field validation - not scalable solution */
    const [nameError, setNameError] = useState(null);
    const [users, setUsers] = useState([]);
    const onNameChange = ({ target: { value } }) => {
        setName(value);
        if (value && nameError) {
            setNameError(null);
        }
    };
    const { getLock, updatingLock, updateLockInformation, currentLock, gettingLock } = useContext(
        LockContext
    );
    const { getUsers, users: allUsers, loading: gettingUsers } = useContext(UserContext);
    useEffect(() => {
        if (open) {
            getLock(id);
            getUsers();
        }
    }, [open]);
    useEffect(() => {
        if (currentLock) {
            setName(currentLock.name);
            setUsers(currentLock.users.map(user => user.id));
        }
    }, [currentLock]);

    const onUpdate = async event => {
        event.preventDefault();
        if (!name) {
            setNameError('Name field is required');
        } else {
            await updateLockInformation({ id, name, users });
            onClose();
        }
    };
    const mode = id ? 'Edit' : 'Add';
    return (
        <Dialog fullWidth open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            {gettingLock || gettingUsers ? (
                <Fragment />
            ) : (
                <Fragment>
                    <DialogTitle id="form-dialog-title">{mode}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Please provide proper information</DialogContentText>
                        <form onSubmit={onUpdate} autoComplete="off">
                            <TextField
                                error={!!nameError}
                                autoFocus
                                margin="normal"
                                id="name"
                                label="Lock name"
                                type="text"
                                helperText={nameError}
                                value={name}
                                onChange={onNameChange}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel htmlFor="select-multiple-checkbox">
                                    Users with access rights
                                </InputLabel>
                                <Select
                                    multiple
                                    value={users}
                                    onChange={event => setUsers(event.target.value)}
                                    input={<Input id="select-multiple-checkbox" />}
                                    /* FIXME: Inefficient
                                        Constructing map userId -> username would be preferable solution */
                                    renderValue={users =>
                                        users
                                            .map(
                                                id => allUsers.find(user => user.id === id).username
                                            )
                                            .join(', ')
                                    }
                                >
                                    {allUsers.map(({ id, username }) => (
                                        <MenuItem key={id} value={id}>
                                            <Checkbox
                                                checked={
                                                    users.findIndex(userId => userId === id) !== -1
                                                }
                                            />
                                            <ListItemText primary={username} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary" disabled={updatingLock}>
                            Cancel
                        </Button>
                        <div className={classes.wrapper}>
                            <Button onClick={onUpdate} color="primary" disabled={updatingLock}>
                                Save
                            </Button>
                            {updatingLock && (
                                <CircularProgress size={24} className={classes.buttonProgress} />
                            )}
                        </div>
                    </DialogActions>
                </Fragment>
            )}
        </Dialog>
    );
};

export default withStyles(styles)(LockModal);
