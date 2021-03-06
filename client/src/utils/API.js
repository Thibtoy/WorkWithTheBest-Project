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

	carrouselContent: function(body){
		return axios.post(path+'/carrousel', body, {headers});
	},

	wordResearch: function(body) {
		return axios.post(path+'/wordResearch', body, {headers});
	},

	addOffer: function(body) {
		return axios.post(path+'/addOffer', body, {headers});
	},

	getOffer: function(body) {
		return axios.post(path+'/getOffer', body, {headers});
	},

	updateOffer: function(body) {
		return axios.put(path+'/updateOffer', body, {headers});
	},

	offersList: function(body) {
		return axios.post(path+'/offers', body, {headers});
	}


}