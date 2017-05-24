import { FETCH_TOOLS } from '../actions/tools';
const INITIAL_STATE = { all: [] };
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_TOOLS:
  	// console.log('This is the about content JSON: ', action.payload.data);
    return { ...state, all: action.payload.data };
  default:
    return state;
  }
}