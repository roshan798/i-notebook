import React, { useEffect, useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
export default function About({ message }) {
    const { setShowAlert } = useContext(NoteContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <div className="fixed bottom-0 right-0 m-4 bg-green-500 text-white py-2 px-4 rounded-md transition-opacity duration-500">
                {message}
                <div className="h-1 bg-green-700 rounded-md mt-2 w-full" />
            </div>
        </>
    );
};


