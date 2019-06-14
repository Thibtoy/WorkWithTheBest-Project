import React from 'react';
import API from '../utils/API.js';
import {Route, Redirect} from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={(props) => {
			if(API.isAuth().logged) {
				return (<Component {...props} />);
			}
			else return(<Redirect to='/login' />);
	}} />
)