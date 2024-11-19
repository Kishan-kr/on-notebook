import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from './illustration/onNotebook.png';

function SignUp() {
  let navigate = useNavigate();
  const { setIsLoggedin, signUp, login, fetchUser, setAlertState } = useContext(AuthContext);
  const [user, setUser] = useState({ name: "", email: "", password: "", profession: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password, profession } = user;
  const signupBtn = useRef();
  const loginBtn = useRef();

  // Demo account credentials
  const demoCredentials = { 
    email: process.env.REACT_APP_DEMO_EMAIL, 
    password: process.env.REACT_APP_DEMO_PASSWORD 
  };

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const toggleSigning = () => {
    signupBtn.current.textContent = signupBtn.current.textContent === 'Signing...' ? 'Sign Up' : 'Signing...';
  };
  const toggleLogging = () => {
    loginBtn.current.textContent = loginBtn.current.textContent === 'Logging...' ? 'Login with Demo Account' : 'Logging...';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleSigning();

    const response = await signUp(name, email, password, profession);
    if (response.success) {
      setIsLoggedin(true);
      localStorage.setItem('token', response.jwtToken);
      await fetchUser(response.jwtToken);
      setAlertState({
        isOn: true,
        type: 'success',
        msg: 'You have successfully created your account',
      });
      navigate('/notes', { replace: true });
    } else {
      setAlertState({
        isOn: true,
        type: 'danger',
        msg: response.serverError ? 'Internal server error occurred' : 
        Array.isArray(response.error) ? response.error[0].msg : response.error,
      });
      toggleSigning();
    }
  };

  const loginDemoAccount = async (e) => {
    e.preventDefault();
    toggleLogging();
    const response = await login(demoCredentials.email, demoCredentials.password);
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
      toggleLogging();
    }
    else {
      setAlertState({
        isOn: true,
        type: 'danger',
        msg: Array.isArray(response.error) ? response.error[0].msg : response.error
      })
      toggleLogging();
    }
  }

  return (
    <div className="signup-login py-3 d-flex align-items-center justify-content-center">
      <form className="col-md-6 col-lg-4 col-sm-9 rounded-3 bg-white shadow p-4" onSubmit={handleSubmit}>
        <div className="modal-header border-0 text-center d-flex flex-column">
          <img src={logo} alt="onNotebook Logo" className="logo mb-2" />
          <h5 className="modal-title fs-3">Sign Up</h5>
        </div>
        <div className="modal-body px-4">
          <label className="form-label mt-3" htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            required
            onChange={onChange}
          />

          <label className="form-label mt-3" htmlFor="signup-email">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="signup-email"
            required
            onChange={onChange}
          />

          <label className="form-label mt-3" htmlFor="signup-password">Password</label>
          <div className="input-group mb-3">
            <input
              className="form-control"
              type={showPassword ? "text" : "password"}
              name="password"
              id="signup-password"
              minLength={6}
              required
              onChange={onChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>

          <label className="form-label mt-3" htmlFor="profession">Profession</label>
          <input
            className="form-control"
            type="text"
            name="profession"
            id="profession"
            required
            onChange={onChange}
          />
        </div>
        <div className="d-grid mt-4 px-4">
          <button ref={signupBtn} type="submit" className="btn btn-dark py-3">Sign Up</button>
          <Link to={'/login'} className="text-center mt-3 text-secondary">Already have an account? Log in here</Link>
          <button
            type="button"
            ref={loginBtn}
            className="btn btn-outline-dark py-3 mt-3"
            onClick={loginDemoAccount}
          >
            Login with Demo Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
