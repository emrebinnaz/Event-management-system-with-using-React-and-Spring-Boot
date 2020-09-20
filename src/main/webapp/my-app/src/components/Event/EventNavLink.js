import React, {Component} from 'react';

class EventNavLink extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var linkName = this.props.name;
        return (
            <li className="nav-item" onClick={this.props.handleClick}>
                <a className="nav-link text-primary" id={linkName} data-toggle="tab"
                   href={"#" + linkName} role="tab" aria-controls={linkName} aria-selected="true">{linkName}</a>
            </li>
        );
    }
}

export default EventNavLink;