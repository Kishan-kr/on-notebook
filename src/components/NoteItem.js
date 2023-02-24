import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { noteContext } from '../contexts/NoteContext';
import { AuthContext } from '../contexts/AuthContext';

function NoteItem(props) {
  const { note, handleUpdateIcon, readingNote } = props;
  const { deleteNote } = useContext(noteContext);
  const {setAlertState} = useContext(AuthContext);
  let tags = note.tag.split(',');

  const handleUpdate = (e) => {
    e.preventDefault();
    handleUpdateIcon(note);
  }

  const cardClick = () => {
    readingNote(note);
  }

  const deletethis = async (e) => {
    e.preventDefault();
    const response = await deleteNote(note._id);
    if (response.success) {
      setAlertState({
        isOn: true,
        type: 'success',
        msg: 'Your note has been successfully deleted'
      })
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
    <div className="col-md-6 col-lg-4 col col-xl-3 mx-4 my-3">
      <Link className="card" style={{ width: '18rem', textDecoration: 'none' }} role={'button'} onClick={cardClick} to={`/notes/view`}>
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title} </h5>
            <span role={'button'} className='btn btn-outline-success border-0 p-2 ms-auto' title='Edit' onClick={handleUpdate}>
              <i className="fa-regular fa-pen-to-square"></i>
            </span>
          </div>
          <div className="mb-2 text-muted tag-list">
            <div className='d-flex flex-wrap'>{tags.map(tag => {
              return (<div className='tags px-3 m-1'>{tag}</div>)
            })}</div>
          </div>
          <p className="card-text text-dark">{(note.description.length <= 195) ? note.description : note.description.substring(0, 195) + '...'}</p>
          <div className="d-flex">
            <span className='btn btn-outline-warning border-0 p-2 ms-auto' title='Delete' onClick={deletethis}>
              <i className="fa-solid fa-trash-can" ></i>
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NoteItem