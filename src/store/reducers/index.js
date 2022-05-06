import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { chatReducer } from "./chatReducer";
import { messagesReducer } from "./messagesReducer";
const rootReducer = combineReducers({ 
	user: userReducer,
    chats: chatReducer, 
    messagesList: messagesReducer, 
});

export default rootReducer;