import React, { useState } from "react";
import axios from "axios";
import "./Feed.css";
import axiosInstance from "../../config/axios.config";

const FormCommentaire = (props) => {
    const [texte, setTexte] = useState("");

    const handleFormCommentaire = (e) => {
        e.preventDefault();

        axiosInstance({
            method: "post",
            url: `/commentaires`,
            data: {
                commentaire: texte,
                Postid: props.postId,
            },
        })
            .then((newComm) => {
                console.log(newComm);
                props.onCommCreated(newComm.data);
                setTexte('');
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
            <label className="write-comment" htmlFor="texte">
                Écrivez un commentaire
            </label>
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
