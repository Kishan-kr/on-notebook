import React, { useContext, useEffect } from 'react'
import { noteContext } from '../contexts/NoteContext'
import NoteItem from './NoteItem';
import { Link, useNavigate } from "react-router-dom";
import emptyNotes from './illustration/emptyNotes.svg';

function NoteSide() {
    
    let navigate = useNavigate();

    const { notes, fetchNotes } = useContext(noteContext);

    useEffect(() => {
        // if user is not logged in it will redirect to login page 
        if(!localStorage.getItem('token')) {
           return navigate("/login");
        }
        // eslint-disable-next-line
    },[localStorage.getItem('token')]);

    useEffect(() => {
        if (localStorage.getItem('token'))
            fetchNotes();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='m-0 px-2 noteside'>
            <div className="d-flex my-2 align-items-center">
                <h4 className="m-0 mx-3 dark-text">Notes</h4>


            </div>
            <div className="container">
                {!notes[0] ?
                    <div className="empty d-flex flex-column justify-content-center align-items-center p-1">
                        <img src={emptyNotes} alt="Empty" className='empty-svg m-3' />
                        <p className='fs-5 px-4 text-center'>You do not have any notes, Please add some</p>
                        <Link className="" to="/notes/addnote">
                            <button className='btn btn-outline-success'>Add Notes</button>
                        </Link>

                    </div> :

                    <div className="row notes-container">{
                        notes.map(note => {
                            return <NoteItem key={note._id} note={note}/>
                        })
                    }
                    </div>
                }
            </div>
            <Link to={'/notes/addnote'} title="Add Note" className="btn btn-add dark-text rounded-circle p-0">
                <i className="fa-solid fa-circle-plus fa-3x "></i>
            </Link>
        </div>
    )
}

export default NoteSide