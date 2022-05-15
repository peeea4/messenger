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
