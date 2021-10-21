import React from 'react'
import FeedCommItem from './FeedCommItem';


const FeedComm = (props) => {
   
        return (
            <>
                {props.commentaires.map((comm) => (
                <FeedCommItem data={comm} key={comm.Commentaireid} />
            ))}
            </>
        )
   
    
}

export default FeedComm;