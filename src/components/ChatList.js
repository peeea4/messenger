import { UserTab } from "./UserTab";
import { useSelector } from "react-redux"
import { Lobby } from '../components/Lobby'
import { Chat } from '../components/Chat'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useState } from 'react'
export const ChatList = () => {

    const [connection, setConnection] = useState()
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const chatList = useSelector(state => state.user.chats)

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
		chatList.map( (chat) => (
			<UserTab key={chat.id} username={chat.username} room={chat.room} id={chat.id} joinRoom={joinRoom}/>
		))
    );
}
