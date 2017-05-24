/*================================================================

	actions/about.js - grabs the abount content from contentful
	
================================================================ */

import axios from 'axios';

export const FETCH_TOOLS = 'FETCH_TOOLS';

export function fetchTools() {
  const request = axios.get('http://104.154.162.68:8080/api/tools');
  return {
    type: FETCH_TOOLS,
    payload: request
  };
}