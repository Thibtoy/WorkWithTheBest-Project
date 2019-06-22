import React from 'react';
import API from '../utils/API.js';
import Carrousel from './carrousel.js';
import '../styles/dashboard.scss';

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
			<div id="Dashboard">
				<Carrousel />
				<h2>Bonjour {this.state.userID}</h2>
				<button id="test" onClick={this.disconnect}>
					Se Déconnecter
				</button>
			</div>
		)
	}
}