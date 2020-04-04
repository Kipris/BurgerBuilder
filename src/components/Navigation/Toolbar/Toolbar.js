import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.scss';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle 
                clicked={props.drawerToggleClicked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <div className={classes.DesktopOnly}>
                <NavigationItems />
            </div>
        </header>
    );
}
 
export default toolbar;