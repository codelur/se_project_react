import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({children, anonymous = false}){
    const location = useLocation();
    //const from = location.state?.from || "/";

    if (anonymous){
        return <Navigate to="/" replace/>;
    }

    return children;
}