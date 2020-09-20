import React, {Component} from 'react';
import {isOrganizator} from "../../../Authentication";
import axios from 'axios';
import {withRouter} from "react-router-dom";
class EventDetails extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        lecturerUsername : '',
    }

    componentDidMount = () => {
       this.getLecturerOfEvent();
    }

    getLecturerOfEvent = async () =>{
        const { eventName } = this.props.match.params;
        const response = await axios.get(`/lecturer/of/${eventName}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });

        this.setState({
            lecturerUsername : response.data.username
        })
    }

    render() {
        const {name,startDate,endDate,
               raffleWinnerUsername,quota,currentNumberOfPeople} = this.props.event;
        return (
            <div className={"container mb-3 mt-3"}>
                <h3 className={"card-title text-center"}>Etkinlik Ayrıntıları</h3>
                <div className="row">
                    <div className="col">
                        <strong>İsim :</strong>
                        <p className={"ml-3 d-inline"}>{name}</p>
                    </div>
                    <div className="col">
                        <strong>Başlama Tarihi :</strong>
                        <p className={"ml-3 d-inline"}>{startDate}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <strong>Kontenjan :</strong>
                            <p className={"ml-3 d-inline"}>
                                {quota}
                                {quota == currentNumberOfPeople ?
                                    <strong className={"text-danger"}> (Etkinlik Dolu) </strong> : null}
                        </p>
                    </div>
                    <div className="col">
                        <strong>Bitiş Tarihi :</strong>
                        <p className={"ml-3 d-inline"}>{endDate}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <strong>Şuanki katılımcı sayısı :</strong>
                        <p className={"ml-3 d-inline"}>{currentNumberOfPeople}</p>
                    </div>
                    <div className="col">
                        <strong>Eğitmen kullanıcı Adı :</strong>
                        <p className={"ml-3 d-inline"}>{this.state.lecturerUsername}</p>
                    </div>
                </div>
                {isOrganizator() ?
                    <div>
                        <div className={"row"}>
                            <div className="col">
                                <strong>Organizator Kullanıcı Adı :</strong>
                                <p className={"ml-3 d-inline"}>{localStorage.getItem("username")}</p>
                            </div>
                            <div className="col">
                                <strong>Etkinlikteki çekilişin kazananı:</strong>
                                <p className={"ml-3 d-inline"}>{raffleWinnerUsername}</p>
                            </div>
                        </div>
                    </div>: null }




            </div>
        );
    }
}

export default withRouter(EventDetails);