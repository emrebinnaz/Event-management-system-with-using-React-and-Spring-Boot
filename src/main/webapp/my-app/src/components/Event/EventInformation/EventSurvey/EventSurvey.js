import React, {Component} from 'react';
import {isOrganizator, isParticipant} from "../../../../Authentication";
import SurveyQuestions from "./SurveyQuestions";
import EventSurveyForm from "../../Forms/EventSurveyForm";
import {withRouter} from "react-router-dom";
import axios from "axios";
class EventSurvey extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        surveyQuestionCountOfEvent : 0,
        isParticipantAlreadyJoined : false,
    }

    componentDidMount = () =>  {
        const {event} = this.props;
        this.isEventHaveSurveyQuestions();
        if(isParticipant()){
            this.isParticipantAlreadyJoinedTo(event);
        }

    }

    isEventHaveSurveyQuestions = () => {
        const {eventSurveyQuestions} = this.props.event;
        this.setState({
            surveyQuestionCountOfEvent : eventSurveyQuestions.length,
        })
    }

    isParticipantAlreadyJoinedTo = async (event) =>{
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
            isParticipantAlreadyJoined : response.data
        })

    }

    isEventAlreadyFinished = () =>{
        var endDate = new Date(this.props.event.endDate);
        var currentDate = new Date();
        return currentDate >= endDate;
    }

    isEventAlreadyStarted = () =>{
        var startDate = new Date(this.props.event.startDate);
        var currentDate = new Date();
        return currentDate >= startDate;
    }


    render() {
        const {isParticipantAlreadyJoined,surveyQuestionCountOfEvent} = this.state;
        return (
            <div>
                {((isOrganizator()) && this.isEventAlreadyFinished()) ?
                    <p>Bu etklinlik bittiği için anket oluşturamazsınız</p> : null}
                {((isOrganizator()) && surveyQuestionCountOfEvent == 0  && !this.isEventAlreadyStarted()) ?
                   <EventSurveyForm event = {this.props.event}/>: null}
                {(isOrganizator() && surveyQuestionCountOfEvent > 0) ?
                    <p>Etkinliğe ait anketi ve anket sonuçlarını üst menüden görüntüleyebilirsin.</p>
                    : null }
                {(isParticipantAlreadyJoined && isParticipant())  ?
                    <SurveyQuestions event ={this.props.event}></SurveyQuestions>
                    : null
                }
                {(isParticipant() && !isParticipantAlreadyJoined) ?
                    <p>Bu anketi sadece etkinliğe katılmış olan kullanıcılar görüntüleyebilir.</p>
                    : null
                }
            </div>
        );
    }
}

export default withRouter(EventSurvey);

/*
  {(isParticipantAlreadyJoined && isParticipant() && !this.isEventAlreadyFinished())  ?
                     <p>Bu anketi,etkinlik bittikten sonra doldurabilirsiniz.</p>
                    : null
                }

 */