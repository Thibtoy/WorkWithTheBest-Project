import React from 'react';
import '../styles/newOffer.scss';
import API from '../utils/API.js';


export default class NewOffer extends React.Component {
	constructor() {
		super();
		this.state = {
			role: '',
			title: '',
			content: '',
			startDate: '',
			endDate: '',
			ownerId: '',
			locations: [],
			selectedLocations: [],
			locationsList: [],
			activity: [],
			selectedActivity: [],
			activityList: [],
		}
	}

		handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

		onSearch = event => {
			let that = this;
			let table = event.target.name;
			if (event.target.value.length > 0) {
			API.wordResearch({table: table, word: event.target.value})
			.then(data => {
				if(!data.data.length) {
					let response = <p key="1" value={data.data.id} name={table} onClick={that.onSelect}>{data.data.name} ({data.data.code})</p>;
					this.setState({[table]: response});
				}
				else {
					let response = data.data.map(function(item, i){
						return(<p key={i} value={item.id} name={table} onClick={that.onSelect}>{item.name} ({item.code})</p>);
					});
					this.setState({[table]: response});
				}
			});
			}
			else this.setState({[table]: []});
		}

		onSelect = event => {
			let name = event.target.getAttribute('name');
			let list = this.state['selected'+name.charAt(0).toUpperCase() + name.slice(1)];
			let inner = event.target.innerHTML.split(' ');
			let selectedBox = <p key={event.target.getAttribute('value')} value={event.target.getAttribute('value')} name={name} onClick={this.onDelete}>{inner[0] + ' ' + inner[1].slice(0, 3)})</p>
			list[event.target.getAttribute('value')] = selectedBox;
			this.setState({[name]: list}, () => {this.setState({[name]: []})});
		}

		onDelete = event => {
			let name = event.target.getAttribute('name');
			let list = this.state['selected'+name.charAt(0).toUpperCase() + name.slice(1)];
			delete list[event.target.getAttribute('value')];
			this.setState({['selected'+name.charAt(0).toUpperCase() + name.slice(1)]: list});
		}

		handleSubmit = event => {
			delete this.state.locations;
			delete this.state.activity;
			let selectedLocations = this.state.selectedLocations.map(function(item){
			if (item.key) return item.key;
			else return null;
			})
			let selectedActivity = this.state.selectedActivity.map(function(item){
			if (item.key) return item.key;
			else return null;
			})
			this.setState({locationsList: selectedLocations, activityList: selectedActivity}, () => {
				delete this.state.selectedLocations;
				delete this.state.selectedActivity;
				API.addOffer(this.state).then(data => {console.log(data)});
			})
		}

		componentDidMount() {
			this.setState({ownerId: this.props.user.id, role: this.props.user.role});
		}

		render() {
		return(
			<div id="NewOffer">
				<form method="POST" className="Form FormNewOffer"  autoComplete="off">
					<h3 className="FormMasterFontSet">New Offer</h3>
					<div className="FormRowContainer">
						<div className="FormInputContainer">
							<div className="FormGroupLabel">
                				<label htmlFor="title">Title</label>
                				<input className="FormInput" name="title" type="title" value={this.state.title} onChange={this.handleChange}/>
                			</div>
                			<div className="FormGroupLabel">
                				<label htmlFor="content">Content</label>
                				<textarea className="FormTextArea" name="content" type="text" value={this.state.content} onChange={this.handleChange}/>
                			</div>
                			<div className="FormGroupLabel">
                				<label htmlFor="startDate">Start Date:</label>
                				<input className="FormInput" name="startDate" type="date" value={this.state.startDate} onChange={this.handleChange}/>
                			</div>
                			<div className="FormGroupLabel">	
                				<label htmlFor="endDate">End Date:</label>
                				<input className="FormInput" name="endDate" type="date" value={this.state.endDate} onChange={this.handleChange}/>
                			</div>
                		</div>
                		<div className="FormInputContainer">
                			<div className="FormGroupLabel">
                				<label htmlFor="research" type="text">Location</label>
                				<div className="FormSearchBox">
                					<input className="FormInput" name="locations" type="text" placeholder="Search a location" onChange={this.onSearch} />
                					<div id="locationList" className="FormDropDownList" name="locationList">{this.state.locations}</div>
               					</div>
               					<div id="Location" className="FormListSelection">{this.state.selectedLocations}</ div>
                			</div>
                			<div className="FormGroupLabel">
                				<label htmlFor="research" type="text">Activity</label>
                				<div className="FormSearchBox">
                					<input className="FormInput" name="activity" type="text" placeholder="Search an activity" onChange={this.onSearch} />
                					<div id="activityList" className="FormDropDownList" name="activityList">{this.state.activity}</div>
               					</div>
               					<div id="Activity" className="FormListSelection">{this.state.selectedActivity}</ div>
                			</div>
                		</div>
                	</div>
                	<div className="FormButton" onClick={this.handleSubmit}>Add Offer</div>
				</form>
			</div>
		)
	}
}