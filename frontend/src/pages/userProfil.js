import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axiosInstance from "../config/axios.config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Pages.css";

const UserProfil = (props) => {
    const [userInformations, setUserInformations] = useState({});
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const userInfo = localStorage.getItem("connectedUser");
        if (!userInfo) {
            history.push("/");
        } else {
            setUserInformations(JSON.parse(userInfo));
        }
    }, []);

    const deleteUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("pseudo");
        localStorage.removeItem("connectedUser");
        localStorage.removeItem("roles");
        window.location = "/";
    };

    const deleteProfil = (e) => {
        e.preventDefault();

        axiosInstance({
            method: "delete",
            url: `/users/${userInformations.Userid}`,
        })
            .then(() => {
                deleteUser();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //importé de material ui
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="user-profil">
            <div className="avatar-col">
                <h1>Bonjour {userInformations.pseudo} </h1>

                <h3>BIENVENUE SUR VOTRE PROFIL</h3>
            </div>

            <div className="user-info">
                <h2>Mes informations de connexion</h2>

                <p>Pseudo : {userInformations.pseudo} </p>
                <p>Email : {userInformations.email} </p>
                <Button
                    className="deleteButton"
                    onClick={handleOpen}
                    color="neutral"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                >
                    Supprimer mon compte
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <p>Confirmer la suppression du compte</p>
                        <Button
                            className="deleteButton"
                            onClick={deleteProfil}
                            color="neutral"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                        >
                            OK
                        </Button>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default UserProfil;
