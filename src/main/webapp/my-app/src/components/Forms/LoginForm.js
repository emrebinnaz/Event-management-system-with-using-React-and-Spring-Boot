import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Copyright from "../static/Copyright";
import axios from "axios";
import { withRouter } from "react-router-dom";
import PositionedSnackbar from "../static/Snackbars/PositionedSnackbar";
import Consumer from '../ContextAPI/Context';


class LoginForm extends Component {

    state = {
        tcKimlikNo : '',
        password : '',
        isSnackbarOfLoginStatusOpen : false,
        loginStatusMessage : '',
        loginStatusMessageType : '',
        disabledButton : false,
        isUserRemembered : false

    }

    changeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login = async (dispatch,tcKimlikNo,password,e) =>{
        e.preventDefault();
        var loginRequest = {
            tcKimlikNo : tcKimlikNo,
            password : password
        }

        const response = await axios.post("/login",loginRequest);
        var messageResponse = response.data.messageResponse;
        this.showSnackbarOfLoginStatus(messageResponse.message,messageResponse.messageType);
        if(this.isLoginSuccess(messageResponse.messageType)){
            this.preventToSubmitFormMultipleTimes();
            localStorage.setItem("jwtToken",response.data.jwtToken);
            setTimeout(() => {
                this.goToEventsPage();
                dispatch({ type: 'jwtToken', payload: response.data.jwtToken });
            }, 3000);

        }

    }

    showSnackbarOfLoginStatus = (message,messageType) =>{
        this.setState({
            isSnackbarOfLoginStatusOpen : true,
            loginStatusMessage : message,
            loginStatusMessageType : messageType
        })
    }

    isLoginSuccess = (messageType) =>{
        return messageType === "SUCCESS"
    }

    preventToSubmitFormMultipleTimes = () =>{
        this.setState({disabledButton : true})
    }

    goToEventsPage = () =>{
        const {isUserRemembered} = this.state;
        if(isUserRemembered){
            localStorage.setItem("isUserRemembered","true");
        }
        this.props.history.push("/events");
    }

    handleCheckboxChange = (e) =>{
        this.setState({isUserRemembered: e.target.value});
    }

    setStateOfLoginStatusSnackbarForUsingAgain = () => {
        this.setState({isSnackbarOfLoginStatusOpen : false})
    }

    componentDidMount = () => {
        if(this.isUserRemembered()){
            this.props.history.push("/events");
        }
    }
    isUserRemembered = () => {
        return localStorage.getItem("isUserRemembered") && localStorage.getItem("jwtToken")
    }


    render() {
        const form = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }

        const {tcKimlikNo,password,loginStatusMessage, loginStatusMessageType} = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const {dispatch} = value;
                        return(
                            <div style={form} className={"mt-5"}>
                                <Typography
                                    variant ="h5"
                                    color="primary">
                                    Etkinlik Yönetim Sistemine Hoşgeldiniz !
                                </Typography>
                                <form className={"w-75"} onSubmit = {(e) => this.login(dispatch,tcKimlikNo,password,e)}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="tcKimlikNo"
                                        value = {tcKimlikNo}
                                        onChange = {this.changeInput}
                                        label="TC Kimlik No"
                                        name="tcKimlikNo"
                                        autoComplete="tcKimlikNo"
                                        autoFocus
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Parola"
                                        type="password"
                                        id="password"
                                        value = {password}
                                        onChange = {this.changeInput}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember"
                                                           color="primary"
                                                           onChange={(e) => this.handleCheckboxChange(e)}/>}
                                        label="Beni Hatırla"
                                    />
                                    <Button
                                        onClick={this.setStateOfLoginStatusSnackbarForUsingAgain}
                                        type="submit"
                                        fullWidth
                                        disabled = {this.state.disabledButton}
                                        variant="contained"
                                        color="primary">
                                        Giriş Yap
                                    </Button>
                                    <Grid container>
                                        <Typography variant="body2" color="textSecondary" align="center" className = {"mt-5"}>
                                            Sisteme erişebilmek için lütfen  giriş yapınız.
                                        </Typography>
                                    </Grid>
                                    <hr/>
                                </form>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                                {this.state.isSnackbarOfLoginStatusOpen  ?
                                    <PositionedSnackbar
                                        message = {loginStatusMessage}
                                        messageType = {loginStatusMessageType}
                                        vertical = {"bottom"}
                                        horizontal = {"right"}/> : null}
                            </div>

                        )
                    }
                }
            </Consumer>
        );
    }
}
export default withRouter(LoginForm);