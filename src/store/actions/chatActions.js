import axios from "axios";

function fetchingChat(chatID) {
	return (dispatch) => {
		axios.get(`http://localhost:3000/chats/${chatID}`)
			.then(res => dispatch(fetchedChat(res.data)))
	}
}

function fetchedChat(chat) {
	return {
		type: "FETCHED_CHAT",
		payload: chat
	}
}

export { fetchingChat }