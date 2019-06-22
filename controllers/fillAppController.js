const query = require('../models/query');
exports.carrousel = function(req, res) {
	let params = {fields: 'id, title, content, startDate, endDate, DATE_FORMAT(startDate, "%Y %m %d"), DATE_FORMAT(endDate, "%Y %m %d/%H:%i")', table: 'companiesOffers', where:{active: 1}};
	query.find(params, function(err, data){
		if(err) res.status(200).json(err);
		else {
			console.log(data);
			res.status(200).json(data);
		}
	})
}