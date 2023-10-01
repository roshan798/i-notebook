import React, { useContext } from 'react'
import AddNotes from '../components/AddNotes'
import NoteCard from '../components/NoteCard'
import NoteContext from '../context/notes/noteContext'
import LoadingSpinner from '../components/LoadingSpinner'
const NoNotesMessage = () => {
    return (
        <div
            style={{ width: 'inherit' }}
            className="mt-10 flex flex-col items-center justify-center  sm:col-start-1 sm:col-end-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-5a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm0-6a1 1 0 011 1v2a1 1 0 11-2 0V6a1 1 0 011-1z"
                    clipRule="evenodd"
                />
            </svg>
            <p className="mt-2 text-gray-500">No notes available</p>
        </div>
    )
}

export default function Home() {
    const { notes, notesLoading } = useContext(NoteContext)
    return (
        <div>
            <AddNotes />
            <div
                style={{ width: 'inherit' }}
                className="container mx-4 my-6 flex min-h-[15rem] max-w-2xl  flex-col sm:mx-auto ">
                <div className=" grid grid-cols-1 justify-items-center gap-x-1 gap-y-3 sm:grid-cols-2">
                    <h1 className="mb-3 self-start text-left  text-3xl  text-violet-800 sm:col-start-1 sm:col-end-3">
                        Your Notes
                    </h1>
                    {notesLoading ? (
                        <LoadingSpinner /> // Render the loading component while notes are loading
                    ) : notes && notes.length > 0 ? (
                        notes.map((note) => (
                            <NoteCard notes={note} key={note.id} />
                        ))
                    ) : (
                        <NoNotesMessage />
                    )}
                </div>
            </div>
        </div>
    )
}
