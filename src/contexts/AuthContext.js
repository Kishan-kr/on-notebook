
import React, { useState, createContext, useEffect } from "react";
export const AuthContext = createContext();

function AuthState(props) {
    const url = `${REACT_APP_API_BASE_URL}/auth` || 'http://localhost:80/api/auth';
    // const url = 'http://localhost:80/api/auth';

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [user, setUser] = useState({name: "", email: "", occupation: "", branch: "" });
    const [alertState, setAlertState] = useState({isOn:false, type:'success', msg:'Done'});

    // 1 login endpoint for authentication 
    const login = async (email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };
        try {
            const response = await fetch(`${url}/login`, requestOptions);
            const json = await response.json();
            return json;
        } catch (error) {
            console.log(error);
            let serverError = true
            return {serverError, error};
        }
    }
    
    // 2 signup endpoint for authentication 
    const signUp = async (name, email, password, occupation, branch) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, occupation, branch})
        };
        try {
            const response = await fetch(`${url}/createuser`, requestOptions);
            const json = await response.json();
            return json;
        } catch (error) {
            console.log(error);
            let serverError = true
            return {serverError, error};
        }
    }
    // 3 endpoint to fetch user details 
    const fetchUser = async (authToken) => {
        const requestOptions = {
            method: 'POST',
            headers: { "auth-token": authToken }
        };
        try {
            const response = await fetch(`${url}/getuser`, requestOptions);
            const json = await response.json();
            setUser({name:json.name, email:json.email, occupation:json.occupation, branch:json.branch});
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setIsLoggedin(true);
            let token = localStorage.getItem('token');
            fetchUser(token);
        }
    }, [isLoggedin])
    
    
  return (
    <AuthContext.Provider value={{signUp, login, user, fetchUser, isLoggedin, setIsLoggedin,alertState, setAlertState}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState