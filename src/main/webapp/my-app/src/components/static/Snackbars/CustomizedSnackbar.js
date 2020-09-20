import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class CustomizedSnackbar extends Component {

    render() {
        const {message, messageType, vertical, horizontal,open,handleClose} = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin = {{ vertical, horizontal }}
                    open = {open}
                    message = {message}
                    autoHideDuration={3000}
                    onClose =  {handleClose}
                    key = {vertical + horizontal}>
                    <Alert onClose = {handleClose} severity = {messageType.toLowerCase()}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

CustomizedSnackbar.propTypes = {
    vertical : PropTypes.string.isRequired,
    horizontal : PropTypes.string.isRequired,
    message : PropTypes.string.isRequired,
    messageType : PropTypes.string.isRequired
};

export default CustomizedSnackbar;