import React, {Component} from 'react';
import axios from "axios";
import {Button, Card, Form, InputGroup} from "react-bootstrap";
import {isParticipant} from "../../Authentication";
import {getEvent} from "../../HelperFunctions/EventHelpers";

class ParticipantAnswers extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        event : '',
        questions : [],
        answers : [],
    }

    componentDidMount = () =>{
        this.getEvent().then(event => {
            this.getQuestionsOfEvent(event).then(res => {
                this.getAnswersOfQuestions();
            });
        });

    }

    getEvent = async () => {
        const {eventName} = this.props.match.params;
        const response = await axios.get(`/events/${eventName}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            event : response.data
        })
        return response.data;

    }

    getQuestionsOfEvent = async (event) =>{
        const response = await axios.get(`/questionsOfEvent/${event.name}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            questions : response.data
        },() => {
            console.log(this.state.questions);
        })
        return response.data;
    }

    getAnswersOfQuestions = async () => {

        const participantUsername = localStorage.getItem('username');
        console.log(this.state.event);
        const {name} = this.state.event;
        console.log(name);
        const response = await axios.get(`/answersOfEvent/${name}/for/${participantUsername}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            answers : response.data
        }, () =>{
            console.log(this.state.answers);
        })
    }


    render() {
        const{questions,answers} = this.state;
        return (
            <div className={"container mt-5"}>
                <Card>
                    <Card.Header>
                        Cevaplarınız
                    </Card.Header>
                        <div>
                            <Form>
                                <Card.Body>
                                    {
                                        questions.map((question,index) => {
                                            return (
                                                <Form.Group key = {`form-group ${index}`}>
                                                    <Form.Label key = {`form-label ${index}`}>
                                                        {question.question}</Form.Label>
                                                    <InputGroup key = {`input-group ${index}`}>
                                                        <Form.Control
                                                                      type={question.questionType}
                                                                      id = {answers[index]}
                                                                      name={answers[index]}
                                                                      value={answers[index]}
                                                                      disabled
                                                                      key = {`form-control ${index}`}
                                                                      min = {question.questionType === 'number' ?
                                                                          parseInt(question.expectedMinValueAnswerOfQuestion) :
                                                                          question.questionType === 'date' ?
                                                                              question.expectedMinValueAnswerOfQuestion : null
                                                                      }
                                                                      max = {question.questionType === 'number' ?
                                                                          parseInt(question.expectedMaxValueAnswerOfQuestion) :
                                                                          question.questionType === 'date' ?
                                                                              question.expectedMaxValueAnswerOfQuestion : null
                                                                      }
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            )
                                        })
                                    }
                                </Card.Body>

                                <Card.Footer style={{"textAlign":"right"}}>
                                </Card.Footer>
                            </Form>
                        </div>


                </Card>
            </div>
        );
    }
}

export default ParticipantAnswers;