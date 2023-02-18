import { allTeacherListResponse, eventListResponse, meAsSupervisorListResponse, myTaskListResponse, userListResponse } from "../assets/test-data/analyticsResponse";
import { getData } from "../utils/request";

export const baseUrl = '/home';

export const fetchUserList = async () => {
    try {
        if(process.env.REACT_APP_DATA_TYPE === "json") {
            return userListResponse;
        }
        const url = `${baseUrl}/userList/`;
        const response = await getData(url, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export const fetchMyTaskList = async () => {
    try {
        if(process.env.REACT_APP_DATA_TYPE === "json") {
            return myTaskListResponse;
        }
        const url = `${baseUrl}/myTodoList/`;
        const response = await getData(url, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export const fetchMeAsSupervisorList = async () => {
    try {
        if(process.env.REACT_APP_DATA_TYPE === "json") {
            return meAsSupervisorListResponse;
        }
        const url = `${baseUrl}/supervisorTodoList/`;
        const response = await getData(url, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}
export const fetchEventList = async () => {
    try {
        if(process.env.REACT_APP_DATA_TYPE === "json") {
            return eventListResponse;
        }
        const url = `${baseUrl}/eventList/`;
        const response = await getData(url, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}
export const fetchAllTeacherList = async () => {
    try {
        if(process.env.REACT_APP_DATA_TYPE === "json") {
            return allTeacherListResponse;
        }
        const url = `${baseUrl}/teacherRankList/`;
        const response = await getData(url, {});
        return response;
    } catch (error) {
        return { status: false, message: error.message };
    }
}