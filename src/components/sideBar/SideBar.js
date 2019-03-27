import React from "react";
import {withStyles} from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {routes} from "../../routes";

const styles = theme => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
});

export const SideBar = ({classes, theme, open, onClose, }) => (
    <Drawer open={open} onClose={onClose}>
        <div
            tabIndex={0}
            role="button"
            onClick={onClose}
            onKeyDown={onClose}
        >
            <div className={classes.header}>
                <IconButton onClick={onClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                { [routes.HOME, routes.USERS, routes.LOCKS, routes.LOGS, ].map(({route, title, icon }) =>
                    (<ListItem button key={title}>
                        <ListItemIcon>{icon()}</ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItem>))
                }


            </List>
        </div>
    </Drawer>
);

export default withStyles(styles, {withTheme: true})(SideBar)