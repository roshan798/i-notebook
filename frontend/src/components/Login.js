import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';
const REACT_APP_HOST = "http://localhost";
const REACT_APP_PORT = '8080';

export default function Login() {
    const navigate = useNavigate();
    const { setAuthToken } = useContext(NoteContext)
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        emailError: "",
        passwordError: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setCredentials(prevCred => (
            {
                ...prevCred,
                [name]: value,
            }
        ));
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        /// this will be moved to user context 
        try {
            const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
            });

            const result = await response.json();
            console.log(result);
            if (result.success === true) {
                localStorage.setItem("token", result.authToken);
                setAuthToken(result.authToken)
                navigate('/');
            }
            else {
                // will set a notification which will say to try again
            }
            return result;
        } catch (error) {
            console.error("Error:", error);
        }

        setCredentials({
            email: "",
            password: ""
        });
    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9   text-[#9fe970] tracking-wide">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" action="/" method="POST" onSubmit={onSubmitHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300 text-left">Email address <sup className='text-red-500'>*</sup></label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" value={credentials.email} autoComplete="email" required className="text-lg block w-full font-semibold px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={onChangeHandler} />
                                {(error.emailError.length > 0) && <span className="flex items-center  font-medium mt-1 tracking-wide text-red-500 text-xs ml-1">
                                    {error.emailError}
                                </span>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block  text-left text-sm font-medium leading-6 text-gray-300 ">Password <sup className='text-red-500'>*</sup></label>

                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" value={credentials.password} type="password" autoComplete="current-password" required className="block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={onChangeHandler} />
                                {(error.passwordError.length > 0) && <span className="flex items-center  font-medium mt-1 tracking-wide text-red-500 text-xs ml-1">
                                    {error.passwordError}
                                </span>}
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?
                        <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Create account</Link>
                    </p>
                </div>
            </div>
        </>
    )
}