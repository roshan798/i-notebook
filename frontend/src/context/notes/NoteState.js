import { useState, useEffect } from 'react';
import NoteContext from './noteContext';
const REACT_APP_HOST = "http://localhost"
const REACT_APP_PORT = '8080'
const t = ":8080/notes/fetchAll";
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
    console.log("Success:", result);
    return result;
  } catch (error) {
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
  try {
    const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
    });


    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default function NoteState(props) {
  const [notes, setNotes] = useState([]);
  // to fetch All notes once
  useEffect(() => {
    //setting  user notes fetched from the db
    (async () => {
      let initialNotes = await getAllNotes(setNotes);
      setNotes(initialNotes)
    })();
  }, [])


  const addNotes = async (newNote) => {
    let notesId = await addNotesToDB(newNote);
    newNote.id = notesId;
    setNotes([newNote, ...notes]);
  }

  const deleteNotes = async (id) => {

    await deleteNotesFromDB(id);
    let newNote = notes.filter(note => note.id !== id);
    setNotes(newNote);
  }
  
  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
