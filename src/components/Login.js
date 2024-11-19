import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from './illustration/onNotebook.png';

function Login() {
    let navigate = useNavigate();
    const { setIsLoggedin, login, fetchUser, setAlertState } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const loginBtn = useRef(null);
    const demoLoginBtn = useRef(null);

    // Demo account credentials
    const demoCredentials = {
        email: process.env.REACT_APP_DEMO_EMAIL,
        password: process.env.REACT_APP_DEMO_PASSWORD
    };

    // Function to fill input fields on change
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    // Function to change the Login button text after submission
    const toggleLogging = () => {
        loginBtn.current.textContent = loginBtn.current.textContent === 'Logging...' ? 'Login' : 'Logging...';
    };
    
    const toggleDemoLogging = () => {
        demoLoginBtn.current.textContent = demoLoginBtn.current.textContent === 'Logging...' ? 'Login with Demo Account' : 'Logging...';
    };

    // Centralized Login Handler Function
    const performLogin = async (email, password, isDemo = false) => {
        isDemo ? toggleDemoLogging() : toggleLogging();

        const response = await login(email, password);
        if (response.success) {
            setIsLoggedin(true);
            localStorage.setItem('token', response.jwtToken);
            await fetchUser(response.jwtToken);
            setAlertState({
                isOn: true,
                type: 'success',
                msg: 'You have successfully logged in',
            });
            navigate('/notes', { replace: true });
        } else {
            setAlertState({
                isOn: true,
                type: 'danger',
                msg: response.serverError ? 'Internal server error occurred' : Array.isArray(response.error) ? response.error[0].msg : response.error,
            });
            isDemo ? toggleDemoLogging() : toggleLogging();
        }
    };

    // Standard Login Submit Handler
    const handleLogin = (e) => {
        e.preventDefault();
        performLogin(credentials.email, credentials.password);
    };

    // Demo Login Handler
    const loginDemoAccount = () => {
        performLogin(demoCredentials.email, demoCredentials.password, true);
    };

    return (
        <div className="signup-login base d-flex align-items-center login">
            <form className="col-md-6 col-lg-4 col-sm-9 col mx-auto rounded-3 bg-white shadow p-4" onSubmit={handleLogin}>
                <div className="modal-header border-0 text-center d-flex flex-column">
                    <img src={logo} alt="onNotebook Logo" className="logo" />
                    <h5 className="modal-title fs-3 fw-semibold">Login</h5>
                </div>
                <div className="modal-body px-4">
                    <label className="email-label my-1 form-label" htmlFor="login-email">Email</label>
                    <input
                        className="my-1 form-control"
                        type="email"
                        name="email"
                        id="login-email"
                        required
                        onChange={onChange}
                    />
                    <label className="my-1 form-label mt-3" htmlFor="login-password">Password</label>
                    <input
                        className="my-1 form-control"
                        type="password"
                        name="password"
                        id="login-password"
                        required
                        onChange={onChange}
                    />
                </div>
                <div className="border-0 d-grid m-4 px-1">
                    <button ref={loginBtn} type="submit" className="btn btn-sm btn-dark py-3 mt-2">Login</button>
                    <button
                        type="button"
                        ref={demoLoginBtn}
                        className="btn btn-sm btn-outline-dark py-3 mt-2"
                        onClick={loginDemoAccount}
                    >
                        Login with Demo Account
                    </button>
                    <Link to={'/signup'} className="text-center mt-3 text-secondary">
                        Don't have an account?
                        <span className="text-dark fw-medium"> Sign Up</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
