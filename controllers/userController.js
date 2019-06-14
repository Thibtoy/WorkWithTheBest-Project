//const Users = require('../models/userModel');
//const {User} = require('../models/sequelize');
const pH = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const query = require('../models/query.js');


exports.signUp = function(req, res) {
	if (req.body.email && req.body.password && req.body.password2) {
		if (req.body.password === req.body.password2) {
			let params = {fields: 'id', table: 'users', where:{email: req.body.email}};
			query.find(params, function(err, user){
				if (err) res.status(400).json(err);
				else if(!user) {
					let params = {table: 'users', fields:{email: req.body.email, password: pH.generate(req.body.password)}};
 					query.create(params, function(err, data){
 						if (err) res.status(400).json(err);
 						else res.status(201).json({created: true, message:data});
 					});
 				}
 				else res.status(200).json({created: false, message: "This user already exists"});
			});
		}else res.status(200).json({created: false, message: "Passwords doesn't match"});
	}else res.status(200).json({created: false, message: "All inputs must be filled"});
}

exports.login = function(req, res) {
	if (req.body.email && req.body.password) {
		let params = {fields: 'email, password', table: 'users', where:{email: req.body.email}};
		query.find(params, function(err, user){
			if (err) res.status(400).json(err);
			else if (!user) res.status(200).json({message: 'This user does not exists'});
			else if (pH.verify(req.body.password, user.password)) {
				let token = jwt.sign({logged: true, id: user.id}, config.SECRET);
				res.status(200).json({authenticate: true, token: token, message: 'Successfully connected'});
			}
			else res.status(200).json({authenticate: false, message: 'Incorrect password'});
		});
	}else res.status(200).json({authenticate: false, message: 'All inputs must be filled'});
}

//signUp Mongo's Method:

//, function(err, user){
// 				if (err) res.status(400).json(err);
// 				if (!user) {
// 					User.create({email: req.body.email, password: pH.generate(req.body.password)}, function(err, user){
// 						if(err) res.status(400).json(err);
// 						else res.status(201).json({created: true, message:"enregistrement réussi", user:user});
// 					});
// 				}else res.status(200).json({created: false, message:"un compte existe déjà pour cet email"});
// 			});
// 		}else res.status(200).json({created: false, message: "Le deuxième password ne correspond pas"});
// 	}else res.status(200).json({created: false, message: "Vous devez renseignertous les champs pour vous inscrire"});
// }

//login Mongo's Method:

	// 	Users.findOne({email: req.body.email}, function(err, user){
	// 		if (err) res.status(400).json(err);
	// 		else if (user == null) res.status(200).json({authenticate: false, message: 'l\'utilisateur n\existes pas'});
	// 		else if (user.authenticate(req.body.password)) {
	// 			res.status(200).json({authenticate: true, token: user.getToken(), message: 'vous êtes connectés'})
	// 		}else res.status(200).json({authenticate: false, message: 'le password est incorrect'});
	// 	});

//SignUp sequelize's Method:

	// User.findOne({where: {email: req.body.email}}).then(user => {
 // 				if(user === null) {
 // 					User.create({email: req.body.email, password: pH.generate(req.body.password)})
 // 						.then(user => {res.status(201).json({created: true, user: user});}, err => {res.status(400).json(err);});
 // 				}
 // 				else {
 // 					let params = {fields: 'id, email, password', table: 'users', where:{email: req.body.email}};
 // 					query.find(params, function(data){res.status(200).json({created: false, message: "This user already exists coucou", user: data})});
 // 				}
 // 			}, err => {res.status(400).json(err);});

 //Login sequelize's Method:

	// User.findOne({where: {email: req.body.email}}).then(user => {
	// 		if (user === null) res.status(200).json({message: 'This user does not exists'});
	// 		else if (pH.verify(req.body.password, user.password)) {
	// 			let token = jwt.sign({logged: true, id: user.id}, config.SECRET);
	// 			res.status(200).json({authenticate: true, token: token, message: 'Successfully connected'});
	// 		}
	// 		else res.status(200).json({authenticate: false, message: 'Incorrect password'});
	// 	}, err => {res.status(400).json(err);}); 	