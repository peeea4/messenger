import { setChatInfoOpened } from "../../store/actions/modalActions";

export const ChatInfo = () => {
    
    const profileHandler = (e: any) => {
		if (e.target.classList.contains("chat-info-modal-wraper")) {
			setChatInfoOpened(false);
		}
	};

    return (
        <div className="chat-info-modal-wraper" onClick={e => profileHandler(e)}>
             
        </div>
    )
}
