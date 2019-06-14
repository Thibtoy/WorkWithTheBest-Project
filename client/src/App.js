import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/header.js';
import Register from './components/register.js';
import Dashboard from './components/dashboard.js';
import Login from './components/login.js';
import homePage from './components/homePage.js';
import {PrivateRoute} from './components/privateRoute.js';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={homePage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </div>
    );}
}