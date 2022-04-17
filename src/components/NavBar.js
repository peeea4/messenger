import CustomLink  from './CustomLink';
import logo from "../icons/Logo.png"

const NavBar = () => {
    console.log(logo)
    return (
        <nav className="navigation">
            <CustomLink to="/"><img src={logo}/></CustomLink>
        </nav>
    )
}
export default NavBar
