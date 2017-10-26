import decode from 'jwt-decode';
import { browserHistory } from 'react-router';
import auth0 from 'auth0-js';
import axios from 'axios';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const OWNER_KEY = 'owner';
const GROUP_KEY = 'group';

const CLIENT_ID = 'DANqL2VonWecYF5OZYFrPcm8n99t6hOm';
const CLIENT_DOMAIN = '4dat-auth.auth0.com';
const REDIRECT = 'http://35.202.38.68/callback';
//const REDIRECT = 'http://localhost:3000/callback';
const SCOPE = 'full_api_access openid profile';
const AUDIENCE = 'api.tool4dat.com';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  clearOwner();
  clearGroupId();
  browserHistory.push('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getGroupId() {
  if(isLoggedIn()) {
    let groupId = localStorage.getItem(GROUP_KEY);
    if(groupId === null)
      return decode(getAccessToken())['http://api.tool4dat.com/group'];
    else
      return groupId;
  }
}

export function setGroupId(groupId=null) {
  if(groupId === null)
    localStorage.setItem(GROUP_KEY, getGroupId());
  else
    localStorage.setItem(GROUP_KEY, groupId);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearOwner() {
  localStorage.removeItem(OWNER_KEY);
}
// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function clearGroupId() {
  localStorage.removeItem(GROUP_KEY);
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

export function getOwner() {
  return localStorage.getItem(OWNER_KEY);
}

export function setOwner() {
  return axios({
    method: 'get',
    url: 'https://4dat-auth.auth0.com/userinfo',
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    localStorage.setItem(OWNER_KEY, response.data.name);
  })
  .catch(error => error );
}

export function getSub() {
  let token = getAccessToken();
  return decode(token).sub;
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}