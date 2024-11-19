import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { noteContext } from '../contexts/NoteContext';
import { AuthContext } from '../contexts/AuthContext';

function NoteItem(props) {
  const { note } = props;
  const { setNote, deleteNote } = useContext(noteContext);
  const { setAlertState } = useContext(AuthContext);
  const [date, setDate] = useState('');

  const formatDate = () => {
    let dt = new Date(note.createdOn);
    dt = dt.toLocaleDateString('en-Us', {
      day : '2-digit',
      month : 'short',
      year : 'numeric'
    });

    setDate(dt);
  }
  
  const cardClick = () => {
    setNote(note);
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

  useEffect(() => {
    formatDate();

    // eslint-disable-next-line
  }, [note])
  

  return (
    <Link 
      to={'/notes/view'} 
      title='Open' 
      onClick={cardClick} 
      className={`card ${note.color.fg}`} 
      style={{background: note.color.bg}}>

      <div className="card-info">
        <div className="card-title head mb-0">{(note.title.length <= 20) ? note.title : note.title.substring(0, 20) + '...'}</div>
        <p className="card-date">{date}</p>
        <div className="card-desc sub-head">{(note.description.length <= 112) ? note.description : note.description.substring(0, 112) + '...'}</div>
      </div>
      <div className="card-footer border-0 p-0">
        <button title='Delete' className="container-fluid p-3 delete head  border-end-0" onClick={deletethis}>Delete</button> 
      </div>
    </Link>
  )

}

export default NoteItem