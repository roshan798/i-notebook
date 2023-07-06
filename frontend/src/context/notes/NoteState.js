import { useState, useEffect } from 'react';
import NoteContext from './noteContext';
import { useNavigate } from 'react-router-dom';
const REACT_APP_HOST = "http://localhost";
const REACT_APP_PORT = '8080';

export default function NoteState(props) {
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  // state which will show/hide the alert
  const [showAlert, setShowAlert] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(-1);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  // to fetch all notes once
  useEffect(() => {
    // Setting user notes fetched from the db
    (async () => {
      console.log("effect running");
      if (authToken) {
        let initialNotes = await getAllNotes(authToken);
        setNotes(initialNotes);
      }
      else {
        // navigate('/signup');
        
        // console.log("object");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  // Function to get all notes from the backend using fetch api
  const getAllNotes = async (authToken) => {

    try {
      const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/notes/fetchAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
      });

      const result = await response.json();
      setNotesLoading(false);
      if (result.success) {
        return result.notes;
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setNotesLoading(false);
  };

  // Function to add a note to the backend using fetch api
  const addNotesToDB = async (authToken, newNote) => {
    try {
      const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(newNote)
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to delete a note from the backend using fetch api
  const deleteNotesFromDB = async (authToken, id) => {
    try {
      const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/notes/deleteNotes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

  // Function to update a note in the backend using fetch api
  const updateNotesFromDB = async (authToken, id, updatedNote) => {
    try {
      const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/notes/updateNotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(updatedNote)
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to add a note
  const addNotes = async (newNote) => {
    if (authToken) {
      try {
        let response = await addNotesToDB(authToken,newNote);
        if (response.success === true) {
          newNote.id = response.notesId;
          setNotes([newNote, ...notes]);
        }
        else {
          //set error
        }
        return response;
      } catch (error) {
        return error;
      }
    }
  };

  // Function to delete a note
  const deleteNotes = async (id) => {
    const authToken = localStorage.getItem('token')
    if (authToken) {
      const response = await deleteNotesFromDB(authToken, id);
      let newNote = notes.filter((note) => {
        return note.id !== id;
      });
      setNotes(newNote);
    }
    navigate('/signup')
  };


  // Function to update a note
  const updateNotes = async (id, note) => {
    if (authToken) {
      try {
        const response = await updateNotesFromDB(id, note);
        if (response.error) {
          return response;
        }

        // After updating the note in the db, update the note in the DOM
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.map((prevNote) => {
            if (prevNote.id === id) {
              return { ...note };
            }
            return prevNote;
          });
          return updatedNotes;
        });
        return response;
      } catch (error) {
        console.log(error.message);
      }
    }
    else {
      navigate('/signup')
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, updateNotes, showUpdateForm, setShowUpdateForm, showAlert, setShowAlert, notesLoading, setNotesLoading,setAuthToken,authToken }}>
      {props.children}
    </NoteContext.Provider>
  );
}
