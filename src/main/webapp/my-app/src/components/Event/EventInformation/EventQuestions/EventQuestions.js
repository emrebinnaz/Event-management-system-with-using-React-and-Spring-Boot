import React, {Component} from 'react';
import axios from 'axios';
import {Card, Form, Button, Col, InputGroup} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {isOrganizator, isParticipant} from "../../../../Authentication";
import CustomizedSnackbar from "../../../static/Snackbars/CustomizedSnackbar";
import QrCode from "../../../QrCode/QrCode";
class EventQuestions extends Component {
    state = {
        questions : [],
        answersWithIndexes : '', // it is an object which has index and answer
        isEventAlreadyStarted : false,
        isParticipantAlreadyAnswered : false,
        message: '',
        messageType : '',
        isParticipationSuccessfull : false,
        isOpenedQrCode : false,
    }

    componentDidMount = () => {
        this.getEvent().then( event => {
            if(isParticipant()){
                this.isParticipantAlreadyAnsweredToQuestions();
            }
            this.getQuestionsOfEvent();

        });

    }

    getEvent = async () => {
        const response = await axios.get(`/events/${this.props.event.name}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            event: response.data
        })
        return response.data;
    }

    isParticipantAlreadyAnsweredToQuestions = async () =>{
        const {event} = this.props;
        var participantUsername = localStorage.getItem('username');
        const response = await axios.get(`/answersOfEvent/${this.props.event.name}/${participantUsername}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            isParticipantAlreadyAnswered : response.data
        })

    }

    getQuestionsOfEvent = async () =>{
        const response = await axios.get(`/questionsOfEvent/${this.props.event.name}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            questions : response.data
        })
    }


    joinEvent = async (e) =>{
        e.preventDefault();
        this.submitAnswers();
        const {event} = this.props;
        var participantUsername = localStorage.getItem("username");
        const response = await axios.post(`/join/${participantUsername}`,
            event, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
        this.showMessage(response.data);
        this.sendEmailToParticipant();
        this.openQrCode();

    }

    submitAnswers = () =>{
        const { answersWithIndexes } = this.state;
        var answers = this.extractAnswersFrom(answersWithIndexes);
        this.sendAnswersAsRequest(answers);
    }

    showMessage = (messageContent) =>{
        this.setState({
            message : messageContent.message,
            messageType : messageContent.messageType,
            isParticipationSuccessfull : true,
        })
    }

    sendEmailToParticipant = async () =>{
        var participantUsername = localStorage.getItem("username");
        const response = await axios.post(`/sendEmail/${participantUsername}`,
            this.props.event, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
    }

    openQrCode = () => {
        this.setState({
            isOpenedQrCode : true
        })
    }

    extractAnswersFrom = (answersWithIndexes) =>{
        var answers = [];
        (Object.values(answersWithIndexes).forEach(answer => {
            answers.push(answer);
        }));
        return answers;
    }

    sendAnswersAsRequest = async (answers) =>{
        await axios.post(`/answersOfEvent/${this.props.event.name}/${localStorage.getItem("username")}`,
            answers, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
    }

    updateInput = (e,index) =>{
        this.setState({
            answersWithIndexes: { ...this.state.answersWithIndexes, [index] : e.target.value }
        })
    }

    isEventFull = () =>{
        const {event} = this.props;
        return event.quota == event.currentNumberOfPeople
    }

    isEventHasQuestions = () =>{
        const {questions} = this.state;
        return questions.length > 0;
    }

    closeMessage = () => {
        this.setState({
            isParticipationSuccessfull : false
        })
    }
    closeQrCode = () => {
        this.setState({
            isOpenedQrCode : false
        })
    }

    render() {
        const {name} = this.props.event;
        const {event} = this.props;
        var participantUsername = localStorage.getItem("username");
        const {questions,answersWithIndexes,isParticipantAlreadyAnswered,
        isParticipationSuccessfull,messageType,message} = this.state;
        return (
            <div className={"container"}>
                {isParticipantAlreadyAnswered ?
                    this.props.history.push(`/participantAnswersOf/${name}`) : null}
                {isOrganizator() ? <a className={"link-item"}>Bu etkinliğe kayıt olanların cevaplarını gör</a> : null}
                {isParticipant() ?
                    <Card>
                        <div>
                            <Card.Header>
                                Etkinlik Soruları
                            </Card.Header>
                            <Form onSubmit = {(e) => this.joinEvent(e)}>
                                <Card.Body>
                                    {
                                        questions.map((question,index) => {
                                            return (
                                                <Form.Group key = {`form-group ${index}`}>
                                                    <Form.Label key = {`form-label ${index}`}>
                                                        {question.question}</Form.Label>
                                                    <InputGroup key = {`input-group ${index}`}>
                                                        <Form.Control required = {question.isQuestionRequired}
                                                                      type={question.questionType}
                                                                      id = {answersWithIndexes[index]}
                                                                      name={answersWithIndexes[index]}
                                                                      value={answersWithIndexes[index]}
                                                                      placeholder = {!question.isQuestionRequired ?  "Opsiyonel" : null}
                                                                      key = {`form-control ${index}`}
                                                                      min = {question.questionType === 'number' ?
                                                                          parseInt(question.expectedMinValueAnswerOfQuestion) :
                                                                          question.questionType === 'date' ?
                                                                              question.expectedMinValueAnswerOfQuestion : null
                                                                      }
                                                                      max = {question.questionType === 'number' ?
                                                                          parseInt(question.expectedMaxValueAnswerOfQuestion) :
                                                                          question.questionType === 'date' ?
                                                                              question.expectedMaxValueAnswerOfQuestion : null
                                                                      }
                                                                      onChange={(e) => this.updateInput(e,index)}
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            )
                                        })
                                    }
                                </Card.Body>
                                {this.isEventHasQuestions()  ?
                                    <Card.Footer style={{"textAlign":"right"}}>
                                        {this.isEventFull() ?
                                            <p>Bu etkinlik dolu olduğu için katılamazsınız</p>
                                            : <Button variant="success"
                                                      type="submit">
                                                Cevapları Yolla ve Etkinliğe Katıl
                                              </Button>
                                        }

                                    </Card.Footer>
                                : null}
                                {isParticipationSuccessfull ?
                                    <CustomizedSnackbar
                                        vertical={"bottom"}
                                        horizontal={"right"}
                                        open = {isParticipationSuccessfull}
                                        handleClose = {this.closeMessage}
                                        message={message}
                                        messageType={messageType}/> : null
                                }
                                {this.state.isOpenedQrCode ?
                                    <QrCode
                                        participantUsername = {participantUsername}
                                        event = {event}
                                        handleClose = {this.closeQrCode}/> : null }
                            </Form>

                        </div>
                </Card>
                    : null}
            </div>
        );
    }
}

export default withRouter(EventQuestions);