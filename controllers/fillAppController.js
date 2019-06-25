const query = require('../models/query');
exports.carrousel = function(req, res) {
	let params = {
		fields: 'title, content, companies.name AS companyName, locations.name AS location, startDate, endDate', 
		table: 'companiesOffers', 
		innerJoin: {
			first:{table: 'companies', on: 'companies.id = companiesOffers.companyId'},
			second:{table: 'companiesOffersToLocation AS COTL', on: 'companiesOffers.id = COTL.offerId'},
			third:{table: 'locations', on: 'COTL.locationId = locations.id'}
		},
		where:{active: 1}
	};
	
	query.find(params, function(err, data){
		if(err) {
			console.log(err);
			res.status(200).json(err);
		}
		else {
			console.log(data);
			res.status(200).json(data);
		}
	})
}