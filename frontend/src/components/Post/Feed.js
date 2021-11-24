import React, { useEffect, useState } from "react";
import MessageIcon from "@mui/icons-material/Message";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardMedia from '@mui/material/CardMedia';
import FeedTitle from "./FeedTitle";
import FeedComm from "./FeedComm";
import Verticalmenu from "./Verticalmenu";
import "./Feed.css";
import FormCommentaire from "./FormCommentaire";
import Likes from "./Likes";
import IsOwner from "../isOwner";
import IsAdmin from "../isAdmin";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axiosInstance from "../../config/axios.config";
import Auth from "../auth";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Feed(props) {
    const [expanded, setExpanded] = useState(false);
    const [commentaires, setCommentaires] = useState([]);
    const commCreated = (newComm) => {
        setCommentaires([newComm, ...commentaires]);
    };
    const delComment = (commentaireId) => {
        setCommentaires(
            commentaires.filter((comm) => comm.Commentaireid !== commentaireId)
        );
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        setCommentaires(props.post.commentaires);
    }, [props.post.commentaires]);
    const deletedPostFromAdmin = (e) => {
        e.preventDefault();

        axiosInstance({
            method: "delete",
            url: `/posts/admin/${props.post.Postid}`,
        }).then((successDeleteFromAdmin) => {
            if (successDeleteFromAdmin) {
                props.delPost(props.post.Postid);
                console.log("post supprimé");
            } else {
                console.log("Action non autorisée");
            }
        });
    };

    return (
        <Card className="card" >
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <IsOwner user={props.post.user.pseudo}>
                            <Verticalmenu
                                upPost={props.upPost}
                                delPost={props.delPost}
                                post={props.post}
                            />
                        </IsOwner>
                    </IconButton>              
                }
                
                title={               
                    <FeedTitle className="feedtitle"
                        date={props.post.createdAt}
                        pseudo={props.post.user.pseudo}
                        title={props.post.title}
                    />
                }
            />

            <CardContent className="cardcontent">
                
                {props.post.image && <CardMedia
                id="cardmedia"

                    component="img"    
                    image={props.post.image}          
                />}
                <br/>
                <Typography variant="body2" color="text.secondary">
                    {props.post.texte}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Likes likes={props.post.likes} postId={props.post.Postid} />

                <IconButton aria-label="share">
                    <IsAdmin>
                        <DeleteOutlineIcon onClick={deletedPostFromAdmin} />
                    </IsAdmin>
                </IconButton>
                <ExpandMore
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <Badge
                        badgeContent={commentaires?.length || 0}
                        color="primary"
                    >
                        <MessageIcon color="action" />
                    </Badge>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        <Auth userConnected={true}>
                            <FormCommentaire
                                postId={props.post.Postid}
                                onCommCreated={commCreated}
                            />
                        </Auth>

                        {commentaires ? (
                            <FeedComm
                                delComment={delComment}
                                commentaires={commentaires}
                            />
                        ) : (
                            <> </>
                        )}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
