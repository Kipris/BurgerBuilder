import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.scss';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return isValid;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        // object deep clone
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value, 
                    this.state.controls[controlName].validation),
                touched: true
            }
        };
        
        this.setState({controls: updatedControls});
    }

    handleSubmit = () => {

    }

    render() { 
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <form onSubmit={this.handleSubmit}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        placeholder={formElement.config.elementConfig.placeholder}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button 
                    btnType="Success"
                    disabled={!this.state.formIsValid}>Submit</Button>
            </form>
        );

        return (
            <div className={classes.Auth}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}
 
export default Auth;
