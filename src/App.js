import "./styles/index.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/navigation/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path="*" element={<NotFound/>}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
