import { todoListResponse } from "../assets/test-data/todoListResponse";
import { showAlertPopup } from "../utils/alert";
import { domRefToFormData, objectToFormData } from "../utils/formFieldConverter";
import { postData, getData, putData } from "../utils/request";

export const baseUrl = '/todo';

export const fetchTodo = async () => {
    try {
        if(process.env.REACT_APP_DATA_TYPE === "json") {
            return todoListResponse;
        }
        const url = `${baseUrl}/`;
        const response = await getData(url, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export const addTodo = async (ref) => {
    try {
        const url = `${baseUrl}/`;
        const formData = domRefToFormData(ref);
        const response = await postData(url, formData, {});
        showAlertPopup(response.status, response.message);
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}
export const updateTodo = async (ref, id) => {
    try {
        const url = `${baseUrl}/${id}/`;
        const formData = domRefToFormData(ref);
        const response = await putData(url, formData, {});
        showAlertPopup(response.status, response.message);
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}
export const updateTodoWithObj = async (obj, id) => {
    try {
        const url = `${baseUrl}/${id}/`;
        const formData = objectToFormData(obj);
        const response = await putData(url, formData, {});
        showAlertPopup(response.status, response.message);
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}