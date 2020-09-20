import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import { isLogin, isOrganizator } from '../../Authentication';
import NotFound from "../static/NotFound";
const OrganizatorRoute = ({component: Component, ...rest}) => {

    // urldeki username localdeki username ile eşit mi diye kontrol ediyor.
    return (
        <Route {...rest} render={props => (
            isLogin() &&  "ORGANIZATOR" === localStorage.getItem("authorities") ?
                <Component {...props} /> :
                <Route component={NotFound}/>
        )} />
    );
};

export default OrganizatorRoute;