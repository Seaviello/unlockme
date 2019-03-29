import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { LogContext } from '../../contexts/logs';

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

const LogsTable = ({ classes }) => {
    const { logs } = useContext(LogContext);

    return logs.length ? (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Lock name</TableCell>
                        <TableCell align="right">Event type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map(({ id, username, lockName, type }) => (
                        <TableRow key={id}>
                            <TableCell component="th" scope="row">
                                {username}
                            </TableCell>
                            <TableCell align="right">{lockName}</TableCell>
                            <TableCell align="right">{type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    ) : (
        'No logs. Play around to see something.'
    );
};
export default withStyles(styles)(LogsTable);
