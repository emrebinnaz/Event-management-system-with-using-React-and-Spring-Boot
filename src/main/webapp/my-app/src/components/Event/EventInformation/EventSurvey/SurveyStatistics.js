import React, {Component} from 'react';
import EventSelectionForSurvey from './EventSelectionForSurvey'
import axios from "axios";
import HelpIcon from '@material-ui/icons/Help';
class SurveyStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEventName : '',
            events : [],
            eventsWithSurvey : [],
            surveyInformation : []
        }
    }

    changeEventNameWith = (val) =>{
        this.setState({
            selectedEventName : val
        })
    }

    getSurveyStatistics = async (e) =>{
        e.preventDefault();
        const {selectedEventName} = this.state;

        await axios.get(`/surveyQuestionsOfEvent/${selectedEventName}/statistics`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            },
        }).then((response) =>{
            this.setState({
                surveyInformation : response.data
            })
        })
    }

    getTotalAnswerCountOfQuestion = (answersOfQuestion) => {
        var totalAnswerCountOfQuestion = 0 ;
        answersOfQuestion.map(answersOfQuestion => {
            totalAnswerCountOfQuestion += parseInt(answersOfQuestion.numberOfAnswersToSurveyQuestion);
        })
        return totalAnswerCountOfQuestion;
    }

    render() {
        const {surveyInformation} = this.state;
        return (
            <div className={"container"}>
                <form onSubmit={(e) => this.getSurveyStatistics(e)}>
                    <div className="col-md-12 text-center mt-5">
                        <EventSelectionForSurvey
                            onSelectEvent = {this.changeEventNameWith}
                        />
                    </div>
                    <button className={"btn btn-secondary mt-5 "}
                            type="submit">Anket Bilgilerini Getir</button>
                </form>
                {this.state.surveyInformation.length > 0 ?
                    <div className={"mt-5"}>
                        {
                            surveyInformation.map((answersOfQuestion) => {
                                var totalAnswerCountOfQuestion = this.getTotalAnswerCountOfQuestion(answersOfQuestion);
                                return(
                                    answersOfQuestion.map((answerOfQuestion,i) => {
                                        var percentageOfAnsweringCount = (answerOfQuestion.numberOfAnswersToSurveyQuestion/totalAnswerCountOfQuestion)*100 ;
                                        return(
                                            <div>

                                                {i == 0 ?
                                                    <div>
                                                        <HelpIcon/>
                                                        <strong className={"mt-5"}>{answerOfQuestion.question} sorusuna</strong>
                                                    </div>
                                                 : null }
                                                <div className={"mt-1"}>
                                                    <div className={"row"}>
                                                        <div className="col">
                                                            <p> "<strong>{answerOfQuestion.answer}"</strong> cevabını
                                                            {" " + answerOfQuestion.numberOfAnswersToSurveyQuestion
                                                            +  " "}
                                                            kişi verdi</p>
                                                        </div>
                                                        <div className="col">
                                                            <div className="progress">
                                                                <div className="progress-bar bg-dark"
                                                                     role="progressbar"
                                                                     style ={{width : percentageOfAnsweringCount + "%"}}
                                                                     aria-valuenow={answerOfQuestion.numberOfAnswersToSurveyQuestion}
                                                                     aria-valuemin="0"
                                                                     aria-valuemax={totalAnswerCountOfQuestion}>
                                                                    {answerOfQuestion.numberOfAnswersToSurveyQuestion + "/"+ totalAnswerCountOfQuestion }
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    })
                                )
                            })
                        }

                    </div> : null}

            </div>
        );
    }
}

export default SurveyStatistics;