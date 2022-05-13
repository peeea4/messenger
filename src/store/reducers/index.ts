import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { chatReducer } from "./chatReducer";
import { messageReducer } from "./messageReducer";
import { modalReducer } from "./modalReducer";

export const rootReducer = combineReducers({ 
	userState: userReducer,
    chatState: chatReducer,
    messageState: messageReducer,
    modalState: modalReducer
});

export type RootState = ReturnType<typeof rootReducer>