import { MyButton } from "../components/MyButton";
import { creatingUser } from "../store/actions/userActions";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
export const LogForm = () => {

    const [userName, setUserName] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const registrationSubmit = (e) => {
        e.preventDefault()
        dispatch(creatingUser(userName))
        navigate('/', { replace: true })
    }
    
	return (
		<form className="form-login form" onSubmit={registrationSubmit}>
			<input name="user-email" type="email" className="auth-mail" placeholder="E-mail" />
			<input name="user-name" type="text" className="auth-name" placeholder="Логин" onChange={e => {setUserName(e.target.value)}} />
			<input name="user-pass" type="password" className="auth-pass" placeholder="Пароль" />
			<MyButton className="confirm-button button">Зарегистрироваться</MyButton>
		</form>
	);
}
