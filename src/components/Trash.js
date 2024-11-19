import React, { useContext, useEffect } from 'react'
import { noteContext } from '../contexts/NoteContext';
import emptyNotes from './illustration/emptyNotes.svg';
import TrashItem from './TrashItem';

const Trash = () => {

  const { trashNotes, getTrash } = useContext(noteContext);

  useEffect(() => {
    getTrash();

    // eslint-disable-next-line
  }, [])
  
  return (
    <div className='m-0 px-2 noteside'>
      <div className="d-flex my-2 align-items-center">
        <h4 className="notes m-0 mx-3 dark-text">Trash</h4>


      </div>
      <div className="container">
        {!trashNotes[0] ?
          <div className="empty d-flex flex-column justify-content-center align-items-center p-1">
            <img src={emptyNotes} alt="Empty" className='empty-svg m-3' />
            <p className='fs-5 px-4 text-center'>You do not have any notes in your trash</p>

          </div> :

          <div className="row ">{
            trashNotes.map(note => {
              return <TrashItem note={note} key={note._id} />
            })
          }
          </div>
        }
      </div>
      {/* <Link to={'/notes/addnote'} title="Add Note" className="btn btn-add dark-text rounded-circle p-0">
        <i className="fa-solid fa-circle-plus fa-3x "></i>
      </Link> */}
    </div>
  )
}

export default Trash