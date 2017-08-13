const gstore = require('gstore-node');
const Schema = gstore.Schema;

const groupSchema = new Schema({
	owner: {
		type: 'string',
		required: true
	}
});

const model = gstore.model('Group', groupSchema);
export { model };