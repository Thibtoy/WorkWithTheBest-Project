import React from 'react';
import '../styles/offer.scss';

export default class Offer extends React.Component {
	render() {
		const item = this.props.data;
		return(
			<div className="OfferBox">
				<div className="OfferBoxInfos">
					<img className="OfferBoxInfosAvatar" src={process.env.PUBLIC_URL+'/images/building.svg'} alt="Avatar"></img>
					<div className="OfferBoxInfosContent">
						<h5 className="MasterFontSet">{item.title}</h5>
						<p className="ParagrapheFontSet">{item.location}</p>
						<p className="LegendFontSet">start: {item.startDate} - end: {item.endDate}</p>
					</div>
					<div className="OfferBoxInfosOptions"></div>
				</div>
				<div className="OfferBoxMain">
					<div className="OfferBoxMainContent">
						<p className="ParagrapheFontSet">{item.content}</p>
					</div>
				</div>
			</div>
		);
	}
}