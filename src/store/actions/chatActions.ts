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
        dispatch({type: ChatActionTypes.CREATE_CHAT});
	}
}

export const setChatID = (chatID: any) => {
	return async (dispatch:Dispatch<ChatAction>) => {
        dispatch({type: ChatActionTypes.SET_ID, payload: chatID});
	}
}

export function getUserChats(userId:any) {
	return async (dispatch: Dispatch<ChatAction>) => {
		const response = await axios.get(`https://localhost:44328/users/${userId}/chats`);
        dispatch({type: ChatActionTypes.GET_USER_CHATS, payload: response.data});
        console.log("Chat list from DB: ", response.data);
	}
}
