import { useState, useEffect } from 'react';
import NoteContext from './noteContext';
const REACT_APP_HOST = "http://localhost"
const REACT_APP_PORT = '8080'
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNDE3NDc3Mi0xMGM2LTExZWUtOGRhNS1jODVhY2Y0NDI1NzciLCJpYXQiOjE2ODc0NDI3OTB9.xHJBs3jBV09c02U7JQUEaidu8KpIX6_0FlSPYIflfbA";

// function to get all notes from the backend using fetch api
const getAllNotes = async (setNotes) => {
  try {
    const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/notes/fetchAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
    });

    const result = await response.json();
    // console.log("Success:", result);
    return result;
  } 
  catch (error) {
    console.error("Error:", error);
  }
}
// function to add note tothe backend using fetch api
const addNotesToDB = async (newNote) => {
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
}
// function to delete a note from the backend using fetch api
const deleteNotesFromDB = async (id) => {
  console.log("inside delete db fun", id);
  try {
    const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
    });

    const result = await response.json();
    // console.log("inside delete db fun", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

// function to delete a note from the backend using fetch api

const updateNotesFromDB = async (id, updatedNote) => {
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
    // console.log("inside updatedNoteDB ", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default function NoteState(props) {
  const [notes, setNotes] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(-1);
  // to fetch All notes once
  useEffect(() => {
    //setting  user notes fetched from the db
    (async () => {
      let initialNotes = await getAllNotes(setNotes);
      setNotes(initialNotes)
    })();
  }, [])


  const addNotes = async (newNote) => {
    try {
      let response = await addNotesToDB(newNote);
      newNote.id = response.notesId;

      setNotes([newNote, ...notes]);
      return response;
    } catch (error) {
      return error;
    }
  }

  const deleteNotes = async (id) => {

    const response = await deleteNotesFromDB(id);
    // console.log(response);
    // console.log("inside delete", id);
    let newNote = notes.filter(note => {
      // console.log(note);
      return note.id !== id;
    });
    // console.log("NEW NOTES = ", newNote)
    setNotes(newNote);
  }

  const updateNotes = async (id, note) => {
    try {
      const response = await updateNotesFromDB(id, note);
      //error occured in while updating in the db
      if (response.error)
        return response;
      // / after updating to the db setNotes update the note in <DOM></DOM>
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

  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, updateNotes, showUpdateForm, setShowUpdateForm }}>
      {props.children}
    </NoteContext.Provider>
  )
}
