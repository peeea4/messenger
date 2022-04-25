const initialStore = {}
export const userReducer = (state = initialStore, action) => {
	switch (action.type) {
		case "FETCHED_USER":
			return action.payload
		default: return state
	}
}