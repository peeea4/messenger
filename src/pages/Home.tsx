import { ChatList } from "../components/ChatList"
import { Chat } from "../components/Chat";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ChooseChat } from "../components/ChooseChat";
import { useTypedSelector } from "../hooks/useTypedSelector";
import React, { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { ChatInfo } from "../components/modals/ChatInfo";
import { NavBar } from "../components/NavBar";
import { ProfileModal } from "../components/modals/ProfileModal";
export const Home = () => {

    const {getUserChats, setSearchOpened, getUserListAsync} = useActions();

    const [connection, setConnection] = React.useState<any>();
    const [messages, setMessages] = React.useState<Array<any>>([]);
    
	const accessTokenNew = useTypedSelector(state => state.userState.currentUser.accessToken);
    const accessTokenFromLS = JSON.parse(localStorage.getItem("user") || "").accessToken;
    let accessToken:any;
    if(!accessTokenNew) {
        accessToken = accessTokenFromLS;
    } else {
        accessToken = accessTokenNew;
    }    
    const chatStatus = useTypedSelector(state => state.chatState.chatIsOpened);
    const chatInfoStatus = useTypedSelector(state => state.modalState.chatInfoIsOpened);
    const navBarStatus = useTypedSelector(state => state.modalState.navBarIsOpened);
    const profileStatus = useTypedSelector(state => state.modalState.profileIsOpened);
    
    const userId = JSON.parse(localStorage.getItem("user") || "false").user.id
    
    useEffect(() => {
        getUserChats(userId);
    }, [])

    const joinRoom = async (user: any, chatID: any, chat?:any) => {
        try {
            if (!connection){
                let connectionS = new HubConnectionBuilder()
				.withUrl(`https://localhost:44328/chat`, { accessTokenFactory: () => accessToken })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

                connectionS.on('ReceiveMessage', (message) => {
                    setMessages((messages) => [...messages,  message ]);
                })

                connectionS.on('newChatCreated', () => {
                    getUserChats(user.id);
                })

                connectionS.onclose(() => {
                    setConnection({});
                    setMessages([]);
                })

                await connectionS.start();
                setConnection(connectionS);
            } else{
                await connection.invoke('JoinRoom', user, chatID);
            }
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
            getUserListAsync();
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
            {
                navBarStatus ? <NavBar/> : null
            }
            {
                profileStatus ? <ProfileModal/> : null
            }
            <ChatList joinRoom={joinRoom} closeConnection={closeConnection}/>
            {
                chatInfoStatus ? <ChatInfo /> : null
            }
            {
                chatStatus ? <Chat messages={messages} sendMessage={sendMessage}/> : <ChooseChat joinRoom={joinRoom}/>
            }
        </div>
    );
}
