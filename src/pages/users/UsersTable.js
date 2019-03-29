import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { UserContext } from '../../contexts/users';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

const UsersTable = ({ classes }) => {
    const { users } = useContext(UserContext);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Permission</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(({ id, username, email, permission, status }) => (
                        <TableRow key={id}>
                            <TableCell component="th" scope="row">
                                {username}
                            </TableCell>
                            <TableCell align="right">{email}</TableCell>
                            <TableCell align="right">{status}</TableCell>
                            <TableCell align="right">{permission}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};
export default withStyles(styles)(UsersTable);
