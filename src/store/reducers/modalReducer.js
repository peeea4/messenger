export const modalReducer = (state = false, action) => {
	switch (action.type) {
		case "SHOW_MODAL":
			return action.payload
		default: return state
	}
}
