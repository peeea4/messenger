import SendMessageForm from './SendMessageForm'
import MessageContainer from './MessageContainer'
import ConnectedUsers from './ConnectedUsers'
import MyButton from './MyButton'

const Chat = ({ sendMessage, messages, users, closeConnection }) => (
    <div className='message-chat'>
        <div className="leave-room">
            <MyButton className="decline-button button" onClick={() => closeConnection()}>
                Leave Room
            </MyButton>
        </div>
        <ConnectedUsers users={users} />
        <div className="chat">
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    </div>
)

export default Chat
