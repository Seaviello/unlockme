import React from 'react';
import People from '@material-ui/icons/People';
import Home from '@material-ui/icons/Home';
import Lock from '@material-ui/icons/Lock';
import Logs from '@material-ui/icons/Assessment';


export const routes = {
    HOME: {
        route: {
            path: '/',
            exact: true,
        },
        title: 'Dashboard',
        icon: () => <Home />,
        main: () => <div>Halko</div>
    },
    USERS: {
        route: {
            path: '/users',
        },
        title: 'Users',
        icon: () => <People />,
        main: () => <div>Users</div>
    },
    LOCKS: {
        route: {
            path: '/locks',
        },
        title: 'Locks',
        icon: () => <Lock />,
        main: () => <div>Locks</div>
    },
    LOGS: {
        route: {
            path: '/logs',
        },
        title: 'Event logs',
        icon: () => <Logs />,
        main: () => <div>Logs</div>
    }
};