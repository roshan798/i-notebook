import React, { useState, useEffect } from 'react'
import UserContext from './userContext';
const REACT_APP_HOST = "http://localhost";
const REACT_APP_PORT = '8080';
export default function UserState(props) {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [userDetail, setUserDetail] = useState(null)

    const getUser = async () => {
        try {
            const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/api/auth/getUser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
            });

            const result = await response.json();
            // console.log(result);
            if (result.success) {
                return result.user;
            }
            else {
                localStorage.removeItem('token');
                setAuthToken(0);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        if (authToken) {
            (async () => {
                let user = await getUser();
                // console.log(user);
                setUserDetail(user);
            })();
        }
    }, [authToken]);

    return (
        <UserContext.Provider value={{ userDetail, authToken, setAuthToken }} >
            {props.children}
        </UserContext.Provider>
    )
}
