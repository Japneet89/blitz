import axios from 'axios';
import { getAccessToken } from './AuthService';

const BACKEND_API_URL = 'http://api.tool4dat.com/api';

function getTools() {
	return axios.get(`${BACKEND_API_URL}/tools`, { 
    headers: { 
      Authorization: `Bearer ${getAccessToken()}` 
    }
  })
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

function putTools(url, name, container, drawer, toolbox) {
  return axios.put(`${BACKEND_API_URL}/tools/` + url, {
    name,
    container,
    drawer,
    toolbox
  },
  { 
    headers: { 
      Authorization: `Bearer ${getAccessToken()}` 
    }
  })
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

function postTools(name, container, drawer, toolbox) {
  return axios.post(`${BACKEND_API_URL}/tools/`, {
    name,
    container,
    drawer,
    toolbox
  },
  { 
    headers: { 
      Authorization: `Bearer ${getAccessToken()}` 
    }
  })
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

function deleteItem(url, id) {
  return axios.delete(`${BACKEND_API_URL}` + url + id, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => console.log('deleted'));
}

function putToolBox(url, name, owner) {
  return axios.put(`${BACKEND_API_URL}/toolboxes/` + url, {
    name,
    owner
  },
  { 
    headers: { 
      Authorization: `Bearer ${getAccessToken()}` 
    }
  })
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

function postToolBox(name, owner) {
  return axios.post(`${BACKEND_API_URL}/toolboxes/`, {
    name,
    owner
  },
  { 
    headers: { 
      Authorization: `Bearer ${getAccessToken()}` 
    }
  })
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

export {getTools, getToolboxes, getDrawers, getContainers, putTools, postTools, deleteItem, putToolBox, postToolBox};




