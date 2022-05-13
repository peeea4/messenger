import { MessageAction, MessageActionTypes, MessageState } from "../../types/Message"

const initialState: MessageState = {
    messages: []
};

export const messageReducer = (state = initialState, action: MessageAction): MessageState => {
	switch (action.type) {
		case MessageActionTypes.SET_MESSAGE:
			return {
                ...state,
                messages: [...state.messages, action.payload],
            }
		default: return state
	}
}