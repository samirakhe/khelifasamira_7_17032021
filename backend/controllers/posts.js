const { Sequelize, Models, DataTypes } = require("sequelize");
const express = require("express");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/posts");
const User = require("../models/user");
const Commentaires = require("../models/commentaires");
const sequelize = require("../models/db");
require("dotenv").config();

exports.getAllposts = (req, res) => {
    Post.findAll({
        include: [
            "likes",
            {
                model: Commentaires,
                as: "commentaires",
                attributes: ["Commentaireid", "commentaire", "createdAt"],
                include: [{ model: User, as: "user", attributes: ["pseudo"] }],
            },
            { model: User, as: "user", attributes: ["pseudo"] },
        ], //as de init
        order: [["createdAt", "DESC"]],
    })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json("Posts non trouvés");
        });
};

exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id, {
        //findbyprimarykey
        include: ["likes", "commentaires"],
    })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json("Post non trouvé");
        });
};

exports.createPosts = (req, res) => {
    const post = req.body;
    Post.create({ ...post, Userid: req.user.Userid })
    .then((post_cree) => {
        // post_cree.user = {pseudo: req.user.pseudo};
        //console.log(post_cree)
        return res.json({
            ...post_cree.dataValues,
            user: { pseudo: req.user.pseudo },
            likes: [],
            commentaires: []

        });
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
    const data = req.body;
    Post.update(data, { where: { Postid: id } })
    .then((newpost) => {
        return res.json(newpost);
    });
};

exports.deletePosts = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { Postid: req.params.id, Userid: req.user.Userid },
        });
        if (!post) {
            return res.status(401).json("Action non autorisée");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Erreur interne du serveur");
    }
    Post.destroy({ where: { Postid: req.params.id, Userid: req.user.Userid } })
        .then(() => res.status(200).json({ message: "Le post est supprimé !" }))
        .catch((error) => {
            console.log(error);
            res.status(400).json("Action non autorisée");
        });
};

exports.deletePostsbyAdmin = (req, res) => {
    Post.destroy({ where: { Postid: req.params.id } })
        .then(() => res.status(200).json({ message: "Le post est supprimé !" }))
        .catch((error) => {
            console.log(error);
            res.status(400).json("Erreur interne du serveur");
        });
};
