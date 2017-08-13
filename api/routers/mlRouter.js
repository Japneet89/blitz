import express from 'express';
const bodyParser = require('body-parser');
const spawnSync = require('child_process').spawnSync;

const router = express.Router();
router.use(bodyParser.json());

const PYTHON_EXE='python';
const PYTHON_SCRIPT='../ml/main.py';

router.post('/', (req, res, next) => {
	let executionResult = getScores(req.body.query);
	console.log(executionResult.error);
	console.log(executionResult.stderr.toString('utf-8'));

	if(executionResult.error) {
		res.status(500).json(executionResult);
	} else {
		res.json(executionResult.stdout);
	}
});

function getScores(query) {
	return spawnSync(PYTHON_EXE, [PYTHON_SCRIPT], {
		input: query,
		timeout: 2000
	});
}

export { router };