import { MyButton } from "../components/MyButton";
import { creatingUser } from "../store/actions/userActions";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
const LogForm = () => {

    const [userName, setUserName] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const registrationSubmit = (e) => {
        e.preventDefault()
        dispatch(creatingUser(userName))
        console.log("Форма регистрации отправлена");
        navigate('/', { replace: true })
    }
    
	return (
		<form className="form-login form" onSubmit={registrationSubmit}>
			<input name="user-email" type="email" className="auth-mail" />
			<input name="user-name" type="text" className="auth-name" onChange={e => {setUserName(e.target.value)}} />
			<input name="user-pass" type="password" className="auth-pass" />
			<MyButton className="confirm-button button">Зарегистрироваться</MyButton>
		</form>
	);
}

export default LogForm;