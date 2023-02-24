import { useState, createContext } from "react";
export const noteContext = createContext();

let notesArray = [];

const NoteState = (props) => {
    const [notes, setNote] = useState(notesArray);
    // const host = 'http://localhost:80/api/notes';
    const host = 'https://expensive-gold-cobra.cyclic.app/api/notes';

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
                    setNote(notesArray);
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

    // method for deleting a note of the user with fetch API
    const deleteNote = async (noteId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'auth-token': localStorage.getItem('token') }
        };
        try {
            const response = await fetch(`${host}/deletenote/${noteId}`, requestOptions);
            const json = response.json();
            fetchNotes();
            return json;
        } catch (error) {
            let serverError = true;
            return {serverError,error}
        }
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, fetchNotes, updateNote }}>
            {props.children}
        </noteContext.Provider>
    )
};

export default NoteState;
