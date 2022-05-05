import axios from "axios"
export function getingMessages(chatID) {
	return (dispatch) => {
		axios.get(`https://localhost:44328/chats/${chatID}/messages`)
		.then(res => {
            dispatch(getMessages(res.data))
        })
	}
}

function getMessages(messageList) {
	return {
		type: "GET_MESSAGES",
		payload: messageList
	}
}