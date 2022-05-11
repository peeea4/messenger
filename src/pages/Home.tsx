import { ChatList } from "../components/ChatList"
import { Chat } from "../components/Chat";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ChooseChat } from "../components/ChooseChat";
import { useTypedSelector } from "../hooks/useTypedSelector";
import React from "react";
import { useActions } from "../hooks/useActions";
export const Home = () => {
    const [connection, setConnection] = React.useState<any>();
    const [messages, setMessages] = React.useState<Array<any>>([]);
    const [users, setUsers] = React.useState<any>([]);
	const accessToken = useTypedSelector(state => state.userState.currentUser.accessToken);
    const joinRoom = async (user: any, chatID: any) => {
        try {
            if(chatID !== 0 && connection) {
                await connection.stop();
            }
            const connectionS = new HubConnectionBuilder()
				.withUrl(`https://localhost:44328/chat`, { accessTokenFactory: () => accessToken })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            connectionS.on('UsersInRoom', (users) => {
                setUsers(users);
            })

            connectionS.on('ReceiveMessage', (message) => {
                setMessages((messages) => [...messages,  message ]);
            })

            connectionS.onclose(() => {
                setConnection({});
                setMessages([]);
                setUsers([]);
            })

            await connectionS.start();
            await connectionS.invoke('JoinRoom', user, chatID);

            setConnection(connectionS);
            console.log(connectionS);
            

        } catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
            if(connection) {
                await connection.stop();
            }
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
            <ChatList joinRoom={joinRoom} closeConnection={closeConnection}/>
            {
                connection ?
                (
                    <Chat
                        messages={messages}
                        sendMessage={sendMessage}
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
