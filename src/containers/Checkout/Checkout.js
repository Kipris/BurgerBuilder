import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        //when url params changed => update ingredients in state
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice = param[1];
            } else {
                // ['salad', '1']
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients, totalPrice});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() { 
        return (
            <>
                <CheckoutSummary 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients} />
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    render={() => (
                        <ContactData 
                            ingredients={this.state.ingredients} 
                            totalPrice={this.state.totalPrice} />
                    )} />
            </>
        );
    }
}
 
export default Checkout;
