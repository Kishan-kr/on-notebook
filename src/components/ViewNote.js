import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { noteContext } from '../contexts/NoteContext';
import { AuthContext } from '../contexts/AuthContext';

function ViewNote(props) {
  let navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState('');

  const { note, deleteNote, colors } = useContext(noteContext);
  const { setAlertState } = useContext(AuthContext);

  const formatDate = () => {
    let dt = new Date(note.createdOn);
    dt = dt.toLocaleDateString('en-Us', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    setDate(dt);
  }

  const back = () => {
    navigate('/notes', { replace: true });
  }

  const deletethis = async () => {
    const response = await deleteNote(note._id);
    if (response.success) {
      setAlertState({
        isOn: true,
        type: 'success',
        msg: 'Your note has been successfully deleted'
      })
      back();
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
    if (!note.title) navigate('/notes', { replace: true });

    setTags(note?.tag?.trim().split(','));
    formatDate();

    // eslint-disable-next-line
  }, [note])


  return (
    <div className={`m-0 px-4 noteside d-flex flex-column ${note?.color?.fg}`} style={{ background: note?.color?.bg }}>

      <div className='m-2'>
        <div className="d-flex justify-content-between align-items-center">
          <button title='Back' onClick={back} className={`back btn btn-outline-${note?.color?.fg} p-1 rounded-circle`}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <Link to={'/notes/edit'} role={'button'} className={`btn btn-outline-${note?.color?.fg} p-0 px-1`} title='Edit'>
            <i className="fa-solid fa-pen"></i>
          </Link>

        </div>
        <div className="note-content">
          <h5 title='Title' className='my-2 mb-0 py-1 head'>{note.title}</h5>
          <p className="card-date">{date}</p>
          { /* eslint-disable-next-line */}
          <div className='m-2 tag-list d-flex flex-wrap'>{tags?.map(tag => {
            if (tag.length >= 1)
              return (<div className='tag sub-head border rounded-pill davy-grey px-3 py-0 m-1'>{tag}</div>)
          })}</div>
          <div className="m-2 px-2">
            <p className="davy-grey sub-head">{note.description}</p>
          </div>
        </div>
      </div>
      <footer className='d-flex align-items-center my-1 mt-auto'>
        <div className="colors row border rounded-3 p-1"> {colors.map((color, idx) => {
          return (
            <Color key={idx} color={color} />
          )
        })}</div>
        {/* <div className='line ms-auto mx-1'></div> */}
        <span className='btn btn-outline-danger border-0 p-2 ms-2' title='Delete Note' onClick={deletethis}>
          <i className="fa-solid fa-trash-can" ></i>
        </span>
      </footer>
    </div>
  )
}


const Color = ({ color }) => {
  const { note, setNote, changeBg } = useContext(noteContext);

  return (
    <div
      className="color m-1"
      style={{ background: color.bg }}
      onClick={() => {
        setNote({ ...note, color: color });
        changeBg(note._id, color);
      }}
    ></div>
  )
}

export default ViewNote;