import React, {Component} from 'react';
import ProfilePhoto from "../../../img/header.png";
import {isLecturer, isParticipant} from "../../../Authentication";
import AnswerTextArea from "./AnswerTextArea";
import AnswerCard from "./AnswerCard";
class QuestionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAnswerTextArea : false,
            isClickedToShowAnswer : false
        }

    }

    openAnswerTextArea = (e) =>{
        e.preventDefault();
        this.setState({
            isOpenAnswerTextArea : true,
        })
    }

    toggleAnswerTextArea = (e) => {
        e.preventDefault();
        this.setState({
            isOpenAnswerTextArea : !this.state.isOpenAnswerTextArea
        })
    }

    closeAnswerTextArea = () => {
        this.setState({
            isOpenAnswerTextArea : false
        })
    }

    showAnswer = (e) => {
        e.preventDefault();
        this.setState({
            isClickedToShowAnswer : true
        })
    }

    closeAnswer = (e) => {
        e.preventDefault();
        this.setState({
            isClickedToShowAnswer : false
        })
    }


    render() {
        const {participant,event,answer,question,questionIndex} = this.props;
        const {isOpenAnswerTextArea,isClickedToShowAnswer} = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-md-2 mt-3 mb-3">
                        <img src={ProfilePhoto} className="card-image-top"
                             style={{height: 120 + "px"}} alt=""/>
                    </div>
                    <div className="col-md-10">
                        <div className="card" style= {{backgroundColor : "#f5f5f5"}}>
                            <div className="card-body">
                                <h5 className="card-title">{participant.username}</h5>
                                <p className="card-text">{question}</p>
                                {(isLecturer() && answer == null) ?
                                    <a href=""
                                       className="card-link"
                                       onClick={(e) =>
                                                    this.openAnswerTextArea(e)}>
                                            Cevapla </a> : null
                                }
                                {answer != null ?  <a href=""
                                                      className="card-link"
                                                       onClick={(e) => this.showAnswer(e)}>
                                                Cevabı Gör </a>
                                 : null}
                            </div>
                        </div>
                        {isOpenAnswerTextArea ? <AnswerTextArea
                                                question = {question}
                                                participant = {participant}
                                                event = {event}
                                                handleClose = {this.closeAnswerTextArea}
                                                handleAnswer = {this.props.handleAnswerToQuestion}
                                                questionIndex = {questionIndex}/> : null}
                        {isClickedToShowAnswer ? <AnswerCard
                                                    answer = {answer}
                                                    handleClose = {(e) => this.closeAnswer(e)}/> : null}
                    </div>
                </div>

            </div>
        );
    }
}

export default QuestionCard;