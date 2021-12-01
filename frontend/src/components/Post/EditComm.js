import React, { useState } from "react";
import { editComm } from "../../services/commService";

const EditComm = (props) => {
    const [texte, setTexte] = useState(props.commentaire.commentaire);
    const handleFormComm = (e) => {
        e.preventDefault();
        editComm(props.commentaire.Commentaireid, texte)
            .then((success) => {
                console.log(success);
                const data = {
                    Commentaireid: props.commentaire.Commentaireid,
                    texte: texte,
                };
                // upComment cf fichier feedCommItem
                props.upComment(data);
                setTexte("");
                props.handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <form
            className="form-update-comm"
            onSubmit={handleFormComm}
            id="FormPost"
        >
            <label htmlFor="texte">Votre Message</label>
            <br />
            <input
                type="text"
                name="texte"
                id="comm-update"
                onChange={(e) => setTexte(e.target.value)}
                value={texte}
            />

            <div className=" texte error"></div>

            <br />

            <input className="btn-comm" type="submit" value="ok" />
        </form>
    );
};

export default EditComm;
