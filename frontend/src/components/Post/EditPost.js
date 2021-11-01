import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../config/axios.config';




const EditPost = (props) => {

    //const [Userid, setUserid] = useState("");
    const [title, setTitle] =  useState(props.post.title);
    const [texte, setTexte] = useState(props.post.texte);
    
    
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
        
        <input type="submit" value="Modifier"/>
      </form>
    );
};

export default EditPost;