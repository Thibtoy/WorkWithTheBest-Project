import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from './config/config.js';

const headers = {'Content-Type': 'application/json'};
const path = 'http://localhost:8000';

export default {
	login: function(email, password){
		return axios.post(path+'/login', {email: email, password: password}, {headers: headers});
	},

	signUp: function(body){
		delete body.password2;
		delete body.filled;
		delete body.errorMessage;
		return axios.post(path+'/signUp', body, {headers: headers});
	},

	isAuth: function(){
		let token = localStorage.getItem('token');
		if (token) {
			return jwt.verify(token, config.SECRET, function(err){
				if (err) return {logged: false};
				else return jwt.verify(token, config.SECRET);
			})
		}
		else return {logged: false};
	},

	setToken: function(data){
		return jwt.sign(data, config.SECRET)
	},

	logOut: function(){
		localStorage.removeItem('token');
	},

	identity: function(){
		let token = localStorage.getItem('token');
		return jwt.verify(token, config.SECRET, function(err, decoded){
			if (err) return {message: 'an error occured'};
			else return decoded.id;
		})
	}
}