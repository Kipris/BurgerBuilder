import React from 'react';
import classes from './BuildControl.module.scss';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button
                className={classes.Less}
                onClick={props.removed}
                disabled={props.disabled}
                type="button">
                Less
            </button>
            <button
                className={classes.More}
                onClick={props.added}
                type="button">
                More
            </button>
        </div>
    );
}
 
export default buildControl;
