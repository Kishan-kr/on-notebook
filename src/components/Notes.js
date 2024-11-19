import React, { useRef, useState, useEffect } from 'react'
import NoteSide from './NoteSide';
import Profile from './Sidebar';
import UpdateNote from './UpdateNote';
import { useNavigate } from 'react-router-dom';

function Notes() {
    let navigate = useNavigate();
    const updateModal = useRef();
    const [oldNote, setOldNote] = useState({ title: '', description: '', tag: '' });
    
    // method to toggle update modal and pass note's initial values 
    const handleUpdateIcon = (note) => {
        setOldNote(note);
        updateModal.current.click();
    }

    useEffect(() => {
        // if user is not logged in it will redirect to login page 
        if(!localStorage.getItem('token')) {
           return navigate("/login");
        }
        // eslint-disable-next-line
    },[localStorage.getItem('token')]);

    return (
        <div className="container-fluid">
            <div className="row flex-xl-nowrap">
                <div className="col-md-3 col-xl-2 bd-sidebar bg-dark-grey text-light">
                    <Profile />
                </div>
                <main className="note-side col-md-9 col-xl-10 py-md-3" role="main">
                    <NoteSide handleUpdateIcon={handleUpdateIcon} />
                </main>
            </div>
            <button type="button" ref={updateModal} className="btn d-none" data-bs-toggle="modal" data-bs-target="#update-note">
                Launch login modal
            </button>
            <UpdateNote oldNote={oldNote} setOldNote={setOldNote} />
        </div>
    )
}

export default Notes