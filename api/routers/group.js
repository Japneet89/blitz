import express from 'express';
import gStoreApi from 'gstore-api';
import { model } from '../models/group';
import { checkGroupId } from '../middlewares';

const router = express.Router();
const apiBuilder = gStoreApi().express(router);
const api = apiBuilder.create(model, {
	operations: {
		list: { exec: false },
		get : { exec: true, middleware: checkGroupId },
		create: { exec: true },
		updatePatch : { exec: false },
		updateReplace: { exec: false, middleware: checkGroupId },
		delete: { exec: false, middleware: checkGroupId } 
	}
});

export { api };