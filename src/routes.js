import Auth from "./pages/Auth";
import Home from './pages/Home';

export const publicRoutes = [
	{
		path:"/login",
		Component: <Auth/>
	}
]
export const privateRoutes = [
	{
		path: "/home",
		Component: <Home/>
	}
]