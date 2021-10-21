import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../config/axios.config';

const FormPost = (props) => {

    //const [Userid, setUserid] = useState("");
    const [title, setTitle] =  useState("");
    const [texte, setTexte] = useState("");
    
    
    const handleFormPost = (e) => {
        e.preventDefault();
        
        axiosInstance({
          method: "post",
          url:`/posts`,
          
          data:{
            title,
            texte,
          },
          
        })
        .then((newPost)=>{
          console.log(newPost)
          props.onPostCreated(newPost.data)
         
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
        
        <input type="submit" value="Poster"/>
      </form>
    );
};

export default FormPost;