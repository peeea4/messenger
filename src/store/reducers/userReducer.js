const initialStore = {}
export const userReducer = (state = initialStore, action) => {
	switch (action.type) {
		case "CREATED_USER":
			return action.payload
        case "AUTHORIZED_USER":
            return action.payload
		default: return state
	}
}
