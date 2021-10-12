import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../pages/home';
import Profil from '../../pages/profil';

const index = () => {
    return(
        <Router>
            <Switch>
                <Route path= "/" exact component={Home}/>
                <Route path= "/profil" exact component={Profil}/>
            </Switch>
        </Router>
    );
};

export default index;