import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { Core } from './components/core';
import { UserProvider } from './contexts/users';
import { LockProvider } from './contexts/locks';
import { SnackProvider } from './contexts/snacks';
import { LogProvider } from './contexts/logs';

class App extends Component {
    render() {
        return (
            <Router>
                <SnackProvider>
                    <LogProvider>
                        <UserProvider>
                            <LockProvider>
                                <Fragment>
                                    <CssBaseline />
                                    <Core />
                                </Fragment>
                            </LockProvider>
                        </UserProvider>
                    </LogProvider>
                </SnackProvider>
            </Router>
        );
    }
}

export default App;
