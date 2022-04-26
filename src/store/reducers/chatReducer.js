const initialStore = []
export const chatReducer = (state = initialStore, action) => {
	switch (action.type) {
		case "CREATE_CHAT":
			return [
                ...state,
                action.payload
            ]
		default: return state
	}
}