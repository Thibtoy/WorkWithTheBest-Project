import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RegisterUser from './registerUser.js';

export default class Register extends Component{
	constructor() {
		super();
		this.state = {
			component: "",
			RegisterUser: <RegisterUser />,
			//RegisterCompany: <RegisterCompany />
		}
		this.handleClick.bind(this);
	}

	componentWillMount() {
		document.body.style.backgroundImage = "url("+ process.env.PUBLIC_URL +"images/background.jpg)";		
	}

	handleClick = event => {
		this.setState({
			component: this.state[event.target.id]
		});
	}

	render() {
		return(
			<div id="Register">
				{this.state.component}
            	<button id="RegisterUser" onClick={this.handleClick}>User Account</button>
			</div>
		)
	}
}