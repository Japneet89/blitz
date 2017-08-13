const gstore = require('gstore-node');
const Schema = gstore.Schema;

const containerSchema = new Schema({
	name: {
		type: 'string',
		required: true
	},
	owner: {
		type: 'string',
		required: true
	},
	drawer: {
		type: 'object',
		required: true
	}
});

const model = gstore.model('Container', containerSchema);
export { model };