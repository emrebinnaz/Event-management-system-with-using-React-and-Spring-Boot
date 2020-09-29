import React, {Component} from 'react';
import {Card} from 'react-bootstrap'
import EventNavbar from "./EventNavbar";
import axios from 'axios';
import EventDetails from "./EventInformation/EventDetails"
import EventLocation from  "./EventInformation/EventLocation"
import EventSurvey from './EventInformation/EventSurvey/EventSurvey'
import EventQuestions from './EventInformation/EventQuestions/EventQuestions'
import EventParticipation from "./EventInformation/EventParticipation";
import {isOrganizator,isParticipant} from "../../Authentication";
import {Link} from 'react-router-dom';
import ParticipantQuestionsArea from "../Participant/ParticipantQuestionsAboutEvent/ParticipantQuestionsArea";
import {getEvent} from "../../HelperFunctions/EventHelpers";
class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            linkContent : 'Ayrıntılar',
            event : [],
        }
    }

    setLinkContentWith = (newLink) => {
        this.setState({
            linkContent : newLink
        })
    }

    componentDidMount = async () => {
        const {eventName} = this.props.match.params;
        const response = await getEvent(eventName);
        this.setState({
          event : response.data
        })
    }

    render() {

        const {linkContent,event} = this.state;
        return (
           <div className={"container col-md-9 mt-5 "}>
               <Card>
                    <Card.Header  style = {{cursor : "pointer"}}>
                        <EventNavbar handleNavigation = {this.setLinkContentWith} event = {event}></EventNavbar>
                    </Card.Header>
                   <Card.Body className = "container">
                       {linkContent === "Ayrıntılar" ? <EventDetails event ={event}></EventDetails> : null}
                       {linkContent === "Konum" ?  <EventLocation event ={event}></EventLocation>: null}
                       {linkContent === "Anket" ?   <EventSurvey event ={event}></EventSurvey> : null}
                       {linkContent === "Etkinliğe Özel Sorular" ? <EventQuestions event ={event}></EventQuestions> : null}
                       {linkContent === "Etkinliğe Katıl" ? <EventParticipation event = {event}></EventParticipation> : null}
                   </Card.Body>
                   <Card.Footer>
                       {( isOrganizator() ) ? <Link to = {`/participants/${event.name}`}>Katılımcıları görüntüle</Link> : null}
                   </Card.Footer>
               </Card>
               <ParticipantQuestionsArea event = {event}></ParticipantQuestionsArea>
           </div>
        );
    }
}

export default Event;