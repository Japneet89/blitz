const gstore = require('gstore-node');
const Schema = gstore.Schema;

const toolboxSchema = new Schema({
	name: {
		type: 'string',
		required: true
	},
	owner: {
		type: 'string',
		required: true
	}
});

const model = gstore.model('Toolbox', toolboxSchema);
export { model };