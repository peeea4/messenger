import "./styles/index.scss"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { NotFound } from "./pages/NotFound";
import { Chat } from "./components/Chat";
import { Room } from "./pages/Room";
import LogForm from "./components/LogForm";
import SignForm from "./components/SignForm";
import { useSelector } from "react-redux"

const App = () => {
    const user = useSelector(state => state.user);
    localStorage.setItem("user", JSON.stringify(user))
	return (
		user.id ?
			(
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="chat" element={<Chat />} />
						<Route path="room" element={<Room />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			)
			:
			(
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<Auth />}>
							<Route index element={<SignForm />} />
							<Route path="login" element={<LogForm />} />
							<Route path="*" element={<NotFound />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			)
	)
}

export default App
