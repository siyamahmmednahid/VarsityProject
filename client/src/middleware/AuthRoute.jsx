import { useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
// import useCheckAuth from "../hooks/useCheckAuth";
import Login from "../pages/Login";

const AuthRoute = ({children}) => {
    // const isAuthenticated = useCheckAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    if (isAuthenticated === true) {
        return (
            <>
                {children}
            </>
        );
    }
    else if (isAuthenticated === false) {
        return (
            <Navigate to="/login" />
        )
    }
    else {
        return (
            <>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </>
        );
    }
}

export default AuthRoute;