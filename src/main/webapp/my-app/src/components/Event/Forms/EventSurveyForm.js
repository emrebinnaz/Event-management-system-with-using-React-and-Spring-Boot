import React, {Component} from 'react';
import {Button, Card, Form, InputGroup} from "react-bootstrap";
import CustomizedSnackbar from "../../static/Snackbars/CustomizedSnackbar";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import {isOrganizator} from "../../../Authentication";
import SurveyQuestionTable from "../EventInformation/EventSurvey/SurveyQuestionTable";

class EventSurveyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxAnswerOptionCount : 0,
            surveyQuestions : [],
            answerOptionsWithIndexes : '', // it is an object which have index and answer options of question
            answerOptions : [],
            isOpenedMessageSnackbar : false,
            message : '',
            messageType : '',
            isSendingCompleted : false,

        }
    }

    updateInput = (e) =>{
        this.setState({
            [e.target.name ] : e.target.value
        })
    }

    addQuestion = (e) =>{
        e.preventDefault();
        const {answerOptionsWithIndexes,question} = this.state;
        var answerOptions = this.extractAnswerOptionsFrom(answerOptionsWithIndexes);
        var newSurveyQueston = {
            question : question.trim(),
            answerOptions : answerOptions
        }
        if(this.isAnyDuplicateAnswerOptionIn(answerOptions)) {
            this.openMessageSnackbarWithMessages("Eklemeye çalıştığınız soruda aynı cevap " +
                "seçeniğini birden fazla yazdınız. Lütfen değiştiriniz.","ERROR");
        }
        else {
            this.setState({
                ...this.state,
                surveyQuestions : [...this.state.surveyQuestions,newSurveyQueston],
            })
            this.openMessageSnackbarWithMessages("Soru Eklendi","SUCCESS");
        }
    }

    extractAnswerOptionsFrom = (answerOptionsWithIndexes) =>{
        var answerOptions = [];
        (Object.values(answerOptionsWithIndexes).forEach(answerOption => {
            answerOptions.push({"answerOption" : answerOption});
        }));
        return answerOptions;
    }

    isAnyDuplicateAnswerOptionIn = (options) => {
        var answerOptions = [];
        options.map(option => {
            answerOptions.push(option.answerOption);
        })
        return new Set(answerOptions).size != answerOptions.length;
    }

    sendQuestions = async (e) => {
        const {event} = this.props;
        e.preventDefault();
        const { surveyQuestions } = this.state;
        if(this.isAnyDuplicateQuestionIn(surveyQuestions)) {
            this.openMessageSnackbarWithMessages("Eklemiş olduğunuz herhangi bir soruyu birden fazla defa" +
                " eklediniz. Lütfen her soruyu en fazla 1 defa ekleyin. ","ERROR")
        }
        else {
            const response = await axios.post(`/surveyQuestionsOfEvent/${event.name}`,
                surveyQuestions, {
                    headers : {
                        'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                    }
                }).catch(err => {
                this.props.history.push("/notFound404");
            })
            this.resetQuestions();
            this.openMessageSnackbarWithMessages("Anket oluşturuldu ! ",
                "SUCCESS");
            this.sendingCompleted();
            this.goToEventsPage();
        }

    }

    isAnyDuplicateQuestionIn = (surveyQuestions) =>{
        var questions = [];
        surveyQuestions.map(surveyQuestion => {
            questions.push(surveyQuestion.question);
        })
        return new Set(questions).size != questions.length;
    }

    resetQuestions = () =>{
        this.setState({
            surveyQuestions : []
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

    goToEventsPage = () => {
        setTimeout((() => {
            this.props.history.push("/events");
        }),2500);
    }

    closeMessageSnackbar = () =>{
        this.setState({
            isOpenedMessageSnackbar : false
        })
    }

    answerOptionsArea = () => {
        const {maxAnswerOptionCount,answerOptionsWithIndexes} = this.state;
        return <div>{Array.from(Array(parseInt(maxAnswerOptionCount)), (e, i) => {
            return<Form.Group key ={i + "form group"}>
                <Form.Label key ={i + "form label"}>
                    Lütfen verilebilecek cevabı yazın.</Form.Label>
                <InputGroup key ={i + "input group"}>
                    <Form.Control required
                                  type="text"
                                  placeholder="Cevap"
                                  id = {answerOptionsWithIndexes[i]}
                                  key ={i + "form control"}
                                  name= {answerOptionsWithIndexes[i]}
                                  value = {answerOptionsWithIndexes[i]}
                                  onChange={(e) => this.updateInputOfAnswerOption(e,i)}
                    />
                </InputGroup>
            </Form.Group>

        })}</div>
    }

    updateInputOfAnswerOption = (e,index) =>{
        this.setState({
            answerOptionsWithIndexes: { ...this.state.answerOptionsWithIndexes, [index] : e.target.value }
        })
    }

    deleteQuestion = (e,index) =>{
        e.preventDefault();
        this.setState((prevState) => {
            const surveyQuestions = [...prevState.surveyQuestions];
            surveyQuestions.splice(index, 1);
            return { ...prevState, surveyQuestions };
        });
        this.openMessageSnackbarWithMessages("Soru silindi ! ", "SUCCESS");
    }


    render() {
        const {question,maxAnswerOptionCount} = this.state;
        return (
            <div className={"container"}>
                <Card>
                    <Card.Header>
                        Etkinlik Anketi
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
                            <Form.Group >
                                <Form.Label>Bu soruya verilebilecek olası
                                cevap sayısı kaçtır ? </Form.Label>
                                <InputGroup>
                                    <Form.Control required
                                                  type="number"
                                                  min = "1"
                                                  max ="10"
                                                  id ="maxAnswerOptionCount"
                                                  name = "maxAnswerOptionCount"
                                                  value = {maxAnswerOptionCount}
                                                  onChange={this.updateInput}

                                    />
                                </InputGroup>
                                <small className="form-text text-muted">En fazla 10 en az 1 olası
                                    cevap girebilirsiniz.</small>
                            </Form.Group>
                            {(maxAnswerOptionCount <= 10) && (maxAnswerOptionCount >= 1)
                                ? this.answerOptionsArea() : null}

                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            {(this.state.surveyQuestions.length > 0 && !this.state.isSendingCompleted)?
                                <Button variant="success"  className = {"mr-5"} onClick = {(e) => {this.sendQuestions(e)}}>
                                    Soruları onayla
                                </Button> : null
                            }
                            <Button variant="info" type="submit">
                                Soruyu ekle
                            </Button>
                        </Card.Footer>
                        {this.state.isOpenedMessageSnackbar ?
                            <CustomizedSnackbar
                                vertical={"bottom"}
                                horizontal={"right"}
                                open = {this.state.isOpenedMessageSnackbar}
                                handleClose = {this.closeMessageSnackbar}
                                message={this.state.message}
                                messageType={this.state.messageType}/> : null}
                    </Form>
                </Card>

                {(this.state.surveyQuestions.length > 0 && isOrganizator())  ?
                    <SurveyQuestionTable
                        surveyQuestions = {this.state.surveyQuestions}
                        onDeleteQuestion = {this.deleteQuestion}/> : null}

            </div>
        );
    }
}

export default withRouter(EventSurveyForm);