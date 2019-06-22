import React from 'react';
import '../styles/carrousel.scss';
import API from '../utils/API.js';

export default class Carrousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			offers: [],
			workin: true,
		}
		this.carrouselAction.bind(this);
	}

	componentWillMount() {
		let that = this;
		API.carrouselContent().then(data => {
			let offers = data.data.map(function(item, i){
				item.startDate = item.startDate.slice(0, 10)+" "+item.startDate.slice(11, 19);
				item.endDate = item.endDate.slice(0, 10)+" "+item.endDate.slice(11, 19);
				return(
					<div key={i} className="CarrouselBox">
						<div className="CarrouselBoxInfosLine">
							<div className="CarrouselBoxAvatar"></div>
							<div className="CarrouselBoxOfferInfos">
								<p className="CarrouselBoxProfileName MasterFontSet">{item.title}</p>
								<p className="CarrouselBoxOfferLocation"></p>
								<p className="CarrouselBoxOfferPeriod">start: {item.startDate} - end: {item.endDate}</p>
							</div>
						</div>
						<div className="CarrouselBoxContent">
							<p className="CarrouselBoxOfferContent">{item.content}</p>
						</div>
					</div>
				)
			});
			that.setState({offers});
		});
	}

	componentDidUpdate() {
		let boxes = document.getElementById('CarrouselShow').childNodes
		let half = (Math.round(boxes.length/2))-1;
		if (boxes[half]) boxes[half].classList.add('CarrouselMajorScale'); 	
	}

	waitForCarrousel = (carrousel, length) => {
		return new Promise(resolve => {
			setTimeout( () => {
				if (length) {
					carrousel.childNodes[length-1].classList.remove('CarrouselRightMove');
					carrousel.insertBefore(carrousel.childNodes[length-1], carrousel.childNodes[0]);
				}
				else {
					carrousel.childNodes[0].classList.remove('CarrouselLeftMove');
					carrousel.appendChild(carrousel.childNodes[0]);
				}
				this.setState({workin:true});
				resolve(true);
			}, 300);
		})
	}

	carrouselAction = (e) => {
		let move = e.target.id;
		let system = async function(that, move) {
			let carrousel = document.getElementById('CarrouselShow');
			let length = carrousel.childNodes.length;
			let half = (Math.round(length/2))-1;
			if (move === 'Left') {
					carrousel.childNodes[0].classList.add('CarrouselLeftMove');
					carrousel.childNodes[half].classList.remove('CarrouselMajorScale');
					carrousel.childNodes[half+1].classList.add('CarrouselMajorScale');
					await that.waitForCarrousel(carrousel);
				}
				else {
					carrousel.childNodes[length-1].classList.add('CarrouselRightMove');
					carrousel.childNodes[half].classList.remove('CarrouselMajorScale');
					carrousel.childNodes[half-1].classList.add('CarrouselMajorScale');
					await that.waitForCarrousel(carrousel, length)
				}
		}
		if (this.state.workin) {
			this.setState({workin:false}, () => {system(this, move)})
			} else return;
	}

	render() {
		return(
			<div className="Carrousel">
				<h4 className="SecondFontSet">Lasts Offers</h4>
				<div className="CarrouselShowLine">
					<div id="LeftSide" className="CarrouselShowSide">
						<img id="Left" className="CarrouselArrow" src={process.env.PUBLIC_URL+'/images/left-chevron.svg'} alt="ArrowImage" onClick={this.carrouselAction}></img>
					</div>
					<div id="CarrouselShow">
						{this.state.offers}
					</div>
					<div className="CarrouselShowSide">
						<img id="RightArrow" className="CarrouselArrow" src={process.env.PUBLIC_URL+'/images/right-chevron.svg'} alt="ArrowImage" onClick={this.carrouselAction}></img>
					</div>
				</div>
			</div>
			);
	}
}