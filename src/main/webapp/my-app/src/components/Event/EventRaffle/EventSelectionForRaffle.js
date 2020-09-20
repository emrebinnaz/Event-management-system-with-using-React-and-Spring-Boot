import React, {Component} from 'react';
import axios from 'axios';
import {Form} from "react-bootstrap";
class EventSelectionForRaffle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            namesOfEvents : [ ],
            eventName : '',
        }

    }


    componentDidMount = () => {
        this.getNonRaffledEvents();
    }

    getNonRaffledEvents = async () =>{
        await axios.get(`/events/NonRaffled`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            },
        }).then(response => {
            var nonRaffledEvents = response.data;
            let namesOfEvents = nonRaffledEvents.map(event =>{
                return {value :event.name , display : event.name}
            });
            this.setState({
                namesOfEvents : [{value: '', display : 'Etkinlik seç'}]
                    .concat(namesOfEvents)
            });
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

export default EventSelectionForRaffle;