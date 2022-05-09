import { CustomLink } from "./CustomLink"
const NavBar = () => {
    return (
        <nav className="navbar">
            <CustomLink to="/profile">My Profile</CustomLink>
            <CustomLink to="/">Chats</CustomLink>
            
        </nav>
    );
}

export default NavBar;
