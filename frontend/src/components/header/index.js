import React from 'react';
import logo from '../../images/logo.png';
import { FaUserAlt } from 'react-icons/fa';



const Header = () =>{

    return (
       <header>
          <div className="banniere">
              <img className="logo-groupomania" src={logo} alt="logo"/>
              <p className = "accountIcon"><FaUserAlt/></p>
          </div>
       </header>
    )

}; 

export default Header 