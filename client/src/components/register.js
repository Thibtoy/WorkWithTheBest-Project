import React, {Component} from 'react';
import API from '../utils/API.js';
export default class Register extends Component {
	constructor() {
		super();
		this.state = {
			email: false,
			password: false,
			password2: false
		}
		this.handleSubmit.bind(this);
		this.handleChange.bind(this); 
	}

	componentWillMount() {
		document.body.style.backgroundImage = "url("+ process.env.PUBLIC_URL +"images/background.jpg)";		
	}

	handleSubmit = event => {
		event.preventDefault();
		if (this.state.email && this.state.password && this.state.password2) {
			if (this.state.password === this.state.password2) {
				API.signUp(this.state.email, this.state.password, this.state.password2).then(function(data){
					window.location = "/login";
					return;
				});
			}
			else return;
		}
		else return;
	}

	handleChange = event => {
		this.setState({
			[event.target.id] : event.target.value
		});
	}

	render() {
		return(
			<form method="POST" className="FormStyle">
				<label htmlFor="email">Email :</label>
				<input id="email" name="email" type="email" onChange={this.handleChange}/>
				<label htmlFor="password">Password :</label>
				<input id="password" name="password" type="password" onChange={this.handleChange}/>
				<label htmlFor="password2">Confirm password :</label>
				<input id="password2" name="password2" type="password" onChange={this.handleChange}/>
				<button className="FormButton" onClick={this.handleSubmit}>Valider</button>
			</form>
		)
	}
}