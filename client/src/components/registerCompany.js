import React, {Component} from 'react';
import API from '../utils/API.js';

export default class RegisterCompany extends Component {
	constructor() {
		super();
		this.state = {
			name: false,
			siret: false,
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
						let token = API.setToken({type: 'companies'});
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
			<form method="POST" className="FormStyle">
				<label htmlFor="name">Name :</label>
				<input id="name" name="name" type="name" onChange={this.handleChange}/>
				<label htmlFor="siret">Siret :</label>
				<input id="siret" name="siret" type="siret" onChange={this.handleChange}/>
				<label htmlFor="email">Email :</label>
				<input id="email" name="email" type="email" onChange={this.handleChange}/>
				<label htmlFor="password">Password :</label>
				<input id="password" name="password" type="password" onChange={this.handleChange}/>
				<label htmlFor="password2">Confirm password :</label>
				<input id="password2" name="password2" type="password" onChange={this.handleChange}/>
				<p>{this.state.errorMessage}</p>
				<button className="FormButton" onClick={this.handleSubmit}>Valider</button>
			</form>
		)
	}
}