import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
