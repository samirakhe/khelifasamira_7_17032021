import React, { useState } from "react";
import "./log.css";
import { useForm } from "react-hook-form";
import { login } from "../../services/loginService";
import Alert from "@mui/material/Alert";
import { signup } from "../../services/signupService";

//Utilisation de react useform
const Signup = () => {
    const {register,handleSubmit,formState: { errors } } = useForm();
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleSignup = (data) => {
    
        //requete axios cf dossier services
        signup(data)
        //--------------------------------------------
            .then((newUser) => {
                console.log(newUser);
                login(data.email, data.password)
                    .then((userData) => {
                        setSuccessAlert(true);
                        console.log(userData);
                        //enregistrement de l'user dans le localstorage
                        localStorage.setItem(
                            "connectedUser",
                            JSON.stringify(userData.data)
                        );

                        localStorage.setItem("token", userData.data.token);
                        localStorage.setItem("pseudo", userData.data.pseudo);
                        localStorage.setItem(
                            "roles",
                            JSON.stringify(userData.data.roles)
                        );
                        setErrorMessage("");
                        setShowErrorMessage(false);
                    })
                    .catch((err) => {
                        console.log(err.response.data.message);
                        setErrorMessage(err.response.data.message);
                        setShowErrorMessage(true);
                    });
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
                setShowErrorMessage(true);
                console.log(err.response.data.message);
            });
        console.log(data);
    };


    //utilisation de useform
    return (
        <form action="" onSubmit={handleSubmit(handleSignup)} id="signupForm">
            <label className="label" htmlFor="pseudo"></label>
            <br />

            <input
                placeholder="Pseudo"
                type="text"
                name="pseudo"
                id="pseudo"
                {...register("pseudo", { required: true })}
            />
            <br />
            {errors.pseudo && <span>Le pseudo est obligatoire</span>}
            <br />

            <label className="label" htmlFor="email"></label>
            <br />
            <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                //on utilise pattern afin de conditonner les adresses email
                {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
            />
            <br />
            {errors.email && errors.email.type === "required" && (
                <span>L'email est obligatoire</span>
            )}
            {errors.email && errors.email.type === "pattern" && (
                <span>Entrez une adresse email correcte</span>
            )}
            <br />

            <label className="label" htmlFor="password"></label>
            <br />
            <input
                placeholder="Mot de passe"
                type="password"
                name="password"
                id="password"
                {...register("password", { required: true, minLength: 8 })}
            />
            <br />
            {errors.password && errors.password.type === "required" && (
                <span>Le mot de passe est obligatoire</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
                <span>Le mot de passe doit contenir min 8 caractères</span>
            )}
            <br />

            <input className="btn" type="submit" value="S'inscrire" />
            <br />
            {successAlert && (
                <Alert severity="success">
                    Votre compte a été créé!{" "}
                    <a href="/">Voir le fil d'actualité</a>
                </Alert>
            )}

            {showErrorMessage ? (
                <Alert severity="error">{errorMessage}</Alert>
            ) : (
                <></>
            )}
        </form>
    );
};

export default Signup;
