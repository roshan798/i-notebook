import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
export default function UpdateNoteForm(props) {
    console.log("inside update", props);
    const { setShowUpdateForm } = useContext(NoteContext)
    const { notes } = props;
    function submitHandler() {

    }
    function onChangeHandler() {

    }
    return (
        <div className='fixed top-0 left-0 w-full h-full mt-16 ' onClick={() => {
            setShowUpdateForm(false)
        }}>
            <div className="fixed bg-white p-6 rounded-md shadow-lg max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={() => {
                    setShowUpdateForm(false);
                }}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <form className='mt-10 sm:mx-auto sm:w-full px-4 sm:px-0 sm:max-w-sm flex flex-col gap-y-2' onSubmit={submitHandler}>
                    <label htmlFor="title" className='block text-sm font-medium leading-6 text-gray-400 text-left'>Title <sup className='text-red-500'>*</sup>
                        <input type="text" name='title' className='block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' value={notes.title} onChange={onChangeHandler} required />
                    </label>
                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-400 text-left ">Content <sup className='text-red-500'>*</sup>
                        <input type="text" name='content' className="block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={notes.content} onChange={onChangeHandler} required />
                    </label>
                    <button type="submit" className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >Update note</button>
                </form>

            </div>
        </div>
    )
}
