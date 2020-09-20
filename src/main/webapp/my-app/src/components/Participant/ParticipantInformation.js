import React, {Component} from 'react';
import {isOrganizator} from "../../Authentication";
import Card from 'react-bootstrap/Card'
class ParticipantInformation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {username,email,name,surname,phone,birthDate,} = this.props.participant;
        return (
            <div className={"card text-black bg-light container mt-5 mb-5"}>
                <div className={"card-body"}>
                <h3 className={"card-title text-center"}>Katılımcı Ayrıntıları</h3>
                <div className="row">
                    <div className="col">
                        <strong>İsim :</strong>
                        <p className={"ml-3 d-inline"}>{name}</p>
                    </div>
                    <div className="col">
                        <strong>Soyisim :</strong>
                        <p className={"ml-3 d-inline"}>{surname}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <strong>Kullanıcı Adı :</strong>
                        <p className={"ml-3 d-inline"}>{username}</p>
                    </div>
                    <div className="col">
                        <strong>Email</strong>
                        <p className={"ml-3 d-inline"}>{email}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <strong>Telefon</strong>
                        <p className={"ml-3 d-inline"}>{phone}</p>
                    </div>
                    <div className="col">
                        <strong>Doğum Tarihi</strong>
                        <p className={"ml-3 d-inline"}>{birthDate}</p>
                    </div>

                </div>
                </div>
            </div>
        );
    }
}

export default ParticipantInformation;