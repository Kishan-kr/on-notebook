import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// { backgroundColor: '#E4DFDF' }
function SignUp() {
    let navigate = useNavigate();
    const {setIsLoggedin, signUp, fetchUser, setAlertState } = useContext(AuthContext);
    const [user, setUser] = useState({ name: "", email: "", password: "", occupation: "", branch: "" });
    const { name, email, password, occupation, branch } = user;

    const onChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signUp(name, email, password, occupation, branch);
        if (response.success) {
            setIsLoggedin(true);
            localStorage.setItem('token', response.jwtToken);
            await fetchUser(response.jwtToken);
            setAlertState({
                isOn: true,
                type: 'success',
                msg: 'You have successfully created your account'
            })
            navigate('/notes', { replace: true });
        }
        else if (response.serverError) {
            setAlertState({
                isOn: true,
                type: 'danger',
                msg: 'Internal server error occured'
            })
        }
        else {
            setAlertState({
                isOn: true,
                type: 'danger',
                msg: 'Credentials are not valid'
            })
        }
    }

    return (
        <div className="container-fluid py-4 bg-dark">
            <form className="col-md-6 mx-auto border border-3 border-seconday form-bg" onSubmit={handleSubmit}>
                <div className="modal-header border-0">
                    <h5 className="modal-title">Sign Up</h5>
                </div>
                <div className="modal-body px-5 ">
                    <label className=" form-label" htmlFor="name">Name</label>
                    <input className="my-2 form-control" type="text" name="name" id="name" required onChange={onChange} />

                    <label className="email-label my-1 form-label" htmlFor="signup-email">Email</label>
                    <input className="my-2 form-control" type="email" name="email" id="signup-email" required onChange={onChange} />

                    <label className="my-1 form-label" htmlFor="signup-password">Password</label>
                    <input className="my-2 form-control" type="password" name="password" id="signup-password" minLength={6} required onChange={onChange} />

                    <label className="my-1 form-label" htmlFor="confirm-password">Confirm Password</label>
                    <input className="my-2 form-control" type="password" name="confirm-password" id="confirm-password" minLength={6} required />

                    <label className="my-1 form-label" htmlFor="occupation" >Occupation</label>
                    <input className="my-2 form-control" type="text" name="occupation" id="occupation" required onChange={onChange} />
                    
                    <label className="my-1 form-label" htmlFor="occupation-area">Occupation area or branch</label>
                    <input className="my-2 form-control" type="text" name="branch" id="occupation-area" onChange={onChange} />
                </div>
                <div className="modal-footer border-0 d-flex justify-content-center">
                    <button type="submit" className="btn btn-dark px-4">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp