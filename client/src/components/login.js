import React from 'react';
import API from '../utils/API.js';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
		this.handleChange.bind(this);
		this.handleSubmit.bind(this);
	}

	componentWillMount() {
		document.body.style.backgroundImage = "url("+ process.env.PUBLIC_URL +"images/background.jpg)"		
	}

	handleSubmit = event => {
		event.preventDefault();
		if (this.state.email.length === 0) return;
		if (this.state.password.length === 0) return;
		API.login(this.state.email, this.state.password).then(function(data){
			localStorage.setItem('token', data.data.token);
			window.location = "/dashboard";
		}, function(error){
			console.log(error);
			return;
		});
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	render() {
		return(
			<form method="POST" className="Login">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>
                Connexion
                </button>
			</form>
		)
	}
}