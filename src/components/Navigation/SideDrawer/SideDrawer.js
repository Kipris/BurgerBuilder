import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.scss';

const sideDrawer = (props) => {
    const attachedClasses = props.open ? classes.Open : classes.Close;
    return (
        <>
            <Backdrop 
                show={props.open}
                clicked={props.closed} />
            <div className={[classes.SideDrawer, attachedClasses].join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems isAuth={props.isAuth} />
            </div>
        </>
    );
}
 
export default sideDrawer;
