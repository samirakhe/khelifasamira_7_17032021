import React from "react";
import { Redirect, Route } from "react-router-dom";

function AuthRoute({ component: Component,userConnected, ...restOfProps }) {
    //la double négation transforme la chaine de caractère en booleen
  const isConnected = !!localStorage.getItem("token");


  return (
    <Route
      {...restOfProps}
      render={(props) =>
    //si l'user est connectée est que userConnected = isconnected, alors on le redirige vers la page d'accueil
    //si l'user n'est pas connecté et que userConnected est false alors on le redirige vers home
        isConnected===userConnected ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default AuthRoute;