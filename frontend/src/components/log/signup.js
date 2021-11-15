import React, { useState } from "react";
import "./log.css";
import axiosInstance from "../../config/axios.config";
import { useForm } from "react-hook-form";
import {login} from "../../services/loginService";
const Signup = () => {
  const {register,handleSubmit,watch,formState: { errors }} = useForm();

    const handleSignup = (data) => {
        axiosInstance({
            method: "post",
            url: `/users/signup`,
            data: {
                pseudo : data.pseudo,
                email : data.email,
                password : data.password,
            },
        })
            .then((newUser) => {
                console.log(newUser);
                login(data.email, data.password)
                .then((userData)=>{
                    console.log(userData)
                   localStorage.setItem("connectedUser", JSON.stringify(userData.data));
                   window.location = '/';
                   localStorage.setItem("token", userData.data.token);
                   localStorage.setItem("pseudo", userData.data.pseudo);
                   localStorage.setItem("roles", JSON.stringify (userData.data.roles));     
                  })
                  .catch((err)=>{
                   
                    console.log(err.response.data.error)
                  })
               
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(data);
    };

    console.log(watch("pseudo"));

    return (
        <form action="" onSubmit={handleSubmit(handleSignup)} id="signupForm">
            <label className="label" htmlFor="pseudo">
                Pseudo
            </label>
            <br />

            <input
                type="text"
                name="pseudo"
                id="pseudo"
              {...register("pseudo", { required: true })}
              
            />
            {errors.pseudo && <span>Le titre est obligatoire</span>}
            <br />

            <label className="label" htmlFor="email">
                Email
            </label>
            <br />
            <input
                type="email"
                name="email"
                id="email"
                {...register("email", { required: true })}
                
            />
            {errors.email && <span>L'email' est obligatoire</span>}
            <br />

            <label className="label" htmlFor="password">
                Mot de passe
            </label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                {...register("password", { required: true })}
                
            />
            {errors.password && <span>Le mot de passe est obligatoire</span>}
            <br />

            <input className="btn" type="submit" value="S'inscrire" />
            
        </form>
    );
};

export default Signup;
