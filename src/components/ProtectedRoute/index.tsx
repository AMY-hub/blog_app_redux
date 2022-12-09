import { Navigate } from "react-router-dom";
import { ProtrectedRouteProps } from './protectedRoute.props';

export const ProtectedRoute: React.FC<ProtrectedRouteProps> = ({ token, children }) => {
    if (!token) {
        return (<Navigate to='/login' />);
    }
    return children;
};