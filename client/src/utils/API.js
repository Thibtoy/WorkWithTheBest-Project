import axios from 'axios';

const headers = {'Content-Type': 'application/json'};
const path = 'http://localhost:8000';

export default {
	login: function(body){
		return axios.post(path+'/login', body, {headers: headers});
	},

	signUp: function(body){
		delete body.password2;
		delete body.filled;
		delete body.errorMessage;
		return axios.post(path+'/signUp', body, {headers: headers});
	},

	isAuth: function(){
			let token = localStorage.getItem('token');
			return axios.post(path+'/authenticated', {token}, {headers: headers})
	},

	logOut: function(){
		localStorage.removeItem('token');
	},

	// identity: function(){
	// 	let token = localStorage.getItem('token');
	// 	return jwt.verify(token, config.SECRET, function(err, decoded){
	// 		if (err) return {message: 'an error occured'};
	// 		else return decoded;
	// 	})
	// },

	carrouselContent: function(body){
		return axios.post(path+'/carrousel', body, {headers});
	}
}