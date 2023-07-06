import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import NoteState from './context/notes/NoteState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NoteState>
        <App />
      </NoteState>
    </BrowserRouter>
  </React.StrictMode >
);
