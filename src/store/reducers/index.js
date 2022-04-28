import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { chatReducer } from "./chatReducer";
import { messagesReducer } from "./messagesReducer";
import { modalReducer } from "./modalReducer";
const rootReducer = combineReducers({ 
	user: userReducer,
    chatList: chatReducer, 
    messagesList: messagesReducer, 
    modalAddChat: modalReducer
});

export default rootReducer;