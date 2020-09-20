import React, {Component} from 'react';

class EventLocation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {address,latitude,longitude} = this.props.event;
        return (
            <div className={"container mt-3 mb-3"}>
                <h3 className={"card-title text-center"}>Etkinliğin Konumu</h3>
                <div className="row">
                    <div className="col">
                        <strong>Address :</strong>
                        <p className={"ml-3 d-inline"}>{address}</p>
                    </div>
                    <div className="col">
                        <iframe className ="w-100"
                                src = {`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                                height="270" frameBorder="0" ></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventLocation;