import React, { useState } from "react";
import SignupForm from "./signup";
import LoginForm from "./login";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import theme from "../../themes/default"

const Log = () => {
    const [SignupModal, setSignupModal] = useState(true);
    const [LoginModal, setLoginModal] = useState(false);

    const handleModals = (e) => {
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
                <ul>
                    <ThemeProvider theme={theme}>
                        <Button color="primary" variant="contained"onClick={handleModals} id="login">
                        Se Connecter
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button color="primary" variant="contained"onClick={handleModals} id="register">
                        S'inscrire
                        </Button>
                    </ThemeProvider>
                </ul>
                {SignupModal && <SignupForm />}
                {LoginModal && <LoginForm />}
            </div>
        </div>
    );
};

export default Log;
