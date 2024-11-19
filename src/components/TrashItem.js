import React, { useContext, useEffect, useState } from 'react';
import { noteContext } from '../contexts/NoteContext';
import { AuthContext } from '../contexts/AuthContext';

function TrashItem(props) {
  const { note } = props;
  const { restoreNote, permanentDelete } = useContext(noteContext);
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

  const deletethis = async (e) => {
    e.preventDefault();
    const response = await permanentDelete(note._id);
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

  const restoreThis = async (e) => {
    e.preventDefault();
    const response = await restoreNote(note._id);
    if (response.success) {
      setAlertState({
        isOn: true,
        type: 'success',
        msg: 'Your note has been successfully restored'
      })
    }
    else {
      setAlertState({
        isOn: true,
        type: 'danger',
        msg: 'Your note has not been restored due to some error'
      })
    }
  }

  useEffect(() => {
    formatDate();

    // eslint-disable-next-line
  }, [note])
  

  return (
    <div className={`card m-3 ${note.color.fg}`} style={{background: note.color.bg}}>
      <div className="card-info">
        <div className="card-title head mb-0">{(note.title.length <= 20) ? note.title : note.title.substring(0, 20) + '...'}</div>
        <p className="card-date">{date}</p>
        <div className="card-desc sub-head">{(note.description.length <= 112) ? note.description : note.description.substring(0, 112) + '...'}</div>
      </div>
      <div className="card-footer border-0 d-flex p-0">
        <button title='Delete' className="container-fluid p-3 delete head" onClick={deletethis}>Delete</button> 
        <button title='Restore' className="container-fluid p-3 restore head" onClick={restoreThis}>Restore</button> 
      </div>
    </div>
  )

}

export default TrashItem;