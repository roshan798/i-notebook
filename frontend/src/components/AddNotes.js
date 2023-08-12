import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
import UserContext from '../context/user/userContext'

export default function AddNotes() {
    const { addNotes } = useContext(NoteContext)
    const { setShowAlert, setNotificationProp } = useContext(UserContext)
    const [inputDisable, setInputDisable] = useState(false)
    const intialNote = {
        title: '',
        content: '',
    }
    // state for add notes input errors
    const [error, setError] = useState({
        titleError: '',
        contentError: '',
    })
    const [note, setNote] = useState(intialNote)

    //function to remove extra spaces
    function removeExtraSpaces(str) {
        // Replace multiple spaces with a single space
        const trimmedStr = str.replace(/\s+/g, ' ')

        // Remove leading and trailing spaces
        const finalStr = trimmedStr.trim()
        return finalStr
    }

    // Function to check and set errors
    const checkAndSetError = (name, value) => {
        // Remove whitespace characters
        const trimmedValue = value.trim()

        if (trimmedValue.length < 5) {
            setError((prevError) => ({
                ...prevError,
                [`${name}Error`]: `The ${name} should be at least 5 characters long.`,
            }))
        } else {
            setError((prevError) => ({
                ...prevError,
                [`${name}Error`]: '',
            }))
        }
    }

    //return true if there is any error in  the inputs
    const hasError = () => {
        return error.titleError.length !== 0 || error.contentError.length !== 0
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.target

        // Check and set error
        checkAndSetError(name, value)

        setNote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (hasError() === false) {
            let newNote = {
                title: removeExtraSpaces(note.title),
                content: removeExtraSpaces(note.content),
            }

            setInputDisable(true)
            await addNotes(newNote)
            setInputDisable(false)

            // console.log(response);
            setNotificationProp({
                msg: 'Notes Added Successfully',
                closeAlert: setShowAlert,
                type: 'green',
                delay: 3000,
            })
            setShowAlert(true)
            setNote(intialNote)
        }
    }
    return (
        <>
            <form
                className="mt-10 flex flex-col gap-y-2 px-4 sm:mx-auto sm:w-full sm:max-w-sm sm:px-0"
                onSubmit={submitHandler}>
                <label
                    htmlFor="add-title"
                    className="block text-left text-sm font-medium leading-6 text-gray-300">
                    Title <sup className="text-red-500">*</sup>
                    <input
                        type="text"
                        id="add-title"
                        name="title"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={note.title}
                        onChange={onChangeHandler}
                        minLength={5}
                        required
                    />
                </label>
                {error.titleError.length > 0 && (
                    <span className="ml-1  flex items-center text-xs font-medium tracking-wide text-red-500">
                        {error.titleError}
                    </span>
                )}

                <label
                    htmlFor="add-content"
                    className="block text-left text-sm font-medium leading-6 text-gray-300 ">
                    Content <sup className="text-red-500">*</sup>
                    <textarea
                        type="text"
                        id="add-content"
                        name="content"
                        className="block h-16 w-full rounded-md border-0 px-2 py-1.5 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={note.content}
                        onChange={onChangeHandler}
                        minLength={5}
                        required></textarea>
                </label>
                {error.contentError.length > 0 && (
                    <span className="-mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                        {error.contentError}
                    </span>
                )}
                <button
                    disabled={hasError() || inputDisable}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {inputDisable ? 'Pending...' : 'Add note'}
                </button>
            </form>
        </>
    )
}
