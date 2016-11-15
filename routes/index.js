(function(){
	"user strict";
    var express = require('express');
    var routes = express.Router();

    routes.use('/', express.static('public'));

    routes.get('/', function(req, res){
    	res.render('home');
    		
    }).post('/', function(req, res){
    	res.status(200).send('FUCK YES');
    });

    module.exports = routes;
}());