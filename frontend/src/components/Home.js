import React, { useContext } from 'react'
import AddNotes from './AddNotes'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/noteContext';
export default function Home() {
  const context = useContext(NoteContext);
  console.log(context)
  return (
    <div>
      <AddNotes />
      <div className="container flex flex-col max-w-sm mx-auto my-6">
        <h1 className='text-left text-3xl text-violet-800  mb-3'>Your Notes</h1>
        <div className="flex flex-col justify-center items-center gap-3">
          {context.notes.map((note) => <NoteItem notes={note} key={note.id} />)}
        </div>
      </div>
    </div>
  )
}
