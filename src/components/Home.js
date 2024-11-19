import React, { useContext } from 'react'
import storageSvg from './illustration/dataStorage.svg';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
  const { isLoggedin } = useContext(AuthContext);
  
  return (
    <div className={`container-fluid row align-items-center p-3 pt-4 ${isLoggedin?'pt-5':''}`}>
        <div className="col-md-6 my-2 hero-text px-3">
          <h1 className="title">Welcome to <span className="text-success">on Notebook</span></h1>
          <h5 className="desc text-start">We offer <span className="text-primary">free cloud storage</span> service to save and maintain your important notes on the cloud, where your notes are fully <span className="text-success">safe</span> and <span className="text-success">secure</span>. </h5>
          <p className='text-start'>You can access your notes anytime and anywhere on the go</p>
          <div className="d-flex my-4">
            <Link type="button" className="btn px-3 btn-dark" to={isLoggedin ? '/notes' : '/signup'}>Get started</Link>
          </div>
        </div>
        <div className="col-md-6 my-2 illustration ">
          <img src={storageSvg} alt="" className="svg" style={{ width: '100%' }} />
        </div>
      </div>
  )
}

export default Home