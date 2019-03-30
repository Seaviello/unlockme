import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { routes } from '../../routes';

const styles = theme => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
});

const SideBarLink = ({ to, ...props }) => <Link to={to} {...props} />;

export const SideBar = ({ classes, theme, open, onClose, location }) => (
    <Drawer open={open} onClose={onClose} data-test-id="side-bar">
        <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
            <div className={classes.header}>
                <IconButton onClick={onClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {[routes.HOME, routes.USERS, routes.LOCKS, routes.LOGS].map(
                    ({ route, title, icon }) => (
                        <ListItem
                            button
                            selected={route.path === location.pathname}
                            key={title}
                            component={SideBarLink}
                            to={route.path}
                            data-test-id="side-bar-link"
                        >
                            <ListItemIcon>{icon()}</ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    )
                )}
            </List>
        </div>
    </Drawer>
);

export default withRouter(withStyles(styles, { withTheme: true })(SideBar));
