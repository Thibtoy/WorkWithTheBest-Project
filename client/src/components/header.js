import React, {Component} from 'react';

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
			menu.style.transform = 'translateY(3vh)';
			this.setState({menu:true});
		}
		else {
			menu.style.transform = 'translateY(0vh)';
			this.setState({menu:false});
		}
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
						<li id="hamburgerMenu" className="headerLi" onClick={this.menuClick}>M</li>
						<li className="headerLi"><h1 className="MasterFontSet">WorkWithTheBest</h1></li>
						<li id="onOffButton" className="headerLi">O</li>
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
