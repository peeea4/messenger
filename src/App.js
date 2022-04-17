import './styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path="about" element={<About/>}></Route>
                    <Route path="contact" element={<Contact/>}></Route>
                    <Route path="*"></Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
