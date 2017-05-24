/*================================================================

	reducers/index.js - combines all reducers into a usable state
	
================================================================ */

import {combineReducers} from 'redux';
import ToolReducer from './home_reducer';

const rootReducer = combineReducers({
  tools: ToolReducer,
});

export default rootReducer;