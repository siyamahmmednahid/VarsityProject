import { usersApiResponse } from "../assets/test-data/usersApiResponse";
import { showAlert, showAlertPopup } from "../utils/alert";
import { postData, getData } from "../utils/request";

export const baseUrl = '/users';

export const fetchUsers = async () => {
    try {
        if(process.env.REACT_APP_DATA_TYPE === "json") {
            return usersApiResponse;
        }
        const url = `${baseUrl}/`;
        const response = await getData(url, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export const fetchUser = async ({ id }) => {
    try {
        const url = `${baseUrl}/${id}`;
        const response = await getData(url, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export const createUser = async (data) => {
    try {
        const url = `${baseUrl}/personalinfo/add/`;
        const formData = new FormData(data);
        const response = await postData(url, formData, {});
        if (response.status) {
            showAlert.successAlert(response.message);
        }
        else {
            showAlert.errorAlert(response.message);
        }
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}