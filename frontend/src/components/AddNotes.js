import React,{useState,useContext} from 'react'
import NoteContext from '../context/notes/noteContext';

// import { Link } from 'react-router-dom'
export default function AddNotes() {
    const {setNotes} = useContext(NoteContext);
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    const titleChangeHandler = (event)=>{
        setTitle(event.target.value)
    }

    const contentChangeHandler = (event)=>{
        setContent(event.target.value)
    }
    
    const submitHandler = (e)=>{
        e.preventDefault();
        let note = {
            id: Math.round(Math.random()* 1e9),
            title:title,
            content:content
        }
        setNotes(notes=>(
            [note,...notes]
        ));
        setContent("");
        setTitle("");
    }

    return (
        <>
            <fieldset>
                <form className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-y-2' onSubmit={submitHandler}>
                    <label htmlFor="title" className='block text-sm font-medium leading-6 text-gray-300 text-left'>Title <sup className='text-red-500'>*</sup>
                        <input type="text" name='title' className='block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' value={title} onChange={titleChangeHandler} required/>
                    </label>
                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-300 text-left ">Content <sup className='text-red-500'>*</sup>
                        <input type="text" name='content' className="block text-lg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={content} onChange={contentChangeHandler} required/>
                    </label>
                    <button type="submit" className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >Add note</button>
                </form>
            </fieldset>
        </>
    )
}
