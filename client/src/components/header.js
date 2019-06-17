import React, {Component} from 'react';

import '../styles/header.scss';

export default class Header extends Component {
	constructor() {
		super();
		this.state = {
				header: [],			
		}
	}

	componentDidMount() {
		let path = window.location.pathname;
		let header;
		if (path === '/' || path === '/login' || path === '/register') {
			header = [<header key="1" id="Header"><h1 className="MasterFontSet">WorkWithTheBest</h1></header>];
		}
		else {
			header = [
				<header key="1" id="Header">
					<ul className="headerTop">
						<li id="hamburgerMenu" className="headerLi">M</li>
						<li className="headerLi"><h1 className="MasterFontSet">WorkWithTheBest</h1></li>
						<li id="onOffButton" className="headerLi">O</li>
					</ul>
				</header>
			]
		}
		this.setState({header: header});
	}

	render() {

		return(this.state.header);
	}
}
