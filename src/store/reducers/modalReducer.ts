import { ModalAction, ModalActionTypes, ModalState } from '../../types/Modal'

const initialState: ModalState = {
    searchIsOpened: false,
    profileIsOpened: false,
}

export const modalReducer = (state = initialState, action: ModalAction): ModalState => {
    switch (action.type) {
        case ModalActionTypes.CHANGE_SEARCH_STATUS:
            return {
                ...state,
                searchIsOpened: action.payload,
            }
        case ModalActionTypes.CHANGE_PROFILE_STATUS:
            return {
                ...state,
                profileIsOpened: action.payload,
            }
        default:
        return state
    }
}
