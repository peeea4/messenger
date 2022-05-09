import { ChatAction, ChatActionTypes, ChatState } from "../../types/Chat"

const initialState: ChatState = {
    chatList: [], 
    chatID: "",
}
export const chatReducer = (state = initialState, action: ChatAction): ChatState => {
	switch (action.type) {
		case ChatActionTypes.CREATE_CHAT:
			return {
                ...state,
                chatList: [...state.chatList, action.payload],
            }
            case ChatActionTypes.SET_ID:
                return {
                    ...state,
                    chatID: action.payload
                }
		default: return state
	}
}