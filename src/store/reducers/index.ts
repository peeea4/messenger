import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { chatReducer } from "./chatReducer";
import { messageReducer } from "./messageReducer";

export const rootReducer = combineReducers({ 
	userState: userReducer,
    chatState: chatReducer,
    messageState: messageReducer
});

export type RootState = ReturnType<typeof rootReducer>