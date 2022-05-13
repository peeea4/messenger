import { ModalAction, ModalActionTypes, ModalState } from "../../types/Modal"

const initialState: ModalState = {
  isOpened: false,
}
export const modalReducer = (state = initialState, action: ModalAction): ModalState => {
  switch (action.type) {
    case ModalActionTypes.OPEN_CHAT:
      return {
        isOpened: true
      }
    default: return state
  }
}