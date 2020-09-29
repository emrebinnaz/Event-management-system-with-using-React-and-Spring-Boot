import React, { Component } from 'react';
import axios from "axios";
import jwtDecode from 'jwt-decode';
import {getEvents} from "../../HelperFunctions/EventHelpers";

const context = React.createContext();

const reducer = (state,action) => {
    if(action.type === "jwtToken"){
        var decodedJwtToken = jwtDecode((action.payload));
        storeDataOf(decodedJwtToken);
        return {
            ...state,
            isAuthenticated: true,
            username : decodedJwtToken.sub,
            authorities: decodedJwtToken.authorities
        }
    }
    else if(action.type === 'deleteEvent') {
        return {
            ...state,
            events: state.events.filter(event => action.payload !== event.name)
        }
    }
    else if(action.type === "resetAuthenticationValues") {
        return {
            ...state,
            isAuthenticated: false,
            username : '',
            authorities: null
        }
    }
    else if(action.type === 'updateEvent') {
        let [oldEventName, updatedEvent] = action.payload;

        return{
            ...state,
            events : state.events.map(event => event.name === oldEventName ? updatedEvent : event)
        }
    }
    else if(action.type === 'addEvent') {
        let newEvent = action.payload;
        return {
            ...state, // statelerimizi tututk.
            events : [...state.events,newEvent]
        }
    }
}

const storeDataOf = (decodedJwtToken) =>{
    localStorage.setItem("username",decodedJwtToken.sub);
    localStorage.setItem("authorities",decodedJwtToken.authorities);
}
export class Provider extends Component {
    state = {
        isAuthenticated : false,
        username : '',
        authorities : null,
        events : [],
        dispatch : action =>{
            this.setState(state => reducer(state,action))
        }
    }

    componentDidMount = async () => {
        const response = await getEvents();
        this.setState({
            events : response.data
        })
    };

    render() {
        return (
            <context.Provider value = {this.state}>
                {this.props.children}
            </context.Provider>
        );
    }
}
const Consumer = context.Consumer;

export default Consumer;


