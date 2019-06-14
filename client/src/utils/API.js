import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from './config/config.js';

const headers = {'Content-Type': 'application/json'};
const path = 'http://localhost:8000';

export default {
	login: function(email, password){
		return axios.post(path+'/login', {email: email, password: password}, {headers: headers});
	},

	signUp: function(email, password, password2){
		return axios.post(path+'/signUp', {email: email, password: password, password2: password2}, {headers: headers});
	},

	isAuth: function(){
		let token = localStorage.getItem('token');
		if (token) {
			return jwt.verify(token, config.SECRET, function(err){
				if (err) return {logged: false};
				else return jwt.verify(token, config.SECRET);
			})
			//return {logged: false}; 
		}
		else return {logged: false};
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