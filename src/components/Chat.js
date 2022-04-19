import SendMessageForm from './SendMessageForm'
import MessageContainer from './MessageContainer'
import ConnectedUsers from './ConnectedUsers'
import MyButton from './MyButton'

const Chat = ({ sendMessage, messages, users, closeConnection }) => (
    <div className='message-chat'>
        <div className="aside-room">
            <ConnectedUsers users={users} />
            <MyButton className="decline-button button" onClick={() => closeConnection()}>
                Leave Room
            </MyButton>
        </div>
        <div className="chat">
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    </div>
)

export default Chat;
