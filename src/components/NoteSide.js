import React, { useContext, useEffect, useState } from 'react'
import { noteContext } from '../contexts/NoteContext'
import NoteItem from './NoteItem';
import { Link, useLocation } from "react-router-dom";
import AddNote from './AddNote';
import OpenNote from './OpenNote';

function NoteSide(props) {

    let location = useLocation();

    const { notes, fetchNotes } = useContext(noteContext);

    const [readNote, setReadNote] = useState(notes[0]?notes[0]:{});
    const readingNote = (note) => {
        setReadNote(note);
    }

    useEffect(() => {
        if(localStorage.getItem('token'))
            fetchNotes();
        // eslint-disable-next-line
    }, [])

    if (location.pathname === '/notes') {
        return (
            <>
                <div className="d-flex my-2 align-items-center">
                    <h4 className="notes m-0">Notes</h4>

                    <Link className="ms-auto " to="/notes/addnote">
                        <button type="button" title='Add New Note' className="btn btn-outline-secondary">Add Note</button>
                    </Link>
                </div>
                <div className="container">
                    {!notes[0] ? <p>You do not have any notes, create some using 'Add Note' button</p> :
                        <div className="row">{
                            notes.map(note => {
                                return <NoteItem note={note} key={note._id} handleUpdateIcon={props.handleUpdateIcon} readingNote={readingNote} />
                            })
                        }
                        </div>
                    }
                </div>
            </>
        )
    }
    else if (location.pathname === '/notes/addnote') {
        return (
            <AddNote />
        )
    }
    else if (location.pathname === '/notes/view') {
        return (
            <>
                <div className="d-flex my-2 align-items-center">
                    <h4 className="notes m-0">Notes</h4>
                </div>
                <OpenNote readNote={readNote} setReadNote={setReadNote} handleUpdateIcon={props.handleUpdateIcon} />
            </>
        )
    }
}

export default NoteSide