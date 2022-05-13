import { Dispatch } from "react";
import { ModalAction, ModalActionTypes } from "../../types/Modal";

export const setModalSync = (value:boolean) => {
  return async (dispatch: Dispatch<ModalAction>) => {
    dispatch({ type: ModalActionTypes.OPEN_CHAT, payload: value});
  }
}