import axios from 'axios';
import { getAccessToken, getGroupId, getOwner } from './AuthService';

const BACKEND=`api/v1/groups/${getGroupId()}`;

/////////////////////////////////
//// GROUPS ////////////////////
///////////////////////////////

//TODO: not sure if these are needed
function getGroupName(id) {
	return makeRequest('group', 'get', {id: id});
}

function updateGroupName(group) {
	return makeRequest('group', 'put', {data: group});
}

/////////////////////////////////
//// PUBLIC FUNCS ////////////////////
///////////////////////////////

function listAll(resource) {
	return makeRequest(resource, 'get');
}

function getById(resource, id) {
	return makeRequest(resource, 'get', {id:id});	
}

function create(resource, entity) {
	entity.owner = getOwner();
	return makeRequest(resource, 'post', {data:entity});
}

function update(resource, entity, id) {
	return makeRequest(resource, 'put', {id:id, data:entity});
}

function deleteById(resource, id) {
	return makeRequest(resource, 'delete', {id:id});	
}

function getRecommendations(query) {
	return makeRequest('ml', 'post', {data: {query: query}});
}

/////////////////////////////////
//// UTILS ////////////////////
///////////////////////////////

function makeRequest(resource, method, options={}) {
	let url = makeUrl(resource, options);
	let data = (options.data === undefined) ? {} : JSON.stringify(options.data);
	
	return axios({
		method,
		url,
		headers: {
			'Authorization': `Bearer ${getAccessToken()}`,
			'Content-Type': 'application/json'
		},
		data: data
	})
	.then(response => response.data)
	.catch(error => error );
}

function makeUrl(resource, options={}) {
	let url = (options.id === undefined) ? `${BACKEND}/${resource}` : `${BACKEND}/${resource}/${options.id}`;
	return url
}


export { getGroupName, 
		updateGroupName,
		listAll,
		getById,
		create,
		update,
		deleteById,
		getRecommendations
};