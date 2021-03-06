import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from '../utils/API.js'
import '../styles/header.scss';


export default class Header extends Component {
	constructor() {
		super();
		this.state = {
				header: [],
				menu: false,
				pageName: '',
				menuImg: process.env.PUBLIC_URL+'/images/hamburger.svg',
				menuImgActive: process.env.PUBLIC_URL+'/images/hamburgerActive.svg', 
		}
	}

	menuClick = event => {
		let menu = document.getElementById('NavBar');
		if (this.state.menu === false) {
			menu.style.marginTop = '0';
			this.setState({menu:true});
		}
		else {
			menu.style.marginTop = '-25px';
			this.setState({menu:false});
		}
	}

	disconnect = event => {
		API.logOut();
		window.location = "/login";
	}

	refresh = event => {
		document.location.reload();
	}

	componentWillMount() {
		let header;
		if(this.tcheckLocation())	header = [<header key="1" id="Header"><h1 className="MasterFontSet">WorkWithTheBest</h1></header>];
		else {
			
			header = [
				<header key="1" id="Header">
					<ul className="headerTop">
						<li id="hamburgerMenu" className="headerTopLi" onClick={this.menuClick}><img className="HeaderButton" src={process.env.PUBLIC_URL+'/images/hamburger.svg'} alt="ButtonImage"></img></li>
						<li className="headerTopLi"><h1 className="MasterFontSet">WorkWithTheBest</h1></li>
						<li id="onOffButton" className="headerTopLi" onClick={this.disconnect}><img className="HeaderButton" src={process.env.PUBLIC_URL+'/images/standby.svg'} alt="ButtonImage"></img></li>
					</ul>
					<nav id="NavBar">
						<ul>
							<li className="headerLi" onClick={this.refresh}><h4><Link className="MasterFontSet" to="/dashboard">Dashboard</Link></h4></li>
							<li className="headerLi" onClick={this.refresh}><h4><Link className="MasterFontSet" to="/newOffer">New Offer</Link></h4></li>
							<li className="headerLi" onClick={this.refresh}><h4><Link className="MasterFontSet" to="/offers">Yours Offers</Link></h4></li>
						</ul>
					</nav>
				</header>
			]
		}
		this.setState({header});
	}

	tcheckLocation() {
		let path = window.location.pathname;
		if (path === '/' || path.match('/register') || path.match('/login') != null) return true;
		else return false;
	}

	render() {
		return(this.state.header);
	}
}
