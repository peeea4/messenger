const initialStore = {
    chatList: [], 
    chatID: null
}
export const chatReducer = (state = initialStore, action) => {
	switch (action.type) {
		case "CREATE_CHAT":
			return {
                ...state,
                chatList: [...state.chatList, action.payload],
            }
        case "SET_ID":
            return {
                ...state,
                chatID: action.payload
            }
		default: return state
	}
}