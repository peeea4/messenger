import { Dispatch } from 'react'
import { ModalAction, ModalActionTypes } from '../../types/Modal'

export const setSearchOpened = (value: boolean) => {
    return async (dispatch: Dispatch<ModalAction>) => {
        dispatch({
            type: ModalActionTypes.CHANGE_SEARCH_STATUS,
            payload: value,
        })
    }
}

export const setProfileOpened = (value: boolean) => {
    return async (dispatch: Dispatch<ModalAction>) => {
        dispatch({
            type: ModalActionTypes.CHANGE_PROFILE_STATUS,
            payload: value,
        })
    }
}

export const setChatInfoOpened = (value: boolean) => {
    return async (dispatch: Dispatch<ModalAction>) => {
        dispatch({
            type: ModalActionTypes.CHANGE_CHAT_INFO_STATUS,
            payload: value,
        })
    }
}

export const setNavBarOpened = (value: boolean) => {
    return async (dispatch: Dispatch<ModalAction>) => {
        dispatch({
            type: ModalActionTypes.CHANGE_NAVBAR_STATUS,
            payload: value,
        })
    }
}

export const showModal = (value: boolean) => {
    return async (dispatch: Dispatch<ModalAction>) => {
        dispatch({
            type: ModalActionTypes.CHANGE_MODAL_STATUS,
            payload: value,
        })
    }
}
