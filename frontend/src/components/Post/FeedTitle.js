import React, { useEffect, useState } from 'react';
import './Feed.css';


const FeedTitle = (props) => {
    const [date, setDate] = useState("");
    const options = {year: "numeric", month: "numeric", day: "numeric",
           hour: "numeric", minute: "numeric", second: "numeric",
           hour12: false};
    useEffect(()=>{
        const propsDate = new Date (props.date)
        setDate(new Intl.DateTimeFormat('default', options).format(propsDate))
    },[props.date])
    
    return (
        <div>
            <div className="datePseudo">
                <p className="pseudoUser">De : {props.pseudo}</p>
                <p className="dateTexte">Le {date}</p>
            </div>

            <div>
                <p className="titlePost">{props.title}</p>
            </div>           
        </div>
    )
}

export default FeedTitle