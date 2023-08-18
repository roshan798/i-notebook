import './output.css'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserContext from './context/user/userContext'
import Home from './components/pages/Home'
import Note from './components/pages/Note'
import Navbar from './components/Navbar'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import Error404 from './components/pages/Error404'
import Notifiction from './components/Notification'
function App() {
    const { authToken, showAlert } = useContext(UserContext)
    return (
        <div className="App text-center">
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
                <Route
                    exact
                    path="/note/:id"
                    element={
                        authToken ? <Note /> : <Navigate to={'/login'} />
                    }></Route>
                <Route exact path="*" element={<Error404 />}></Route>
            </Routes>
        </div>
    )
}

export default App
