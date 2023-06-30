import './output.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <NoteState>
      <div className="App text-center text-red-700">
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/about' element={<About />}></Route>
        </Routes>
      </div>
    </NoteState>
  );
}

export default App;
