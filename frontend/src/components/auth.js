import React, { useEffect, useState } from 'react'

const Auth = (props) => {

const [isConnected, setIsConnected] = useState(false);
useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
        setIsConnected(true)
    }else{
        setIsConnected(false)
    }
})
    return (
        <>
            {props.userConnected===isConnected? props.children:<></>}
        </>
    )
}

export default Auth