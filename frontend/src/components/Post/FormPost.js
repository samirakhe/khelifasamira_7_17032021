import React, { useState } from "react";
import axiosInstance from "../../config/axios.config";
import { useForm } from "react-hook-form";
import "./Feed.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const FormPost = (props) => {
    const userCo = localStorage.getItem("pseudo");
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        clearErrors,
        setValue,
        reset,
    } = useForm();
    const [img, setImg] = useState("");
    const MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

    //preview de l'image
    function readURL(e) {
        const input = e.target;

        if (input.files && input.files[0]) {
            const file = input.files[0];
            if (!MIME_TYPES.includes(file.type)) {
                setError("image", {
                    type: "manual",
                    message: "Fichier non autorisé !",
                });
                input.value = null;
                setValue("image", null); // effacer dans source
                setImg(""); //effacer après le post
                return;
            }
            clearErrors("image");
            const reader = new FileReader();
            reader.onload = function (e) {
                setImg(e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    const handleFormPost = (data) => {
        const formData = new FormData();
        if (data.image.length > 0) {
            formData.append("image", data.image[0]);
        }
        formData.append("title", data.title);
        formData.append("texte", data.texte);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        axiosInstance
            .post(`/posts`, formData, config)
            .then((newPost) => {
                if (!newPost) {
                    console.log(newPost);
                    document.getElementById("textError").innerHTML =
                        "Veuillez écrire un post";
                    return false;
                } else {
                    console.log(newPost);
                    props.onPostCreated(newPost.data);
                    reset();
                    setImg("");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(data);
    };

    return (
        <form
            className="formulaire"
            action=""
            onSubmit={handleSubmit(handleFormPost)}
            id="FormPost"
        >
            <span className="userCo">CONTENT DE VOUS VOIR {userCo} !</span>
            <label htmlFor="title"></label>
            <br />
            <input
                placeholder="De quoi voulez-vous parler?"
                type="text"
                name="title"
                id="title"
                {...register("title", { required: true })}
            />
            <br />
            {errors.title && (
                <span className="errorMessage">Le titre est obligatoire</span>
            )}

            <br />
            <label htmlFor="texte"></label>
            <br />
            <input
                placeholder="Quoi de neuf ?"
                type="text-area"
                name="texte"
                id="texte"
                {...register("texte", { required: true })}
            />
            <br />
            {errors.texte && (
                <span className="errorMessage">Écrivez quelque chose</span>
            )}

            <br />

            <label htmlFor="image" className="label-file">
                <p>
                    Choisir une image <PhotoCameraIcon />
                </p>
            </label>
            <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                name="image"
                id="image"
                className="input-file"
                placeholder="Ajouter une image"
                {...register("image", {
                    onChange: readURL,
                })}
            />

            {errors.image && (
                <span className="errorMessage">{errors.image.message}</span>
            )}
            {!errors.image && img && (
                <img className="preview" alt="preview" src={img}></img>
            )}
            <br />
            <input className="btn" id="file" type="submit" value="Publier" />
        </form>
    );
};

export default FormPost;
