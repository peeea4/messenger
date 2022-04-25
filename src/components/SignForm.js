import { MyButton } from "../components/MyButton";
const SignForm = () => {
	return ( 
		<form className="form-signin form" onSubmit={e => { }}>
			<input type="email" className="auth-mail" />
			<input type="password" className="auth-pass" />
			<MyButton className="confirm-button button">Войти</MyButton>
		</form>
	);
}

export default SignForm;