import { SendMessageForm } from './forms/SendMessageForm'
import { MessagesContainer } from './MessagesContainer'
import { ConnectedUsers } from './ConnectedUsers'
import { useTypedSelector } from '../hooks/useTypedSelector';

type ChatProps = {
    messages: any[];
    sendMessage: (chatID:any, message: any) => void;
}

export const Chat:React.FC<ChatProps> = ({ messages, sendMessage }) => {
    const messagesFromDB = useTypedSelector(state => state.chatState.currentChat.messages);
    const usersFromDB = useTypedSelector(state => state.chatState.currentChat.users);
    return (
        <div className="chat-container">
            <div className="chat-header">
                <ConnectedUsers messages={messages} users={usersFromDB}/>
            </div>
            <div className="chat">
                <MessagesContainer messagesFromDB={messagesFromDB} messages={messages} />
                <SendMessageForm sendMessage={sendMessage} />
            </div>
        </div>
    )
}
