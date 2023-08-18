import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/userContext'
export default function Signup() {
    const { setNotificationProp, setShowAlert } = useContext(UserContext)
    const navigate = useNavigate()
    const intialCredentials = {
        name: '',
        email: '',
        password: '',
    }
    const [credentials, setCredentials] = useState(intialCredentials)
    const onChangeHandler = (e) => {
        let { name, value } = e.target
        setCredentials((prevCred) => ({
            ...prevCred,
            [name]: value,
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/auth/createUser`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                }
            )

            const result = await response.json()
            if (result.success) {
                setNotificationProp((prevNotification) => ({
                    ...prevNotification,
                    type: 'green',
                    msg: 'Account created successfully.',
                }))
                navigate('/login')
            } else {
                setNotificationProp((prevNotification) => ({
                    ...prevNotification,
                    type: 'red',
                    msg: result.error,
                }))
            }
            setShowAlert(true)
            setCredentials(intialCredentials)
            return result
        } catch (error) {
            console.error('Error:', error)
        }
        setCredentials(intialCredentials)
    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-wide  text-[#9fe970]">
                        Sign up to a new account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        method="POST"
                        onSubmit={onSubmitHandler}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-left text-sm font-medium leading-6 text-gray-300">
                                Full name <sup className="text-red-500">*</sup>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    value={credentials.name}
                                    onChange={onChangeHandler}
                                    type="name"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-left text-sm font-medium leading-6 text-gray-300">
                                Email address{' '}
                                <sup className="text-red-500">*</sup>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={onChangeHandler}
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block  text-left text-sm font-medium leading-6 text-gray-300 ">
                                    Password{' '}
                                    <sup className="text-red-500">*</sup>
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={onChangeHandler}
                                    type="password"
                                    autoComplete="current-password"
                                    min={5}
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm  text-gray-500">
                        Already have an account?
                        <Link
                            to="/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {' '}
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
