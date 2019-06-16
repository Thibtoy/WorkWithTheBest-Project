import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Register extends Component{

	componentWillMount() {
		document.body.style.backgroundImage = "url("+ process.env.PUBLIC_URL +"images/background.jpg)";		
	}

	render() {
		let relativePath = window.location.pathname;
		return(
			<div id="Register">
				<Link to={relativePath + '/registerUser'}>User Account</Link>
				<Link to={relativePath + '/registerCompany'}>Company Account</Link>
			</div>
		)
	}
}