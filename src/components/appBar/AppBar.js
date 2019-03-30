import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import MaterialAppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core';

const styles = () => ({
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
});

export const AppBar = ({ classes, header, onMenuClick }) => (
    <MaterialAppBar position="fixed" data-test-id="app-bar">
        <Toolbar disableGutters>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onMenuClick}
                className={classes.menuButton}
                data-test-id="app-bar-menu-button"
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
                {header}
            </Typography>
        </Toolbar>
    </MaterialAppBar>
);

export default withStyles(styles)(AppBar);
