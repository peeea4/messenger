import { ChatList } from "../components/ChatList"
import { Chat } from "../components/Chat";
import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useSelector } from "react-redux";
export const Home = () => {
    const [connection, setConnection] = useState()
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user.user.user);
    useEffect(() => {
        joinRoom(user, "112");
    }, []);
    const joinRoom = async (user, chatID) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(`https://localhost:44328/chat`)
                .configureLogging(LogLevel.Information)
                .build()
 
            connection.on('UsersInRoom', (users) => {
                setUsers(users)
            })
            console.log(connection);
            connection.on('ReceiveMessage', (message) => {
                setMessages((messages) => [...messages,  message ])
            })

            connection.onclose(() => {
                setConnection()
                setMessages([])
                setUsers([])
            })

            await connection.start()
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

    const sendMessage = async (chatID, message) => {
        try {
            await connection.invoke('SendMessage', chatID, message)
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
                        tempID="112"
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
