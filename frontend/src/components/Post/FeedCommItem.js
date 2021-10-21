import React from 'react'
import FeedDate from './FeedDate';


const FeedCommItem = (props) => {
   
        return (
            <div>
                
                <p>{props.data.commentaire}</p>
                <p>{props.data.user.pseudo}</p>
                <FeedDate date={props.data.createdAt}/>
                
            </div>
        )
    
}

export default FeedCommItem;