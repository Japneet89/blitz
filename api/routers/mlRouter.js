import express from 'express';
const bodyParser = require('body-parser');
const spawnSync = require('child_process').spawnSync;

const router = express.Router();
router.use(bodyParser.json());

const PYTHON_EXE='python';
const PYTHON_SCRIPT='./server/ml/main.py';

router.post('/', (req, res, next) => {
	let executionResult = getScores(req.body.query);
	if(executionResult.error) {
		res.status(500).json(executionResult);
	} else {
		let resultsStr = executionResult.stdout.toString('utf-8');
		if(resultsStr !== "") {
			let re=/\0/g;
			let resultsJSON = JSON.parse(resultsStr.replace(re, ""));
			res.json(resultsJSON);
		} else
			res.json("{}");
	}
});

function getScores(query) {
	return spawnSync(PYTHON_EXE, [PYTHON_SCRIPT], {
		input: query,
		timeout: 2000
	});
}

export { router };