import React from 'react';
import Log from '../components/log/Log';


const Profil = () => {
    return(
        <div className="profil-page">
            <div className="log-container">
                <Log login={true} signup={false}/>
            </div>
        </div>
    );
};

export default Profil;