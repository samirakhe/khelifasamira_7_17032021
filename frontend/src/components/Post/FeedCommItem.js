import React, { useState } from "react";
import FeedDate from "./FeedDate";
import "./Feed.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpdateComm from "./UpdateComm";
import IsOwner from "../isOwner";
import { deleteComm } from "../../services/commService";

const FeedCommItem = (props) => {
    const [comment, setComment] = useState(props.data);

    const deleteComment = (e) => {
        e.preventDefault();
        deleteComm(comment.Commentaireid)
        .then((successDeleteComm) => {
            if (successDeleteComm) {
                props.delComment(comment.Commentaireid);
                console.log("commentaire supprimé");
            } else {
                console.log("Action non autorisée");
            }
        });
    };
    const upComment = (newCommentaire) => {
        //on place tout le commentaire pour ensuite modifier son texte
        setComment({...comment, commentaire : newCommentaire.texte});
    };

    return (
        <div className="bloc-commentaire">
            <p className="pseudo">Commentaire de : {comment.user.pseudo}</p>
            <p className="comment">{comment.commentaire}</p>

            <FeedDate className="dateTexte" date={comment.createdAt} />
            <div className="update-delete-comm">
                <IsOwner user={comment.user.pseudo}>
                    <UpdateComm
                        commentaire={comment}
                        upComment={upComment}
                        className="updateCom"
                    />
                    <DeleteOutlineIcon
                        onClick={deleteComment}
                        className="deleteCom"
                    />
                </IsOwner>
            </div>
        </div>
    );
};

export default FeedCommItem;
