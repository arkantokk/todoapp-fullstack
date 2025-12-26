import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({children}) => {
    const location = useLocation();
    const { isAuth, user } = useSelector(state => state.auth);
    console.log("Ment says:", { isAuth, user, path: location.pathname });
    if (!isAuth){
        return <Navigate to="/login" state={{ from: location.pathname }} />
    }

    return children;
}

export default RequireAuth;