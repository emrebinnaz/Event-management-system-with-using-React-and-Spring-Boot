import React, {Component} from 'react';
import EventNavLink from './EventNavLink'
import { Link} from 'react-router-dom';
import {isOrganizator, isParticipant} from "../../Authentication";
class EventNavbar extends Component {

    constructor(props) {
        super(props);
    }
    navigateEventToRelatedPart = (e) =>{
        var newLink = e.target.textContent;
        this.props.handleNavigation(newLink);
    }

    isEventAlreadyStarted = () =>{
        const {startDate} = this.props.event;
        var currentDate = new Date();
        return currentDate > new Date(startDate);
    }

    render() {
        return (
                <ul className="nav nav-tabs card-header-tabs" role="tablist">
                    <EventNavLink name ="Ayrıntılar"
                                  handleClick = {(e) =>this. navigateEventToRelatedPart(e)}></EventNavLink>
                    <EventNavLink name ="Konum"
                                  handleClick = {(e) =>this.navigateEventToRelatedPart(e)}></EventNavLink>
                    <EventNavLink name ="Anket"
                                  handleClick = {(e) =>this.navigateEventToRelatedPart(e)}></EventNavLink>
                    <EventNavLink name ="Etkinliğe Özel Sorular"
                                  handleClick = {(e) => this.navigateEventToRelatedPart(e)}></EventNavLink>
                    {(isParticipant() && !this.isEventAlreadyStarted()) ?  <EventNavLink name ="Etkinliğe Katıl"
                                  handleClick = {(e) => this.navigateEventToRelatedPart(e)}></EventNavLink> : null }
                </ul>
        );
    }
}

export default EventNavbar;