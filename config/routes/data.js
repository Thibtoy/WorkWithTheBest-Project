module.exports = function(app) {
	const dataController = require('../../controllers/dataController');

	app.route('/dataDistricts')
		.get(dataController.dataDistricts);

	app.route('/dataLocations')
		.get(dataController.dataLocations);

	app.route('/dataActivity')
		.get(dataController.dataActivity)
}