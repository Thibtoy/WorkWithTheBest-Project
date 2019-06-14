module.exports = function(app) {
	const homeController = require("../../controllers/homeController");

	app.route('/')
		.get(homeController.home);
}