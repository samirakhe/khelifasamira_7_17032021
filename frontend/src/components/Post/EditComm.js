import React, { useState } from 'react';
import axiosInstance from '../../config/axios.config';

const EditComm = (props) => { 

    const [texte, setTexte] = useState(props.commentaire.commentaire);
    const handleFormComm = (e) => {
        e.preventDefault();
        
    axiosInstance({
        method: "put",
        url: `/commentaires/${props.commentaire.Commentaireid}`,
        
        data:{
        commentaire:texte,
          },       
        
    }).then((success)=>{
        console.log(success)
      
        const data = {Commentaireid:props.commentaire.Commentaireid, texte:texte}
        props.upComment(data)
        setTexte('');
        props.handleClose();
       
       
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    return(
        <form className="formulaire" action="" onSubmit={handleFormComm} id="FormPost">  
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
        
        <input  type="submit" value="Modifier"/>
      </form>
    );
};

export default EditComm;