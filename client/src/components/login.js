import React from 'react';
import API from '../utils/API.js';
import '../styles/Form.scss';
import '../styles/login.scss';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			token: '',
			type: 'users',
		}
		this.handleChange.bind(this);
		this.handleSubmit.bind(this);
	}

	componentWillMount() {
		document.body.style.backgroundImage = "url("+ process.env.PUBLIC_URL +"images/background.jpg)"		
	}

	handleSubmit = event => {
		event.preventDefault();
		let that = this;
		if (this.state.email.length === 0) return;
		if (this.state.password.length === 0) return;
		let promise = new Promise (function(resolve, reject){
						let token = API.setToken({type: that.state.type});
						resolve(token);
					});
		promise.then(token => {
			this.setState({token});
			API.login(this.state).then(function(data){
				localStorage.setItem('token', data.data.token);
				window.location = "/dashboard";
			}, function(error){
				console.log(error);
				return;
			});
		})
		
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	render() {
		return(
			<div id="Login">
			<form method="POST" className="Form FormLogin">
				<div className="FormInputContainer">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                </div>
                <div className="FormButton" onClick={this.handleSubmit}>
                Connexion
                </div>
			</form>
			</div>
		)
	}
}