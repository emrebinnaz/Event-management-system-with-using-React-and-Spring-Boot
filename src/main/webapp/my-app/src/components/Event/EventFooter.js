import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {isParticipant} from "../../Authentication";
import axios from "axios";
import {withRouter} from "react-router-dom";

class EventFooter extends Component {
    state = {
        informationMessageAboutEvent : '',
        isJoinedBefore: false,

    }

    isEventFull = () =>{
        const {quota,currentNumberOfPeople} = this.props.event;
        return quota === currentNumberOfPeople;
    }

    componentDidMount = () => {
            if(isParticipant()) {
                this.isJoinedBeforeAsParticipantToEvent().then(isJoinedBefore => {
                    this.setState({
                        isJoinedBefore: isJoinedBefore,
                    })
                })
                if (this.isEventAlreadyStarted(this.props.event.startDate)) {
                    this.props.history.push('/notFound404');
                }
            }
    }

    isJoinedBeforeAsParticipantToEvent = async () => {

        var participantUsername = localStorage.getItem("username");
        const response = await axios.post(`/isJoinedBefore/${participantUsername}`,
            this.props.event, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
        return response.data;
    }

    isEventAlreadyStarted = (startDate) =>{
        var eventStartDate = new Date(startDate);
        var currentDate = new Date();
        return currentDate > eventStartDate;
    }

    render() {
        const{isJoinedBefore} = this.state;
        return (
            <div>
                <p className={"text-muted float-right"}>
                    {this.isEventFull() ? 'Bu etkinliğin kontenjanı doldu.' : null }
                    {(!this.isEventFull() && isParticipant() && isJoinedBefore) ? 'Bu etkinliğe katıldınız' : null}
                </p>


            </div>
        );
    }
}

export default withRouter(EventFooter);

