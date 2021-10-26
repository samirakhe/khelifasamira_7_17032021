import React, { useEffect, useState } from 'react';
import './Feed.css';

const FeedDate = (props) => {
    const [date, setDate] = useState("");
    const options = {year: "numeric", month: "numeric", day: "numeric",
           hour: "numeric", minute: "numeric", second: "numeric",
           hour12: false};
    useEffect(()=>{
        const propsDate = new Date (props.date)
        setDate(new Intl.DateTimeFormat('default', options).format(propsDate))
    })
    return (
    <>
    <div className="dateCommentaire">
            {date}
    </div>
    </>
    )
}

export default FeedDate