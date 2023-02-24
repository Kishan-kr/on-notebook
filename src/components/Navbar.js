import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logo from "./illustration/onNotebook.png";

function Navbar() {
    const {isLoggedin, setIsLoggedin} = useContext(AuthContext);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedin(false);
    }

    return (
        <nav className="navbar nav navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand my-0 p-0" to="/">
                    <img src={logo} alt="on Notebook" height={"54px"}/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/notes">Notes</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        {
                        !isLoggedin ? <Link className="btn btn-outline-light" type="button" to={'/login'}>Log In</Link> : 
                        <Link className="btn btn-outline-light" type="button" onClick={handleLogout} to={'/'} >Log Out</Link>
                        }
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;