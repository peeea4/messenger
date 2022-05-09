import { Outlet } from "react-router-dom";

export const Auth = () => {
	return (
		<div className="page auth-page">
            <Outlet/>
		</div>
	);
}
