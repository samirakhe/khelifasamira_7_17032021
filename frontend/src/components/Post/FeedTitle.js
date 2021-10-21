import React from 'react'

const FeedTitle = (props) => {
    return (
        <div>
            <p>{props.pseudo}</p>
            <p>{props.title}</p>
            
        </div>
    )
}

export default FeedTitle