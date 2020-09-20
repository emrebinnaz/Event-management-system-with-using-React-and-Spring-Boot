import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {InputGroup} from "react-bootstrap";
import CustomizedSnackbar from "../static/Snackbars/CustomizedSnackbar";

class RegisterForm extends Component {
    state = {

        userType : '',
        name : '',
        surname : '',
        email : '',
        phone : '',
        password : '',
        repeatedPassword : '',
        tcKimlikNo : '',
        birthDate : '',
        username : '',
        currentDate : '',
        message : '',
        messageType : '',
        isOpenMessage : false
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendRegisterForm = async (e) =>{
        e.preventDefault();
        const {name,surname,email,phone,username,
            password,userType,birthDate,tcKimlikNo,} = this.state;
        var newUser = {
            name : name.trim(),
            surname : surname.trim(),
            email : email.trim(),
            phone,
            username : username.trim(),
            password : password.trim(),
            birthDate,
            tcKimlikNo,
            authorities: [userType]
        }
        if(!this.arePasswordsEqual()) {
            this.setMessageAs("Yazdığınız 2 parola birbiriyle uyuşmuyor.Tekrar yazınız","ERROR");
        }
        else {
            const response = await axios.post(`/add/${userType}`,
                newUser,
                ).catch(err => {
                this.props.history.push("/notFound404");
            })
           this.setMessageAs(response.data.message,response.data.messageType);
        }
        if(this.isRegistrationSuccessfull()) {
            this.goToLoginPage();
        }
    }

    arePasswordsEqual = () => {
        const {password,repeatedPassword} = this.state;
        return password.trim() === repeatedPassword.trim();
    }

    setMessageAs = (message,messageType) => {
        this.setState({
            message : message,
            messageType : messageType,
            isOpenMessage : true,
        })
    }

    isRegistrationSuccessfull = () => {
        const {messageType} = this.state;
        return messageType === "SUCCESS";
    }

    goToLoginPage = () => {
        setTimeout((() => {
            this.props.history.push("/login");
        }),3000)
    }

    componentDidMount() {
        this.setCurrentDateAsMaxValueForBirthDateInput();
    }

    setCurrentDateAsMaxValueForBirthDateInput = () => {
        this.setState({
            currentDate : new Date().toISOString().split("T")[0]
        })
    }

    closeMessageBox = () =>{
        this.setState({
            isOpenMessage : false

        })
    }
    handleUserTypeChange = (e) => {
        this.setState({
            userType : e.target.value
        })
    }

    render() {
        return (
            <Card className={"container w-50 mt-5 text-black bg-light text-center"}>
                <Card.Header>
                    <h4>Kayıt ol</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={(e)=> this.sendRegisterForm(e)}>
                        <Form.Group>
                            <Form.Label>Sistemimize hangi tipte kullanıcı olarak kayıt olmak istiyorsunuz ?</Form.Label>
                            <InputGroup>
                                <Form.Control as="select" required
                                              value={this.state.userType}
                                              onChange={(e) => this.handleUserTypeChange(e)}>
                                    <option value=""> - </option>
                                    <option value="LECTURER">Eğitmen</option>
                                    <option value="PARTICIPANT">Katılımcı</option>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        <div className={"row"}>
                            <div className={"col"}>
                                <Form.Group>
                                    <Form.Label>İsim</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="İsim"
                                        required id="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                            <div className={"col"}>
                                <Form.Group>
                                    <Form.Label>Soyisim</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Soyisim"
                                        required id="surname"
                                        value={this.state.surname}
                                        name="surname"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                        </div>

                        <div className={"row"}>
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Kullanıcı Adı Belirleyin</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Kullanıcı Adı"
                                        required id="username"
                                        value={this.state.username}
                                        name="username"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Parola Belirleyin</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Parola"
                                        required id="password"
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Parolanızı Tekrar Girin</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Parola"
                                        required id="repeatedPassword"
                                        value={this.state.repeatedPassword} name="repeatedPassword" onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Email Adresi</Form.Label>
                                    <Form.Control
                                        type="mail"
                                        placeholder="Email"
                                        id="mail"
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Tc Kimlik Numaranız</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Tc Kimlik Numaranız"
                                        required id="tcKimlikNo"
                                        min="0"
                                        value={this.state.tcKimlikNo}
                                        name="tcKimlikNo"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="xxx-xxx-xx-xx"
                                        required id="phone"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                                        value={this.state.phone}
                                        name="phone"
                                        onChange={this.updateInput} />
                                    <small>Format: 123-456-78-90</small>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label>Doğum Tarihi</Form.Label>
                                    <Form.Control type="date"
                                                  placeholder="Doğum Tarihi"
                                                  required id="birthDate"
                                                  value={this.state.birthDate}
                                                  max ={this.state.currentDate}
                                                  name="birthDate"
                                                  onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
                {this.state.isOpenMessage ? <CustomizedSnackbar
                    vertical={"bottom"}
                    open = {this.state.isOpenMessage}
                    handleClose = {this.closeMessageBox}
                    horizontal={"right"}
                    message={this.state.message}
                    messageType={this.state.messageType}/> : null }
            </Card>
        );
    }
}

export default withRouter(RegisterForm);