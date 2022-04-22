import "./styles/index.scss"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/navigation/Layout";
import Room from "./pages/Room";
import NotFound from "./pages/NotFound"

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Room/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Route>
        </Routes>
    )
}

export default App
