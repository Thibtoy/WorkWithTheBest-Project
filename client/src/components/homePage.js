import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Form.scss';
import '../styles/homePage.scss';

export default class HomePage extends React.Component {
	componentWillMount() {
		document.body.style.backgroundImage = "url("+ process.env.PUBLIC_URL +"images/background.jpg)"
	}

	render() {
		return(
			<div id="HomePage">
				<div className="Form HomeForm">
					<h2 className="FormMasterFontSet">Welcome!</h2>
					<p>You can visit our website without <br/>
					registering, to take an idea of the content,<br/> 
					to fully enjoy the features of WorkWithTheBest:</p>
					<div className="FormButtonContainer">
						<div className="FormButtonRow">
							<Link to='/register'><div className='FormButton'>Register</div></Link>
							<Link to='/login'><div className='FormButton'>Login</div></Link>
						</div>
						<div className="FormButtonRow">
							<div className='FormButton'>Visit</div>
						</div>
					</div>
				</div>
			</div>
			)
	}
}