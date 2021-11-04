import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axiosInstance from '../../config/axios.config';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
require("dotenv").config();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdatePassword(e) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // e.preventDefault();
        
  //       axiosInstance({
  //         method: "put",
  //         url:`/users`,
          
  //         data:{
  //           password,
  //           newPassword,
  //         },
          
  //       })
  //       .then((newPost)=>{
  //         console.log(newPost)
  //         const data = {title:title, texte:texte}
  //         props.upPost(props.post.Postid, data)
  //         setTitle('');
  //         setTexte('');
  //         props.handleClose();
         
  //       })
  //       .catch((err)=>{
  //         console.log(err)
  //       })
  //     }

  return (
    <div>
      <Button onClick={handleOpen}>Modifier votre mot de passe</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField type="password" fullWidth label="Entrez votre ancien mot de passe" id="fullWidth" />
        <TextField type="password" fullWidth label="Entrez votre nouveau mot de passe" id="fullWidth" />
        <TextField type="password" fullWidth label="Confirmer votre nouveau mot de passe" id="fullWidth" />
        <Button type="submit">Valider le nouveau mot de passe</Button>
        </Box>
      </Modal>
    </div>
  );
}