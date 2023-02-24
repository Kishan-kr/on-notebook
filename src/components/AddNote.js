import React, {useState, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { noteContext } from '../contexts/NoteContext';
import { AuthContext } from '../contexts/AuthContext';

function AddNote() {
    const { addNote } = useContext(noteContext);
    const { setAlertState } = useContext(AuthContext);
    const [note, setNote] = useState({title:'', description:'', tag:''});
    let navigate = useNavigate();

    const onChange = (event) => {
        setNote({...note, [event.target.name ]: event.target.value});
    }

    const add = async ()=> {
        if(note.title !== '' && note.description !== '') {
            const response = await addNote(note.title,note.description,note.tag);
            if (response.success) {
                setAlertState({
                  isOn: true,
                  type: 'success',
                  msg: 'Your note has been successfully added'
                })
              }
              else {
                setAlertState({
                  isOn: true,
                  type: 'danger',
                  msg: 'Your note has not been added due to some error'
                })
              }
        }
        navigate(-1);
    }

    return (
        <div className='m-2'>
            <div className="modal-header border-bottom-0">
                <h5 className="modal-title">Add new note</h5>
                <Link className="ms-auto " to="/notes">
                <button type="button" className="btn-close" title='Close' aria-label="Close"></button>
                </Link>
            </div>
            <div className="body px-5 my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' id="title" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" name='description' id="description" rows="6" onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" name='tag' id="tag" onChange={onChange}/>
                </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-success px-4" onClick={add}>Add Note</button>
            </div>
        </div>
    )
}

export default AddNote