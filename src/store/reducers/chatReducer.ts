import { ChatAction, ChatActionTypes, ChatState } from "../../types/Chat"

const initialState: ChatState = {
    chatList: [], 
    chatID: "",
    chatIsOpened: false,
};

export const chatReducer = (state = initialState, action: ChatAction): ChatState => {
	switch (action.type) {
		case ChatActionTypes.CREATE_CHAT:
			return {
                ...state
            }
        case ChatActionTypes.SET_ID:
            return {
                ...state,
                chatID: action.payload
            }
        case ChatActionTypes.GET_USER_CHATS:            
            return {
                ...state,
                chatList: [...action.payload],
            }
        case ChatActionTypes.OPEN_CHAT:
            return {
                ...state,
                chatIsOpened: true
              }
		default: return state
	}
}