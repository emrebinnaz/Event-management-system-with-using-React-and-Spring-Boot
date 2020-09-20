import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import axios from "axios";
import {withRouter} from 'react-router-dom';
class AnswerTextArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answerText : '',
        }
    }
    sendAnswer = async (e) =>{
        e.preventDefault();
        const {questionIndex,event,question,participant} = this.props;
        const {answerText} = this.state;

        const updatedParticipantQuestion = {
            answer : answerText,
            event : event,
            question : question,
            participant : participant
        };
        console.log(event);

        const response = await axios.put(`/sendLecturerAnswer/`, updatedParticipantQuestion,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });

        this.props.handleAnswer(answerText,questionIndex);
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        const { answerText } = this.state;
        return (
            <div className={"col-md-10 float-right mt-3"}>
                <div>
                    <form onSubmit={(e) => this.sendAnswer(e)}>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                rows="5"
                                required
                                name = "answerText"
                                value ={answerText}
                                id="answer"
                                onChange = {(e) => this.changeInput(e)}/>
                                <div>
                                        <Button className={"btn-btn primary"}
                                              type = "submit">Cevabı gönder </Button>
                                        <button type="button"
                                                className="close"
                                                aria-label="Close"
                                                onClick={this.props.handleClose}>
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(AnswerTextArea);