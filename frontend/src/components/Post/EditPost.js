import React, { useState } from 'react';
import axiosInstance from '../../config/axios.config';
import "./Feed.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useForm } from "react-hook-form";




const EditPost = (props) => {

    //const [Userid, setUserid] = useState("");
    const [title, setTitle] =  useState(props.post.title);
    const [texte, setTexte] = useState(props.post.texte);
    const {register, handleSubmit,setError,formState: { errors },clearErrors, setValue,reset} = useForm();
    const [img, setImg] = useState("");
    const MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];
    


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
    
    const handleFormPost = (e) => {
        e.preventDefault();
        
        axiosInstance({
          method: "put",
          url:`/posts/${props.post.Postid}`,
          
          data:{
            title,
            texte,
          },
          
        })
        .then((newPost)=>{
          console.log(newPost)
          const data = {title:title, texte:texte}
          props.upPost(props.post.Postid, data)
          setTitle('');
          setTexte('');
          props.handleClose();
         
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    return(
        <form className="formulaire" action="" onSubmit={handleFormPost} id="FormPost">
        <label htmlFor="title">Sujet</label>
        <br/>
        <input 
          type="text" 
          name="title" 
          id="title" 
          onChange={(e) => setTitle(e.target.value)} 
          value={title}/>

          <div className="title error"></div>

        <br/>
        <label htmlFor="texte">Votre Message</label>
        <br/>
        <input 
          type="text-area" 
          name="texte" 
          id="texte" 
          onChange={(e) => setTexte(e.target.value)} 
          value={texte}/>

          <div className=" texte error"></div>

        <br/>

        <label for="image" className="label-file">
            <p>Choisir une image <PhotoCameraIcon/></p>  
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
            <img className="preview" src={img}></img><br/>
        
        <input type="submit" value="Modifier"/>
      </form>
    );
};

export default EditPost;