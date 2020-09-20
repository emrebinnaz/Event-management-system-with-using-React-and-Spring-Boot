import React, {Component} from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import {withRouter} from "react-router-dom";
class RaffleInformation extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.updateEventWithTheRaffleUsername();
        this.sendEmailToRaffleWinner();
    }

    updateEventWithTheRaffleUsername = async () => {
        const {selectedEvent} = this.props;
        console.log(selectedEvent);
        const response = await axios.put(`/events/${selectedEvent.name}`, selectedEvent,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        console.log(response.data);

    }

    sendEmailToRaffleWinner = async () => {
        const {selectedEvent,raffleWinnerUsername} = this.props;
        const response = await axios.post(`/sendEmail/toRaffleWinner/${raffleWinnerUsername}`,
            selectedEvent, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
    }

    render() {
        const {raffleWinnerUsername} = this.props;
        return (
            <div className={"container mt-5"}>
                <Alert severity="info">Çekilişi {raffleWinnerUsername} kazandı.
                Kendisini mail atarak bilgilendireceğiz.</Alert>
            </div>
        );
    }
}

export default withRouter(RaffleInformation);