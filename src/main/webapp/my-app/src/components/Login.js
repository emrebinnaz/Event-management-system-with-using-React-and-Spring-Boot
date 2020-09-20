import React, {Component,useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LoginPageImage from "./static/LoginPageImage";
import LoginForm from "./Forms/LoginForm";
import Consumer from './ContextAPI/Context';


class Login extends Component {

    state = {
        isVisible : true
    }

    /*
    *                         */
    resetAuthenticationValues = (dispatch) => {
        this.setState({
            isVisible : false
        })
        localStorage.clear();
        dispatch({type :"resetAuthenticationValues", payload : ""});

    }


    render() {
        const root = {
            height: '100vh',
        };
        return (
            <Consumer>
                {
                    value =>{
                        const {dispatch}  = value;
                        return(
                            <Grid container component="main" style={root}>
                                {this.state.isVisible ? this.resetAuthenticationValues(dispatch) : null}
                                <CssBaseline/>
                                <LoginPageImage/>
                                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                    <LoginForm></LoginForm>
                                </Grid>
                            </Grid>

                        );
                    }
                }
            </Consumer>
        );
    }
}

export default Login;