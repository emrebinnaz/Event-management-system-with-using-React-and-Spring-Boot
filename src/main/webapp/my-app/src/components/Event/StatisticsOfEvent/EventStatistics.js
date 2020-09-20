import React, {Component} from 'react';
import axios from 'axios';
import {Form, InputGroup} from "react-bootstrap";
import EventSelectionForStatistics from "./EventSelectionForStatistics";
import EventBarChart from './EventBarChart'
class EventStatistics extends Component {

    state = {
        statisticsType : '',
        eventName : '',
        events : [],
        participationCountsOfEvents :  [],
        eventNames : [],
        isOpenedEventBarChart : false,
        participationDates : [],
    }

    componentDidMount = () => {
        this.getAllEvents();
    }

    getAllEvents = async () =>{
       await axios.get('/events', {
           headers: {
               authorization: 'Bearer ' + localStorage.getItem('jwtToken')
           },
            }).then((response) =>{
           this.setState({
               events : response.data
           })
       })
    }
    handleEventStatisticsChoice = (e) => {
        e.preventDefault();
        this.setState({
            statisticsType : e.target.value,
            isOpenedEventBarChart : false
        })
    }

    changeEventNameWith = (val) =>{
        this.setState({
            eventName : val,
            participationDates : [] // ?????
        })
    }

    showStatistics = (e) =>{
        e.preventDefault();
        const {statisticsType,eventName,events} = this.state;
        if(statisticsType === 'showGraphicsWithParticipationCount') {
            this.setParticipationCountsOfEvents();
            this.setNamesOfEvents();
        }

        else if(statisticsType === 'showGraphicsWithParticipationDate') {
            this.getParticipationDatesAndParticipantCounts(eventName);
        }
        this.openEventChart();
    }

    setParticipationCountsOfEvents = () => {
        const {events} = this.state;
        var participationCountsOfEvents = events.map(event => event.currentNumberOfPeople);
        this.setState({
            participationCountsOfEvents : participationCountsOfEvents
        })
    }
    setNamesOfEvents = () => {
        const {events} = this.state;
        var names = events.map(event => event.name);
        this.setState({
            eventNames : names
        })
    }

    getParticipationDatesAndParticipantCounts = async (eventName) =>{
        await axios.get(`/participationDatesAndparticipantCounts/${eventName}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            },
        }).then((response) =>{
            var datesAndCounts = response.data;
            var dates = datesAndCounts.map((date,index) => datesAndCounts[index].partitionDate);
            var counts = datesAndCounts.map((count,index) => datesAndCounts[index].partitionCount);
            this.setState({
                participationDates : dates,
                participationCountsOfEvents : counts
            })
        })
    }
    openEventChart = () =>{
        this.setState({
            isOpenedEventBarChart : true
        })
    }

    render() {
        const {statisticsType,isOpenedEventBarChart} = this.state;
        return (
            <div className={"container w-75 mt-5"}>
                <form onSubmit={(e) => this.showStatistics(e)}>
                    <div className="row">
                        <div className="col ">
                            {statisticsType === "showGraphicsWithParticipationDate" ?
                                <EventSelectionForStatistics
                                    onSelectEvent = {this.changeEventNameWith}/> : null }
                        </div>
                        <div className="col">
                            <InputGroup>
                                <Form.Control as="select" required
                                              value={statisticsType}
                                              onChange={(e) => this.handleEventStatisticsChoice(e)}>
                                    <option value="">Grafik oluştur </option>
                                    <option value="showGraphicsWithParticipationCount">Başvuran Sayısına Göre Etkinlikleri Göster</option>
                                    <option value="showGraphicsWithParticipationDate">Etkinliğe Yapılan Başvuruların Tarihlerine Göre Göster</option>
                                </Form.Control>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="col-md-12 text-center mt-5 mb-5">
                        <button type="submit"
                                className="btn btn-primary">Grafiği göster</button>

                    </div>
            </form>
                {(isOpenedEventBarChart  && statisticsType === "showGraphicsWithParticipationCount") ? <EventBarChart
                    labels = {this.state.eventNames}
                    label = "Katılımcı Sayısı"
                    data = {this.state.participationCountsOfEvents}/> : null}
                {(isOpenedEventBarChart &&
                    statisticsType === "showGraphicsWithParticipationDate"
                && this.state.participationDates.length != 0) ?
                    <EventBarChart
                        labels = {this.state.participationDates}
                        label = "Katılımcı Sayısı"
                        data = {this.state.participationCountsOfEvents}/> : null}

            </div>
        );
    }
}

export default EventStatistics;