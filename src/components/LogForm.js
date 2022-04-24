import { MyButton } from "../components/MyButton";
const LogForm = () => {
	return (
		<form className="form-login form" onSubmit={e => { }}>
			<input type="email" className="auth-mail" />
			<input type="password" className="auth-pass" />
			<input type="text" className="auth-name" />
			<MyButton className="confirm-button button">Зарегистрироваться</MyButton>
		</form>
	);
}

export default LogForm;