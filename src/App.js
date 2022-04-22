import "./styles/index.scss"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/navigation/Layout";
import Room from "./pages/Room";
import NotFound from "./pages/NotFound"
import { privateRoutes, publicRoutes } from "./routes";
import Home from "./pages/Home";

const App = () => {
	const user = false;
    return (
		user ? 
		(
			<Routes>
				<Route path="/" element={<Layout />}>
					{
						privateRoutes.map( ({path, Component}) => (
							<Route path={path} element={Component}/>
						))
					}
					<Route path="*" element={<Home/>}/>
				</Route>
			</Routes>
		)
		:
		(
			<Routes>
				<Route path="/" element={<Layout />}>
					{
						publicRoutes.map(({ path, Component }) => (
							<Route path={path} element={Component} />
						))
					}
					<Route path="*" element={<Login/>} />
				</Route>
			</Routes>
		)
    )
}

export default App
