import React from 'react'
import FeedCommItem from './FeedCommItem';

// conteneur des commentaires
// delComment cf fichier feed
const FeedComm = (props) => {

        return (
            <>
                {props.commentaires.map((comm) => (
                <FeedCommItem  upComment={props.upComment} delComment={props.delComment} data={comm} key={comm.Commentaireid} />
                
            ))}
            </>
        )
   
    
}

export default FeedComm;