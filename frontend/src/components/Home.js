import React, { useContext } from 'react'
import AddNotes from './AddNotes'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/noteContext';
import LoadingSpinner from './LoadingSpinner'
const NoNotesMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10  sm:col-start-1 sm:col-end-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-5a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm0-6a1 1 0 011 1v2a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      <p className="text-gray-500 mt-2">No notes available</p>
    </div>
  );
};

export default function Home() {
  const { notes, notesLoading } = useContext(NoteContext);
  return (
    <div>
      <AddNotes />
      <div style={{ width: "inherit" }} className="container flex flex-col max-w-xl mx-4  sm:mx-auto my-6 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center  gap-3">
          <h1 className='text-left text-3xl self-start  text-violet-800  mb-3 sm:col-start-1 sm:col-end-3'>Your Notes</h1>
          {notesLoading ? (
            <LoadingSpinner /> // Render the loading component while notes are loading
          ) : (
              notes && notes.length > 0 ? (
              notes.map((note) => <NoteItem notes={note} key={note.id} />)
            ) : (
              <NoNotesMessage />
            )
          )}
        </div>
      </div>
    </div>
  );
}
