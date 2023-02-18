import { toast } from 'react-toastify';

export const showAlert = {
    successAlert: (msg) => {
        toast.success(msg, {
            autoClose: 1500,
            progress: 0,
            className: "successAlert",
        });
    },

    errorAlert: (msg) => {
        toast.error(msg, {
            autoClose: msg.length > 20 ? msg.length * 150 : 2000,
            progress: 0,
            className: "errorAlert",
        });
    },

    warningAlert: (msg) => {
        toast.warn(msg, {
            autoClose: 1500,
            progress: 0,
            className: "errorAlert",
        });
    },

    copyAlert: () => {
        toast.info('copied!', {
            autoClose: 1000,
            progress: 0,
            className: "",
            theme: "light"
        });
    }
}

export const showAlertPopup = (status, message) => {
    if (status) {
        showAlert.successAlert(message);
    }
    else {
        showAlert.errorAlert(message);
    }
}