import React, {Component} from 'react';
import API from '../utils/API.js';
import '../styles/Form.scss';

export default class RegisterUser extends Component {
	constructor() {
		super();
		this.state = {
			firstName: false,
			lastName: false,
			email: false,
			password: false,
			password2: false,
			token: '',
			errorMessage: '',
			filled: true
		}
		this.handleSubmit.bind(this);
		this.handleChange.bind(this); 
	}

	componentWillMount() {
		document.body.style.backgroundImage = "url("+ process.env.PUBLIC_URL +"../images/background.jpg)";
	}

	handleSubmit = event => {
		event.preventDefault();
		let that = this;
		let promise = new Promise(function(resolve, reject){
			for (let item in that.state) {
			if (that.state[item] === false) that.setState({filled: false})
		};
		resolve();
		});
		promise.then(() => {
			if (this.state.filled) {
				if (this.state.password === this.state.password2) {
					let promise = new Promise (function(resolve, reject){
						let token = API.setToken({type: 'users'});
						resolve(token);
					});
					promise.then(token => {
						this.setState({token: token});
						API.signUp(this.state).then(function(response){
							if (response.data.created) {
								window.location = "/login";	
							}
							else return that.setState({errorMessage: response.data.message})
						});
					});
				}
				else return this.setState({errorMessage: 'Passwords doesn\'t match'});
			}
			else {
				this.setState({filled: true});
				return this.setState({errorMessage: 'All inputs must be filled'});
			}
		});
	}

	handleChange = event => {
		this.setState({
			[event.target.id] : event.target.value
		});
	}

	render() {
		return(
			<div id="Register">
			<form method="POST" className="Form RegisterForm">
				<h3 className="FormMasterFontSet">User Account</h3>
				<div className="FormInputContainer">
					<label htmlFor="firstName">First Name :</label>
					<input id="firstName" name="firstName" type="firstName" onChange={this.handleChange}/>
					<label htmlFor="lastName">Last Name :</label>
					<input id="lastName" name="lastName" type="lastName" onChange={this.handleChange}/>
					<label htmlFor="email">Email :</label>
					<input id="email" name="email" type="email" onChange={this.handleChange}/>
					<label htmlFor="password">Password :</label>
					<input id="password" name="password" type="password" onChange={this.handleChange}/>
					<label htmlFor="password2">Confirm password :</label>
					<input id="password2" name="password2" type="password" onChange={this.handleChange}/>
				</div>
				<p className="FormErrorFont">{this.state.errorMessage}</p>
				<div className="FormButton" onClick={this.handleSubmit}>Confirm</div>
			</form>
			</div>
		)
	}
}