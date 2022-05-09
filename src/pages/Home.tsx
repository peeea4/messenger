import { ChatList } from "../components/ChatList"
import { Chat } from "../components/Chat";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ChooseChat } from "../components/ChooseChat";
import { useTypedSelector } from "../hooks/useTypedSelector";
import React from "react";
export const Home = () => {
    const [connection, setConnection] = React.useState<any>();
    const [messages, setMessages] = React.useState<Array<any>>([]);
    const [users, setUsers] = React.useState<any>([]);
	const accessToken = useTypedSelector(state => state.userState.currentUser.accessToken)
    const joinRoom = async (user: any, chatID: any) => {
        try {
            const connection = new HubConnectionBuilder()
				.withUrl(`https://localhost:44328/chat`, { accessTokenFactory: () => accessToken })
                .configureLogging(LogLevel.Information)
                .build();

            connection.on('UsersInRoom', (users) => {
                setUsers(users);
            })
            console.log(connection);
            connection.on('ReceiveMessage', (message) => {
                setMessages((messages) => [...messages,  message ]);
            })

            connection.onclose(() => {
                setConnection({});
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

    const sendMessage = async (chatID: any, message: any) => {
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
