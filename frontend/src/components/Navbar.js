import { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../context/user/userContext'

const UserMenu = () => {
    const { setAuthToken } = useContext(UserContext)
    // get user data
    const { userDetail } = useContext(UserContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        setAuthToken(0)
        navigate('/login')
    }
    return (
        <>
            <div
                className="absolute right-0 top-12 z-50 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg shadow-black backdrop-blur-md  dark:divide-gray-600 dark:bg-[#260a2fb2]"
                id="user-dropdown">
                <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                        {userDetail.name}
                    </span>
                    <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                        {userDetail.email}
                    </span>
                </div>
                <hr />
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleLogout}>
                            Sign out
                        </button>
                    </li>
                </ul>
            </div>
            <div className="fixed inset-0"></div>
        </>
    )
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { authToken } = useContext(UserContext)

    const location = useLocation()

    const toggleMenu = () => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)
    }

    return (
        <div className="navbar flex h-16 flex-row items-center justify-between bg-gray-400">
            <div className="left ml-4" title="i-notebook">
                <div className="logo">
                    <Link
                        to="/"
                        className="font-serif text-2xl font-extrabold text-blue-800">
                        iNotebook
                    </Link>
                </div>
            </div>
            <div className="right mr-4 w-1/2">
                <ul className="flex h-full justify-end gap-x-2">
                    {authToken ? (
                        <li className="relative" onClick={toggleMenu}>
                            <button
                                type="button"
                                className="mr-3 flex rounded-full border bg-gray-800 text-sm focus:ring-4 focus:ring-[#260a2f98] md:mr-0"
                                id="user-menu-button"
                                aria-expanded={isMenuOpen ? 'true' : 'false'}>
                                <img
                                    className="h-9 w-9 rounded-full border border-[#260a2f71]"
                                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                    alt="user"
                                />
                            </button>
                            {isMenuOpen && <UserMenu />}
                        </li>
                    ) : (
                        <>
                            <li
                                className={`${
                                    location.pathname === '/login'
                                        ? 'hidden'
                                        : ''
                                }`}>
                                <Link
                                    to="/login"
                                    className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    title="login">
                                    Login
                                </Link>
                            </li>
                            <li
                                className={`${
                                    location.pathname === '/signup'
                                        ? 'hidden'
                                        : ''
                                }`}>
                                <Link
                                    to="/signup"
                                    className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    title="signup">
                                    Signup
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
