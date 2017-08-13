import decode from 'jwt-decode';
import { model } from './models/group';

function checkGroupId(req, res, next) {
	let groupIdFromToken = decode(req.headers.authorization)['http://api.tool4dat.com/group'];
	let groupIdFromRequest = req.params.anc0ID;
	if(groupIdFromToken === groupIdFromRequest)
		next();
	else
		res.status(401).json({message: "Unauthorized group id"});
}

export { checkGroupId };