import { SendMessageForm } from './forms/SendMessageForm'
import { MessagesContainer } from './MessagesContainer'
import { ConnectedUsers } from './ConnectedUsers'
type ChatProps = {
    messages: any[];
    sendMessage: (chatID:any, message: any) => void;
    users: any;
    closeConnection: () => void;
}
export const Chat:React.FC<ChatProps> = ({ messages, sendMessage, users, closeConnection }) => {
    return (
        <div className='chat-container'>
            <div className="chat">
                <MessagesContainer messages={messages} />
                <SendMessageForm sendMessage={sendMessage} />
            </div>
            <div className="aside-room">
                <ConnectedUsers users={users} />
            </div>
        </div>
    )
}
