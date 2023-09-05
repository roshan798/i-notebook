import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import UpdateNoteForm from './UpdateNoteForm'
import UserContext from '../context/user/userContext'
import { Link } from 'react-router-dom'
import DialogBox from './DialogBox'

const NoteItem = (props) => {
    const { deleteNotes, showUpdateForm, setShowUpdateForm } =
        useContext(NoteContext)
    const { setShowAlert, setNotificationProp } = useContext(UserContext)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const deleteHandler = async (id) => {
        const response = await deleteNotes(id)
        if (response.success === true) {
            setNotificationProp((prevNotification) => ({
                ...prevNotification,
                type: 'green',
                msg: 'Notes deleted successfully!',
            }))
        } else {
            setNotificationProp((prevNotification) => ({
                ...prevNotification,
                type: 'red',
                msg: 'Error occured while deleting notes!!',
            }))
        }
        setShowAlert(true)
    }

    return (
        <div className="note-card flex flex-col justify-between rounded-lg bg-white p-4 text-left shadow shadow-violet-400 dark:bg-gray-200">
            <div>
                <a href="/">
                    <h2
                        className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap font-[nunito] text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-800"
                        title={props.notes ? props.notes.title : ''}>
                        {props.notes ? props.notes.title : ''}
                    </h2>
                </a>
                <p
                    className="three-line mb-3 font-normal text-gray-700 dark:text-gray-800"
                    title={props.notes ? props.notes.content : ''}>
                    {props.notes ? props.notes.content : ''}
                </p>
            </div>
            <div className="icons-container flex flex-row justify-between gap-x-2">
                <div className="flex gap-x-2">
                    <button
                        title="Edit"
                        className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                            setShowUpdateForm(props.notes.id)
                        }}>
                        <i className="fa-solid fa-edit"></i>
                    </button>
                    <button
                        title="Delete"
                        className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={toggleDeleteModal}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
                <Link
                    to={`/note/${props.notes.id}`}
                    className="group inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg
                        aria-hidden="true"
                        className="-mr-1 ml-2 h-4 w-4 group-hover:animate-horizontal-bounce"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                </Link>
            </div>
            {/* Main modal */}
            {isDeleteModalOpen && (
                <DialogBox
                    id={props.notes.id}
                    toggleModal={toggleDeleteModal}
                    yesClickFunction={deleteHandler}
                />
            )}

            {showUpdateForm === props.notes.id && (
                <UpdateNoteForm notes={props.notes} />
            )}
        </div>
    )
}

export default NoteItem
/*
<div
                    id={`deleteModal-${props.notes.id}`} // Use a unique ID for each delete modal
                    tabIndex="-1"
                    aria-hidden="true"
                    className=" h-modal fixed left-0 right-0 top-0 z-50 grid w-full justify-center overflow-y-auto overflow-x-hidden md:h-full">
                    <div className="relative h-full w-full max-w-md p-4 md:h-auto"> 
                        <div className="relative rounded-lg bg-white p-4 text-center shadow-lg shadow-black backdrop-blur-md dark:bg-[#260a2fd7] sm:p-5">
                            <button
                                type="button"
                                className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900 dark:hover:bg-gray-600 hover:dark:bg-[#260a2fd7] dark:hover:text-white"
                                data-modal-toggle={`deleteModal-${props.notes.id}`} // Use the same unique ID to toggle the modal
                                onClick={toggleDeleteModal}>
                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <svg
                                className="mx-auto mb-3.5 h-11 w-11 text-gray-400 dark:text-gray-500"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                            <p className="mb-4 text-gray-500 dark:text-gray-300">
                                Are you sure you want to delete this item?
                            </p>
                            <div className="flex items-center justify-center space-x-4">
                                <button
                                    data-modal-toggle={`deleteModal-${props.notes.id}`} // Use the same unique ID to toggle the modal
                                    type="button"
                                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 backdrop-blur-md hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-[#260a2fd7] dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-gray-600"
                                    onClick={toggleDeleteModal}>
                                    No, cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                    onClick={() =>
                                        deleteHandler(props.notes.id)
                                    }>
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
*/
