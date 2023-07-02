import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

export default function AddNotes() {
    const { addNotes } = useContext(NoteContext);
    const intialNote = {
        "title": "",
        "content": ""
    };
    const [note, setNote] = useState(intialNote);

    //function to remove extra spaces
    function removeExtraSpaces(str) {
        // Replace multiple spaces with a single space
        const trimmedStr = str.replace(/\s+/g, ' ');

        // Remove leading and trailing spaces
        const finalStr = trimmedStr.trim();
        return finalStr;
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setNote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let newNote = {
            title: removeExtraSpaces(note.title),
            content: removeExtraSpaces(note.content)
        }
        addNotes(newNote);
        setNote(intialNote)
    }

    return (
        <>
            <form className='mt-10 sm:mx-auto sm:w-full px-4 sm:px-0 sm:max-w-sm flex flex-col gap-y-2' onSubmit={submitHandler}>
                <label htmlFor="add-title" className='block text-sm font-medium leading-6 text-gray-300 text-left'>Title <sup className='text-red-500'>*</sup>
                    <input type="text" id='add-title' name='title' className='block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' value={note.title} onChange={onChangeHandler} required />
                </label>
                <label htmlFor="add-content" className="block text-sm font-medium leading-6 text-gray-300 text-left ">Content <sup className='text-red-500'>*</sup>
                    <input type="text" id='add-content' name='content' className="block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={note.content} onChange={onChangeHandler} required />
                </label>
                <button type="submit" className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >Add note</button>
            </form>
        </>
    )
}
