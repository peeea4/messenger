import { Dispatch } from "react";
import { MessageAction, MessageActionTypes } from "../../types/Message";

export const setMessageSync = (message: any) => {
	return async (dispatch:Dispatch<MessageAction>) => {
        dispatch({type: MessageActionTypes.SET_MESSAGE, payload: message});
	}
}