import React, {Component} from 'react';
import axios from "axios";
import EventDetails from "../Event/EventInformation/EventDetails";
import EventLocation from "../Event/EventInformation/EventLocation";
import Alert from '@material-ui/lab/Alert';
import ParticipantInformation from "../Participant/ParticipantInformation";
class InformationInsideOfQrCode extends Component {
    state = {
        event : [],
        participant : [],
    }

    componentDidMount = () => {
        this.getEvent();
        this.getParticipant();
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

    }

    getParticipant = async () => {
        const {username} = this.props.match.params;
        const response = await axios.get(`/participant/${username}`, {
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

    render() {
        const{event,participant} = this.state;
        return (
            <div className={"container mt-5"}>
                <Alert severity="info">Etkinliğin anketine ve
                    ,eğer varsa, yanıtlamış olduğunuz etkinliğe özel sorulara
                        <a className="card-link" href={`/event/${event.name}`}> burdan </a>
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