const gstore = require('gstore-node');
const Schema = gstore.Schema;

const codeSchema = new Schema({
	code: {
		type: 'string',
		required: true
	},
	owner: {
		type: 'string',
		required: false
	}
});

const model = gstore.model('Code', codeSchema);
export { model };