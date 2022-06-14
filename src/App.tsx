import "./styles/index.scss"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { NotFound } from "./pages/NotFound";
import { SignUpForm } from "./components/forms/SignUpForm";
import { LogInForm } from "./components/forms/LogInForm";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useActions } from "./hooks/useActions";
import { useEffect } from "react";

export const App = () => {
    const {getUserById} = useActions();
    const { createUser, getUserListAsync } = useActions();
    const savedUserId = JSON.parse(localStorage.getItem("user") || "false")?.user?.id;
    const trueUserId = useTypedSelector(state => state.userState.currentUser.accessToken);
    let userId;
    
    useEffect(() => {
        if(savedUserId) {
            getUserById(savedUserId)
        }
    }, [])

    if (savedUserId) {
        userId = savedUserId;
        if (!trueUserId) {
            createUser();
            getUserListAsync();
        }
    }
    return (
        userId ?
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
