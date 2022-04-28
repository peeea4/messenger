import { ChatList } from "../components/ChatList"
import { Chat } from "../components/Chat";
import { useState } from "react";
import { useSelector } from "react-redux";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { AddChatModal } from "../components/modals/AddChatModal";
export const Home = () => {

    // const dispatch = useDispatch()
    // const messages = useSelector(state => state.messagesList)
    // const username = useSelector(state => state.user.username);
    
    const modalAddChat = useSelector(state => state.modalAddChat)
    const [connection, setConnection] = useState()
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    
    const joinRoom = async (id, username, room, chats) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(`https://localhost:44328/chat`)
                .configureLogging(LogLevel.Information)
                .build()

            connection.on('UsersInRoom', (users) => {
                setUsers(users)
            })

            connection.on('ReceiveMessage', (message) => {
                setMessages((messages) => [...messages,  message ])
            })

            connection.onclose(() => {
                setConnection()
                setMessages([])
                setUsers([])
            })

            await connection.start()
            await connection.invoke('JoinRoom', { id, username, room, chats })
            setConnection(connection)
        } catch (e) {
            console.log(e)
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (message) => {
        try {
            await connection.invoke('SendMessage', message)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="page home-page">
            <ChatList/>
            {
                modalAddChat ? 
                (
                    <AddChatModal joinRoom={joinRoom}/>
                )
                :
                (
                    null
                )
            }
            {
                connection ? 
                (
                    <Chat
                        messages={messages}
                        sendMessage={sendMessage}
                        closeConnection={closeConnection}
                        users={users}
                    />
                )
                :
                (
                    <div className="choose-chat">
                        <p>Выберите, кому хотели бы написать</p>
                    </div>
                )
            }
        </div>
    );
}
