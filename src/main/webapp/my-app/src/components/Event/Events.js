import React, {Component} from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import {Redirect, withRouter} from "react-router-dom";
import EventTable from "./EventTable"
import InfoIcon from '@material-ui/icons/Info';
import Consumer from '../ContextAPI/Context'
import EventsOfLecturer from "../Lecturer/EventsOfLecturer";
import {isLecturer, isOrganizator, isParticipant} from "../../Authentication";
class Events extends Component {

    render() {
        return(<Consumer>
                {
                    value => {
                        const {events} = value;
                        return (
                            <div className={"mt-5"}>

                                    {isParticipant() ?
                                      <div>
                                          <Alert severity="info" className={"container"}>
                                                <AlertTitle>Bilgilendirme</AlertTitle>
                                                 Etkinlik isminin solunda yer alan <InfoIcon></InfoIcon>
                                                <strong>ikonuna basarak
                                                    etkinlik hakkında bilgi alabilir ve
                                                    etkinliğe katılabilirsiniz.</strong>
                                        </Alert>
                                      </div> : null }
                                {isOrganizator() ?
                                    <div>
                                        <Alert severity="info" className={"container"}>
                                            <AlertTitle>Bilgilendirme</AlertTitle>
                                            Etkinlik isminin solunda yer alan <InfoIcon></InfoIcon>
                                            <strong>ikonuna basarak
                                                etkinlik hakkında bilgi alabilir,
                                                anket oluşturabilir ve etkinliğin katılımcılarını
                                                görüntüleyebilirsiniz.</strong>
                                        </Alert>
                                    </div>
                                    : null}
                                {isLecturer() ? <EventsOfLecturer/> : <EventTable events = {events} />}
                            </div>
                        );
                    }
                }
            </Consumer>
        )

    }
}

export default withRouter(Events);

