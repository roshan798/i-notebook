import './output.css'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserContext from './context/user/userContext'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Error404 from './components/Error404'
import Notifiction from './components/Notification'
function App() {
    const { authToken, showAlert } = useContext(UserContext)
    return (
        <div className="App text-center text-red-700">
            <Navbar></Navbar>
            {showAlert && <Notifiction />}
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        authToken ? <Home /> : <Navigate to={'/login'} />
                    }></Route>
                <Route
                    exact
                    path="/login"
                    element={
                        authToken ? <Navigate to={'/'} /> : <Login />
                    }></Route>
                <Route
                    exact
                    path="/signup"
                    element={
                        authToken ? <Navigate to={'/'} /> : <Signup />
                    }></Route>
                <Route exact path="*" element={<Error404 />}></Route>
            </Routes>
        </div>
    )
}

export default App
