import { SendMessageForm } from './SendMessageForm'
import { MessageContainer } from './MessageContainer'
import { ConnectedUsers } from './ConnectedUsers'
import { MyButton } from './MyButton'

export const Chat = ({ sendMessage, messages, users, closeConnection }) => (
    <div className='chat-container'>
        <div className="aside-room">
            <ConnectedUsers users={users} />
            <MyButton className="decline-button button" onClick={() => closeConnection()}>
                Покинуть чат
            </MyButton>
        </div>
        <div className="chat">
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    </div>
)
