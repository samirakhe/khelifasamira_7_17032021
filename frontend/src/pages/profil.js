import React from 'react';
import Log from '../components/log';


const Profil = () => {
    return(
        <div className="profil-page">
            <div className="log-container">
                <Log login={false} signup={true}/>
                

            </div>
        </div>
    );
};

export default Profil;