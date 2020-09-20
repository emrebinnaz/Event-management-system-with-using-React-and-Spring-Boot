import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {Form} from "react-bootstrap";
class EventSelectionForSurvey extends Component {

    state = {
        eventsWithSurvey: [],
        namesOfEvents: [],
        eventName : '',
    }


    componentDidMount =  () => {
        this.getAllEventsWithSurvey();
    }

    getAllEventsWithSurvey = async () =>{
        await axios.get(`/events/WithSurvey`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            },
        }).then((response) =>{
            var eventsWithSurvey = response.data;
            let namesOfEvents = eventsWithSurvey.map(event =>{
                return {value :event.name , display : event.name}
            });
            this.setState({
                eventsWithSurvey : response.data,
                namesOfEvents : [{value: '', display : 'Etkinlik seç'}]
                    .concat(namesOfEvents)
            })
        })
    }

    handleNameChange = (e) => {
        this.setState({
            eventName : e.target.value
        },() =>{
            this.props.onSelectEvent(this.state.eventName);
        })
    }


    render() {
        const {eventName,namesOfEvents} = this.state;
        return (
            <div>
                <Form.Control as="select" required
                              placeholder = "Etkinlik seç"
                              value={eventName}
                              onChange={(e) => this.handleNameChange(e) }>
                    {namesOfEvents.map((name) =>
                        <option key={name.value} value={name.value}>{name.display}</option>)}
                </Form.Control>
            </div>
        );
    }
}

export default withRouter(EventSelectionForSurvey);