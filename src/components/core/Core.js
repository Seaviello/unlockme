import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography/index';

import {SideBar} from "../sideBar";
import {AppBar} from "../appBar";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
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
                <AppBar onMenuClick={this.handleSideBarOpen}/>
                <SideBar onClose={this.handleSideBarClose} open={open} />
                <main
                    className={classNames(classes.content)}
                >
                    <div className={classes.toolbar}></div>
                    <Typography paragraph>
                        Text
                    </Typography>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Core);