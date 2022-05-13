import { NavLink } from "react-router-dom";

const NavBar = () => {
    
    return (
        <nav className="navbar">
            <NavLink className="button profile-icon" to="/profile"></NavLink>
            <NavLink className="button redirect-button" to="/">Chats</NavLink>
        </nav>
    );
}

export default NavBar;
