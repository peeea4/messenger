import { SendMessageForm } from './forms/SendMessageForm'
import { MessagesContainer } from './MessagesContainer'
import { ConnectedUsers } from './ConnectedUsers'

export const Chat = ({ sendMessage, messages, users, closeConnection }) => {
    return (
        <div className='chat-container'>
            <div className="chat">
                <MessagesContainer messages={messages} />
                <SendMessageForm sendMessage={sendMessage} />
            </div>
            <div className="aside-room">
                <ConnectedUsers users={users} />
                <button className="decline-button button" onClick={() => closeConnection()}>
                    Покинуть чат
                </button>
            </div>
        </div>
    )
}
