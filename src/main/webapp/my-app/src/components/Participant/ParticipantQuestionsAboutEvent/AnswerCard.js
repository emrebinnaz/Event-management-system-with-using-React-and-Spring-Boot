import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {isLecturer} from "../../../Authentication";

class AnswerCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const lecturerUsername = localStorage.getItem("username");
        const {answer} = this.props;
        return (
            <div className={"col-md-10 float-right mt-3"}>
                <div className="card" style= {{backgroundColor : "#f5f5f5"}}>
                    <div className="card-body">
                        <h5 className="card-title">{isLecturer() ? lecturerUsername : "Bu etkinliğin eğitmeni cevapladı" }</h5>
                        <p className="card-text">{answer}</p>
                    </div>
                </div>
                <button type="button"
                        className="close"
                        aria-label="Close"
                        onClick={this.props.handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

export default AnswerCard;