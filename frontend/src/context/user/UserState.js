import React, { useState, useEffect } from 'react'
import UserContext from './userContext'
const api_url = process.env.REACT_APP_BASE_URL

export default function UserState(props) {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'))
    const [userDetail, setUserDetail] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [notificationProp, setNotificationProp] = useState({
        msg: 'Invalid email or password. Please login with correct credentials',
        type: 'red',
        closeAlert: setShowAlert,
        delay: 5000,
    })
    const getUser = async () => {
        try {
            const response = await fetch(`${api_url}/api/auth/getUser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
            })

            const result = await response.json()
            if (result.success) {
                return result.user
            } else {
                localStorage.removeItem('token')
                setAuthToken(0)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const loginUser = async (credentials) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                }
            )
            const result = await response.json()
            return result
        } catch (error) {
            console.error('Error:', error)
        }
    }
    useEffect(() => {
        if (authToken) {
            ;(async () => {
                let user = await getUser()
                setUserDetail(user)
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken])

    return (
        <UserContext.Provider
            value={{
                userDetail,
                setUserDetail,
                authToken,
                setAuthToken,
                loginUser,
                showAlert,
                setShowAlert,
                notificationProp,
                setNotificationProp,
            }}>
            {props.children}
        </UserContext.Provider>
    )
}
