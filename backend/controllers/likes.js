const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Like = require("../models/likes");
const Post = require("../models/posts");
require("dotenv").config();

exports.LikedPost = (req, res) => {
    Like.findOne({
        where: { Userid: req.user.Userid, Postid: req.body.Postid },
    }).then((likes) => {
        if (likes == null) {
            Like.create({Userid:req.user.Userid, Postid: req.body.Postid})
            .then((likes) => {

                res.status(200).json(likes);
            });
            
        } else {
            Like.update({isActive: !likes.isActive}, {where: {Userid: req.user.Userid, Postid: req.body.Postid}})
            .then(()=>{
                Like.findOne({where: { Userid: req.user.Userid, Postid: req.body.Postid }})
                .then((likeModified)=>{
                    res.status(200).json(likeModified);

                })
                
            });
        }
        console.log(likes);

    });
};
