import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Layout/Layout';
import * as actionCreators from '../store/actions/index';
import asyncComponent from '../hoc/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./Orders/Orders');
})

const asyncBurgerBuilder = asyncComponent(() => {
  return import('./BurgerBuilder/BurgerBuilder');
})

const asyncAuth = asyncComponent(() => {
  return import('./Auth/Auth');
})

const asyncLogout = asyncComponent(() => {
  return import('./Auth/Logout/Logout');
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() { 
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={asyncBurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={asyncLogout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={asyncBurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actionCreators.authCheckState())
  }
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
