import { ModalAction, ModalActionTypes, ModalState } from '../../types/Modal'

const initialState: ModalState = {
    searchIsOpened: false,
    profileIsOpened: false,
    contactIsOpened: false,
    chatInfoIsOpened: false,
    navBarIsOpened: false,
    modalResponseOpened: {
        status: false,
        text: ""
    },
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
        case ModalActionTypes.CHANGE_CONTATS_STATUS:
            return {
                ...state,
                contactIsOpened: action.payload,
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
        case ModalActionTypes.CHANGE_MODAL_STATUS:
            return {
                ...state,
                modalResponseOpened: action.payload,
            }
        default:
            return state
    }
}
