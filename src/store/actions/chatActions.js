import axios from "axios";

export function getingChatsByID(userID) {
	return (dispatch) => {
		axios.get(`https://localhost:44328/users/${userID}/chats`)
		.then(res => dispatch(getChatsByID(res.data)))
	}
}

function getChatsByID(chatList) {
	return {
		type: "GET_USER",
		payload: chatList
	}
}

export function creatingChat(user) {
	return (dispatch) => {
		axios.post(`https://localhost:44328/chats`, {
            "Name": `${user.username}`, 
            "users": [{
                username: {
                    ...user
                }
            }]
        })
		.then(res => {
            dispatch(createdChat(res.data));
            console.log(res.data);
        })
	}
}

function createdChat(chat) {
	return {
		type: "CREATE_CHAT",
		payload: chat
	}
}