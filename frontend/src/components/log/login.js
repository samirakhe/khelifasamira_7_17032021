import React, { useState } from 'react';
import './log.css';
import axios from 'axios';
import axiosInstance from '../../config/axios.config';
require("dotenv").config();


const Login = () => {

   const [email, setEmail] =  useState("");
   const [password, setPassword] = useState("");

  //  const emailError =  document.querySelector('.email.error');
  //  const passwordError = document.querySelector('.password.error');
   
   const handleLogin = (e) => {
     e.preventDefault();
     //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*',
     axiosInstance({
       method: "post",
       url:`/users/login`,
       //withCredentials: true,
       //headers:{'Access-Control-Allow-Origin': '*'},
       data:{
         email,
         password,
       },
     })
     .then((userData)=>{
       console.log(userData)
      //  if(res.data.errors){
      //    emailError.innerHTML =  res.data.errors.email;
      //    passwordError.innerHTML = res.data.errors.password;
      //  }else {
      //    window.location = '/';
      //  }
      localStorage.setItem("connectedUser", JSON.stringify(userData.data));
      localStorage.setItem("token", userData.data.token);
      localStorage.setItem("pseudo", userData.data.pseudo);
      window.location = '/';
     })
     .catch((err)=>{
       console.log(err)
     })
   }


    return(
      <form action="" onSubmit={handleLogin} id="loginForm">
        <label className="label" htmlFor="email">Email</label>
        <br/>
        <input 
          type="text" 
          name="email" 
          id="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}/>

          <div className=" email error"></div>

        <br/>
        <label className="label" htmlFor="password">Mot de passe</label>
        <br/>
        <input 
          type="password" 
          name="password" 
          id="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}/>
          <div className="password error"></div>
          <br/>

        <input className="button" type="submit" value="Se connecter"/>
      </form>
    );
      
};



export default Login;