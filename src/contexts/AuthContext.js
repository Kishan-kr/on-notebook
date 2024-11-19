
import React, { useState, createContext, useEffect } from "react";
export const AuthContext = createContext();

function AuthState(props) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/auth`;

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [user, setUser] = useState({name: "", email: "", profession: "" });
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
    const signUp = async (name, email, password, profession) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, profession})
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
    // 3 Upload profile picture 
    const updatePic = async (pic) => {
        const requestOptions = {
            method: 'PUT',
            headers: { "auth-token": localStorage.getItem('token'), 'Content-Type': 'application/json' },
            body: JSON.stringify({ pic })
        };
        try {
            const response = await fetch(`${url}/uploadpic`, requestOptions);
            const json = await response.json();
            return json;
        } catch (error) {
            console.log(error);
            let serverError = true
            return {serverError, error};
        }
    }

    // 4 Update user details 
    const updateDetails = async () => {
        const {name, profession} = user;
        const requestOptions = {
            method: 'PUT',
            headers: { "auth-token": localStorage.getItem('token'), 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, profession })
        };
        try {
            const response = await fetch(`${url}/update`, requestOptions);
            const json = await response.json();
            return json;
        } catch (error) {
            console.log(error);
            let serverError = true
            return {serverError, error};
        }
    }

    // 5 fetch user details 
    const fetchUser = async (authToken) => {
        const requestOptions = {
            method: 'POST',
            headers: { "auth-token": authToken }
        };
        try {
            const response = await fetch(`${url}/getuser`, requestOptions);
            const json = await response.json();
            setUser({name:json.name, email:json.email, profession:json.profession, pic:json.pic});
        } catch (error) {
            console.error(error);
        }
    }

    const verifyLoginStatus = async (authToken) => {
        const requestOptions = {
            method: 'GET',
            headers: { "auth-token": authToken }
        };
        try {
            const response = await fetch(`${url}/check-login`, requestOptions);
            const json = await response.json();
            setIsLoggedin(json.isLoggedIn);
            if(json.isLoggedIn) {
                fetchUser(authToken);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            verifyLoginStatus(token)
        }
    }, [isLoggedin])
    
    
  return (
    <AuthContext.Provider 
        value={{
            signUp, 
            login, 
            user, 
            setUser, 
            fetchUser, 
            isLoggedin, 
            setIsLoggedin, 
            alertState, 
            setAlertState, 
            updatePic, 
            updateDetails 
        }}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState