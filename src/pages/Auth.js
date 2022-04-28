import { Outlet } from "react-router-dom";
import { CustomLink } from "../components/CustomLink";

export const Auth = () => {
	return (
		<div className="page auth-page">
			<div className="forms-container">
				<nav>
					<CustomLink to="/">Вход</CustomLink>
					<CustomLink to="login">Регистрация</CustomLink>
				</nav>
				<Outlet/>
			</div>
		</div>
	);
}
