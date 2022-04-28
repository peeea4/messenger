const initialStore = []
export const messagesReducer = (state = initialStore, action) => {
	switch (action.type) {
		case "GET_MESSAGES":
			return [
                ...initialStore, 
                ...action.payload
            ]
		default: return state
	}
}
