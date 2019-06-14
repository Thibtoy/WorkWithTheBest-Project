module.exports = function(app) {
	const userController = require('../../controllers/userController');

	app.route('/signUp')
		.post(userController.signUp);

	app.route('/login')
		.post(userController.login);
}