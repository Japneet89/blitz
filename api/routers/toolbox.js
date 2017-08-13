import express from 'express';
import gStoreApi from 'gstore-api';
import { model } from '../models/toolbox';
import { checkGroupId } from '../middlewares';

const router = express.Router();
const apiBuilder = gStoreApi().express(router);
const api = apiBuilder.create(model, {
	operations: {
		list: { middleware: checkGroupId },
		get : { middleware: checkGroupId },
		create: { middleware: checkGroupId },
		updatePatch : { exec: false },
		updateReplace: { exec: true , middleware: checkGroupId },
		delete: { exec: true, middleware: checkGroupId } 
	},
	ancestors: 'Group'
});

export { api };