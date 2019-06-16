const query = require('../models/query');
const axios = require('axios');
const convert = require('xml-js');

exports.dataDistricts = function(req, res) {
	axios.get('https://geo.api.gouv.fr/departements').then(response => {
		let data = [];
		let promises = [];

		response.data.forEach(function(item){
			let dpt = {name: item.nom, code: item.code};
			data.push(dpt);
		});

		data.forEach(function(item, i){
			promises.push(	
				new Promise(function(resolve, reject) {query.test({table: 'districts', fields: item})
					.then((success) => {resolve(success)})
					.catch(err => {reject(err);})
				})
			);
		});

		Promise.all(promises)
		.then(success => {
			res.status(201).send('all good');
		}).catch(err => {
			console.log(err);
			res.status(200).send('an error occurs, tcheck your terminal to find out what appends')
		});
	});
}

exports.dataLocations = function(req, res) {
	let params = {fields: 'code, id', table: 'districts'}
	query.find(params, function(err, datas) {
		if(err) console.log(err);
		else {
			let promises = [];
			datas.forEach(function(data){
				promises.push(
					new Promise(function(resolve, reject){
						axios.get('https://geo.api.gouv.fr/departements/'+data.code+'/communes').then(response => {
							response.data.forEach(function(item){
								let location = {
									name: item.nom,
									code: item.codesPostaux,
									districtId: data.id
								}
								query.test({table: 'locations', fields: location})
									.then(success => {resolve(success)})
									.catch(err => {reject(err)});
							}); 
						});
					})
				);
			});
			Promise.all(promises)
				.then(success => {
					res.status(201).send('all good');
				})
				.catch(err => {
					console.log(err);
					res.status(200).send('an error occurs, tcheck your terminal to find out what appends');
				})
		}
	});
}

exports.dataActivity = function(req, res) {
	let fs = require('fs');
	let xml = fs.readdirSync('./data/fichesMetiers');
	let promises = [];
	xml.forEach(function(item) {
		promises.push(
			new Promise(function(resolve, reject){
				let toTreat = fs.readFileSync('./data/fichesMetiers/'+item, 'utf-8');
				let result = convert.xml2json(toTreat, {compact:true, space:4});
				let data = JSON.parse(result);
				let activityTitle = {name: data['fiche_emploi_metier']['bloc_code_rome']['intitule']['_text']};
				query.test({table: 'activityTitle', fields: activityTitle})
					.then(success => {
						let promises2 = [];
						for (item in data['fiche_emploi_metier']['bloc_appellation']['item_app']) {
							promises2.push(
								new Promise(function(resolve, reject) {
									if (!data['fiche_emploi_metier']['bloc_appellation']['item_app'][item]['libelle']) {
										if (item === 'libelle') {
											let activity = {name: data['fiche_emploi_metier']['bloc_appellation']['item_app'][item], activityTitleId: success};
		 									query.test({table: 'activity', fields: activity})
		 										.then(success => {resolve(true)})
		 										.catch(err => {reject(err)});
										}
										else resolve(true);
									}
									else {
										let activity = {name: data['fiche_emploi_metier']['bloc_appellation']['item_app'][item]['libelle']['_text'], activityTitleId: success};
		 								query.test({table: 'activity', fields: activity})
		 									.then(success => {resolve(true)})
		 									.catch(err => {reject(err)});
		 							}
		 						})
		 					);
		 				}
		 				Promise.all(promises2)
		 					.then(success => {resolve(success)})
		 					.catch(err => {reject(err)});
		 			})
					.catch(err => {reject(err)})
			})
		);
	});
	Promise.all(promises)
		.then(results => {res.status(200).json('all good')})
		.catch(err => {
			console.log(err);
			res.status(200).send('error');
		});
}