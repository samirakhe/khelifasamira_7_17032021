import React, { useEffect, useState } from 'react';
import { DATE_OPTIONS } from '../../utils/constant';
import './Feed.css';


const FeedTitle = (props) => {
    const [date, setDate] = useState("");
   
    useEffect(()=>{
        
        const propsDate = new Date (props.date)
        setDate(new Intl.DateTimeFormat('default', DATE_OPTIONS).format(propsDate))
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