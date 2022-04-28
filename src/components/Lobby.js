import { useState } from 'react';
import { MyButton } from './MyButton';

export const Lobby = ({ joinRoom }) => {
    const [username, setUser] = useState();
    const [room, setRoom] = useState();
    return (
        <form className='lobby'
            onSubmit={e => {
                e.preventDefault();
                joinRoom(1 , username, room, null);
            }}>
            <div className="lobby-inputs">
                <input placeholder="Personal name" onChange={e => {
                    setUser(e.target.value)
                }} />
                <input placeholder="Room name" onChange={e => setRoom(e.target.value)} />
            </div>
            <MyButton className="confirm-button button" disabled={!username || !room}>Join</MyButton>
        </form>
    )
}
