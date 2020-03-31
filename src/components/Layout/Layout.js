import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.scss';

const layout = props => {
    return (
        <>
            <Toolbar />
            <SideDrawer />
            <div>Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    )
}

export default layout;
