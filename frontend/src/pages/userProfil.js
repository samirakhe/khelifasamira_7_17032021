import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';


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
        <div>
            <p>
            {userInformations.pseudo}
            </p>
           
        </div>
    )
}

export default UserProfil