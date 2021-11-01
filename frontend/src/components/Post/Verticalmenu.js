import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import UpdatePost from "./UpdatePost";


const ITEM_HEIGHT = 48;
export default function LongMenu(props) {
    //Code importé Material UI-------------------------------------------------------------
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //FIN code importé Material UI-------------------------------------------------------------
    
// const updatePost = (e) => {
//     e.preventDefault();

//     axiosInstance({

//         method:"put",
//         url: `/posts/${props.Postid}`,
//     }).then((successUpdate)=>{
//             if (successUpdate) {
//                 props.upPost(props.Postid);
//                 console.log("post modifié");
               
//             } else {
//                 console.log("Action non autorisée");
//             }
//     })
// }




    const deletedPost = (e) => {
        e.preventDefault();

        axiosInstance({
            method: "delete",
            url: `/posts/${props.post.Postid}`,
           
        }).then((successDelete) => {
            if (successDelete) {
                props.delPost(props.post.Postid);
                console.log("post supprimé");
               
            } else {
                console.log("Action non autorisée");
            }
        });
    };

    

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                 <MenuItem >
                    <UpdatePost upPost={props.upPost} post={props.post}/>
                </MenuItem>
                <MenuItem onClick={deletedPost}>
                    <DeleteOutlineIcon />
                </MenuItem>
                
                
                
            </Menu>
        </div>
    );
}
