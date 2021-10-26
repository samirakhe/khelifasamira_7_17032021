import React, { useState } from 'react';
import './log.css';
import axios from 'axios';
import axiosInstance from '../../config/axios.config';

const Signup = () => {

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] =  useState("");
    const [password, setPassword] = useState("");
    
    
    const handleSignup = (e) => {
        e.preventDefault();
        //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*',
        axiosInstance({
          method: "post",
          url:`/users/signup`,
          //withCredentials: true,
          //headers:{'Access-Control-Allow-Origin': '*'},
          data:{
            pseudo,
            email,
            password,
          },
        })
        .then((newUser)=>{
          console.log(newUser)
          
            window.location = '/';
          
         localStorage.setItem("connectedUser", JSON.stringify(newUser.data));
        
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    return(
        <form action="" onSubmit={handleSignup} id="signupForm">
        <label className="label" htmlFor="pseudo">Pseudo</label>
        <br/>
        <input 
          type="text" 
          name="pseudo" 
          id="pseudo" 
          onChange={(e) => setPseudo(e.target.value)} 
          value={pseudo}/>

          <div className="pseudo error"></div>

        <br/>
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
        <input className="button" type="submit" value="S'inscrire"/>
      </form>
    );
};

export default Signup;