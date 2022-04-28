export const modalReducer = (state = false, action) => {
	switch (action.type) {
		case "SHOW_MODAL":
            console.log(action);
			return action.payload
		default: return state
	}
}
