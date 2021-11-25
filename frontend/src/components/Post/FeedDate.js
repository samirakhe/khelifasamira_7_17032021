import React, { useEffect, useState } from 'react';
import { DATE_OPTIONS } from '../../utils/constant';
import './Feed.css';

const FeedDate = (props) => {
    const [date, setDate] = useState("");
    
    useEffect(()=>{
        
        const propsDate = new Date (props.date)
        setDate(new Intl.DateTimeFormat('default', DATE_OPTIONS).format(propsDate))
    },[props.date])

    
    return (
    <>
    <div className="dateTexte">
           <p>{date}</p> 
    </div>
    </>
    )
}

export default FeedDate