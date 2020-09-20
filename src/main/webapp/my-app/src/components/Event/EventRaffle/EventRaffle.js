import React, {Component} from 'react';
import EventSelectionForRaffle from "./EventSelectionForRaffle";
import axios from "axios";
import PositionedSnackbar from "../../static/Snackbars/PositionedSnackbar";
import SimpleBackdrop from "../../static/SimpleBackdrop";
import CustomizedSnackbar from "../../static/Snackbars/CustomizedSnackbar";
import RaffleInformation from "./RaffleInformation";
class EventRaffle extends Component {
    state = {
        selectedEvent : '',
        raffleWinnerUsername : '',
        events : [],
        participants : [],
        selectedEventName : '',
        isBackDropOpen : false,
        message  : '',
        messageType : '',
        isMessageBoxOpen: false,
        nonRaffledEvents : []
    }

    changeEventNameWith = (val) =>{
        this.setState({
            selectedEventName : val
        })
    }

    componentDidMount =  () => {
        this.getAllNonRaffledEvents();
    }

    getAllNonRaffledEvents = async () =>{
        await axios.get(`/events/NonRaffled`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            },
        }).then((response) =>{
            this.setState({
                nonRaffledEvents : response.data
            })
        })

    }

    createRaffle =  (e) =>{
        e.preventDefault();
        const {selectedEventName,nonRaffledEvents} = this.state;
        var index = this.findIndexOfEvent(selectedEventName);
        var selectedEvent = nonRaffledEvents[index];
        if(!this.isEventHasParticipant(selectedEvent)) {
            this.setMessageAs("Bu etkinliğin katılımcısı yok.","ERROR");
        }
        else if(this.isEventHasAlreadyRaffleWinner(selectedEvent)) {
           this.setMessageAs("Bu etkinlik için öncesinde çekiliş yapıldı.","ERROR");
        }
        else{
            this.getParticipantsOfSelectedEventForRaffle(selectedEventName)
                .then(participants => this.chooseRaffleWinnerFrom(participants));
        }

    }

    findIndexOfEvent = (selectedEventName) => {
        const {nonRaffledEvents} = this.state;
        return nonRaffledEvents.findIndex(event => event.name === selectedEventName);
    }

    isEventHasParticipant = (event) => {
        return event.currentNumberOfPeople > 0;
    }

    isEventHasAlreadyRaffleWinner = (event) =>{
        return event.raffleWinnerUsername != null &&
            event.raffleWinnerUsername.length > 0;

    }

    setMessageAs = (message,messageType) =>{
        this.setState({
            message : message,
            messageType : messageType,
            isMessageBoxOpen : true
        })
    }

    getParticipantsOfSelectedEventForRaffle = async (eventName) =>{
        const response = await axios.get(` /participants/${eventName}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            },
        })
        this.setState({
            participants : response.data
        })
        return response.data;
    }

    chooseRaffleWinnerFrom = (participants) => {
        let raffleWinnerParticipant;
        this.openBackdrop();
        this.setMessageAs("Çekiliş oluşturuluyor !","SUCCESS");
        setTimeout(() =>{
            raffleWinnerParticipant = this.createRaffleWinnerFrom(participants);
            this.updateRaffleWinnerOfEventWith(raffleWinnerParticipant);
            this.closeBackdrop();
        },2000);
    }

    openBackdrop = () =>{
        this.setState({
            isOpenBackdrop : true
        })
    }

    createRaffleWinnerFrom = (participants) => {
        var randomValue = Math.floor(Math.random() * participants.length);
        return participants[randomValue];
    }

    updateRaffleWinnerOfEventWith = (raffleWinnerParticipant) => {
        const {nonRaffledEvents,selectedEventName} = this.state;
        var index = this.findIndexOfEvent(selectedEventName,nonRaffledEvents);
        nonRaffledEvents[index].raffleWinnerUsername = raffleWinnerParticipant.username;
        this.setState({
            nonRaffledEvents: nonRaffledEvents,
            selectedEvent : nonRaffledEvents[index],
            raffleWinnerUsername : raffleWinnerParticipant.username,
        })
    }

    closeBackdrop = () =>{
        this.setState({
            isOpenBackdrop : false
        })
    }

    closeMessageBox = () =>{
        this.setState({
            isMessageBoxOpen : false,
        })
    }

    isRaffleEnded = () => {
        const {raffleWinnerUsername} = this.state;
        return raffleWinnerUsername.length > 0;
    }

    render() {
            const {isOpenBackdrop,isMessageBoxOpen,messageType,selectedEvent,
                selectedEventName,raffleWinnerUsername,message} = this.state;
        return (
            <div className="container">
                <form onSubmit={(e) => this.createRaffle(e)}>
                    <div className="col-md-12 text-center mt-5">
                        <EventSelectionForRaffle
                            onSelectEvent = {this.changeEventNameWith}
                        />
                    </div>
                    <button className={"btn btn-secondary mt-5 "}
                            type="submit">Çekiliş Oluştur</button>
                </form>
                {isOpenBackdrop ? <SimpleBackdrop
                                    handleOpen = {isOpenBackdrop}
                                    handleClose = {this.closeBackdrop}>
                </SimpleBackdrop> : null}
                {isMessageBoxOpen ?  <CustomizedSnackbar
                                    vertical={"bottom"}
                                    horizontal={"right"}
                                    open = {isMessageBoxOpen}
                                    handleClose = {this.closeMessageBox}
                                    message={message}
                                    messageType={messageType}/>: null}
                {this.isRaffleEnded() ?
                    <RaffleInformation selectedEvent={selectedEvent}
                                        raffleWinnerUsername = {raffleWinnerUsername}/> : null}
            </div>
        );
    }
}

export default EventRaffle;