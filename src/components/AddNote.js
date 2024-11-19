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
        <div className='m-0 px-4 noteside'>
            <div className="d-flex justify-content-between my-2 addnote">
                <h4 className=" m-0 mx-2 dark-text">Add new note</h4>
                <Link className="ms-auto " to="/notes">
                <button type="button" className="btn-close" title='Close' aria-label="Close"></button>
                </Link>
            </div>
            <div className="px-2 my-3 ">
                <div className="mb-3">
                    <input type="text" className="form-control title" name='title' id="title" placeholder='Title' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <textarea className="form-control" name='description' id="description" placeholder='Description' rows="10" onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" name='tag' id="tag" placeholder='Tags' onChange={onChange}/>
                </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-success px-4" onClick={add}>Add Note</button>
            </div>
        </div>
    )
}

export default AddNote