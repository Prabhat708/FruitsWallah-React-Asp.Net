
import { Navigate } from 'react-router-dom';
import useAuthStore from '../Stores/AuthStore';

const PrivateRoute = ({ children }) => {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute
