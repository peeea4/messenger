import React from "react";
import { useActions } from "../../hooks/useActions";
const closeModal = require("../../assets/icons/close.png");
const closeCross = require("../../assets/icons/close-cross.png");

type ModalResponseProps = {
    errorStatus: boolean,
    errorText: string
}
export const ModalResponse: React.FC<ModalResponseProps> = ({errorStatus, errorText}) => {
    const {changeModalStatus} = useActions();
    const closeModalHandler = () => {
        changeModalStatus({status: false, text: ""})
    }
    return (
        <div className="modal-response">
            <div className="error-img">
                <img className="close-modal-img" src={closeModal} alt="" />
            </div>
            <p className="modal-text">{errorText}</p>
            <button className="close-modal-btn" onClick={() => closeModalHandler()}><img src={closeCross} alt="" /> Close</button>
        </div>
    )
}
