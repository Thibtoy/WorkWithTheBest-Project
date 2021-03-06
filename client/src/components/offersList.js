import React from 'react';
import API from '../utils/API.js';
import {Link} from 'react-router-dom';

export default class OffersList extends React.Component {
	constructor() {
		super();
		this.state = {
			ownerId: '',
			type: '',
			offers: [],
		}
	}
	componentWillMount() {
		this.setState({ownerId: this.props.user.id, type: this.props.user.role}, () => {
			API.offersList(this.state)
				.then(data => {
					let offers = [];
					if (data.data.length) {
					 	offers = data.data.map(function(item, i){
							return (
								<div>{item.title} - startDate: {item.startDate.slice(0,11)} 
								endDate: {item.endDate.slice(0,11)} <Link to={'/offers/'+item.id}>GO</Link></div>
							);
						});
						this.setState({offers});
					}
					else {
						offers.push(
							<div>{data.data.title} - startDate: {data.data.startDate.slice(0,11)} 
							endDate: {data.data.endDate.slice(0,11)} <Link to={'/offers/'+data.data.id}>GO</Link></div>
							)
						this.setState({offers});
					}
				})
				.catch(err => console.log(err));
		});
	}

	render () {
		return(<div>{this.state.offers}</div>);
	}
}