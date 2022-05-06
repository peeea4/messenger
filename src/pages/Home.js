import { ChatList } from "../components/ChatList"
import { Chat } from "../components/Chat";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ChooseChat } from "../components/ChooseChat";
export const Home = () => {
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const joinRoom = async (user, chatID) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(`https://localhost:44328/chat`)
                .configureLogging(LogLevel.Information)
                .build()
 
            connection.on('UsersInRoom', (users) => {
                setUsers(users);
            })
            console.log(connection);
            connection.on('ReceiveMessage', (message) => {
                setMessages((messages) => [...messages,  message ]);
            })

            connection.onclose(() => {
                setConnection();
                setMessages([]);
                setUsers([]);
            })

            await connection.start();
            await connection.invoke('JoinRoom', user, chatID);
            if(chatID != 0) {
                setConnection(connection);
            }
        } catch (e) {
            console.log(e);
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
            await connection.invoke('SendMessage', chatID, message);
        } catch (e) {
            console.log(e);
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
                    <ChooseChat joinRoom={joinRoom}/>
                )
            }
        </div>
    );
}
