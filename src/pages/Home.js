import { ChatList } from "../components/ChatList"
import { Chat } from "../components/Chat";
import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
export const Home = () => {
    const [connection, setConnection] = useState()
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    // useEffect(() => {
    //     joinRoom();
    // }, []);
    const joinRoom = async (user, chatID) => {
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
            console.log(user, chatID);
            await connection.invoke('JoinRoom', user, chatID)
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

    const sendMessage = async (chat,  message) => {
        try {
            await connection.invoke('SendMessage', message)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="page home-page">
            <ChatList joinRoom={joinRoom}/>
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
