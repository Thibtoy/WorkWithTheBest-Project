module.exports = function(app) {
	const fillAppController = require('../../controllers/fillAppController.js');

	app.route('/carrousel')
	   .post(fillAppController.carrousel);

	app.route('/wordResearch')
	   .post(fillAppController.wordResearch);

	app.route('/addOffer')
	   .put(fillAppController.addOffer);
}