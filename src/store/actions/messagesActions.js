import axios from "axios"
export function getingMessages(chatID) {
	return (dispatch) => {
		axios.get(`https://localhost:44328/chats/${chatID}/messages`)
		.then(res => {
            dispatch(getMessages(res.data))
            console.log("getingMessages");
        })
	}
}

function getMessages(messageList) {
    console.log("getMessages");
	return {
		type: "GET_MESSAGES",
		payload: messageList
	}
}