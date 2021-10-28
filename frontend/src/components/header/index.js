import React from 'react';
import logo from '../../images/logo.png';
import { FaUserAlt } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Auth from '../auth';
import BasicMenu from '../log/menuLogout';





const Header = () =>{
    
    return (
       <header>
          <div className="banniere">
              <img className="logo-groupomania" src={logo} alt="logo"/>
              <Auth userConnected={false}>
                <p className = "accountIcon"><Button color="neutral" href="/profil"><FaUserAlt/></Button></p>
              </Auth>
              <Auth userConnected={true}>
              <p className = "accountIcon"><Button  color="neutral"><BasicMenu/></Button></p>
              </Auth>
          </div>
       </header>
    )

}; 

export default Header 