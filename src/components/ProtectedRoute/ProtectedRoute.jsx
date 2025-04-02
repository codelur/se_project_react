
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, anonymous = false}){
    //const from = location.state?.from || "/";

    if (anonymous){
        return <Navigate to="/" replace/>;
    }

    return children;
}