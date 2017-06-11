import axios from 'axios';
import { getAccessToken } from './AuthService';

const BACKEND_API_URL = 'http://api.tool4dat.com/api';

function getTools() {
	return axios.get(`${BACKEND_API_URL}/tools`, { headers: { Authorization: `Bearer ${getAccessToken()}` }})
		.then(response => response.data.items)
		.catch(error => console.log(error));
}

function getToolboxes() {
	return axios.get(`${BACKEND_API_URL}/toolboxes`, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data.items);
}

function getDrawers() {
	return axios.get(`${BACKEND_API_URL}/drawers`, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data.items);
}

function getContainers() {
	return axios.get(`${BACKEND_API_URL}/containers`, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data.items);
}

export {getTools, getToolboxes, getDrawers, getContainers};