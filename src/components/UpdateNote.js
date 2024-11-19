import React, { useContext, useEffect } from 'react';
import { noteContext } from '../contexts/NoteContext';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function UpdateNote() {
  let navigate = useNavigate();
  const { updateNote, note, setNote, deleteNote, colors } = useContext(noteContext);
  const { setAlertState } = useContext(AuthContext);

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  const back = () => {
    navigate(-1, { replace: true });
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

  const handleUpdate = async () => {
    const response = await updateNote(note._id, note.title, note.description, note.tag);
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

  useEffect(() => {
    if (!note.title) navigate('/notes', { replace: true });

    // eslint-disable-next-line
  }, [])

  return (
    <div className={`m-0 px-4 noteside d-flex flex-column ${note?.color?.fg}`} style={{ background: note?.color?.bg }}>
      <div className="d-flex justify-content-between align-items-center">
        <button title='Back' onClick={back} className={`back btn btn-outline-${note?.color?.fg} p-1 rounded-circle`}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <Link to={'/notes/view'} role={'button'}
          onClick={handleUpdate}
          className={`btn btn-outline-${note?.color?.fg} rounded-circle p-0`}
          title='Save'>
          <i className="fa-solid p-2 fa-check"></i>
        </Link>

      </div>
      <div className="px-2 my-2 update">
        <div className="mb-3 ">
          <input type="text" className="form-control head fw-semibold fs-5" placeholder='Title' name='title' id="title" onChange={onChange} value={note.title} />
        </div>
        <div className="m-2 px-2">
          <textarea className="form-control sub-head" placeholder='Description' name='description' id="description" rows="8" onChange={onChange} value={note.description}></textarea>
        </div>
        <div className="m-2 px-2 my-3">
          <input type="text" className="form-control sub-head" placeholder='Tags' name='tag' id="tag" onChange={onChange} value={note.tag} />
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
      className="color m-1 rounded-circle"
      style={{ background: color.bg }}
      onClick={() => {
        setNote({ ...note, color: color });
        changeBg(note._id, color);
      }}
    ></div>
  )
}

export default UpdateNote;