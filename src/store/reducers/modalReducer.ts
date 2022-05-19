import { ModalAction, ModalActionTypes, ModalState } from '../../types/Modal'

const initialState: ModalState = {
    searchIsOpened: false,
    profileIsOpened: false,
    chatInfoIsOpened: false,
    navBarIsOpened: false,
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
        case ModalActionTypes.CHANGE_CHAT_INFO_STATUS:
            return {
                ...state,
                chatInfoIsOpened: action.payload,
            }
        case ModalActionTypes.CHANGE_NAVBAR_STATUS:
            return {
                ...state,
                navBarIsOpened: action.payload,
            }
        default:
        return state
    }
}
