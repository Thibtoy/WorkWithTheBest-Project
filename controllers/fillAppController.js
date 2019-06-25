const query = require('../models/query');
exports.carrousel = function(req, res) {
	let name = (req.body.type === 'users')? req.body.type+'.firstName, '+req.body.type+'.lastName':req.body.type+'.name AS companyName';
	let params = {
		fields: 'title, content,'+name+', locations.name AS location, startDate, endDate', 
		table: req.body.type+'Offers', 
		innerJoin: {
			first:{table: req.body.type, on: req.body.type+'.id = '+req.body.type+'Offers.ownerId'},
			second:{table: req.body.type+'OffersToLocation AS ToLoc', on: req.body.type+'Offers.id = ToLoc.offerId'},
			third:{table: 'locations', on: 'ToLoc.locationId = locations.id'}
		},
		where:{active: 1}
	};
	console.log(req)
	
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