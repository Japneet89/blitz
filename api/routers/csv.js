import express from 'express';
var csv = require('csv-express');
import { model } from '../models/tool';
import { checkGroupId } from '../middlewares';

const router = express.Router();
const headers = {
	'Content-disposition': 'attachment; filename=tools.csv',
	'Content-Type': 'text/csv'
};

router.get('/export', (req, res, next) => {

	return model.list()
		.then((response) => {
			let tools = response.entities.map((item) => {
				let name = item.name;
				let quantity = item.quantity;
				let toolbox, drawer, container, part_no;
				if(item.container !== null && item.container !== undefined) {
					toolbox = item.container.drawer.toolbox.name;
					drawer = item.container.drawer.name;
					container = item.container.name;
				} else {
					toolbox = item.drawer.toolbox.name;
					drawer = item.drawer.name;
					container = '';
				}
				item.attributes.forEach((attr) => {
					if(attr.key === 'Part Number')
						part_no = attr.value;
				});

				return {
					'Toolbox': toolbox,
					'Drawer': drawer,
					'Container': container,
					'Tool Nomenclature': name,
					'Part Number': part_no,
					'Qty': quantity
				};

			});

			res.csv(tools, true, headers, 200)
		})
		.catch((err) => {
			res.json(err).status(500);
		});
}); 

export { router };