import React from 'react'
import UserContext from './userContext'
export default function UserState(props) {
    return (
        <UserContext.Provider username="Roshan" >
            {props.children}
        </UserContext.Provider>
    )
}
