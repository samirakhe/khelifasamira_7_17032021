const { Sequelize, Models, DataTypes } = require("sequelize");
const express = require('express');
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/posts");
const User = require('../models/user');
const sequelize = require("../models/db");
require("dotenv").config();

exports.getAllposts = (req, res) => {
    Post.findAll({
        include: ['likes', 'commentaires']//as de init
    })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json('Posts non trouvés')
        });
};

exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id, { //findbyprimarykey
        include: ['likes', 'commentaires']
    }
   )
    .then((post)=>{
        res.json(post);
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).json('Post non trouvé')
    })
}


exports.createPosts = (req, res) => {
    const post = req.body;
    Post.create(post)
        .then ((post_cree) => {
            return res.json(post_cree);
        });
        
    // User.findByPk (post.Userid)
    // .then((expediteur)=>{
    //     console.log(expediteur);
    //     Post.create({...post, Userid: expediteur.Userid}, post)
    //     .then ((post_cree) => {
    //         return res.json(post_cree);
    //     });

    // });
    
};

exports.modifyPosts = (req, res) => {
    const id = req.params.id;
    const data =  req.body;
    Post.update ( data, { where: { Postid: id} })
    .then ((newpost) => {
        return res.json(newpost);
    })
    // Post.findOne({ where: { Postid : req.params.id}}, { where: { Userid : req.params.id}}).then((post) => {
    //     const postObject = req.file ? {
    //               ...JSON.parse(req.body.sauce),
    //               imageUrl: `${req.protocol}://${req.get("host")}/images/${
    //                   req.file.filename }`,
    //           } : { ...req.body };
    //     if (req.file) {
    //         const filename = post.imageUrl.split("/images")[1];
    //         fs.unlinkSync("images/" + filename);
    //     }

    //     Post.updateOne({ _id: req.params.id }, { ...postObject })
    //         .then(() =>
    //             res.status(200).json({ message: "Le post est modifié !" })
    //         )
    //         .catch((error) => res.status(400).json({ error }));
    // });
};

exports.deletePosts = (req, res) => {
    Post.destroy ({ where: { Postid : req.params.id}})
    .then(() =>
        res
            .status(200)
            .json({ message: "Le post est supprimé !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// exports.createLike = (req, res) => {
//     const likeValue = req.body.likes;
//     const userLiked = req.body.userLiked;
//     const userDisliked = req.body.userDisliked;
//     const liked = {
//         Userid: req.body.Userid,
//         likes: req.body.likes,
//     };
//     // switch (likeValue) {
//     //     //l'opérateur $inc de mongodb nous permet d'incrementer une valeur
//     //     case 1:
//             Post.update(
//                 {likes: Sequelize.literal('likes + 1'), userLiked: Sequelize.fn('array_append',Sequelize.col('userLiked'),userLiked) },
//                 {where: {Postid : req.params.id}}
//             )
//                 .then(() => res.status(201).json({ message: "like ajouté !" }))
//                 .catch((error) => res.status(400).json({ error }));
           

// //         case -1:
// //             Sauce.updateOne(
// //                 { _id: req.params.id },
// //                 {
// //                     $inc: { dislikes: +1 },
// //                     $push: { usersDisliked: req.body.userId },
// //                 }
// //             )
// //                 .then(() =>
// //                     res.status(201).json({ message: "dislike ajouté !" })
// //                 )
// //                 .catch((error) => res.status(400).json({ error }));
// //             break;

// //         case 0:
// //             Sauce.findOne({ _id: req.params.id })
// //                 .then((sauce) => {
// //                     if (sauce.usersLiked.includes(req.body.userId)) {
// //                         Sauce.updateOne(
// //                             { _id: req.params.id },
// //                             {
// //                                 $inc: { likes: -1 },
// //                                 $pull: { usersLiked: req.body.userId },
// //                             }
// //                         ).then(() =>
// //                             res.status(200).json({ message: "like supprimé !" })
// //                         );
// //                     } else {
// //                         Sauce.updateOne(
// //                             { _id: req.params.id },
// //                             {
// //                                 $inc: { dislikes: -1 },
// //                                 $pull: { usersDisliked: req.body.userId },
// //                             }
// //                         ).then(() =>
// //                             res
// //                                 .status(201)
// //                                 .json({ message: "dislike supprimé !" })
// //                         );
// //                     }
// //                 })
// //                 .then(() =>
// //                     res.status(201).json({ message: "Action vérifiée" })
// //                 )
// //                 .catch((error) => res.status(400).json({ error }));
// //     }
// //};

//};