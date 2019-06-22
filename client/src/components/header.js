import React, {Component} from 'react';
import API from '../utils/API.js'
import '../styles/header.scss';

export default class Header extends Component {
	constructor() {
		super();
		this.state = {
				header: [],
				menu: false,
				pageName: '',
		}
	}

	menuClick = event => {
		let menu = document.getElementById('NavBar');
		if (this.state.menu === false) {
			event.target.classList.add('HeaderButtonActive');
			menu.style.marginTop = '0';
			this.setState({menu:true});
		}
		else {
			event.target.classList.remove('HeaderButtonActive');
			menu.style.marginTop = '-3vh';
			this.setState({menu:false});
		}
	}

	disconnect = event => {
		API.logOut();
		window.location = "/login";
	}

	componentWillMount() {
		let header;
		console.log(this.props);
		let path = window.location.pathname.split('/')[1];
		if(this.tcheckLocation())	header = [<header key="1" id="Header"><h1 className="MasterFontSet">WorkWithTheBest</h1></header>];
		else {
			
			header = [
				<header key="1" id="Header">
					<ul className="headerTop">
						<li id="hamburgerMenu" className="headerLi" onClick={this.menuClick}><img className="HeaderButton" src={process.env.PUBLIC_URL+'/images/hamburger.svg'} alt="ButtonImage"></img></li>
						<li className="headerLi"><h1 className="MasterFontSet">WorkWithTheBest</h1></li>
						<li id="onOffButton" className="headerLi" onClick={this.disconnect}><img className="HeaderButton" src={process.env.PUBLIC_URL+'/images/standby.svg'} alt="ButtonImage"></img></li>
					</ul>
					<nav id="NavBar">
						<ul>
							<li className="headerLi">M</li>
							<li className="headerLi"><h3 className="MasterFontSet">{path}</h3></li>
							<li className="headerLi">O</li>
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
