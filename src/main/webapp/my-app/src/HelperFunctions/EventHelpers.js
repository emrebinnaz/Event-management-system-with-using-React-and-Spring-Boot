import axios from "axios";

export const getEvents  = async () => {
    const response = await axios.get('/events', {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        },
    })
    return response;
}

export const getEvent = async (eventName) => {
    const response = await axios.get(`/events/${eventName}`, {
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('jwtToken')
        }
    }).catch(err => {
        this.props.history.push('/notFound404');
    });

    return response;
}

export const getEventInformationForParticipant = async (eventName,username) => {

    const response = await axios.get(`/${username}/and/${eventName}/information`, {
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('jwtToken')
        }
    }).catch(err => {
        this.props.history.push('/notFound404');
    });
    return response;
}

export const downloadEventInformation = async (participantInEvent) => {

    return await axios.post(`/downloadEventInformation`,
        participantInEvent, {
            responseType: 'blob',
            headers : {
                'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
            }
        }).catch(err => {
        this.props.history.push("/notFound404");
    })
}