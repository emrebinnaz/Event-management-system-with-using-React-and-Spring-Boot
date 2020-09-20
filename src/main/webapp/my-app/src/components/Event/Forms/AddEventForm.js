import React, {Component} from 'react';
import {Card, Form, Button, Col, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import PositionedSnackbar from "../../static/Snackbars/PositionedSnackbar";
import Consumer from "../../ContextAPI/Context"
import LecturerSelection from "../../Lecturer/LecturerSelection";
import DesicionDialogForAddingQuestionsToEvent from "../DesicionDialogForAddingQuestionsToEvent";
class AddEventForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        name : '',
        startDate : '',
        endDate : '',
        address : '',
        quota : 0,
        longitude : 0,
        lecturerUsername : '',
        latitude : 0,
        currentNumberOfPeople : 0,
        raffleWinnerUsername : '',
        isSubmittedForm: false,
        message : '',
        messageType : '',
        isAdded : false
    }

    resetAllInputs = () =>{
        this.setState(() => this.initialState);
    }

    addEvent = async (e,dispatch) =>{
        const {name,startDate,endDate,quota,
            longitude,latitude,address,lecturerUsername,
            currentNumberOfPeople,raffleWinnerUsername} = this.state;

         e.preventDefault();
        var event  = {
            name : name.trim(),
            startDate,
            endDate,
            quota,
            longitude,
            latitude,
            address,
            lecturerUsername,
            currentNumberOfPeople,
            raffleWinnerUsername,
        }
        var organizatorUsername = localStorage.getItem("username");
        const response = await axios.post(`/events/${organizatorUsername}/${this.state.lecturerUsername}`,
            event, {
            headers : {
                'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
            }
        }).catch(err => {
            this.props.history.push("/notFound404");
        })

        this.showMessage(response.data);
        if(this.isAdditionSuccess(response.data.messageType)) {
            dispatch({ type: 'addEvent', payload: event })

        }
        setTimeout(() => {
            this.setState({
                isSubmittedForm : false,
            })
        }, 2000);

    }

    showMessage = (messageResponse) =>{
        this.setState({
            isSubmittedForm : true,
            message : messageResponse.message,
            messageType :messageResponse.messageType
        })
    }

    isAdditionSuccess = (messageType) => {
        return messageType === 'SUCCESS'
    }

    changeInput = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    changeLecturerUsernameWith = (val) =>{
        this.setState({
            lecturerUsername : val
        })
    }

    render() {
        const {name,startDate,endDate,quota,longitude,address,
               latitude,isSubmittedForm,
                message,messageType} = this.state;

        return (
            <Consumer>
                {
                    value =>{
                        const {dispatch} = value;
                        return(
                            <div>
                                <Card className={"container w-50 mt-5"}>
                                    <Card.Header>
                                        Etkinlik Ekle
                                    </Card.Header>
                                    <Form onReset={this.resetAllInputs} onSubmit={(e) => this.addEvent(e,dispatch)} >
                                        <Card.Body>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridName">
                                                    <Form.Label>İsim</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="text" name="name"
                                                                      value={name} onChange={(e) => this.changeInput(e)}
                                                                      className={"bg-dark text-white"}
                                                                      placeholder="İsim" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridStartDate">
                                                    <Form.Label>Başlangıç Tarihi</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="date" name="startDate"
                                                                      value={startDate} onChange={(e) => this.changeInput(e)}
                                                                      className={"bg-dark text-white"}
                                                                      placeholder="Başlangıç tarihi" />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridEndDate">
                                                    <Form.Label>Bitiş Tarihi</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="date" name="endDate"
                                                                      min = {startDate}
                                                                      value={endDate} onChange={this.changeInput}
                                                                      className={"bg-dark text-white"}
                                                                      placeholder="Bitiş tarihi" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridQuota">
                                                    <Form.Label>Etkinlik Kontenjanı</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="number" name="quota"
                                                                      min = "1"
                                                                      value={quota} onChange={this.changeInput}
                                                                      className={"bg-dark text-white"}
                                                                      placeholder="Etkinlik Kontenjanı" />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridLongitude">
                                                    <Form.Label>Boylam</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="number" name="longitude"
                                                                      value={longitude} onChange={this.changeInput}
                                                                      className={"bg-dark text-white"}
                                                                      placeholder="Boylam" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridAddress">
                                                    <Form.Label>Adres</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="text" name="address"
                                                                      value={address} onChange={(e) => this.changeInput(e)}
                                                                      className={"bg-dark text-white"}
                                                                      placeholder="Adres" />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridLatitude">
                                                    <Form.Label>Enlem</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required
                                                                      type="number" name="latitude"
                                                                      value={latitude} onChange={this.changeInput}
                                                                      className={"bg-dark text-white"}
                                                                      placeholder="Enlem" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <LecturerSelection
                                                    onSelectLecturer = {this.changeLecturerUsernameWith}></LecturerSelection>

                                            </Form.Row>
                                        </Card.Body>
                                        <Card.Footer style={{"textAlign":"right"}}
                                                     className={"d-flex justify-content-between"}>
                                            <Button variant="success" type="submit" disabled = {isSubmittedForm}>
                                                Onayla
                                            </Button>
                                            <Button  variant="info" type="reset">
                                                Resetle
                                            </Button>
                                        </Card.Footer>
                                    </Form>
                                </Card>
                                {isSubmittedForm  ?
                                    <PositionedSnackbar
                                        message = {message}
                                        messageType = {messageType}
                                        vertical = {"bottom"}
                                        horizontal = {"right"}/>
                                        : null}
                                {messageType === "SUCCESS" ? <DesicionDialogForAddingQuestionsToEvent
                                                                eventName = {name}/> : null}



                            </div>
                        );
                    }
                }
            </Consumer>

        );
    }
}

export default AddEventForm;