import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { chatReducer } from "./chatReducer";
import { messagesReducer } from "./messagesReducer";
const rootReducer = combineReducers({ 
	userStore: userReducer,
    chatStore: chatReducer, 
    messageStore: messagesReducer,
});

export default rootReducer;