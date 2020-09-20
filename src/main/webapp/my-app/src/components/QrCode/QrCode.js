import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function QrCode(props) {
    const [open, setOpen] = React.useState(true);
    const [loading,setLoading] = React.useState(true);
    const [qrCode, setQrCode] = React.useState('');
    const history = useHistory();

    const goToEventsPage = () =>{
        history.push(`/events`);
        props.handleClose();
    }

    useEffect(() => {
        getQrCode();

    },[])

    const getQrCode = async () => {
            const response = await axios.post(`/sendQrCodeOf/${props.participantUsername}`,
                props.event, {
                    headers : {
                        'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                    }
                }).catch(err => {
                history.push("/notFound404");
            })
        setQrCode(response.data);
        setLoading(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={goToEventsPage}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">{"Etkinliğe katılımınızı başarıyla gerçekleştirdik.Bu QR Code'u okutarak\n" +
                "etkinliğin bilgilerine ve kendi bilgilerinize erişebilirsiniz. Ayrıca bu kodu mail hesabınıza da yolluyoruz."}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className={"text-center"}>
                            {loading ? <Spinner animation="border" role="status"/> :
                                        <img alt='Embedded Image' src = {`data:image/png;base64,${qrCode}`}/>
                            }
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={goToEventsPage} color="primary">
                        Tamam
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}