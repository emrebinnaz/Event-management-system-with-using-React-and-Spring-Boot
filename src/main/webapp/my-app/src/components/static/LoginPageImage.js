import react from 'react';
import App from "../../App";
import Grid from "@material-ui/core/Grid";
import React from "react";

function LoginPageImage() {
    const image = {
        backgroundImage: 'url(https://source.unsplash.com/user/samuelpereira)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'left-center',
    }
    return(
        <Grid item xs = {false} sm = {4} md = {7} style = {image} />
    );
}

export default LoginPageImage;
