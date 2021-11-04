import React, { useState } from "react";
import FeedDate from "./FeedDate";
import './Feed.css';
import axiosInstance from '../../config/axios.config';

import Auth from "../auth";

import CreateIcon from "@mui/icons-material/Create";
import UpdatePost from "./UpdatePost";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpdateComm from "./UpdateComm";



const FeedCommItem = (props) => {

const [comment, setComment] = useState(props.data.commentaire);

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

    const upComment =  (newCommentaire) => {
        debugger
        setComment(newCommentaire.texte)
    }

  
    


    
    return (
        <div className="bloc-commentaire">
            <p className="pseudo">{props.data.user.pseudo}</p>
            <p className="comment">{comment}</p>

            <FeedDate  date={props.data.createdAt} />
            <div className="update-delete-comm">
            <Auth userConnected={true}>  
                <UpdateComm commentaire={props.data} upComment={upComment} className="updateCom"/>
                <DeleteOutlineIcon onClick={deleteComment} className="deleteCom"/> 
            </Auth>
            </div>   
        </div>
    );
};

export default FeedCommItem;
