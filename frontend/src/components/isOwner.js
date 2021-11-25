import React, { useEffect, useState } from 'react';

const IsOwner = (props) => {

const [pseudo, setPseudo] = useState('');



useEffect(()=>{

    const connectedUser = localStorage.getItem('pseudo'); 
    setPseudo(connectedUser)   
},[])
    return (
        <>
            {props.user===pseudo? props.children:<></>}      
        </>
    )
}

export default IsOwner