import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Alert(props) {
    const { alertState, setAlertState } = useContext(AuthContext);
    let alertIcon = alertState.type === 'success' ? 'circle-check' : 'triangle-exclamation';

    const dismissAlert = () => {
        setAlertState({isOn:false});
    }

    if(alertState.isOn) {setTimeout(dismissAlert, 3000);}

    if (alertState.isOn) {
        return (
            <div className="container-fluid d-flex alert-all position-fixed">
                <div className={`shadow alert alert-${alertState.type} alert-dismissible fade show d-flex align-items-center my-2 mx-auto`} role="alert">
                    <span className='mx-2' title='Edit'>
                        <i className={`fa-solid fa-${alertIcon} fa-2x`}></i>
                    </span>
                    <div> {alertState.msg} </div>
                </div>
            </div>
        )
    }
    else
        return null;
}

export default Alert