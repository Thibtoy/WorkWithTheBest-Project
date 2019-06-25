module.exports = function(app) {
	const fillAppController = require('../../controllers/fillAppController.js');

	app.route('/carrousel')
	   .post(fillAppController.carrousel);
}