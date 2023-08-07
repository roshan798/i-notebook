import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/user/userContext";

// const FormErrors = (props) => {
//     return (
//         <>
//             <div
//                 className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-500"
//                 role="alert"
//             >
//                 <svg
//                     className="flex-shrink-0 inline w-4 h-4 mr-3 mt-[2px]"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                 >
//                     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//                 </svg>
//                 <span className="sr-only">Info</span>
//                 <div>
//                     <span className="font-medium">
//                         Ensure that these requirements are met:
//                     </span>
//                     <ul className="mt-1.5 ml-4 list-disc list-inside text-left text-blue-400">
//                         <li>
//                             At least 10 characters (and up to 100 characters)
//                         </li>
//                         <li>At least one lowercase character</li>
//                         <li>
//                             Inclusion of at least one special character, e.g., !
//                             @ # ?
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );
// };

export default function Login() {
    const initialCredential = {
        email: "",
        password: "",
    };
    const navigate = useNavigate();
    const { setAuthToken, loginUser, userDetail, setUserDetail } =
        useContext(UserContext);
    const { showAlert, setShowAlert, setNotificationProp } =
        useContext(UserContext);
    // const [formErrors, setFormErrors] = useState(null);
    const [credentials, setCredentials] = useState(initialCredential);
    const [error, setError] = useState({
        emailError: "",
        passwordError: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCred) => ({
            ...prevCred,
            [name]: value,
        }));
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let result = await loginUser(credentials);
            if (result.success === true) {
                localStorage.setItem("token", result.authToken);
                setAuthToken(result.authToken);
                setNotificationProp({
                    msg: `Welcome ${result.userDetail.name} !!`,
                    type: "green",
                    closeAlert: setShowAlert,
                    delay: 5000,
                });
                setShowAlert(true);
                navigate("/");
            } else {
                const errorArray = {};
                if (result.message) {
                    setNotificationProp({
                        msg: "Invalid email or password. Please login with correct credentials",
                        type: "red",
                        closeAlert: setShowAlert,
                        delay: 5000,
                    });

                    setShowAlert(true);
                    setCredentials(initialCredential);
                } else if (result.errors) {
                    let errors = result.errors;
                    if (errors && errors.length > 0) {
                        errors.forEach((error) => {
                            const { path, msg } = error;
                            errorArray[path + "Error"] = msg;
                        });
                        console.log(error);
                    }
                }
                setError(errorArray);
            }
            return result;
        } catch (error) {
            console.error("Error:", error);
        }

        setCredentials(initialCredential);
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9   text-[#9fe970] tracking-wide">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-2"
                        action="/"
                        method="POST"
                        onSubmit={onSubmitHandler}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-300 text-left"
                            >
                                Email address{" "}
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
                                    className="text-lg block w-full font-semibold px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={onChangeHandler}
                                />
                                {error.emailError && (
                                    <span className="flex items-center  font-medium mt-1 tracking-wide text-red-500 text-xs ml-1">
                                        {error.emailError}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block  text-left text-sm font-medium leading-6 text-gray-300 "
                                >
                                    Password{" "}
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
                                    className="block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={onChangeHandler}
                                />
                                {error.passwordError && (
                                    <span className="flex items-center  font-medium mt-1 tracking-wide text-red-500 text-xs ml-1">
                                        {error.passwordError}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            {" "}
                            Create account
                        </Link>
                    </p>
                    {/* {formErrors && <FormErrors error={formErrors} />} */}
                </div>
            </div>
        </>
    );
}
