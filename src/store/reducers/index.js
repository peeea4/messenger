import { combineReducers } from 'redux'
import { chatReducer } from './chatReducer';
import { userReducer } from "./userReducer"

const rootReducer = combineReducers({
	chat: chatReducer, 
	user: userReducer
});

export default rootReducer;