const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Like = require("../models/likes");
const Post = require("../models/posts");
require("dotenv").config();

exports.LikedPost = (req, res) => {
    Like.findOne({
        where: { Userid: req.body.userId, Postid: req.body.postId },
    }).then((likes) => {
        if (likes == null) {
            Like.create({Userid:req.body.userId, Postid: req.body.postId})
            .then((likes) => {

                res.status(200).json(likes);
            });
            
        } else {
            Like.update({isActive: !likes.isActive}, {where: {Userid: req.body.userId, Postid: req.body.postId}})
            .then(()=>{
                Like.findOne({where: { Userid: req.body.userId, Postid: req.body.postId }})
                .then((likeModified)=>{
                    res.status(200).json(likeModified);

                })
                
            });
        }
        console.log(likes);

    });
};
