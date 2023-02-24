import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import storageSvg from './illustration/dataStorage.svg';
import { AuthContext } from '../contexts/AuthContext';

function Home() {
    const {isLoggedin} = useContext(AuthContext);
    return (
        <>
        <div className='container home d-flex align-items-center'>
            <div className="container-fluid row align-items-center">
                <div className="col-md-6 my-2 hero-text">
                    <h1 className="title">Welcome to <span className="text-success">on Notebook</span></h1>
                    <h5 className="desc text-start">We offer <span className="text-primary">free cloud storage</span> service to save and maintain your important notes on the cloud, where your notes are fully <span className="text-success">safe</span> and <span className="text-success">secure</span>. </h5>
                    <p className='text-start'>You can access your notes anytime and anywhere on the go</p>
                    <div className="d-flex my-3">
                        <Link type="button" className="btn px-3 btn-dark" to={isLoggedin ? '/notes' : '/signup'}>Get started</Link>
                    </div>
                </div>
                <div className="col-md-6 my-2 illustration">
                    <img src={storageSvg} alt="svg not found" className="svg" style={{width:'100%'}} />
                </div>
            </div>
        </div>
        </>
    )
}

export default Home