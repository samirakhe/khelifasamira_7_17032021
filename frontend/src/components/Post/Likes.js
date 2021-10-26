import React, { useEffect, useState } from "react";
import axiosInstance from '../../config/axios.config';
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";


const Likes = (props) => {
    const [likes, setLikes] = useState(props.likes);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(()=>{
        console.log('likes ont changés');
        setLikeCount(likes.filter(like=>like.isActive).length);

    },[]);

    const executeLike = (e) => {
        e.preventDefault();
        
        axiosInstance({
          method: "post",
          url:`/likes`,
          
          data:{
            Postid : props.postId,
          },
          
        })
        .then((newLike)=>{
            const index = likes.findIndex(like=>like.Likeid == newLike.data.Likeid)
            const likes2 = likes;
            if(index !== -1){
                console.log('like existant');
                likes2[index] = newLike.data
            }else{
                likes2.push(newLike.data)
            }
        console.log(likes2)
        setLikes(likes2)
        setLikeCount(likes2.filter(like=>like.isActive).length);
        
         
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    return (
        <Badge badgeContent={likeCount} color="primary">
            <FavoriteIcon onClick={executeLike}   color="action" />
        </Badge>
    );
};

export default Likes;
