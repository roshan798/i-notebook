import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/userContext'

export default function Login() {
    const initialCredential = {
        email: '',
        password: '',
    }
    const navigate = useNavigate()
    const { setAuthToken, loginUser } = useContext(UserContext)
    const { setShowAlert, setNotificationProp } = useContext(UserContext)
    // const [formErrors, setFormErrors] = useState(null);
    const [credentials, setCredentials] = useState(initialCredential)
    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setCredentials((prevCred) => ({
            ...prevCred,
            [name]: value,
        }))
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            let result = await loginUser(credentials)
            if (result.success === true) {
                localStorage.setItem('token', result.authToken)
                setAuthToken(result.authToken)
                setNotificationProp({
                    msg: `Welcome ${result.userDetail.name} !!`,
                    type: 'green',
                    closeAlert: setShowAlert,
                    delay: 5000,
                })
                setShowAlert(true)
                navigate('/')
            } else {
                const errorArray = {}
                if (result.message) {
                    setNotificationProp({
                        msg: 'Invalid email or password. Please login with correct credentials',
                        type: 'red',
                        closeAlert: setShowAlert,
                        delay: 5000,
                    })

                    setShowAlert(true)
                    setCredentials(initialCredential)
                } else if (result.errors) {
                    let errors = result.errors
                    if (errors && errors.length > 0) {
                        errors.forEach((error) => {
                            const { path, msg } = error
                            errorArray[path + 'Error'] = msg
                        })
                        console.log(error)
                    }
                }
                setError(errorArray)
            }
            return result
        } catch (error) {
            console.error('Error:', error)
        }

        setCredentials(initialCredential)
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9   tracking-wide text-[#9fe970]">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-2"
                        action="/"
                        method="POST"
                        onSubmit={onSubmitHandler}>
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
                                    type="email"
                                    value={credentials.email}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={onChangeHandler}
                                />
                                {error.emailError && (
                                    <span className="ml-1 mt-1  flex items-center text-xs font-medium tracking-wide text-red-500">
                                        {error.emailError}
                                    </span>
                                )}
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
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={onChangeHandler}
                                />
                                {error.passwordError && (
                                    <span className="ml-1 mt-1  flex items-center text-xs font-medium tracking-wide text-red-500">
                                        {error.passwordError}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {' '}
                            Create account
                        </Link>
                    </p>
                    {/* {formErrors && <FormErrors error={formErrors} />} */}
                </div>
            </div>
        </>
    )
}
