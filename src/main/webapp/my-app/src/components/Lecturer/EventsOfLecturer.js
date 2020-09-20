import React, {Component} from 'react';
import axios from "axios";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import {withRouter} from 'react-router-dom';
class EventsOfLecturer extends Component {

    state = {
        events : [],
        columns: [
            { title: 'İsim', field: 'name' },
            { title: 'Başlangıç Tarihi', field: 'startDate', type : 'date'},
            { title: 'Bitiş Tarihi', field: 'endDate', type : 'date'},
            {title : 'Adres', field : 'address'},
        ],

    }

    componentDidMount = () => {
        this.getEventsOfLecturer();
    }

    getEventsOfLecturer = async () => {
        const lecturerUsername = localStorage.getItem('username');
        const response = await axios.get(`/events/OfLecturer/${lecturerUsername}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            events : response.data
        })
    }

    goToEventPage = (e,eventName) =>{
        this.props.history.push(`/event/${eventName}`)
    }

    render() {
        return (
            <div  className={"container w-75 mt-5"}>
                <MaterialTable
                    title={<Typography variant="h4" component="h5">
                        Etkinliklerinizin Listesi
                    </Typography>}
                    columns={this.state.columns}
                    data = {this.state.events}
                    actions = {[ {
                        icon : 'info',
                        tooltip: 'Etkinlik bilgileri için tıkla',
                        onClick: ( e,rowData ) => this.goToEventPage(e,rowData.name)
                    }]}
                ></MaterialTable>
            </div>
        );
    }
}

export default withRouter(EventsOfLecturer);