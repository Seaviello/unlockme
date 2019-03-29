import React from 'react';
import classNames from 'classnames';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography';

import { SideBar } from '../sideBar';
import { AppBar } from '../appBar';
import { Snack } from '../snack';
import { routes } from '../../routes';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        width: '100%',
        padding: theme.spacing.unit * 3,
    },
});

class Core extends React.Component {
    state = {
        open: false,
    };

    handleSideBarOpen = () => {
        this.setState({ open: true });
    };

    handleSideBarClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <AppBar onMenuClick={this.handleSideBarOpen} />
                <SideBar onClose={this.handleSideBarClose} open={open} />
                <Snack />
                <main className={classNames(classes.content)}>
                    <div className={classes.toolbar} />
                    <Switch>
                        {Object.values(routes).map(({ route, title }) => (
                            <Route
                                key={route.path}
                                {...route}
                                component={() => (
                                    <Typography variant="h5" gutterBottom>
                                        {title}
                                    </Typography>
                                )}
                            />
                        ))}
                    </Switch>
                    <Switch>
                        {Object.values(routes).map(({ route, main }) => (
                            <Route key={route.path} {...route} component={main} />
                        ))}
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Core);
