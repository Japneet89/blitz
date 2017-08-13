const gstore = require('gstore-node');
const Schema = gstore.Schema;

const toolSchema = new Schema({
	name: {
		type: 'string',
		required: true
	},
	quantity: {
		type: 'int',
		required: true
	},
	attributes: {
		type: 'object',
		required: false
	},
	builtin: {
		type: 'boolean',
		required: true,
		default: false
	},
	drawer: {
		type: 'object',
		required: false
	},
	container: {
		type: 'object',
		required: false
	}
});

const model = gstore.model('Tool', toolSchema);
export { model };