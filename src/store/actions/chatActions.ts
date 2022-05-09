import axios from "axios";
import { Dispatch } from "react";
import { ChatAction, ChatActionTypes } from "../../types/Chat";

export function creatingChat(user: any, friendID: number) {
	return async (dispatch: Dispatch<ChatAction>) => {
		const response = await axios.post(`https://localhost:44328/chats`, {
            "Name": `${user.username}`,
            "Users": [
                {
                    "Id": user.id
                }, 
                {
                    "Id": friendID
                }
            ]
        })
        dispatch({type: ChatActionTypes.CREATE_CHAT, payload: response.data});
	}
}

export const setChatID = (chatID: string) => {
	return async (dispatch:Dispatch<ChatAction>) => {
        dispatch({type: ChatActionTypes.SET_ID, payload: chatID});
	}
}
