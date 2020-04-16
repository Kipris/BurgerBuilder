import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={classes.Input} 
                {...props.elementConfig} 
                value={props.value}
                placeholder="" />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={classes.Input} 
                {...props.elementConfig} 
                value={props.value}
                placeholder="" />;
            break;
        default:
            inputElement = <input 
                className={classes.Input} 
                {...props.elementConfig} 
                value={props.value}
                placeholder="" />;
    }

    return (
        <div className={classes.InputWrap}> 
            <label className={classes.Label}>{props.elementConfig.placeholder}</label>
            {inputElement}
        </div>
    );
}
 
export default input;
