import express from 'express';
const bodyParser = require('body-parser');
const spawnSync = require('child_process').spawnSync;

const router = express.Router();
router.use(bodyParser.json());

const PYTHON_EXE='python';
const PYTHON_SCRIPT='./api/ml/main.py';

router.post('/', (req, res, next) => {
	let executionResult = getScores(req.body.query);
	//console.log(executionResult);
	//console.log(executionResult.stdout.toString('utf-8'));

	if(executionResult.error) {
		res.status(500).json(executionResult);
	} else {
		let resultsStr = executionResult.stdout.toString('utf-8');
		let re=/\0/g;
		let resultsJSON = JSON.parse(resultsStr.replace(re, ""));
		res.json(resultsJSON);
	}
});

function getScores(query) {
	return spawnSync(PYTHON_EXE, [PYTHON_SCRIPT], {
		input: query,
		timeout: 2000
	});
}

export { router };