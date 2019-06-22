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
	}
	componentWillMount() {
		let user = API.identity();
		this.setState({userID: user.id});
		this.props.pageName('Dashboard');
	}

	render() {
		return(
			<div id="Dashboard">
				<Carrousel />
				<div id="DashboardOffersBoard">
					<img className="DashboardFilterIcon" src={process.env.PUBLIC_URL+'/images/filter.svg'} alt="FilterImage"></img>
					<p>coucou</p>
				</div>
			</div>
		)
	}
}