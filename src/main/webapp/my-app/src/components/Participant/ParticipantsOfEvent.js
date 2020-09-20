import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
class ParticipantsOfEvent extends Component {
    state = {
        columns: [
            { title: 'İsim', field: 'name' },
            { title: 'Soyisim', field: 'surname'},
            { title: 'Tc Kimlik No', field: 'tcKimlikNo'},
            {title : 'Kullanıcı Adı', field : 'username'},
        ],
        participants : [],
    }

    componentDidMount = () =>{
        this.getParticipantsOfEvent();

    }

    getParticipantsOfEvent = async () =>{
        const {eventName}  = this.props.match.params;
        const response = await axios.get(`/participants/${eventName}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            participants : response.data
        })

    }

    render() {
        return (
            <div  className={"container w-75 mt-5"}>
                <MaterialTable
                    title={<Typography variant="h4" component="h5">
                        Kullanıcı Listesi
                    </Typography>}
                    columns={this.state.columns}
                    data = {this.state.participants}
                    actions = {[ {
                            icon : 'info',
                            tooltip: 'Kullanıcının bilgilerini ve etkinlik hakkında yanıtladığı soruları görmek' +
                                'için tıkla',
                    }]}
                    ></MaterialTable>
            </div>
        );
    }
}

export default ParticipantsOfEvent;