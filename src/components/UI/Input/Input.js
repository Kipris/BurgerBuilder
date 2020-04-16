import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {
    let inputElement = null;
    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className={classes.Input} {...props} placeholder="" />;
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.Input} {...props} placeholder="" />;
            break;
        default:
            inputElement = <input className={classes.Input} {...props} placeholder="" />;
    }

    return (
        <div className={classes.InputWrap}> 
            <label className={classes.Label}>{props.placeholder}</label>
            {inputElement}
        </div>
    );
}
 
export default input;
