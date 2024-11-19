import { useState, createContext } from "react";
export const noteContext = createContext();

let notesArray = [];

const NoteState = (props) => {
    const [notes, setNotes] = useState(notesArray);
    const [trashNotes, setTrashNotes] = useState(notesArray);
    const [note, setNote] = useState({});
    const host = `${process.env.REACT_APP_API_BASE_URL}/notes`;

    const colors = [
        {bg : '#FFFFFF', fg : 'dark'},
        {bg : '#4F9D69', fg : 'light'},
        {bg : '#648767', fg : 'light'},
        {bg : '#444140', fg : 'light'},
        {bg : '#A9927D', fg : 'dark'},
        {bg : '#84828F', fg : 'light'},
        {bg : '#C04CFD', fg : 'light'},
        {bg : '#5884F3', fg : 'light'},
        {bg : '#DB3C3B', fg : 'light'},
        {bg : '#D7816A', fg : 'light'},
        {bg : '#E9724C', fg : 'light'},
        {bg : '#D64933', fg : 'light'},
        {bg : '#F17300', fg : 'light'},
        {bg : '#CCA43B', fg : 'dark'},
        {bg : '#A594F9', fg : 'dark'},
        // {bg : '#292F36', fg : 'light'},
        // {bg : '#5E2BFF', fg : 'light'},
    ]

    // method for fetching all notes of the user with fetch API
    const fetchNotes = () => {
        // GET request using fetch
        const requestOptions = {
            method: 'GET',
            headers: { 'auth-token': localStorage.getItem('token') }
        };
        try {
            fetch(`${host}/getnote`, requestOptions)
                .then(response => response.json())
                .then(json => {
                    notesArray = json;
                    setNotes(notesArray);
                });
        } catch (error) {
            console.log(error);
        }

    }

    // method for fetching notes in the trash of the user with fetch API
    const getTrash = () => {
        // GET request using fetch
        const requestOptions = {
            method: 'GET',
            headers: { 'auth-token': localStorage.getItem('token') }
        };
        try {
            fetch(`${host}/gettrash`, requestOptions)
                .then(response => response.json())
                .then(json => {
                    setTrashNotes(json);
                });
        } catch (error) {
            console.log(error);
        }

    }

    // method for adding a note with fetch API 
    const addNote = async (title, description, tag = '') => {
        // POST request using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
            body: JSON.stringify({ title, description, tag })
        };
        try {
            const response = await fetch(`${host}/addnote`, requestOptions);
            const json = await response.json();
            fetchNotes();
            return json;
        } catch (error) {
            let serverError = true;
            return {serverError,error}
        }
    }

    // method for updating a note of the user with fetch API
    const updateNote = async (noteId, title, description, tag) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
            body: JSON.stringify({ title, description, tag })
        };
        try {
            const response = await fetch(`${host}/updatenote/${noteId}`, requestOptions);
            const json = await response.json();
            fetchNotes();
            return json;
        } catch (error) {
            let serverError = true;
            return {serverError,error}
        }
    }

    // method to change bgcolor of a note of the user with fetch API
    const changeBg = async (noteId, color) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
            body: JSON.stringify({ bg: color.bg, fg: color.fg })
        };
        try {
            const response = await fetch(`${host}/updatenote/${noteId}`, requestOptions);
            const json = await response.json();
            // fetchNotes();
            return json;
        } catch (error) {
            let serverError = true;
            return {serverError,error}
        }
    }

    // method to permanently delete a note of the user with fetch API
    const permanentDelete = async (noteId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'auth-token': localStorage.getItem('token') }
        };
        try {
            const response = await fetch(`${host}/deletenote/${noteId}`, requestOptions);
            const json = response.json();
            // fetchNotes();
            getTrash();
            return json;
        } catch (error) {
            let serverError = true;
            return {serverError,error}
        }
    }

    // method for deleting a note of the user with fetch API
    const deleteNote = async (noteId) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'auth-token': localStorage.getItem('token') }
        };
        try {
            const response = await fetch(`${host}/deletenote/${noteId}`, requestOptions);
            const json = response.json();
            fetchNotes();
            getTrash();
            return json;
        } catch (error) {
            let serverError = true;
            return {serverError,error}
        }
    }

    // method for restoring a note from the trash of the user with fetch API
    const restoreNote = async (noteId) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'auth-token': localStorage.getItem('token') }
        };
        try {
            const response = await fetch(`${host}/restore/${noteId}`, requestOptions);
            const json = response.json();
            fetchNotes();
            getTrash();
            return json;
        } catch (error) {
            let serverError = true;
            return {serverError,error}
        }
    }


    return (
        <noteContext.Provider 
            value={{ 
                notes, 
                addNote, 
                deleteNote, 
                fetchNotes, 
                updateNote, 
                note, 
                setNote, 
                trashNotes, 
                getTrash, 
                restoreNote, 
                permanentDelete, 
                colors,
                changeBg
            }}>
            {props.children}
        </noteContext.Provider>
    )
};

export default NoteState;
