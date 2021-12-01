import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import theme from "../../themes/default"
import "./log.css";


const Log = ( props ) => {
    const [SignupModal, setSignupModal] = useState(props.signup);
    const [LoginModal, setLoginModal] = useState(props.login);

    const handleModals = (e) => {
        // Register affiche signupmodal, login affiche loginmodal
        if (e.target.id === "register") {
            setLoginModal(false);
            setSignupModal(true);
        } else if (e.target.id === "login") {
            setSignupModal(false);
            setLoginModal(true);
        }
    };

    return (
        <div className="connection-form">
            <div className="form-container">
                <div className="accountButton">
                    
                    <ThemeProvider theme={theme}>
                        <Button 
                        color="primary" 
                        variant="contained"
                        onClick={handleModals} 
                        id="login"
                        className={LoginModal ? "active-button" : null}>
                        Connexion
                        </Button>       
                    </ThemeProvider>
                    
                    <p>Vous n'avez pas encore de compte ? 
                        <button 
                            onClick={handleModals} 
                            id="register" 
                            className={SignupModal ? "active-button" : null}>
                                Créer un compte
                        </button>
                    </p>
                    
                </div>
                {SignupModal && <SignupForm />}
                {LoginModal && <LoginForm />}
            </div>
        </div>
    );
};

export default Log;
