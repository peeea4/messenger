import { useState } from 'react';
import { MyButton } from './MyButton';

export const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();
    return (
        <form className='lobby'
            onSubmit={e => {
                e.preventDefault();
                joinRoom(user, room);
            }}>
            <div className="lobby-inputs">
                <input placeholder="Personal name" onChange={e => {
                    setUser(e.target.value)
                    localStorage.setItem("userName", `${e.target.value}`);
                }} />
                <input placeholder="Room name" onChange={e => setRoom(e.target.value)} />
            </div>
            <MyButton className="confirm-button button" disabled={!user || !room}>Join</MyButton>
        </form>
    )
}
