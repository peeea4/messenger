import "./styles/index.scss"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { NotFound } from "./pages/NotFound";
import { SignUpForm } from "./components/forms/SignUpForm";
import { LogInForm } from "./components/forms/LogInForm";
import { useSelector } from "react-redux"

const App = () => {
	const user = useSelector(state => state.userStore.currentUser);
	return (
		user ?	
			(
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			)
			:
			(
				<Routes>
                    <Route path="/" element={<Auth />}>
                        <Route index element={<LogInForm />} />
                        <Route path="signup" element={<SignUpForm />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
				</Routes>
			)
	)
}

export default App
