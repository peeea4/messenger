import { NavLink } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="page not-found-page">
            <NavLink className="link" to="/">На главную</NavLink>
        </div>
    );
}
