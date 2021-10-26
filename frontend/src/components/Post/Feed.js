import React, { useEffect, useState } from "react";
//import axios from 'axios';
import MessageIcon from "@mui/icons-material/Message";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FeedTitle from "./FeedTitle";
import FeedDate from "./FeedDate";
import FeedComm from "./FeedComm";
import Verticalmenu from "./Verticalmenu";
import "./Feed.css";
import FormCommentaire from "./FormCommentaire";
import Likes from "./Likes";

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
    const [likes, setLikes] = useState([]);

    // const [firstLetter, setFirstLetter] = useState("");
    const commCreated = (newComm) => {
        setCommentaires([newComm, ...commentaires]);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        setCommentaires(props.post.commentaires);
       
    }, []);

    

    return (
        <Card className="card" sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <Verticalmenu delPost={props.delPost} Postid={props.post.Postid}/>
                    </IconButton>
                }
                subheader={<FeedDate date={props.post.createdAt} />}
                title={
                    <FeedTitle
                        pseudo={props.post.user.pseudo}
                        title={props.post.title}
                    />
                }
            />

            <CardContent className="cardcontent">
                <Typography variant="body2" color="text.secondary">
                    {props.post.texte}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
               <Likes likes={props.post.likes} postId={props.post.Postid}/>

                <IconButton aria-label="share">
                    <ShareIcon />
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
                        <FormCommentaire
                            postId={props.post.Postid}
                            onCommCreated={commCreated}
                        />
                        {commentaires ? (
                            <FeedComm commentaires={commentaires} />
                        ) : (
                            <> </>
                        )}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
