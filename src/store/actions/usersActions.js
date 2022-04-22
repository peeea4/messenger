const ADD_CHAT = "ADD_CHAT"

export const addChat = (chat) => {
	return {
		type: ADD_CHAT,
		payload: chat
	}
}
