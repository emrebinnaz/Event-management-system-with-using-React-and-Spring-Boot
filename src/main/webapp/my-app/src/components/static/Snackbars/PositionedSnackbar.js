import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class PositionedSnackbar extends Component {
    state = {
        isOpen : true
    }

    closeSnackbar = () =>{
        this.setState({isOpen : false})
    }

    render() {
        const {message, messageType, vertical, horizontal} = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin = {{ vertical, horizontal }}
                    open = {this.state.isOpen}
                    message = {message}
                    close =  {this.props.handleClose}
                    key = {vertical + horizontal}>
                    <Alert onClose = {this.closeSnackbar} severity = {messageType.toLowerCase()}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

PositionedSnackbar.propTypes = {
    vertical : PropTypes.string.isRequired,
    horizontal : PropTypes.string.isRequired,
    message : PropTypes.string.isRequired,
    messageType : PropTypes.string.isRequired
};

export default PositionedSnackbar;