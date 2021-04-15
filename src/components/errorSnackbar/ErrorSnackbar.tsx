import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {AppStateType, SetError} from '../../redux/app-reducer';

function Alert(props: AlertProps) {
    return <MuiAlert
        elevation={3}
        variant="filled" {...props} />;
}

export const ErrorSnackbar: React.FC = () => {

    const error = useSelector<RootStateType, AppStateType>(state => state.appStatus);
    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(SetError(null));
    };

    return (
        <Snackbar
            open={error.error !== null}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error">
                {error.error}
            </Alert>
        </Snackbar>
    );
};
