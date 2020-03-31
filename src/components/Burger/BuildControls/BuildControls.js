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
            <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
            {controls.map(ctrl => {
                return <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />;
            })}
            <button
                type="button"
                className={classes.OrderButton}
                onClick={props.ordered}
                disabled={!props.purchasable}>
                Order
            </button>
        </div>
    );
}
 
export default buildControls;