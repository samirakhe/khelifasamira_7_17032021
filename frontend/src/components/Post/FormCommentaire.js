import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../config/axios.config";

const FormCommentaire = (props) => {
    //const [Userid, setUserid] = useState("");
    const [texte, setTexte] = useState("");

    const handleFormCommentaire = (e) => {
        e.preventDefault();

        axiosInstance({
            method: "post",
            url: `/commentaires`,

            data: {
                texte,
            },
        })
            .then((newComm) => {
                console.log(newComm);
                props.onCommCreated(newComm.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form
            className="formComm"
            action=""
            onSubmit={handleFormCommentaire}
            id="FormCommentaire"
        >
            <label htmlFor="texte">Commentaire</label>
            <br />
            <input
                type="text"
                name="texte"
                id="texte"
                onChange={(e) => setTexte(e.target.value)}
                value={texte}
            />

            <div className=" texte error"></div>

            <br />

            <input type="submit" value="Poster" />
        </form>
    );
};

export default FormCommentaire;
