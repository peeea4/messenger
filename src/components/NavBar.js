import CustomLink  from './CustomLink';
import logo from "../icons/Logo.png"

const NavBar = () => {
    const imgLogo = "../public/icons"
    console.log(logo)
    return (
        <nav className="navigation">
            <CustomLink to="/"><img src={logo}/></CustomLink>
            <CustomLink to="/about">Про нас</CustomLink>
            <CustomLink to="/contact">Контакты</CustomLink>
        </nav>
    )
}
export default NavBar
