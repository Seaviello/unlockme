import React, { useContext, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { LogContext } from '../../contexts/logs';
import { LoadingPage } from '../../components/loadingPage';
import LogsTable from './LogsTable';
const styles = () => ({});

const LogsPage = () => {
    const { getLogs, loading } = useContext(LogContext);
    useEffect(() => {
        getLogs();
    }, []);
    return loading ? <LoadingPage /> : <LogsTable />;
};
const LogsPageWithStyles = withStyles(styles)(LogsPage);
export { LogsPageWithStyles as LogsPage };
