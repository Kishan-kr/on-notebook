import React, { useContext } from 'react';
import { noteContext } from '../contexts/NoteContext';
import { AuthContext } from '../contexts/AuthContext';

function UpdateNote(props) {
    let {oldNote, setOldNote} = props;
    const { updateNote } = useContext(noteContext);
    const { setAlertState } = useContext(AuthContext);

    const onChange = (event) => {
        setOldNote({...oldNote, [event.target.name ]: event.target.value});
    }

    const handleUpdate = async () => {
        const response = await updateNote(oldNote._id, oldNote.title, oldNote.description, oldNote.tag);
        console.log(response);
        if (response.success) {
            setAlertState({
                isOn: true,
                type: 'success',
                msg: 'Your note has been successfully updated'
            })
        }
        else {
            setAlertState({
                isOn: true,
                type: 'danger',
                msg: 'Your note has not been updated due to server error'
            })
        }
    }

    return (
        <div className="modal fade update-note" id="update-note" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content form-bg">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-5">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" name='title' id="title" value={oldNote.title} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" name='description' id="description" value={oldNote.description} rows="6" onChange={onChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" name='tag' id="tag" value={oldNote.tag} onChange={onChange} />
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-primary px-4" data-bs-dismiss="modal" onClick={handleUpdate}>Update</button>
                        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateNote