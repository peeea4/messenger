import { UserTab } from "./UserTab";
import { useDispatch, useSelector } from "react-redux"
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useState } from 'react'
import { MyButton } from "./MyButton";
import { creatingChat } from "../store/actions/chatActions";
export const ChatList = () => {
    const dispatch = useDispatch()
    const [connection, setConnection] = useState()
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const chatList = useSelector(state => state.chatList)
    const user = useSelector(state => state.user)

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
		<div className="chat-list">
            <MyButton className="button" disabled="false" onClick={ () => {dispatch(creatingChat(user.username))}}>Добавить чат</MyButton>
            {
                chatList.map( (chat) => (
                    <UserTab key={chat.id} username={chat.name}/>
                ))
            }
        </div>
    );
}
