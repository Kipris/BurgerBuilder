import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.scss';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = props => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(ctrl => {
                return <BuildControl key={ctrl.label} label={ctrl.label} />;
            })}
            <button type="button" className={classes.OrderButton}>Order</button>
        </div>
    );
}
 
export default buildControls;