import React, { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import NotesContext from '../context/notes/noteContext';
export default function Navbar() {
    const {setAuthToken} = useContext(NotesContext)
    const navigate = useNavigate()
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthToken(0);
        navigate('/login');
    }
    return (
        <div className='navbar bg-gray-400  h-16  flex flex-row justify-between items-center'>
            <div className="left ml-4" title='i-notebook'>
                <div className="logo">
                    <Link to="/" className='text-blue-800  text-2xl font-extrabold font-serif'>iNotebook</Link>
                </div>
            </div>
            <div className="right  mr-4 w-1/2">
                <ul className='flex gap-x-2 justify-end h-full'>
                    {localStorage.getItem('token') ? <li className={`${location.pathname === '/signup' ? "hidden" : ""}`}>
                        <a href='#' className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" title='logout' onClick={handleLogout}>
                            Logout
                        </a>
                    </li> : <> <li className={`${location.pathname === '/login' ? "hidden" : ""}`}>
                        <Link to="/login" className=" w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" title='login' >
                            Login
                        </Link>
                    </li>
                        <li className={`${location.pathname === '/signup' ? "hidden" : ""}`}>
                            <Link to="/signup" className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" title='signup'>
                                Signup
                            </Link>
                        </li></>}


                </ul>
            </div>
        </div>
    )
}
