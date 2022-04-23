import "./styles/index.scss"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { NotFound } from "./pages/NotFound";
import { Chat } from "./components/Chat";
import { Room } from "./pages/Room";

const App = () => {
	const user = true;
    return (
		user ? 
		(
			<Routes>
				<Route path="/" element={<Layout />}>
                    <Route index element={<Home/>}/>
                    <Route path="chat" element={<Chat/>}/>
					<Route path="room" element={<Room/>}/>
					<Route path="*" element={<NotFound/>}/>
				</Route>
			</Routes>
		)
		:
		(
			<Routes>
				<Route path="/" element={<Layout />}>
                    <Route index element={<Auth/>}/>
					<Route path="*" element={<NotFound/>} />
				</Route>
			</Routes>
		)
    )
}

export default App
