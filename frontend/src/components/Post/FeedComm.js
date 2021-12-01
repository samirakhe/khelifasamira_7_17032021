import React from "react";
import FeedCommItem from "./FeedCommItem";

// conteneur des commentaires
// delComment cf fichier feed
const FeedComm = (props) => {
    const triParDate = (comm1, comm2) => {
        if (comm1.createdAt > comm2.createdAt) {
            return -1;
        }
        if (comm2.createdAt > comm1.createdAt) {
            return 1;
        }
        return 0;
    };

    return (
        <div>
            {props.commentaires.sort(triParDate).map((comm) => (
                <FeedCommItem
                    upComment={props.upComment}
                    delComment={props.delComment}
                    data={comm}
                    key={comm.Commentaireid}
                />
            ))}
        </div>
    );
};

export default FeedComm;
