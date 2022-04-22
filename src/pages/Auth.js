const Auth = () => {
	return ( 
		<form onSubmit={ e => {}}>
			<input type="email" className="auth-mail"/>
			<input type="password" className="auth-pass" />
			<button>Войти</button>
		</form>
	);
}

export default Auth;