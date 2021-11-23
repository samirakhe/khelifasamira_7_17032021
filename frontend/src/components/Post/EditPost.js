import React, {useState } from 'react';
import axiosInstance from '../../config/axios.config';
import "./Feed.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useForm } from "react-hook-form";




const EditPost = (props) => {

    const {register, handleSubmit,setError,formState: { errors },clearErrors, setValue} = useForm();
    const [imag, setImag] = useState("");
    const MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

    setValue("title", props.post.title);
    setValue("texte", props.post.texte);
    
    function readurl(e) {
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
              setImag(""); //effacer après le post
              return;
          }
          clearErrors("image");
          const reader = new FileReader();
          reader.onload = function (e) {
              setImag(e.target.result);
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
        axiosInstance.put(`/posts/${props.post.Postid}`, formData, config)

        .then((newPost)=>{
          console.log(newPost)
          const data = newPost.data;
          props.upPost(props.post.Postid, data)
          props.handleClose();
         
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    return(
        <form className="formulaire" action="" onSubmit={handleSubmit(handleFormPost)} id="editPost">
        <label htmlFor="title">Sujet</label>
        <br/>
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

        <br/>
        <label htmlFor="texte">Votre Message</label>
        <br/>
        <input 
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

        <label for="imge" className="label-file">
            <p>Choisir une image <PhotoCameraIcon/></p>  
            </label>
            <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                name="image"
                id="imge"
                className="input-file"
                placeholder="Ajouter une image"
                {...register("image", {
                    onChange: readurl,
                })}
            />
         
            {errors.image && (
                <span className="errorMessage">{errors.image.message}</span>
            )}
            <img className="preview"   src={imag}></img><br/>
        
        <input className="btn" type="submit"  value="Modifier"/>
      </form>
    );
};

export default EditPost;