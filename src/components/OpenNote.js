import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { noteContext } from '../contexts/NoteContext';
import { AuthContext } from '../contexts/AuthContext';

function OpenNote(props) {
    let navigate = useNavigate();
    const { readNote, handleUpdateIcon } = props;
    let tags = readNote.tag.split(',');

    const { deleteNote } = useContext(noteContext);
    const { setAlertState } = useContext(AuthContext);

    const close = () => {
        navigate(-1, { replace: true });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        handleUpdateIcon(readNote);
    }

    const deletethis = async () => {
        const response = await deleteNote(readNote._id);
        if (response.success) {
            setAlertState({
                isOn: true,
                type: 'success',
                msg: 'Your note has been successfully deleted'
            })
            close();
        }
        else {
            setAlertState({
                isOn: true,
                type: 'danger',
                msg: 'Your note has not been deleted due to some error'
            })
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className='m-1 my-3 col-lg-8 border border-2'>
                <div className="modal-header border-bottom-0">
                    <h5 className="modal-title">{readNote.title}</h5>
                    <span role={'button'} className='btn btn-outline-success border-0 p-2 mx-2' title='Edit' onClick={handleUpdate}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </span>
                    <span className='btn btn-outline-warning border-0 p-2' title='Delete' onClick={deletethis}>
                        <i className="fa-solid fa-trash-can" ></i>
                    </span>
                    <Link className="ms-auto" title='Close' to="/notes">
                        <button type="button" className="btn-close" aria-label="Close"></button>
                    </Link>
                </div>
                <div className="body px-5 my-3">
                    <div className="mb-3">
                        <p className=""  >{readNote.description}</p>
                    </div>
                    <div className="mb-3 tag-list">
                        <div className='d-flex flex-wrap'>{tags.map(tag => {
                            return (<div className='tags px-3 m-1'>{tag}</div>)
                        })}</div>
                    </div>
                </div>
                <div className="d-flex my-3 justify-content-center">
                    <button type="button" className="btn btn-secondary px-4 mx-2" onClick={close}>Close</button>

                </div>
            </div>
        </div>
    )
}

export default OpenNote