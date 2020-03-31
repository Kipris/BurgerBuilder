import React from 'react';
import classes from './Toolbar.module.scss';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <div className={classes.Logo}>LOGO</div>
            <nav>
                <a></a>
                <a></a>
                <a></a>
            </nav>
        </header>
    );
}
 
export default toolbar;