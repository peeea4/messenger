import { SendMessageForm } from './forms/SendMessageForm'
import { MessagesContainer } from './MessagesContainer'
import { ConnectedUsers } from './ConnectedUsers'

type ChatProps = {
    messages: any[];
    sendMessage: (chatID:any, message: any) => void;
}

export const Chat:React.FC<ChatProps> = ({ messages, sendMessage }) => {
    return (
        <div className="chat-container">
            <div className="chat-info">
                <ConnectedUsers/>
            </div>
            <div className="chat">
                <MessagesContainer messages={messages} />
                <SendMessageForm sendMessage={sendMessage} />
            </div>
        </div>
    )
}
