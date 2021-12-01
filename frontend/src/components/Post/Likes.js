import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Auth from "../auth";
import { postLike } from "../../services/postService";

const Likes = (props) => {
    const [likes, setLikes] = useState(props.likes);
    const [likeCount, setLikeCount] = useState(
        props.likes.filter((like) => like.isActive).length
    );

    const executeLike = (e) => {
        e.preventDefault();

        postLike(props.postId)
            .then((newLike) => {
                const index = likes.findIndex(
                    (like) => like.Likeid === newLike.data.Likeid
                );
                const likes2 = likes;
                if (index !== -1) {
                    console.log("like existant");
                    likes2[index] = newLike.data;
                } else {
                    likes2.push(newLike.data);
                }
                console.log(likes2);
                setLikes(likes2);
                setLikeCount(likes2.filter((like) => like.isActive).length);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Badge badgeContent={likeCount} color="primary">
            <Auth userConnected={true}>
                <FavoriteIcon onClick={executeLike} color="action" />
            </Auth>
            <Auth userConnected={false}>
                <FavoriteIcon color="action" />
            </Auth>
        </Badge>
    );
};

export default Likes;
