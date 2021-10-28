import React from "react";
import FeedDate from "./FeedDate";
import './Feed.css';
import axiosInstance from '../../config/axios.config';
import IsOwner from "../isOwner";
import Auth from "../auth";


const FeedCommItem = (props) => {


    const deleteComment = (e) => {
        e.preventDefault();
     
    
        axiosInstance({
            method: "delete",
            url: `/commentaires/${props.data.Commentaireid}`,
            
        }).then((successDeleteComm) => {
            if (successDeleteComm) {
                
                props.delComment(props.data.Commentaireid);  
                console.log("commenaire supprimé");
                
            } else {
                console.log("Action non autorisée");
            }
        });
    };




    return (
        <div className="bloc-commentaire">
            <p className="pseudo">{props.data.user.pseudo}</p>
            <p className="comment">{props.data.commentaire}</p>

            <FeedDate  date={props.data.createdAt} />
            <div className="update-delete-comm">
            <Auth userConnected={true}>
            <p><a href="#"  className="updateCom">Modifier</a></p>
            <p><a href="#" onClick={deleteComment} className="deleteCom">Supprimer</a></p>
            </Auth>
            
            

            </div>
            
            
        </div>
    );
};

export default FeedCommItem;
