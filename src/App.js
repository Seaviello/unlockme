import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { Core } from './components/core';
import { UsersProvider } from './contexts/users';
import { LockProvider } from './contexts/locks';
import { SnackProvider } from './contexts/snacks';
import { LogsProvider } from './contexts/logs';

class App extends Component {
    render() {
        return (
            <Router>
                <SnackProvider>
                    <LogsProvider>
                        <UsersProvider>
                            <LockProvider>
                                <Fragment>
                                    <CssBaseline />
                                    <Core />
                                </Fragment>
                            </LockProvider>
                        </UsersProvider>
                    </LogsProvider>
                </SnackProvider>
            </Router>
        );
    }
}

export default App;
