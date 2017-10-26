import express from 'express';
import gStoreApi from 'gstore-api';
import { model } from '../models/code';
import { checkGroupId } from '../middlewares';

const router = express.Router();
const apiBuilder = gStoreApi().express(router);
const api = apiBuilder.create(model, {
	operations: {
		list: { exec: false },
		get : { exec: false },
		create: { middleware: checkGroupId },
		updatePatch : { exec: false },
		updateReplace: { exec: false, middleware: checkGroupId },
		delete: { exec: false , middleware: checkGroupId} 
	},
	ancestors: 'Group'
});

export { api };