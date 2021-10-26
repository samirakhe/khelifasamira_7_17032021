import React from "react";
import FeedDate from "./FeedDate";
import './Feed.css';

const FeedCommItem = (props) => {
    return (
        <div className="bloc-commentaire">
            <p className="pseudo">{props.data.user.pseudo}</p>
            <p className="comment">{props.data.commentaire}</p>

            <FeedDate  date={props.data.createdAt} />
            
        </div>
    );
};

export default FeedCommItem;
