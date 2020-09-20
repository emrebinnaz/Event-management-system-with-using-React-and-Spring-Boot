import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import {isLecturer, isParticipant} from "../../../Authentication";
import axios from "axios";
import CustomizedSnackbar from "../../static/Snackbars/CustomizedSnackbar";
import {withRouter} from "react-router-dom";
import {Form} from "react-bootstrap";
class QuestionTextArea extends Component {

    constructor(props){
        super(props);
        this.state = {
            isParticipantAlreadyJoinedToEvent : false,
            isLecturerAlreadyJoinedToEvent : false,
            question : '',
            event : '',
            participant : '',
            isOpenedMessageSnackbar : false,
            message : '',
            messageType : '',
        };
    }

    componentDidMount = () => {
        this.getEvent().then(event => {
            if(isParticipant()){
                this.getParticipant();
                this.isParticipantAlreadyJoinedTo(event);
            }
            else if(isLecturer()) {
                this.isLecturerAlreadyJoinedTo(event);
            }
        })
    }

    getEvent = async () => {
        const {eventName} = this.props.match.params;
        const response = await axios.get(`/events/${eventName}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            event : response.data
        })
        return response.data;
    }

    getParticipant = async () =>{
        var participantUsername = localStorage.getItem("username");
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
    }

    isParticipantAlreadyJoinedTo = async (event) => {

        var participantUsername = localStorage.getItem("username");
        const response = await axios.post(`/isJoinedBefore/${participantUsername}`,
            event, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })

        this.setState({
            isParticipantAlreadyJoinedToEvent : response.data
        })

    }

    isLecturerAlreadyJoinedTo = async (event) => {
        var lecturerUsername = localStorage.getItem("username");
        const lecturer = await axios.get(`/lecturer/of/${event.name}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        if(lecturer.data.username === lecturerUsername) {
            this.setState({
                isLecturerAlreadyJoinedToEvent :  lecturerUsername
            })
        }

    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    sendQuestion = async (e) => {
        e.preventDefault();
        const {event,participant,question} = this.state;
        const {participantQuestions} = this.props;
        if(this.isSameQuestionAlreadyAsked(participantQuestions,question)) {
            this.openMessageSnackbarWithMessages("Bu soruyu daha önce sordunuz. ",
                "ERROR");
        }
        else {
            var newParticipantQuestionAboutEvent = {
                event,
                participant,
                question : question.trim()
            }
            const response = await axios.post(`/sendParticipantQuestion/${question}`,
                newParticipantQuestionAboutEvent, {
                    headers : {
                        'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                    }
                }).catch(err => {
                this.props.history.push("/notFound404");
            })
            this.openMessageSnackbarWithMessages(response.data.message,response.data.messageType);
            this.props.handleAdding(newParticipantQuestionAboutEvent);
        }

    }

    isSameQuestionAlreadyAsked = (participantQuestions,newQuestion) => {
        newQuestion = newQuestion.trim();
        var questions = [];
          participantQuestions.map(participantQuestion => {
            questions.push(participantQuestion.question);
        })
        return questions.indexOf(newQuestion) > 0;
    }


    openMessageSnackbarWithMessages = (message,messageType) =>{
        this.setState({
            isOpenedMessageSnackbar : true,
            message : message,
            messageType : messageType,
        })
    }

    closeMessageSnackbar = () =>{
        this.setState({
            isOpenedMessageSnackbar : false
        })
    }


    render() {
        const {isLecturerAlreadyJoinedToEvent,question,
            isParticipantAlreadyJoinedToEvent} = this.state;
        return (
            <div>
                {(isLecturerAlreadyJoinedToEvent || isParticipantAlreadyJoinedToEvent)  ?
                 <div>
                    <form onSubmit={(e) => this.sendQuestion(e)}>
                        <div className="form-group">
                            <label htmlFor="comment">Comment:</label>
                            <textarea
                                className="form-control"
                                rows="5"
                                required
                                name = "question"
                                value ={question}
                                id="comment"
                                onChange = {(e) => this.changeInput(e)}/>
                            <Button className={"btn-btn primary"}
                                    type = "submit">Soruyu gönder </Button>
                        </div>
                    </form>
                </div> : null}
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

export default withRouter(QuestionTextArea);