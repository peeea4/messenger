import { MyButton } from "../components/MyButton";
import { creatingUser } from "../store/actions/userActions";
import { useState } from "react";
const LogForm = () => {

    const [userName, setUserName] = useState("");

    const registrationSubmit = (e) => {
        e.preventDefault()
        creatingUser(userName)
    }
    
	return (
		<form className="form-login form" onSubmit={registrationSubmit}>
			<input name="user-email" type="email" className="auth-mail" onChange={e => {setUserName(e.target.value)}} />
			<input name="user-pass" type="password" className="auth-pass" />
			<input name="user-name" type="text" className="auth-name" />
			<MyButton className="confirm-button button">Зарегистрироваться</MyButton>
		</form>
	);
}

export default LogForm;