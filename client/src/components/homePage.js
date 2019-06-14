import React from 'react';

export default class homePage extends React.Component {
	componentWillMount() {
		document.body.style.backgroundImage = "url("+ process.env.PUBLIC_URL +"images/background.jpg)"
	}

	render() {
		return(
			<div id="homePage">
			</div>
			)
	}
}