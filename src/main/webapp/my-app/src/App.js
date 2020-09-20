import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect,browserHistory} from 'react-router-dom';
import Events from "./components/Event/Events";
import Login from "./components/Login";
import NavigationBar from "./components/Navigation Bar";
import NotFound from "./components/static/NotFound";
import RegisterForm from "./components/Forms/RegisterForm";
import PrivateRoute from "./components/Routers/PrivateRoute";
import OrganizatorRoute from "./components/Routers/OrganizatorRoute";
import ParticipantRoute from './components/Routers/ParticipantRoute';
import AddEventForm from "./components/Event/Forms/AddEventForm";
import EventQuestionsForm from './components/Event/Forms/EventQuestionsForm'
import ParticipantEvents from "./components/Participant/ParticipantEvents";
import Event from './components/Event/Event'
import ParticipantsOfEvent from "./components/Participant/ParticipantsOfEvent";
import EventStatistics from "./components/Event/StatisticsOfEvent/EventStatistics";
import EventRaffle from "./components/Event/EventRaffle/EventRaffle";
import ParticipantAnswers from "./components/Participant/ParticipantAnswers";
import EventSurveyForm from "./components/Event/Forms/EventSurveyForm";
import SurveyStatistics from "./components/Event/EventInformation/EventSurvey/SurveyStatistics";
import InformationInsideOfQrCode from './components/QrCode/InformationInsideOfQrCode'
class App extends Component {

    render() {
        return (
            <Router>
                <NavigationBar/>
                <Switch>
                    <Route exact path  ={"/"}><Redirect to = {"/login"}></Redirect></Route>
                    <Route exact path = {"/login"} component ={Login}/>
                    <Route exact path = {"/register"} component= {RegisterForm}/>
                    <PrivateRoute exact path={"/events"} component={Events}/>
                    <PrivateRoute exact path={"/event/:eventName"} component={Event}/>
                    <OrganizatorRoute exact path ={"/istatistik"} component = {EventStatistics}/>
                    <OrganizatorRoute exact path={"/events/:username"} component={AddEventForm}/>
                    <OrganizatorRoute exact path = {"/survey"} component ={SurveyStatistics}/>
                    <OrganizatorRoute exact path={"/raffle"} component={EventRaffle}/>
                    <OrganizatorRoute exacth path ={"/participants/:eventName"} component ={ParticipantsOfEvent}/>
                    <OrganizatorRoute exact path ={"/event/:eventName/addQuestion"} component = {EventQuestionsForm}/>
                    <OrganizatorRoute exact path = {"/createSurvey/:eventName"} component={EventSurveyForm}/>
                    <ParticipantRoute exact path = {"/participantAnswersOf/:eventName"} component = {ParticipantAnswers}/>
                    <ParticipantRoute exact path ={"/myEvents/:username"} component={ParticipantEvents}/>
                    <ParticipantRoute exact path ={"/:username/and/:eventName/information"}
                                      component ={InformationInsideOfQrCode}/>
                   <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
