import React, {Component} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header.js';
import Register from './components/register.js';
import Dashboard from './components/dashboard.js';
import Login from './components/login.js';
import homePage from './components/homePage.js';
import RegisterUser from './components/registerUser.js';
import {PrivateRoute} from './components/privateRoute.js';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
        <div className="App-content">
          <Router>
            <Route exact path="/" component={homePage} />
            <Route exact path="/register" component={Register} />
            <Route path="/login" component={Login} />
                {/*<Route path="/logoun" component={Login} />*/}
            <PrivateRoute path='/dashboard' component={Dashboard} />
          </Router>
        </div>
      </div>
    );}
}