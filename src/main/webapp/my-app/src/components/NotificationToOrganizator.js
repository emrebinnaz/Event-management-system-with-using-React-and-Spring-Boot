import React, {Component} from 'react';
import SockJS from 'sockjs-client';
import Stomp from "stompjs";

let stompClient;
class NotificationToOrganizator extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        message : '',
    }
    componentDidMount(){
        // this is an "echo" websocket service
        console.log('didmount')
        var sock = new SockJS('http://localhost:8080/websocket-participation-notification');
        stompClient = Stomp.over(sock);
        stompClient.connect({},() =>{
            stompClient.subscribe('http://localhost:8080/topic',() => {
                console.log('sdkjfdsfh');
            })
        })
        stompClient.send("/websocket-participation-notification",{},"selam");
        /*
        sock.onopen = function() {
            console.log('open socket ');
            sock.send('test');
        };

        sock.onmessage = function(e) {
            console.log('message');
            console.log('message', e.data);
              sock.close();
        };

        sock.onclose = function() {
            console.log('close');
        };

         */
    }

    render() {
        const {participantUsername, event} = this.props;
        return (
            <div>
            </div>
        );
    }
}

export default NotificationToOrganizator;