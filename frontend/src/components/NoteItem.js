import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const ConfirmDelete = () => {
    return (<>
        <div className="hidden font-mono max-w-sm p-6 bg-white   rounded-lg  dark:bg-white-200  w-full text-left shadow shadow-violet-400 absolute grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-y-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className='col-span-2 font-semibold text-lg '>Are you sure want to this Note?</p>
            <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-red-800 hover:text-white border border-red-500 rounded hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  dark:hover:bg-red-700 dark:focus:ring-red-800'>Delete</button>
            <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Cancel</button>
        </div>
    </>)
}
export default function NoteItem(props) {
    const { deleteNotes } = useContext(NoteContext);
    const deleteHandler = (id) => {
        deleteNotes(id);
    }
    return (
        <div className="max-w-sm p-6 bg-white rounded-lg dark:bg-gray-200  w-full text-left shadow shadow-violet-400 ">
            <a href="/">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-800">{props.notes ? props.notes.title : ""}</h2>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-800">{props.notes ? props.notes.content : ""}</p>
            <div className="icons-container border border-solid  flex flex-row gap-x-2 justify-between">
                <div className='flex gap-x-2'>
                    <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'><i className="fa-solid fa-edit"></i></button>
                    <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => {
                        deleteHandler(props.notes.id);
                    }}><i className="fa-solid fa-trash"></i></button>
                </div>
                <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
            </div>

            <ConfirmDelete />
        </div>
    )
}

