import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaUserAlt } from "react-icons/fa";
import "./log.css";

export default function MenuLogout(props) {
    const userCo = localStorage.getItem("pseudo");
    const goToProfil = () => {
        window.location = "/userprofil";
    };
    // suppression des données de l'user du localstorage, afin de le deconnecter
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("pseudo");
        localStorage.removeItem("connectedUser");
        localStorage.removeItem("roles");
        window.location = "/";
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <span className="userCo">{userCo}</span> <FaUserAlt />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={goToProfil}>Profil</MenuItem>
                <MenuItem onClick={logout}>Se Déconnecter</MenuItem>
            </Menu>
        </div>
    );
}
