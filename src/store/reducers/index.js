import { combineReducers } from "redux";
import { postsReducer } from "."
export const reducer = combineReducers({
	posts: postsReducer
})