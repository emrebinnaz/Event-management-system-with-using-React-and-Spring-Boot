import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import Slide from '@material-ui/core/Slide';
import { useEffect, useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AnswerOptionsOfQuestion(props) {

    console.log(props.answerOptions);
    return(
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">{"Sorunun cevap seçenekleri"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <ul className="list-group">
                            {
                                props.answerOptions.map(option => {
                                    return(
                                        <li className="list-group-item">{option.answerOption}</li>
                                    );
                                })

                            }
                        </ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Tamam
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}


