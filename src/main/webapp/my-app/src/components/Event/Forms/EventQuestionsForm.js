import React, {Component} from 'react';
import {Card, Form, Button, Col, InputGroup} from 'react-bootstrap';
import {isOrganizator} from "../../../Authentication";
import {withRouter} from "react-router-dom";
import axios from "axios";
import QuestionTable from "../EventInformation/EventQuestions/QuestionTable";
import CustomizedSnackbar from '../../static/Snackbars/CustomizedSnackbar'
class EventQuestionsForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        question : '',
        questionType : '',
        isQuestionRequired : null,
        questionName : '',
        expectedMinValueAnswerOfQuestion : '',
        expectedMaxValueAnswerOfQuestion : '',
        questions : [],
        isOpenedMessageSnackbar : false,
        message : '',
        messageType : '',
        isSendingCompleted : false

    }

    updateInput = (e) =>{
        this.setState({
            [e.target.name ] : e.target.value
        })
    }

    sendQuestions = async (e) =>{
        e.preventDefault();
        const { questions } = this.state;
        const response = await axios.post(`/questionsOfEvent/${this.props.match.params.eventName}`,
            questions, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");

        })
        this.resetQuestions();
        this.openMessageSnackbarWithMessages("Sorular kaydedildi! Ayrıca etkinlik başlayana kadar anket" +
            " oluşturabilirsiniz ",
            "SUCCESS");
        this.sendingCompleted();

    }

    resetQuestions = () =>{
        this.setState({
            questions : []
        })
    }

    openMessageSnackbarWithMessages = (message,messageType) =>{
        this.setState({
            isOpenedMessageSnackbar : true,
            message : message,
            messageType : messageType,
        })
    }

    sendingCompleted = () => {
        this.setState({
            isSendingCompleted : true
        })
    }
    addQuestion = (e) => {
        e.preventDefault();
        const {question,questionType, questionName,isQuestionRequired,
            expectedMinValueAnswerOfQuestion,expectedMaxValueAnswerOfQuestion} = this.state;
        var newQuestion  = {
            question : question.trim(),
            questionType,
            questionName,
            isQuestionRequired,
            expectedMinValueAnswerOfQuestion,
            expectedMaxValueAnswerOfQuestion,
        }

        this.setState({
            ...this.state, // statelerimizi tututk.
            questions : [...this.state.questions,newQuestion],
        })
        this.openMessageSnackbarWithMessages("Soru Eklendi","SUCCESS");
    }


    handleQuestionTypeChange = (e) =>{
        this.setState({
            questionType : e.target.value
        })
    }

    handleQuestionIsRequired = (e) =>{
        this.setState({
            isQuestionRequired : e.target.value === 'true' ? true : false
        })
    }


    closeMessageSnackbar = () =>{
        this.setState({
            isOpenedMessageSnackbar : false
        })
    }

    deleteQuestion = (e,index) =>{
        e.preventDefault();
        this.setState((prevState) => {
            const questions = [...prevState.questions];
            questions.splice(index, 1);
            return { ...prevState, questions };
        });
        this.openMessageSnackbarWithMessages("Soru silindi ! ", "SUCCESS");
    }

    render() {
        const {question,questionType, isOpenedMessageSnackbar,isQuestionRequired, message,
            messageType,expectedMinValueAnswerOfQuestion,expectedMaxValueAnswerOfQuestion} = this.state;
        return (
            <div className={"container"}>
                <Card>
                    <Card.Header>

                    </Card.Header>
                    <Form onSubmit ={(e) => this.addQuestion(e)}>
                        <Card.Body>
                            <Form.Group >
                                <Form.Label>Lütfen sorunuzu yazın</Form.Label>
                                <InputGroup>
                                    <Form.Control required
                                                  type="text"
                                                  placeholder="Soru"
                                                  id = "question"
                                                  name="question"
                                                  value = {question}
                                                  onChange={this.updateInput}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group   >
                                <Form.Label>Bu sorunun cevabı olarak
                                kullancıdan ne tipte bir cevap bekliyorsunuz ? </Form.Label>
                                <InputGroup>
                                    <Form.Control as="select" required
                                                  value={questionType}
                                                  onChange={(e) => this.handleQuestionTypeChange(e)}>
                                        <option value="">Cevap tipi seçiniz</option>
                                        <option value="number">Sayı</option>
                                        <option value="date">Tarih</option>
                                        <option value="email">E-mail</option>
                                        <option value="text">Metin</option>)
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group >
                            {questionType === "number" || questionType === "date" ?
                                <div>
                                <Form.Group >
                                    <Form.Label> en az değeri yazın</Form.Label>
                                    <InputGroup>
                                        <Form.Control type={questionType}
                                                      placeholder="Minimum"
                                                      required
                                                      id = "expectedMinValueAnswerOfQuestion"
                                                      name="expectedMinValueAnswerOfQuestion"
                                                      max = {expectedMaxValueAnswerOfQuestion}
                                                      value = {expectedMinValueAnswerOfQuestion}
                                                      onChange={this.updateInput}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                    <Form.Group  >
                                        <Form.Label>en fazla değeri yazın</Form.Label>
                                        <InputGroup>
                                            <Form.Control type={questionType}
                                                          placeholder="Maximum"
                                                          required
                                                          id = "expectedMaxValueAnswerOfQuestion"
                                                          name="expectedMaxValueAnswerOfQuestion"
                                                          min ={expectedMinValueAnswerOfQuestion}
                                                          value = {expectedMaxValueAnswerOfQuestion}
                                                          onChange={this.updateInput}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                            : null}
                            <Form.Group  >
                                <Form.Label>Bu sorunun cevaplanması zorunlu mu ? </Form.Label>
                                <InputGroup>
                                    <Form.Control as="select" required
                                                  value={isQuestionRequired}
                                                  onChange={(e) => this.handleQuestionIsRequired(e)}>
                                        <option value="">Zorunlu mu ?</option>
                                        <option value="true">Evet</option>
                                        <option value="false">Hayır</option>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            {(this.state.questions.length > 0 && !this.state.isSendingCompleted) ?
                                <Button variant="success"  className = {"mr-5"} onClick = {(e) => {this.sendQuestions(e)}}>
                                    Soruları onayla
                                </Button> : null
                            }
                            <Button variant="info" type="submit">
                                Soruyu ekle
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
                {isOpenedMessageSnackbar ?
                    <CustomizedSnackbar
                        vertical={"bottom"}
                        horizontal={"right"}
                        open = {isOpenedMessageSnackbar}
                        handleClose = {this.closeMessageSnackbar}
                        message={message}
                        messageType={messageType}/> : null}
                {(this.state.questions.length > 0 && isOrganizator())  ?
                    <QuestionTable
                        questions = {this.state.questions}
                        onDeleteQuestion = {this.deleteQuestion}/> : null}
            </div>
        );
    }
}

export default withRouter(EventQuestionsForm);