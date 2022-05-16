import { ChatList } from "../components/ChatList"
import { Chat } from "../components/Chat";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ChooseChat } from "../components/ChooseChat";
import { useTypedSelector } from "../hooks/useTypedSelector";
import React, { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { ProfileModal } from "../components/modals/ProfileModal";
export const Home = () => {

    const [connection, setConnection] = React.useState<any>();
    const [messages, setMessages] = React.useState<Array<any>>([]);
    const [users, setUsers] = React.useState<any>([]);
    const {getUserChats, setSearchOpened} = useActions();
	const accessToken = useTypedSelector(state => state.userState.currentUser.accessToken);
    const chatStatus = useTypedSelector(state => state.chatState.chatIsOpened);
    const profileStatus = useTypedSelector(state => state.modalState.profileIsOpened);
    const userId = useTypedSelector(state => state.userState.currentUser.user.id);
    useEffect(() => {
        getUserChats(userId);
    }, [])
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

            connectionS.on('newChatCreated', () => {
                getUserChats(user.id);
            })

            connectionS.onclose(() => {
                setConnection({});
                setMessages([]);
                setUsers([]);
            })

            await connectionS.start();
            await connectionS.invoke('JoinRoom', user, chatID);

            setConnection(connectionS);

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

    const searchHandler = (e:any) => {
        if(!e.target.classList.contains("add-chat") && !e.target.classList.contains("search-block") && !e.target.classList.contains("search-input")) {
            setSearchOpened(false)
        }
    }
    return (
        <div 
            className="page home-page"
            onClick={e => searchHandler(e)}>
            <ChatList joinRoom={joinRoom} closeConnection={closeConnection}/>
            {
                profileStatus ? 
                (
                    <ProfileModal/>
                )
                :
                (
                    null
                )
            }
            {
                chatStatus ?
                (
                    <Chat
                        messages={messages}
                        sendMessage={sendMessage}
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
