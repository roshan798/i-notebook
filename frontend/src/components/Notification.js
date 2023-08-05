import React, { useEffect } from 'react';
export default function Notifiction(props) {
    const { delay, type, closeAlert, msg } = props;

    useEffect(() => {
        const timer = setTimeout(() => {
            closeAlert(false);
        }, delay);

        // for now it is of no use
        return () => {
            clearTimeout(timer);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>

            <div className={`${type === 'green' ? 'bg-green-100' : 'bg-red-100'} text-${type}-900 rounded px-4 shadow-black py-3 shadow-md fixed top-12 right-4 z-10`} role="alert">

                <div className="flex">
                    <div className="py-1">
                        <svg className={`fill-current h-6 w-6 ${type === 'green' ? 'text-green-900' : 'text-red-900'} mr-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold mt-1">{msg}</p>
                    </div>
                </div>
                <div className={`absolute top-0 left-0 w-0 h-2 ${type === 'green' ? 'bg-green-900' : 'bg-red-900'} animate-widening rounded-t-sm`}></div>
            </div >

        </>
    );
};


