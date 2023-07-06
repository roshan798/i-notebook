import './output.css';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NoteContext from './context/notes/noteContext';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  const { authToken } = useContext(NoteContext)
  return (

    <div className="App text-center text-red-700">
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={authToken ? <Home /> : <Navigate to={'/login'} />}></Route>
        <Route exact path='/login' element={authToken ? <Navigate to={'/'} /> : <Login />}></Route>
        <Route exact path='/signup' element={authToken ? <Navigate to={'/'} /> : <Signup />}></Route>
      </Routes>
    </div>

  );
}

export default App;
