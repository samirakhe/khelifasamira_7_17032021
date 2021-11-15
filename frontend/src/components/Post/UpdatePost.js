import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

import CreateIcon from "@mui/icons-material/Create";
import EditPost from './EditPost';

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

export default function UpdatePost(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <CreateIcon onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditPost handleClose={handleClose} upPost={props.upPost} post={props.post}/>
        </Box>
      </Modal>
    </div>
  );
}
