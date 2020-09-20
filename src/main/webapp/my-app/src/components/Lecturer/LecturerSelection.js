import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "axios";

class LecturerSelection extends Component {
    state = {
        usernamesOfLecturers : [ ],
        lecturerUsername : '',
    }

    componentDidMount = () => {
        this.getAllUsernamesOfLecturers();
    }

    getAllUsernamesOfLecturers = async () =>{
        await axios.get('/lecturers')
            .then((response) =>{
                return response.data;
            })
            .then(data => {
                let usernamesOfLecturers = data.map(lecturer =>{
                    return {value : lecturer.username, display : lecturer.username}
                });
                this.setState({
                    usernamesOfLecturers : [{value: '', display : 'Eğitmen seç'}]
                        .concat(usernamesOfLecturers)
                })
            });
    }

    handleUsernameChange = (e) => {
        this.setState({
            lecturerUsername : e.target.value
        },() =>{
            this.props.onSelectLecturer(this.state.lecturerUsername);
        })
    }

    render() {
        const {lecturerUsername,usernamesOfLecturers} = this.state;
        return (
            <div>
                <Form.Label>Eğitmen</Form.Label>
                <Form.Control size="sm" as="select" required
                              placeholder = "Eğitmen seç"
                              value={lecturerUsername}
                              className={"bg-dark text-white"}
                              onChange={(e) => this.handleUsernameChange(e) }>
                    {usernamesOfLecturers.map((username) =>
                        <option key={username.value} value={username.value}>{username.display}</option>)}
                </Form.Control>
            </div>
        );
    }
}

export default LecturerSelection;
