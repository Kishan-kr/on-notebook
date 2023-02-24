import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
    let navigate = useNavigate();
    const {setIsLoggedin, login, fetchUser, setAlertState } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await login(credentials.email, credentials.password);
        if (response.success) {
            setIsLoggedin(true);
            localStorage.setItem('token', response.jwtToken);
            await fetchUser(response.jwtToken);
            setAlertState({
                isOn: true,
                type: 'success',
                msg: 'You have successfully logged in'
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
        <div className="container-fluid d-flex align-items-center bg-dark login">
            <form className="col-md-5 mx-auto border border-3 border-seconday form-bg" onSubmit={handleLogin}>
                <div className="modal-header border-0">
                    <h5 className="modal-title">Login</h5>
                </div>
                <div className="modal-body px-5">
                    <label className="email-label my-1 form-label" htmlFor="login-email">Email</label>
                    <input className="my-1 form-control" type="email" name="email" id="login-email" required onChange={onChange} />
                    <label className="my-1 form-label" htmlFor="login-password">Password</label>
                    <input className="my-1 form-control" type="password" name="password" id="login-password" required onChange={onChange} />
                </div>
                <div className="modal-footer border-0 d-flex justify-content-center">
                    <button type="submit" className="btn btn-dark px-4">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login