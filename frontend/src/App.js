import './output.css'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserContext from './context/user/userContext'
import Home from './pages/Home'
import Note from './pages/Note'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Error404 from './pages/Error404'
import Navbar from './components/Navbar'
import Notifiction from './components/Notification'
function App() {
    const { authToken, showAlert } = useContext(UserContext)
    return (
        <>
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
        </>
    )
}

export default App
