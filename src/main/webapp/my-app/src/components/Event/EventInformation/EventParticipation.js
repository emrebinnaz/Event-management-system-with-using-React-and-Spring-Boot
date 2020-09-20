import React, {Component} from 'react';
import axios from "axios";
import {isParticipant} from "../../../Authentication";
import NotificationToOrganizator from '../../NotificationToOrganizator'
import QrCode from "../../QrCode/QrCode";
import CustomizedSnackbar from "../../static/Snackbars/CustomizedSnackbar";

class EventParticipation extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        isJoinedBefore: false,
        message : '',
        messageType : '',
        isParticipationRequest : false,
        isEventHaveQuestions : false,
        isOpenedQrCode : false,
        qrCode : '',
        isSendNotification : false,
    }

    componentDidMount = () => {
        this.isEventHaveQuestions();
        if(isParticipant()) {
            this.isJoinedBeforeAsParticipantToEvent()
                .then(isJoinedBefore => {
                    this.setState({
                        isJoinedBefore : isJoinedBefore
                    })
                })
        }
        else {
            this.props.history.push('/notFound404');
        }

    }

    isEventHaveQuestions = async () =>{
        const eventQuestions = await axios.get(`/questionsOfEvent/${this.props.event.name}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        if(eventQuestions.data.length > 0) {
            this.setState({
                isEventHaveQuestions : true
            })
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

    joinEvent  = async (e) =>{
        e.preventDefault();
        var participantUsername = localStorage.getItem("username");
        const {event} = this.props;
        const {isEventHaveQuestions } = this.state;
        if(this.isEventFull(event)){
            this.setMessageStatesAs("Etkinlik Dolu","ERROR");
        }
        else if(isEventHaveQuestions) {
            this.setMessageStatesAs("Bu etkinliğe katılmadan önce " +
                "yanıtlamanız gereken sorular var.Bu soruları Etkinliğe Özel Sorular kısmından" +
                "yanıtladıktan sonra etkinliğe katılabilirsiniz","ERROR");
        }
        else{
            this.sendJoinRequestWith(participantUsername);
        }
    }

    isEventFull = (event) =>{
        return event.quota === event.currentNumberOfPeople;
    }

    closeMessageBox = () =>{
        this.setState({
            isParticipationRequest : false,
        })
    }

    sendJoinRequestWith  = async (participantUsername) => {
        const {event} = this.props;
        const response = await axios.post(`/join/${participantUsername}`,
            event, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
        this.sendEmailToParticipant();
        this.setMessageStatesAs(response.data.message,response.data.messageType);
        this.openQrCode();
        this.sendNotificationToOrganizator();

    }


    sendEmailToParticipant = async () =>{
        var participantUsername = localStorage.getItem("username");
        const response = await axios.post(`/sendEmail/${participantUsername}`,
            this.props.event, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
    }

    setMessageStatesAs = (message,messageType) =>{
        this.setState({
            message : message,
            messageType : messageType,
            isParticipationRequest : true
        })
    }

    openQrCode = () => {
        this.setState({
            isOpenedQrCode : true
        })
    }

    sendNotificationToOrganizator = () => {
        this.setState({
            isSendNotification : true
        })

    }

    closeQrCode = () => {
        this.setState({
            isOpenedQrCode : false
        })
    }

    render() {

        const {event} = this.props;
        var participantUsername = localStorage.getItem('username');
        const {isJoinedBefore, isParticipationRequest, message, messageType} = this.state;
        return (
            <div>
                {isJoinedBefore ? <p className={"text-muted float-right"}>Buna katıldın</p>
                    :
                    <button className={"btn btn-dark"}
                            onClick={(e) => this.joinEvent(e)}>Katıl
                    </button>
                }
                {isParticipationRequest ? <CustomizedSnackbar  vertical = {"bottom"}
                                                               horizontal = {"right"}
                                                               open = {isParticipationRequest}
                                                               handleClose = {this.closeMessageBox}
                                                              message={message} messageType={messageType}/> : null }

                {this.state.isOpenedQrCode ?
                <QrCode
                    participantUsername = {participantUsername}
                    event = {event}
                    handleClose = {this.closeQrCode}/> : null }

            </div>
        );
    }
}
export default EventParticipation;


/*
                {this.state.isSendNotification ? <NotificationToOrganizator
                    participantUsername = {participantUsername}
                    event = {event}/> : null}
*/