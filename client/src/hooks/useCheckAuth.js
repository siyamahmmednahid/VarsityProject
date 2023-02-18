import { useEffect, useState, useContext } from "react";
import { Context } from "../store/store";

const useCheckAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const {userAction, userState} = useContext(Context)

    useEffect(() => {
        const data = localStorage.getItem("tms_data");
        if (data) {
            userAction.setUser(JSON.parse(data))
        }
    }, []);

    useEffect(() => {
        if (Object.keys(userState).length) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [userState]);

    return isAuthenticated;
}
 
export default useCheckAuth;