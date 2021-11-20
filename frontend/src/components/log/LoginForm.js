import React, { useState } from 'react';
import './log.css';
import {login} from '../../services/loginService';
import Alert from '@mui/material/Alert';
require("dotenv").config();



const Login = () => {

   const [email, setEmail] =  useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   
   const handleLogin = (e) => {
     e.preventDefault();
    login(email, password)
    .then((userData)=>{
    console.log(userData)
     localStorage.setItem("connectedUser", JSON.stringify(userData.data));
     window.location = '/';
     localStorage.setItem("token", userData.data.token);
     localStorage.setItem("pseudo", userData.data.pseudo);
     localStorage.setItem("roles", JSON.stringify (userData.data.roles));     
    })
    .catch((err)=>{
      setErrorMessage(err.response.data.error)
      console.log(err.response.data.error)
    })
   }



    return(
      <form action="" onSubmit={handleLogin} id="loginForm">
        <label className="label" htmlFor="email"></label>
        <br/>
        <input 
        placeholder="Email"
          type="text" 
          name="email" 
          id="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}/>

          <div className=" email error"></div>

        <br/>
        <label className="label" htmlFor="password"></label>
        <br/>
        <input 
         placeholder="Mot de passe"
          type="password" 
          name="password" 
          id="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}/>
          <div className="password error"></div>
          <br/>

        <input className="btn" type="submit" value="Se connecter"/>
        {errorMessage? <Alert severity="error">{errorMessage}</Alert> : <></>}
      </form>
    
    );
      
};
export default Login;