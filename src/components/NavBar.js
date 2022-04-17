import { NavLink } from 'react-router-dom';

const setActive = ({isActive}) => isActive ? "opened-page link" : "link";

const NavBar = () => {
    return (
        <nav className="navigation">
            <NavLink to="/" className={setActive}>Главная</NavLink>
            <NavLink to="/about" className={setActive}>Про нас</NavLink>
            <NavLink to="/contact" className={setActive}>Контакты</NavLink>
        </nav>
    )
}
export default NavBar
