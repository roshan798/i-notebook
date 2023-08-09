import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import UserContext from "../context/user/userContext";
export default function UpdateNoteForm(props) {
    const { setShowUpdateForm, updateNotes } = useContext(NoteContext);
    const { setNotificationProp, setShowAlert } = useContext(UserContext);

    //state for the update note form
    const [notes, setNotes] = useState(props.notes);
    const [inputDisable, setInputDisable] = useState(false);

    async function submitHandler(e) {
        e.preventDefault();
        if (notes.title.length >= 5 && notes.content.length >= 5) {
            try {
                setInputDisable(true);
                const response = await updateNotes(props.notes.id, notes);
                if (!response.error) {
                    setNotificationProp((prevProp) => ({
                        ...prevProp,
                        type: "green",
                        msg: "notes update successfully",
                    }));
                    setShowAlert(true);
                }
            } catch (error) {
                console.log(error);
            }
            //it will toggle the visiblity of update form
            setInputDisable(false);
            setShowUpdateForm(-1);
        }
    }
    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setNotes((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    };

    return (
        <div className="fixed z-10 bg-white p-6 w-1/2 max-w-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   rounded shadow-lg shadow-black dark:bg-[#260a2fd7] backdrop-blur-md">
            <button
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="deleteModal"
                onClick={() => {
                    setShowUpdateForm(-1);
                }}
            >
                <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <form
                className="mt-10 sm:mx-auto sm:w-full px-4 sm:px-0 sm:max-w-sm flex flex-col gap-y-2"
                onSubmit={submitHandler}
            >
                <label
                    htmlFor="edit-title"
                    className="block text-sm font-medium leading-6 text-gray-400 text-left"
                >
                    Title <sup className="text-red-500">*</sup>
                    <input
                        type="text"
                        id="edit-title"
                        name="title"
                        className="block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={notes.title}
                        onChange={onChangeHandler}
                        required
                    />
                </label>
                <label
                    htmlFor="edit-content"
                    className="block text-sm font-medium leading-6 text-gray-400 text-left "
                >
                    Content <sup className="text-red-500">*</sup>
                    <input
                        type="text"
                        id="edit-content"
                        name="content"
                        className="block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={notes.content}
                        onChange={onChangeHandler}
                        required
                    />
                </label>
                <button
                    disabled={inputDisable}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {inputDisable ? "Pending..." : "Update note"}
                </button>
            </form>
        </div>
    );
}
