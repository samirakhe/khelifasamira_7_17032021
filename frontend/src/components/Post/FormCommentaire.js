import React, { useState } from "react";
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
                setTexte("");
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
                Laisser un commentaire :
            </label>
            <br />
            <input
                type="text"
                name="texte"
                id="texte-comm"
                onChange={(e) => setTexte(e.target.value)}
                value={texte}
            />
            <br />
            <input className="btn-comm" type="submit" value="OK" />
        </form>
    );
};

export default FormCommentaire;
