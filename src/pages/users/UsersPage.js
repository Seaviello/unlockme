import React, { useContext, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { UserContext } from '../../contexts/users';
import { LoadingPage } from '../../components/loadingPage';
import UserTable from './UsersTable';
const styles = () => ({});

const UsersPage = () => {
    const { getUsers, loading } = useContext(UserContext);
    useEffect(() => {
        getUsers();
    }, []);
    return loading ? <LoadingPage /> : <UserTable />;
};
const UsersPageWithStyles = withStyles(styles)(UsersPage);
export { UsersPageWithStyles as UsersPage };
