const query = require('../models/query');
exports.carrousel = function(req, res) {
	let name = (req.body.type === 'users')? req.body.type+'.firstName, '+req.body.type+'.lastName':req.body.type+'.name';
	let params = {
		fields: 'title, content,'+name+', locations.name AS location, startDate, endDate', 
		table: req.body.type+'Offers', 
		innerJoin: {
			first:{table: req.body.type, on: req.body.type+'.id = '+req.body.type+'Offers.ownerId'},
			second:{table: req.body.type+'OffersToLocation AS ToLoc', on: req.body.type+'Offers.id = ToLoc.offerId'},
			third:{table: 'locations', on: 'ToLoc.locationId = locations.id'}
		},
		where:{active: 1},
		orderBy: {field: req.body.type+'Offers.Id', order: 'DESC'},
		limit: 5,
	};
	
	query.find(params, function(err, data){
		if(err) {
			console.log(err);
			res.status(200).json(err);
		}
		else {
			res.status(200).json(data);
		}
	})
}

exports.wordResearch = function(req, res) {
	let fields = (req.body.table === 'locations')? 'id, name, code' : 'id, name';
	let params = {
		fields: fields,
		table: req.body.table,
		where: {
			like: {
				name: req.body.word.split(' '),
			},
		},
		limit: 5,
	}

	query.find(params, function(err, data){
		if(err) {
			console.log(err);
			res.status(400).json(err);
		}
		else {
			console.log(data);
			res.status(200).json(data);
		}
	})
}

exports.addOffer= function(req, res) {
	let params = {
		table: req.body.role+'Offers',
		fields: {
			title: req.body.title,
			content: req.body.content,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			ownerId: req.body.ownerId,
		}
	}
	query.test(params)
		 .then(data => {
		 	let promises = [];
		 	req.body.locationsList.forEach(function(item){
		 		if (item){
		 			let params = {
		 				table: req.body.role+'OffersToLocation',
		 				fields: {
		 					offerId: data,
		 					locationId: item,
		 				}
		 			}
		 			let promise = new Promise(function(resolve, reject){
		 				query.test(params)
		 					 .then(data => {resolve(true)})
		 					 .catch(err => {reject(err)})
		 			})
		 			promises.push(promise);
		 		}
		 	})
		 	req.body.activityList.forEach(function(item){
		 		if (item) {
		 			let params = {
		 				table: req.body.role+'OffersToActivity',
		 				fields: {
		 					offerId: data,
		 					activityId: item,
		 				}
		 			}
		 			let promise = new Promise(function(resolve, reject){
		 				query.test(params)
		 					 .then(data => {resolve(true)})
		 					 .catch(err => {reject(err)})
		 			})
		 			promises.push(promise);
		 		}
		 	})
		 	Promise.all(promises)
		 		.then(data => {
		 			console.log(data);
		 			res.status(201).json('created');
		 		})
		 		.catch(err => {
		 			console.log(err);
		 			res.status(400).json(err);
		 		})
		 })
}