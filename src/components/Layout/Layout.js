import React from 'react';
import classes from './Layout.module.scss';

const layout = props => {
    return (
        <>
            <div>Toolbar</div>
            <div>Sidedrawer</div>
            <div>Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    )
}

export default layout;
