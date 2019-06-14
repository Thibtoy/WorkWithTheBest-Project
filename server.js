//Modules utilisés
const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//mongoose.connect('mongodb://localhost/WWTBDb', {useCreateIndex: true, useNewUrlParser: true});

//On définit express dans notre constante "app"
const app = express();

//On prépare le body parser
const urlencoded = bodyParser.urlencoded({extended:true});

app.use(urlencoded);
app.use(bodyParser.json());

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, Options, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

//On définit la route de base
const homeRoute = require('./config/routes/home');
	  homeRoute(app);

const userRoute = require('./config/routes/user');
	  userRoute(app);

const dataRoute = require('./config/routes/data');
	  dataRoute(app);
//Mise en place du port d'écoute

app.listen(8000, () => console.log('Listening on port 8000'));