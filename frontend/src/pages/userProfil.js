import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import "./Pages.css";
import Avatar from '../images/avatar.png';
import UpdateEmail from '../components/userProfil.js/UpdateEmail';

import UpdatePassword from '../components/userProfil.js/UpdatePassword';

const UserProfil = () => {
    
    const [userInformations, setUserInformations] = useState({});
    const history = useHistory();

    useEffect(()=>{
        const userInfo = localStorage.getItem('connectedUser');
        if(!userInfo){
            history.push('/')
        }else{
            setUserInformations(JSON.parse(userInfo))
        }

    },[])


    return (
    <div className="user-profil">
        <div className="avatar-col">
             <img className="avatar" src={Avatar} alt="avatar"/>
             <h1>Bonjour {userInformations.pseudo} </h1>
             <p>Bienvenue sur votre profil</p>
        </div>
        <div className="user-info">
            <h2>Modifier mes informations de connexion</h2>


            <div className="pseudo">
                <p>Pseudo : {userInformations.pseudo} </p>
                
            </div>

            <div className="email">
                <p> Email : {userInformations.email} </p>
                <UpdateEmail/>
            </div>
            
            <div className="password">
                <p>Mot de passe : {userInformations.password} </p>
                <UpdatePassword/>
            </div>
            
            
            
            
        </div>
    </div>
    )
}

export default UserProfil