import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/LoadingSpinner'
import DialogBox from '../components/DialogBox'
import UpdateNoteForm from '../components/UpdateNoteForm'
import NoteContext from '../context/notes/noteContext'
import UserContext from '../context/user/userContext'

export default function Note() {
    const navigate = useNavigate()
    const { authToken, setShowAlert, setNotificationProp } =
        useContext(UserContext)
    const { deleteNotes, setShowUpdateForm, showUpdateForm } =
        useContext(NoteContext)
    const [note, setNote] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const url = `${process.env.REACT_APP_BASE_URL}/notes/getSingleNote/${id}`
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': authToken,
                    },
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const result = await response.json()
                if (result.success) {
                    setNote(result.response)
                }
            } catch (error) {
                console.error('Error:', error)
            }
            setTimeout(setLoading, 300, false)
        }
        fetchNote()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const deleteHandler = async (id) => {
        const response = await deleteNotes(id)
        if (response.success === true) {
            navigate('/')
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

    const toggleMenu = () => {
        document.getElementById('menu').classList.toggle('hidden')
    }
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="mx-auto p-8 md:w-[45rem]">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col justify-start">
                                <h1 className="text-left text-3xl font-bold uppercase text-gray-200 ">
                                    {note.title}
                                </h1>
                                {/* <div className='text-gray-700 text-left'>
                                    {new Date(note.created_at).toDateString()}
                                </div> */}
                            </div>
                            <button
                                className="relative p-4 text-gray-400 hover:text-gray-100 focus:outline-none"
                                onClick={toggleMenu}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                <div
                                    id="menu"
                                    className="absolute right-8 top-12 hidden w-28 rounded-md  bg-[#9ca3af] shadow shadow-[#6d106d]">
                                    <ul>
                                        <li
                                            className="w-full rounded-t-md border-b p-2 font-semibold text-gray-800 hover:bg-[#581f6b] hover:text-white"
                                            onClick={() => {
                                                setShowUpdateForm(note.id)
                                            }}>
                                            Edit
                                        </li>
                                        <li
                                            className="w-full rounded-b-md p-2 font-semibold text-red-700 hover:bg-red-700 hover:text-white"
                                            onClick={toggleDeleteModal}>
                                            Delete
                                        </li>
                                    </ul>
                                </div>
                            </button>
                        </div>
                        <hr className="mb-3 h-px border-0 bg-gray-200 dark:bg-gray-700" />
                        <p className="text-left text-gray-300">
                            {note.content}
                        </p>
                    </div>
                    {showUpdateForm === note.id && (
                        <UpdateNoteForm notes={note} setNote={setNote} />
                    )}
                </>
            )}
            {isDeleteModalOpen && (
                <DialogBox
                    id={note.id}
                    toggleModal={toggleDeleteModal}
                    yesClickFunction={deleteHandler}
                />
            )}
        </div>
    )
}
