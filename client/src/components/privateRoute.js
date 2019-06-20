import React from 'react';
import API from '../utils/API.js';
import {Route} from 'react-router-dom';

export const PrivateRoute = ({component: Component, prop, ...rest}) => (
	<Route {...rest} render={(props) => {
			if(API.isAuth().logged) {
				return (<Component {...props} pageName={prop} />);
			}
			else return(window.location = '/login');
	}} />
);