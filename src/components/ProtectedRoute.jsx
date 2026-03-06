import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirect to landing page but save the attempted location
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}
