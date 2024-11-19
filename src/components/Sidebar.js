import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'
import logo from "./illustration/onNotebook.png";

function Sidebar({closeNav}) {

  const { isLoggedin, setIsLoggedin } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedin(false);
  }

  return (
    <>
    <div className="d-flex align-items-center">
      <Link className="my-1 p-0" to="/">
        <img src={logo} alt="on Notebook" height={"60px"} />
      </Link>
      <button className="close-nav btn btn-light p-2 border ms-auto" onClick={closeNav}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>

      <NavLink to='/' className="nav-link tab d-flex align-items-center rounded-3 p-1 px-2 my-1 mt-3">
        <i className='fa-solid fa-house'></i>
        <span className='p-1 mx-2'>Home</span>
      </NavLink>
      <NavLink to={'/notes'} className="nav-link tab d-flex align-items-center rounded-3 p-1 px-2 my-1">
        <i className='fa-solid fa-note-sticky'></i>
        <span className='p-1 mx-2'>Notes</span>
      </NavLink>
      <NavLink to={'/trash'} className="nav-link tab d-flex align-items-center rounded-3 p-1 px-2 my-1">
        <i className='fa-solid fa-trash'></i>
        <span className='p-1 mx-2'>Trash</span>
      </NavLink>

      {!isLoggedin ?
        <Link to={'/login'} className="nav-link tab mt-auto d-flex align-items-center rounded-3 p-1 px-2 my-1">
          <i className='fa-solid fa-right-to-bracket'></i>
          <span className='p-1 mx-2'>Login</span>
        </Link> :

        <Link to={'/'} onClick={handleLogout} className="nav-link tab mt-auto d-flex align-items-center rounded-3 p-1 px-2 my-1">
          <i className='fa-solid fa-right-from-bracket'></i>
          <span className='p-1 mx-2'>Logout</span>
        </Link>
      }
    </>
  )
}

export default Sidebar