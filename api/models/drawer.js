const gstore = require('gstore-node');
const Schema = gstore.Schema;

const drawerSchema = new Schema({
	name: {
		type: 'string',
		required: true
	},
	owner: {
		type: 'string',
		required: true
	},
	toolbox: {
		type: 'object',
		required: true	
	}
});

const model = gstore.model('Drawer', drawerSchema);
export { model };