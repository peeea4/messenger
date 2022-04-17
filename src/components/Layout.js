import NavBar from "./NavBar";
import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <div className="layout">
            <NavBar/>
            <Outlet/>
        </div>     
    );
}

export default Layout;
