import React, {Component} from 'react';
import {Card, Form, Button} from "react-bootstrap";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import CustomizedSnackbar from "../../../static/Snackbars/CustomizedSnackbar";
class SurveyQuestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            surveyAnswersWithIndexes : [],
            participant : '',
            isParticipantAlreadyAnsweredToSurvey : false,
            surveyQuestions : [],
            isOpenedMessageSnackbar : false,
            message : '',
            messageType : '',
            isSendingCompleted : false

        }
    }

    componentDidMount = () => {
        this.getParticipant().then(participant => {
            this.getSurveyQuestionsOfEvent().then(surveyQuestions => {
               this.isParticipantAlreadyAnsweredToSurvey(participant);
            });

        });
    }

    getParticipant = async () => {
        const participantUsername = localStorage.getItem('username');
        const response = await axios.get(`/participant/${participantUsername}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });

        this.setState({
            participant : response.data
        })
        return response.data;
    }

    getSurveyQuestionsOfEvent = async () => {
        const response = await axios.get(`/surveyQuestionsOfEvent/${this.props.event.name}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            surveyQuestions : response.data
        })
        return response.data;
    }

    isParticipantAlreadyAnsweredToSurvey = async (participant) => {

        var participantUsername = participant.username;
        const response = await axios.post(`/isAnsweredToSurveyBefore/${participantUsername}`, this.props.event,
            {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            isParticipantAlreadyAnsweredToSurvey : response.data
        })
    }

    isEventAlreadyFinished = () =>{
        var endDate = new Date(this.props.event.endDate);
        var currentDate = new Date();
        return currentDate >= endDate;
    }


    answerOptionsOfQuestion = (surveyQuestion,index) => {
        var answerOptions = surveyQuestion.answerOptions; // sorunun cevap opsiyonları
        const {surveyAnswersWithIndexes} = this.state

        return <div>
            {answerOptions.map((option,optionIndex) => {
            return (
                <div key = {option.answerOption + "div"} >
                <div className={"radio"} key = {option.answerOption + "radio div"}>
                    <label key = {"radio label" + option.answerOption}/>
                    <input
                        key = {"radio input" + option.answerOption}
                        onChange={(e) => this.changeInput(e,index)}
                        type = "radio"
                        required={optionIndex == 0}
                        name = {surveyQuestion.question}
                        value = {option.answerOption}/>{option.answerOption}
                </div>
            </div>);
        })}</div>
    }

    changeInput = (e,index) => {
        this.setState({
            surveyAnswersWithIndexes: { ...this.state.surveyAnswersWithIndexes, [index] : e.target.value },
        })
    }

    sendSurveyAnswers = async (e) => {
        e.preventDefault();
        let answersOfSurveyQuestions = this.createSurveyAnswersAsArray();
        const response = await axios.post(`/sendSurveyAnswersOf/${this.props.event.name}`,
            answersOfSurveyQuestions, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
        this.openMessageSnackbarWithMessages("Anketi gönderdiniz !", "SUCCESS");
        this.sendingCompleted();
    }

    createSurveyAnswersAsArray = () => {
        let answersOfSurveyQuestions = [];
        const {participant,surveyAnswersWithIndexes,surveyQuestions} = this.state
        for(var i = 0 ; i<surveyQuestions.length ; i++) {
            var answerOfSurveyQuestion = {
                answer : surveyAnswersWithIndexes[i],
                participant : participant,
                surveyQuestions : surveyQuestions[i]
            }
            answersOfSurveyQuestions.push(answerOfSurveyQuestion);
        }
        return answersOfSurveyQuestions;
    }

    openMessageSnackbarWithMessages = (message,messageType) =>{
        this.setState({
            isOpenedMessageSnackbar : true,
            message : message,
            messageType : messageType,
        })
    }

    sendingCompleted = () => {
        this.setState({
            isSendingCompleted : true
        })
    }

    closeMessageSnackbar = () => {
        this.setState({
            isOpenedMessageSnackbar : false
        })
    }


    render() {
        const {surveyQuestions,isParticipantAlreadyAnsweredToSurvey} = this.state;
        if(isParticipantAlreadyAnsweredToSurvey) {
            return(<div>
                <p>Bu anketi daha önce yanıtladınız. Anket sonucunu getir.</p>
            </div>);
        }
        else {
            return (
                <div className={"container"}>
                    <Card>
                        <Card.Header>
                            <h4>Etkinlik Anketi</h4>
                        </Card.Header>
                        <Form onSubmit = {(e) => this.sendSurveyAnswers(e)}>
                            <Card.Body>
                                {surveyQuestions.map((surveyQuestion,index) => {
                                    return(
                                        <Form.Group key = {`form-group ${index}`}>
                                            <Form.Label key = {`form-label ${index}`}>
                                                {index + 1 + ") "}
                                                {surveyQuestion.question}</Form.Label>
                                            {this.answerOptionsOfQuestion
                                            (surveyQuestion,index)}
                                        </Form.Group>
                                    )
                                })}
                            </Card.Body>
                            <Button type ="submit"
                                    className={"btn btn-primary"}
                                    disabled = {this.state.isSendingCompleted}>
                                Cevapları yolla
                            </Button>
                        </Form>

                    </Card>
                    {this.state.isOpenedMessageSnackbar ?
                        <CustomizedSnackbar
                            vertical={"bottom"}
                            horizontal={"right"}
                            open = {this.state.isOpenedMessageSnackbar}
                            handleClose = {this.closeMessageSnackbar}
                            message={this.state.message}
                            messageType={this.state.messageType}/> : null}

                </div>
            );

        }
            }
}

export default withRouter(SurveyQuestions);