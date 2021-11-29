import React from "react";
import logo from "../../images/logo.png";
import Auth from "../auth";
import MenuLogout from "../log/menuLogout";

const Header = (props) => {
    return (
        <header>
            <div className="banniere">
                <a href="/">
                    <img src={logo} className="logo-groupomania" alt="logo" />
                </a>
                
                <Auth userConnected={false}>
                    <a href="/profil">
                        <button className="btn-myaccount">Connexion</button>
                    </a>
                </Auth>

                <Auth userConnected={true}>
                    <MenuLogout className="accountIcon" />
                </Auth>
            </div>
        </header>
    );
};

export default Header;
