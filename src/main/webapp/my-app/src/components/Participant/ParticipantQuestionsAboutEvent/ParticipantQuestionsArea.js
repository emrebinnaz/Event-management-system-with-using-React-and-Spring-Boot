import React, {Component} from 'react';
import QuestionTextArea from "./QuestionTextArea";
import {isLecturer, isOrganizator, isParticipant} from "../../../Authentication";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import {withRouter} from 'react-router-dom';
import SimpleBackdrop from "../../static/SimpleBackdrop";
class ParticipantQuestionsArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            participantQuestions : [],
            isBackdropOpen : true,
        }
    }

    componentDidMount = () => {
        this.getParticipantsQuestionsOfEvent()
            .then(participantQuestions => {
                if(isParticipant()){
                    this.showQuestionsOfJustThatParticipant(participantQuestions);
                }
                else if(isLecturer()) {
                    this.showAllQuestionsForLecturer();
                }
                this.closeBackdrop();
            });

    }

    getParticipantsQuestionsOfEvent = async () =>{
        const {eventName} = this.props.match.params;
        const response = await axios.get(`/participantsQuestions/${eventName}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        })
        this.setState({
            participantQuestions : response.data,
        })
        return response.data;

    }

    showQuestionsOfJustThatParticipant = (allQuestions) => {
        var participantUsername = localStorage.getItem('username');
        var questionsOfThatParticipant = allQuestions.filter(question =>
            question.participant.username === participantUsername );
        this.setState({
            participantQuestions : questionsOfThatParticipant
        })
    }

    showAllQuestionsForLecturer = async () => {
        const {eventName} = this.props.match.params;
        const response = await axios.get(`/lecturer/of/${eventName}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });

        if(!this.isEventHasThatLecturer(response.data)) {
            this.dontShowTheQuestions();
        }
    }

    closeBackdrop = () =>{
        this.setState({
            isBackdropOpen : false
        })
    }

    isEventHasThatLecturer =  (lecturerOfEvent) =>{
        var lecturerUsername = localStorage.getItem('username');
        return lecturerOfEvent.username === lecturerUsername;
    }

    dontShowTheQuestions = () => {
        this.setState({
            participantQuestions : []
        })
    }

    isEventStartedAndNotFinished = (event) =>{
        var endDate = new Date(event.endDate);
        var currentDate = new Date();
        return endDate >= currentDate && this.isEventAlreadyStarted(event);
    }

    isEventAlreadyStarted = (event) =>{
        var startDate = new Date(event.startDate);
        var currentDate = new Date();
        return startDate <= currentDate;
    }

    setParticipantQuestionsWith = (newQuestion) => {
        this.setState({
            participantQuestions : [...this.state.participantQuestions,newQuestion]
        })
    }

    addAnswerToQuestion = (answer,questionIndex) => {
        const {participantQuestions} = this.state;
        participantQuestions[questionIndex].answer = answer;
        this.setState({
            participantQuestions : participantQuestions
        })
    }

    render() {
        const {isEventStartedAndNotFinished,isBackdropOpen,
            participantQuestions} = this.state;
        const {event} = this.props;
        return (
            <div>
                {!isOrganizator() ?
                    <div className={"mt-5 container"}>
                        <SimpleBackdrop
                        handleOpen = {isBackdropOpen}
                        handleClose = {this.closeBackdrop}/>
                        {participantQuestions.map((participantQuestion,index) => {
                            return (
                                <QuestionCard
                                          question = {participantQuestion.question}
                                          participant = {participantQuestion.participant}
                                          answer = {participantQuestion.answer}
                                          key = {index}
                                          questionIndex = {index}
                                          handleAnswerToQuestion = {this.addAnswerToQuestion}
                                          event = {participantQuestion.event}/>
                            )
                        })}
                        {this.isEventStartedAndNotFinished(event) ?
                            <div>
                                <h2>Soru Alanı</h2>
                                <QuestionTextArea
                                    participantQuestions = {participantQuestions}
                                    handleAdding = {this.setParticipantQuestionsWith}/>
                            </div>
                            : null}
                    </div>  : null
               }
            </div>
        );
    }
}
export default withRouter(ParticipantQuestionsArea);
