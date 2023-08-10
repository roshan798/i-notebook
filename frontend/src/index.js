import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import NoteState from './context/notes/NoteState'
import UserState from './context/user/UserState'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserState>
                <NoteState>
                    <App />
                </NoteState>
            </UserState>
        </BrowserRouter>
    </React.StrictMode>
)
