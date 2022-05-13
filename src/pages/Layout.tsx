import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export const Layout = () => {
    return (
        <div className="layout">
            <NavBar/>
            <Outlet/>
        </div>     
    );
}
