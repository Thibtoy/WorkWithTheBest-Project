import React from 'react';
import API from '../utils/API.js';

export default class Dashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userID : '',
		}
		this.disconnect.bind(this);
	}
	componentWillMount() {
		let user = API.identity();
		this.setState({userID: user.id});
		this.props.pageName('Dashboard');
	}

	disconnect = event => {
		API.logOut();
		window.location = "/login";
	}
	render() {
		return(
			<div className="Dashboard">
				<h1>Dashboard</h1>
				<h2>Bonjour {this.state.userID}</h2>
				<button onClick={this.disconnect}>
					Se Déconnecter
				</button>
			</div>
		)
	}
}