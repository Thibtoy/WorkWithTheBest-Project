import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/header.js';
import Register from './components/register.js';
import Dashboard from './components/dashboard.js';
import Login from './components/login.js';
import HomePage from './components/homePage.js';
import PrivateRoute from './components/privateRoute.js';
import RegisterUser from './components/registerUser.js';
import RegisterCompany from './components/registerCompany.js';
import NewOffer from './components/newOffer.js';

import './styles/styles.scss';

export default class App extends Component {

  render() {
    return (
      <div className="App">
      <Header />
        <div id="App-content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/register" component={Register}/>
            <Route path="/login" component={Login} />
            <Route path={'/register/registerUser'} component={RegisterUser} />
            <Route path="/register/registerCompany" component={RegisterCompany} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/newOffer' component={NewOffer} />
            <PrivateRoute path='/offers/:id' component={NewOffer}/>
          </Switch>
        </div>
      </div>
    );}
}