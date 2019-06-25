import React from 'react';
import Carrousel from './carrousel.js';
import '../styles/dashboard.scss';

export default class Dashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userID : '',
		}
	}

	render() {
		return(
			<div id="Dashboard">
				<Carrousel />
				<div id="DashboardOffersBoard">
					<img className="DashboardFilterIcon" src={process.env.PUBLIC_URL+'/images/filter.svg'} alt="FilterImage"></img>
				</div>
			</div>
		)
	}
}