import React, {Component} from 'react';

import EventDetails from "../Event/EventInformation/EventDetails";
import EventLocation from "../Event/EventInformation/EventLocation";
import Alert from '@material-ui/lab/Alert';
import ParticipantInformation from "../Participant/ParticipantInformation";
import {getEventInformationForParticipant, downloadEventInformation} from "../../HelperFunctions/EventHelpers";
class InformationInsideOfQrCode extends Component {
    state = {
        event : [],
        participant : [],
    }

    componentDidMount = async () => {
        const {eventName,username} = this.props.match.params;

        const res = await getEventInformationForParticipant(eventName,username);
        const {event, participant} = res.data;

        this.setState({
            event : event,
            participant: participant
        })
        await downloadEventInformation(res.data).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
            window.open(url);
        })
    }

    render() {
        const{event,participant} = this.state;
        return (
            <div className={"container mt-5"}>
                <Alert severity="info">Etkinliğin anketine ve
                    ,eğer varsa, yanıtlamış olduğunuz etkinliğin özel sorularına
                        <a className="card-link" href={`/event/${event.name}`}> buradan </a>
                    ulaşabilirsiniz</Alert>
                <div className={"card text-black bg-light container mt-5 mb-5"}>
                    <EventDetails event = {event}/>
                </div>
                <div className={"card text-black bg-light container mt-5 mb-5"}>
                    <EventLocation event = {event}/>
                </div>
                <ParticipantInformation participant = {participant}/>
            </div>
        );
    }
}

export default InformationInsideOfQrCode;