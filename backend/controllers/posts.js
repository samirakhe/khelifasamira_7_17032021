const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/posts");
require("dotenv").config();

exports.getAllposts = (req, res) => {
    Post.findAll()
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.createPosts = (req, res) => {
    const post = {
        texte: "Nous étudions le dev web chez OCR",
    };
    Post.create(post);
};

exports.modifyPosts = (req, res) => {
    // Post.findOne({ _id: req.params.id, userId: req.user }).then((post) => {
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
    // Post.destroy ({ where: { Postid : req.params.id}})
    // .then(() =>
    //     res
    //         .status(200)
    //         .json({ message: "Le post est supprimé !" })
    // )
    // .catch((error) => res.status(400).json({ error }));
};
