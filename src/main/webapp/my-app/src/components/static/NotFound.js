import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

function NotFound() {

    return(
        <Alert severity="error" className={"container mt-5"}>
            <AlertTitle>Sayfa Bulunamadı !</AlertTitle>
            <strong>
                <a className={"nav-item"} href = "/login">Buraya tıklayarak</a> giriş sayfasına gidebilirsiniz.
            </strong>
        </Alert>
    );
}
export default NotFound;