import React from 'react';
import logo from '../../images/logo.png';
import { FaUserAlt } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Auth from '../auth';
import MenuLogout from '../log/menuLogout';

const Header = (props) =>{
    return (
       <header>
          <div className="banniere">
              <a href="/"><img src={logo} className="logo-groupomania" alt="logo"/></a>
              <Auth userConnected={false}>
                <p className = "accountIcon"><Button color="secondary" href="/profil"><FaUserAlt/></Button></p>
              </Auth>
              <Auth userConnected={true}>
              <MenuLogout className="accountIcon"/>
              </Auth>
          </div>
       </header>
    )

}; 

export default Header 