import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const toggleDeleteModal = () => {
    document.getElementById('deleteModal').classList.toggle('hidden');

}
export default function NoteItem(props) {
    const { deleteNotes } = useContext(NoteContext);
    const limitWords = (content, limit) => {
        const words = content.split(' ');
        if (words.length > limit) {
            const truncatedContent = words.slice(0, limit).join(' ');
            return truncatedContent + '...'; // Add ellipsis after the truncated content
        }
        return content;
    };

    // delete a note
    const deleteHandler = (id) => {
        deleteNotes(id);
    }

    const editHandler = (e) => {

    }
    return (
        <div className="max-w-sm p-6 bg-white rounded-lg dark:bg-gray-200  w-full text-left shadow shadow-violet-400 ">
            <a href="/">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-800" title={props.notes ? props.notes.title : ""}>{props.notes ? limitWords(props.notes.title, 5) : ""}</h2>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-800" title={props.notes ? props.notes.content : ""}>{props.notes ? limitWords(props.notes.content, 15) : ""}</p>
            <div className="icons-container border border-solid  flex flex-row gap-x-2 justify-between">
                <div className='flex gap-x-2'>
                    <button title='Edit' className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'><i className="fa-solid fa-edit"></i></button>
                    <button title='Delete' className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={toggleDeleteModal}>
                        <i className="fa-solid fa-trash"></i></button>
                </div>
                <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
            </div>
            {/* confirm Delete modal */}
            {/* <!-- Main modal --> */}
            <div id="deleteModal" tabindex="-1" aria-hidden="true" class="hidden  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-modal md:h-full">
                <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={toggleDeleteModal}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"  ></path></svg>
                        <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                        <div class="flex justify-center items-center space-x-4">
                            <button data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={toggleDeleteModal}>
                                No, cancel
                            </button>
                            <button type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={() => deleteHandler(props.notes.id)}>
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

