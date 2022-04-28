import { MyButton } from "../components/MyButton";
export const SignForm = () => {
	return ( 
		<form className="form-signin form" onSubmit={e => { }}>
			<input type="email" className="auth-mail" placeholder="Email" />
			<input type="password" className="auth-pass" placeholder="Пароль" />
			<MyButton className="confirm-button button">Войти</MyButton>
		</form>
	);
}
