import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import { isLogin } from '../../Authentication';
import NotFound from "../static/NotFound";
const ParticipantRoute = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            isLogin() &&  "PARTICIPANT" === localStorage.getItem("authorities") ?
                <Component {...props} /> :
                <Route component={NotFound}/>
        )} />
    );
};

export default ParticipantRoute;