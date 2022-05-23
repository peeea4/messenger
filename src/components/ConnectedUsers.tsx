import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ChatMember } from "./ChatMember"
import { ChatInfo } from "../components/modals/ChatInfo";
import { CSSTransition } from "react-transition-group";

type ConnectedUsersProps = {
    users: any[];
    messages: any[];
}

export const ConnectedUsers:React.FC<ConnectedUsersProps> = ({messages, users}) => {
    const chatInfoStatus = useTypedSelector(state => state.modalState.chatInfoIsOpened);

    const { setChatInfoOpened } = useActions();

    return (
        <div className="chat-settings">
            <div className="user-list"
                onClick={ () => {setChatInfoOpened(true)} }>
                {
                    users?.map((user: any, index: number) => (
                        user.username !== JSON.parse(localStorage.getItem("user") || "").user.username ? 
                        (
                            <ChatMember key={index} user={user}/>
                        )
                        :
                        (
                            null
                        )
                    ))
                }
            </div>
            <CSSTransition
                in={chatInfoStatus}
                timeout={300}
                classNames="profmodal"
                unmountOnExit
            >
                <ChatInfo messages={messages} />
            </CSSTransition>
        </div>
    )
}
