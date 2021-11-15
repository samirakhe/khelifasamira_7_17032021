import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import { useForm } from "react-hook-form";
import "./Feed.css";


const FormPost = (props) => {
    const {register,handleSubmit,setError,formState: { errors },clearErrors,setValue,reset} = useForm();
    const [img, setImg] = useState('');
    const MIME_TYPES = [
        'image/jpg',
        'image/jpeg',
        'image/png'
    ];
        


//preview de l'image

    function readURL(e) {
        const input = e.target;

        if (input.files && input.files[0]) {
            const file = input.files[0]
            if(!MIME_TYPES.includes(file.type)){
                setError("image", {
                    type: "manual",
                    message: "Fichier non autorisé !",
                  });
                input.value = null;
                setValue('image', null) // effacer dans source
                setImg('') //effacer après le post
                return;
            }
            clearErrors('image');
            const reader = new FileReader();
            reader.onload = function (e) {
                setImg(e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

  

    const handleFormPost = (data) => {
        const formData = new FormData();
        if(data.image.length > 0){
            formData.append('image', data.image[0])
        }
        formData.append("title", data.title);
        formData.append("texte", data.texte);
     

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        axiosInstance.post(`/posts`, formData, config)
            .then((newPost) => {
                if (!newPost) {
                    console.log(newPost);
                    document.getElementById("textError").innerHTML ="Veuillez écrire un post";
                    return false;
                } else {
                    console.log(newPost);
                    props.onPostCreated(newPost.data);
                    reset();
                    setImg('');
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
            <label htmlFor="title">Sujet</label>
            <br />
            <input
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
            <label htmlFor="texte">Votre Message</label>
            <br />
            <input
                type="text-area"
                name="texte"
                id="texte"
                {...register("texte", { required: true })}
            />
            <br />
            {errors.texte && (
                <span className="errorMessage">Écrivez un post</span>
            )}

            <br />

            <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                name="image"
                id="image"
                placeholder="Ajouter une image" 
                {...register("image",{ 
                    onChange: readURL })}
                
            />
              <br />
            {errors.image && (
                <span className="errorMessage">{errors.image.message}</span>
            )}
            <img src={img}></img>
            <br />
            <input className="btn" type="submit" value="POSTER" />
        </form>
    );
};

export default FormPost;

