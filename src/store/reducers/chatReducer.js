const initialStore = []
export const chatReducer = (state = initialStore, action) => {
	switch (action.type) {
		case "FETCHED_CHAT":
			return action.payload
		default: return state
	}
}