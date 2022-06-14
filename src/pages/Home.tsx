import { ChatList } from "../components/ChatList"
import { Chat } from "../components/Chat";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ChooseChat } from "../components/ChooseChat";
import { useTypedSelector } from "../hooks/useTypedSelector";
import React, { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { ProfileModal } from "../components/modals/ProfileModal";
import { CSSTransition } from "react-transition-group";
import { ContactList } from "../components/modals/ContactList";
export const Home = () => {

    const { getUserChats, setSearchOpened, getChatById, setUserOnline } = useActions();
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
    const profileStatus = useTypedSelector(state => state.modalState.profileIsOpened);
    const contactsStatus = useTypedSelector(state => state.modalState.contactIsOpened);
    
    const userId = JSON.parse(localStorage.getItem("user") || "false").user.id
    
    useEffect(() => {
        getUserChats(userId);
    }, [getUserChats, userId])

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
                    getUserChats(user.id);
                })

                connectionS.on('newChatCreated', () => {
                    getUserChats(user.id);    
                })

                connectionS.on('onlineStatusChanged', (chatId) => {
                    getChatById(chatId);    
                })

                connectionS.onclose(() => {
                    setConnection({});
                    setMessages([]);
                })

                await connectionS.start();
                setConnection(connectionS);
            } else {
                await connection.invoke('JoinRoom', user, chatID);
            }
        } catch (e) {
            console.log("time",e);
        }
    }

    const sendMessage = async (chatID: any, message: any) => {
        try { 
            await connection.invoke('SendMessage', chatID, message);
            getUserChats(chatID);
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
            <CSSTransition
                in={profileStatus}
                timeout={300}
                classNames="profmodal"
                unmountOnExit
            >
                <ProfileModal/>
            </CSSTransition>

            <CSSTransition
                in={contactsStatus}
                timeout={300}
                classNames="profmodal"
                unmountOnExit
            >
                <ContactList/>
            </CSSTransition>
            
            <ChatList joinRoom={joinRoom}/>

            {
                chatStatus ? <Chat messages={messages} sendMessage={sendMessage}/> : <ChooseChat joinRoom={joinRoom}/>
            }
        </div>
    );
}
