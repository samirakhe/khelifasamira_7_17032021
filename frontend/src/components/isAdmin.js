import React, { useEffect, useState } from "react";


const IsAdmin = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    

    useEffect(() => {
        const rolesSTR = localStorage.getItem("roles");
       
        if (!rolesSTR) {
            setIsAdmin(false);
        } else {
            const roles = JSON.parse(rolesSTR);
            const adminRole = roles.find(element => element.nameRole ==='ADMIN');
            if(adminRole){
                setIsAdmin(true)
            }else{
                setIsAdmin(false)
            }
            
        }
    },[]);
    return (
        <>
            {isAdmin?props.children : <></>}      
        </>
    )
};

export default IsAdmin;
