import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.scss';

const navigationItems = (props) => {
    return (
        <nav>
            <ul className={classes.NavigationItems}>
                <NavigationItem link='/' exact>Burger Builder</NavigationItem> 
                <NavigationItem link='/orders'>Orders</NavigationItem> 
                <NavigationItem link='/auth'>Authenticate</NavigationItem> 
            </ul>
        </nav>
    );
}
 
export default navigationItems;
