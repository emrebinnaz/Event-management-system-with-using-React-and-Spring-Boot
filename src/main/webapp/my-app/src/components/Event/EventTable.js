import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import {isOrganizator, isParticipant} from "../../Authentication";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import PositionedSnackbar from "../static/Snackbars/PositionedSnackbar";
import UpdateEventForm from "./Forms/UpdateEventForm";
import Consumer from '../ContextAPI/Context';
class EventTable extends Component {
    state = {
        columns: [
            { title: 'İsim', field: 'name' },
            { title: 'Başlangıç Tarihi', field: 'startDate', type : 'date'},
            { title: 'Bitiş Tarihi', field: 'endDate', type : 'date'},
            {title : 'Adres', field : 'address'},
        ],

        isAdditionRequest : false,
        isDeleteRequest : false,
        isUpdateRequest : false,
        responseMessageOfDeleteRequest : '',
        responseMessageTypeOfDeleteRequest  : '',
        updatedEventName: '',
    }

    deleteEvent = async  (e,eventName,dispatch) =>{

        e.preventDefault();
        axios.delete(`/events/delete/${eventName}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtToken")
            },
            data: {
                name: eventName
            }
        }).then(response => {
            this.showMessageOfDeleteRequest(response.data);
            setTimeout(() => {
                this.setState({
                    isDeleteRequest : false,
                })
                if(this.isDeletionSuccess(response.data.messageType)) {
                    dispatch({ type: 'deleteEvent', payload: eventName })
                }
            }, 3000);
        }).catch(err => {
           this.props.history.push("/notFound404");
        });

    }
    showMessageOfDeleteRequest = (messageResponse) =>{
        this.setState({
            isDeleteRequest : true,
            responseMessageOfDeleteRequest : messageResponse.message,
            responseMessageTypeOfDeleteRequest : messageResponse.messageType
        })

    }
    isDeletionSuccess = (messageType) =>{
        return messageType === "SUCCESS"
    }

    openUpdateModal = (e,eventName) =>{
        this.setState({
            isUpdateRequest : true,
            updatedEventName : eventName
        })
    }

    closeUpdateModal = () =>{
        this.setState({
            isUpdateRequest: false,
        })

    }

    goToEventPage = (e,eventName) =>{
        this.props.history.push(`/event/${eventName}`)
    }


    render() {
        const{isAdditionRequest,updatedEventName,isUpdateRequest,isDeleteRequest,
        responseMessageOfDeleteRequest, responseMessageTypeOfDeleteRequest} = this.state;
        let username = localStorage.getItem("username");
        return(<Consumer>
            {
                value => {
                    const {dispatch,events} = value;
                    return(
                        <div className={"container w-75 mt-5"}>
                            <MaterialTable
                                title={<Typography variant="h4" component="h5">
                                    Etkinlik Listesi
                                </Typography>}
                                columns={this.state.columns}
                                data={isParticipant() ?
                                     events.filter(event => new Date(event.startDate) > new Date()) : this.props.events}
                                actions={[
                                    isOrganizator()  ?
                                        {
                                            icon :  'delete',
                                            tooltip: 'Sil',
                                            onClick: (e, rowData,) => this.deleteEvent(e,rowData.name,dispatch)
                                        } : null,
                                    {
                                        icon : 'info',
                                        tooltip: 'Etkinliğe katılmak ya da etkinliğin bilgilerini ' +
                                            'görmek için tıkla',
                                        onClick: ( e,rowData ) => this.goToEventPage(e,rowData.name)
                                    },
                                    isOrganizator()  ?
                                        {
                                            icon :  'edit',
                                            tooltip: 'Etkinliği güncelle',
                                            onClick : (e, rowData) => this.openUpdateModal(e,rowData.name)
                                        } : null ,
                                    isOrganizator() ?
                                        {
                                            icon: 'add',
                                            tooltip: 'Etkinlik ekle',
                                            isFreeAction: true ,
                                            onClick : (event) => this.setState({
                                                isAdditionRequest : true,
                                            })
                                        } : null

                                ]}
                            />
                            {isAdditionRequest ? this.props.history.push(`/events/${username}`) : null }
                            {isDeleteRequest  ?
                                <PositionedSnackbar
                                    message = {responseMessageOfDeleteRequest}
                                    messageType = {responseMessageTypeOfDeleteRequest}
                                    vertical = {"bottom"}
                                    horizontal = {"right"}/> : null
                            }
                            {isUpdateRequest ?
                                <UpdateEventForm
                                    open = {isUpdateRequest}
                                    handleClose = {this.closeUpdateModal}
                                    eventName = {updatedEventName}/>
                                : null }
                        </div>
                    );
                }
            }
        </Consumer>)

    }
}

export default withRouter(EventTable);

