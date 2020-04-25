import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';
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
        isSignup: true
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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }

    render() { 
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = <Spinner />;
        if (!this.props.loading) {
            form = (
                <form onSubmit={this.submitHandler}>
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
                    <Button btnType="Success">Submit</Button>
                </form>
            );
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{color: 'red'}}>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to="/" />
        }

        return (
            <div className={classes.Auth}>
                <h4>Enter your data to {this.state.isSignup ? 'signup a new user' : 'signin your account'}</h4>
                {authRedirect}
                {errorMessage}
                {form}
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignup ? 'Signin' : 'Signup'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
