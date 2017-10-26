import express from 'express';
import datastore from '@google-cloud/datastore';
import gstore from 'gstore-node';
import { model } from '../models/code';
import { nconf } from '../config';
const bodyParser = require('body-parser');
var request = require('request');

const router = express.Router();
router.use(bodyParser.json());

const ds = datastore({
	  projectId: nconf.get('GCLOUD_PROJECT'),
	  keyFilename: nconf.get('GOOGLE_APPLICATION_CREDENTIALS')
	});
	gstore.connect(ds);


router.post('/', (req, res, next) => {

	//Check for valid invite code in database
	//Configure google cloud datastore
	console.log(req.body.code);
	let query = model.query().filter('code', '=', req.body.code);
	let userId = req.body.userId;
	model.findOne({code: req.body.code})
		.then((entity) => {
			console.log(entity.entityKey.parent.name);
			updateGroup(userId, entity.entityKey.parent.name, res); 
		})
		.catch((error) => {
			console.log("rejection: ", error);
			res.json(error.message);
		})
});

function updateGroup(userId, newGroup, res) {
	//get a code for auth0 management api
	let options = {
		method: 'POST',
		url: 'https://4dat-auth-auth0.com/oauth/token',
		headers: { 'Content-Type': 'application/json'},
		body: 
		{
			grant_type: 'client_credentials',
			client_id: 'RKvWovhBbUP8oOgeNuv4x5wyUM9nqUTa',
			client_secret: 'whcm0BQ-55zS1PJGHX-V5UmPMRmwYIFIZXHGRESvfoLY6RQmilWaa44D2qJxFq0Q',
			audience: 'https://4dat-auth-auth0.com/api/v2/'
		},
		json: true
	};

	request(options, function(error, response, body) {
		console.log("in first request: ", error);
		console.log("in first request response: ", response);
		console.log("in first request body: ", body);
		if(error)
			res.json(error);
		else {
			//now make actual update to users's app_metadatda
			let updateOptions = {
				method: 'PATCH',
				url: '`https://4dat-auth-auth0.com/api/v2/users/${userId}`',
				headers: { 'Content-Type': 'application/json', 'Authorization': '`Bearer ${body.access_token}' },
				body: {
					"app_metadata": {
						"group": newGroup
					}
				}
			};

			request(updateOptions, function(error, response, body) {
				if(error)
					res.json(error);
				else
					res.json(newGroup);
			});
		}
	});
}


export { router };