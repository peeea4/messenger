import axios from "axios";
import { Dispatch } from "react";
import { convertOnline } from "../../helpers/onlineConvert";
import { ChatAction, ChatActionTypes } from "../../types/Chat";
import { UserAction, UserActionTypes } from "../../types/User";

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
};

export const setChatID = (chatID: any) => {
	return async (dispatch:Dispatch<ChatAction>) => {
        dispatch({type: ChatActionTypes.SET_ID, payload: chatID});
	}
};

export function getUserChats(userId:any) {
	return async (dispatch: Dispatch<ChatAction>) => {
		const response = await axios.get(`https://localhost:44328/users/${userId}/chats`);
        dispatch({type: ChatActionTypes.GET_USER_CHATS, payload: response.data});
	}
};

export const setChatStatus = (value:boolean) => {
    return async (dispatch: Dispatch<ChatAction>) => {
      dispatch({ type: ChatActionTypes.OPEN_CHAT, payload: value});
    }
};

export function getChatById(chatId:any) {
	return async (dispatch: Dispatch<ChatAction | UserAction>) => {
		const response = await axios.get(`https://localhost:44328/chats/${chatId}`);
        const username = JSON.parse(localStorage.getItem("user") || "false").user.username;
        let friendOnline;
        response.data.users.forEach((userInChat: any) => {
            if(userInChat.username == username) {
                if(userInChat.isCurrentlyOnline) {
                    friendOnline = "online"
                } else friendOnline = convertOnline(userInChat)
                   
            }
        });
        dispatch({type: UserActionTypes.SET_USER_ONLINE, payload: friendOnline});
        dispatch({type: ChatActionTypes.GET_CHAT_BY_ID, payload: response.data});
	}
};
