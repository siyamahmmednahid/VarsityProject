import { showAlert, showAlertPopup } from "../utils/alert";
import { domRefToFormData, domRefToObject, objectToFormData } from "../utils/formFieldConverter";
import { postData, putData } from "../utils/request";

export const baseUrl = '/auth';

export const login = async (data) => {
    try {
        const url = `${baseUrl}/signin/`;
        const formData = new FormData();
        for (const property in data) {
            formData.append(property, data[property]);
        }
        const response = await postData(url, formData, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}
export const forgot = async (data) => {
    try {
        const url = `${baseUrl}/password_reset/`;
        const formData = new FormData();
        for (const property in data) {
            formData.append(property, data[property]);
        }
        const response = await postData(url, formData, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}
export const reset = async (data) => {
    try {
        const url = `${baseUrl}/password_reset/confirm/`;
        const formData = new FormData();
        for (const property in data) {
            formData.append(property, data[property]);
        }
        const response = await postData(url, formData, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export const signup = async (data) => {
    try {
        const url = `${baseUrl}/signup/`;
        const formData = new FormData();
        for (const property in data) {
            formData.append(property, data[property]);
        }
        const response = await postData(url, formData, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export const changePassword = async (ref) => {
    try {
        const url = `${baseUrl}/change_password/`;
        const formData = domRefToFormData(ref);
        const response = await putData(url, formData, {});
        showAlertPopup(response.status, response.message);
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}